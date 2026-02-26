/**
 * Optimized Image Preloading Utility for Canvas Animation
 * - Proper error handling
 * - Memory efficient (array allocated once)
 * - Performance monitoring
 */

export const preloadAnimationFrames = (totalFrames = 192) => {
  return new Promise((resolve) => {
    // Allocate array once upfront
    const images = new Array(totalFrames);
    let loadedCount = 0;
    let errorCount = 0;
    const startTime = performance.now();

    const checkComplete = () => {
      if (loadedCount + errorCount === totalFrames) {
        const duration = (performance.now() - startTime).toFixed(0);
        console.log(`✨ Preload complete: ${loadedCount}/${totalFrames} loaded in ${duration}ms`);
        if (errorCount > 0) {
          console.warn(`⚠️ ${errorCount} frames failed to load`);
        }
        resolve(images);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const frameNumber = String(i).padStart(3, '0');
      const img = new Image();

      img.onload = () => {
        loadedCount++;
        const hasValidDimensions = img.naturalWidth > 0 && img.naturalHeight > 0;
        
        if (hasValidDimensions) {
          console.log(`✓ Frame ${frameNumber} loaded (${img.naturalWidth}x${img.naturalHeight})`);
        } else {
          console.warn(`⚠️ Frame ${frameNumber} loaded but missing dimensions`);
          errorCount++;
        }
        
        checkComplete();
      };

      img.onerror = () => {
        errorCount++;
        console.error(`✗ Failed to load frame ${frameNumber}`);
        checkComplete();
      };

      img.ontimeout = () => {
        errorCount++;
        console.error(`⏱️ Timeout loading frame ${frameNumber}`);
        checkComplete();
      };

      // IMPORTANT: No crossOrigin needed for local files
      img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
      img.loading = 'eager';
      
      // Store at exact index for direct frame access (frame 1 = index 0)
      images[i - 1] = img;
    }

    // Timeout after 30 seconds
    setTimeout(() => {
      if (loadedCount + errorCount < totalFrames) {
        console.warn(`⏱️ Preload timeout: ${loadedCount}/${totalFrames} loaded`);
        resolve(images);
      }
    }, 30000);
  });
};
