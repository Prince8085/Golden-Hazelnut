import React, { useEffect, useRef, useCallback, useState } from 'react';
import { preloadAnimationFrames } from '../utils/imagePreloader';
import '../styles/CanvasAnimation.css';

const TOTAL_FRAMES = 192; // ✅ CONSTANT - not recalculated

const CanvasAnimation = ({ scrollProgress, isLoading, onLoadComplete }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const [imagesReady, setImagesReady] = useState(false);
  const scrollProgressRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);

  // Preload all images on mount
  useEffect(() => {
    const loadFrames = async () => {
      const frames = await preloadAnimationFrames(TOTAL_FRAMES);
      imagesRef.current = frames;
      setImagesReady(true);
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Canvas animation ready: ${frames.length} frames loaded`);
      }
      if (onLoadComplete) onLoadComplete();
    };

    loadFrames();
  }, [onLoadComplete]);

  // Update scroll progress ref whenever it changes
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Calculate frame index with cubic easing
  const getFrameIndex = useCallback((progress) => {
    // Clamp progress to 0-1 range
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    // Cubic easing for smooth acceleration/deceleration
    const eased = clampedProgress < 0.5
      ? 4 * clampedProgress * clampedProgress * clampedProgress
      : 1 - Math.pow(-2 * clampedProgress + 2, 3) / 2;

    const rawIndex = eased * (TOTAL_FRAMES - 1);
    return Math.floor(rawIndex);
  }, []);

  // Main animation loop - runs at 60fps
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesReady) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    // Debounce resize events
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCanvasSize, 150);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop - using stable ref to avoid stale closure
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;

      const frameIndex = getFrameIndex(scrollProgressRef.current);
      const image = imagesRef.current[frameIndex];

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image if loaded
      if (image && image.complete && image.naturalWidth > 0) {
        const imgWidth = image.naturalWidth;
        const imgHeight = image.naturalHeight;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Calculate scaling to fit image on canvas while maintaining aspect ratio
        const imgRatio = imgWidth / imgHeight;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, drawX, drawY;

        if (canvasRatio > imgRatio) {
          drawHeight = canvasHeight;
          drawWidth = drawHeight * imgRatio;
        } else {
          drawWidth = canvasWidth;
          drawHeight = drawWidth / imgRatio;
        }

        // Center the image
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = (canvasHeight - drawHeight) / 2;

        // Draw with high quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        try {
          ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        } catch (err) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Canvas draw error:', err);
          }
        }
      }

      if (isAnimating) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation loop
    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      isAnimating = false;
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [imagesReady, getFrameIndex]);

  return (
    <div className="canvas-animation-wrapper">
      {isLoading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Preparing your cinematic experience...</p>
        </div>
      )}
      <canvas ref={canvasRef} className="animation-canvas" />
    </div>
  );
};

export default CanvasAnimation;