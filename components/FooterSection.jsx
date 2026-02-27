import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../styles/FooterSection.css';

const TOTAL_FRAMES = 192;

const FooterSection = () => {
  const scrollSpaceRef = useRef(null);
  const footerViewRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const [imagesReady, setImagesReady] = useState(false);

  // ─── Preload all 192 footer frames ───
  useEffect(() => {
    const images = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let errorCount = 0;

    const checkComplete = () => {
      if (loadedCount + errorCount === TOTAL_FRAMES) {
        imagesRef.current = images;
        setImagesReady(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = i.toString().padStart(3, '0');
      const img = new Image();
      img.onload = () => { loadedCount++; checkComplete(); };
      img.onerror = () => { errorCount++; checkComplete(); };
      img.src = `/footer/ezgif-frame-${frameNum}.jpg`;
      images[i - 1] = img;
    }

    setTimeout(() => {
      if (loadedCount + errorCount < TOTAL_FRAMES) {
        imagesRef.current = images;
        setImagesReady(true);
      }
    }, 30000);
  }, []);

  // ─── Scroll handler: show/hide fixed footer + track progress ───
  useEffect(() => {
    if (!imagesReady) return;

    const handleScroll = () => {
      const space = scrollSpaceRef.current;
      const view = footerViewRef.current;
      if (!space || !view) return;

      const rect = space.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Show footer ONLY when scroll-space top reaches viewport top
      // This prevents the footer from covering the CTA section
      if (rect.top <= 0 && rect.bottom > 0) {
        // SHOW the fixed footer view
        view.style.visibility = 'visible';
        view.style.opacity = '1';

        // Progress: 0 when just entering, 1 when fully scrolled through
        const scrolledPast = -rect.top;
        const scrollableDistance = sectionHeight - windowHeight;
        const progress = scrollableDistance > 0
          ? Math.max(0, Math.min(1, scrolledPast / scrollableDistance))
          : 1;
        scrollProgressRef.current = progress;
      } else {
        // HIDE the fixed footer view
        view.style.visibility = 'hidden';
        view.style.opacity = '0';
        if (rect.top > 0) scrollProgressRef.current = 0;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [imagesReady]);

  // ─── Cubic easing for smooth frame transitions ───
  const getFrameIndex = useCallback((progress) => {
    const c = Math.max(0, Math.min(1, progress));
    const eased = c < 0.5
      ? 4 * c * c * c
      : 1 - Math.pow(-2 * c + 2, 3) / 2;
    return Math.floor(eased * (TOTAL_FRAMES - 1));
  }, []);

  // ─── Canvas animation loop (60fps rAF) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesReady) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastRenderedFrameRef.current = -1; // force redraw
    };
    updateSize();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateSize, 150);
    };
    window.addEventListener('resize', onResize);

    let running = true;

    const animate = () => {
      if (!running) return;

      const frameIndex = getFrameIndex(scrollProgressRef.current);

      if (frameIndex !== lastRenderedFrameRef.current) {
        lastRenderedFrameRef.current = frameIndex;
        const image = imagesRef.current[frameIndex];

        // Clear
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw frame with cover behavior
        if (image && image.complete && image.naturalWidth > 0) {
          const iw = image.naturalWidth;
          const ih = image.naturalHeight;
          const cw = canvas.width;
          const ch = canvas.height;
          const ir = iw / ih;
          const cr = cw / ch;

          let dw, dh, dx, dy;
          if (cr > ir) {
            dw = cw; dh = cw / ir;
          } else {
            dh = ch; dw = ch * ir;
          }
          dx = (cw - dw) / 2;
          dy = (ch - dh) / 2;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          try { ctx.drawImage(image, dx, dy, dw, dh); } catch (e) { }
        }

      }

      if (running) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [imagesReady, getFrameIndex]);

  return (
    <>
      {/* Scroll space — creates scrollable distance for 192 frames */}
      <div ref={scrollSpaceRef} className="footer-scroll-space" />

      {/* Fixed footer — only visible when scroll-space is in viewport */}
      <div
        ref={footerViewRef}
        className="footer-fixed-view"
        style={{ visibility: 'hidden', opacity: 0 }}
      >
        <canvas ref={canvasRef} className="footer-canvas-bg" />

        <footer className="footer-content-layer">
          <div className="footer-container">
            <div className="footer-grid">
              <div className="footer-column">
                <h3 className="footer-title">Golden Hazelnut Praline Bliss</h3>
                <p className="footer-description">
                  Luxury chocolate crafted for those who appreciate true indulgence and artisanal excellence.
                </p>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="#shop">Shop</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#recipes">Recipes</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Follow Us</h4>
                <ul className="footer-links">
                  <li><a href="#instagram">Instagram</a></li>
                  <li><a href="#facebook">Facebook</a></li>
                  <li><a href="#twitter">Twitter</a></li>
                  <li><a href="#pinterest">Pinterest</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Newsletter</h4>
                <p className="footer-newsletter-text">Subscribe for exclusive offers and recipes</p>
                <input type="email" placeholder="Your email" className="footer-input" />
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-copyright">&copy; 2026 Golden Hazelnut Praline Bliss. All rights reserved.</p>
              <div className="footer-legal">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#cookies">Cookie Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FooterSection;
