import React, { useEffect, useRef, useState } from 'react';

/**
 * DitherVeil Component (Inspired by ReactBits Dither Veil)
 * Prints an image with an aesthetic retro 1-bit / Bayer dither veil.
 * Cursor burns through to reveal full vibrant color, leaving a trail that knits back cell-by-cell.
 */
const DitherVeil = ({
  src,
  alt = 'Dither Image',
  cellSize = 3,
  radius = 65,
  decay = 0.032,
  className = '',
  style = {},
  children
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let isDestroyed = false;

    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    // 4x4 Bayer Matrix
    const bayer4x4 = [
      [ 0,  8,  2, 10],
      [12,  4, 14,  6],
      [ 3, 11,  1,  9],
      [15,  7, 13,  5]
    ];

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let heatGrid = null; // Float32Array for heat per cell

    // Offscreen Canvas for full-res colored image
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

    let originalImageData = null;

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
      lastMoveTime: 0
    };

    // Auto demo idle shimmer attractor
    let idleAngle = 0;

    const resizeAndInit = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(10, Math.floor(rect.width));
      height = Math.max(10, Math.floor(rect.height));

      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;

      offCanvas.width = width;
      offCanvas.height = height;

      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      heatGrid = new Float32Array(cols * rows);

      // Draw image to offCanvas with object-fit: cover
      if (img.complete && img.naturalWidth > 0) {
        offCtx.clearRect(0, 0, width, height);

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;

        let drawW, drawH, drawX, drawY;

        if (canvasRatio > imgRatio) {
          drawW = width;
          drawH = width / imgRatio;
          drawX = 0;
          drawY = (height - drawH) * 0.25; // center towards upper-middle (faces)
        } else {
          drawH = height;
          drawW = height * imgRatio;
          drawX = (width - drawW) / 2;
          drawY = (height - drawH) * 0.25;
        }

        offCtx.drawImage(img, drawX, drawY, drawW, drawH);
        originalImageData = offCtx.getImageData(0, 0, width, height);
      }
    };

    img.onload = () => {
      if (isDestroyed) return;
      setIsLoaded(true);
      resizeAndInit();
    };

    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
      resizeAndInit();
    }

    const handleResize = () => {
      resizeAndInit();
    };

    window.addEventListener('resize', handleResize);

    // Mouse & Touch Tracking
    const onPointerMove = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.active = true;
      mouse.lastMoveTime = Date.now();

      burnAt(mouse.x, mouse.y, radius, 1.0);
    };

    const handleMouseMove = (e) => {
      onPointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchstart', handleTouchMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    const burnAt = (px, py, rad, intensity = 1.0) => {
      if (!heatGrid || cols === 0 || rows === 0) return;

      const centerCol = Math.floor(px / cellSize);
      const centerRow = Math.floor(py / cellSize);
      const cellRad = Math.ceil(rad / cellSize);

      const minC = Math.max(0, centerCol - cellRad);
      const maxC = Math.min(cols - 1, centerCol + cellRad);
      const minR = Math.max(0, centerRow - cellRad);
      const maxR = Math.min(rows - 1, centerRow + cellRad);

      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
          const dx = (c - centerCol) * cellSize;
          const dy = (r - centerRow) * cellSize;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < rad) {
            const addHeat = (1 - dist / rad) * intensity;
            const idx = r * cols + c;
            heatGrid[idx] = Math.min(1.0, heatGrid[idx] + addHeat);
          }
        }
      }
    };

    // Initial burn around face area on load
    setTimeout(() => {
      if (width > 0 && height > 0) {
        burnAt(width * 0.5, height * 0.38, radius * 1.3, 1.0);
      }
    }, 200);

    // Animation Render Loop
    const render = () => {
      if (!ctx || !originalImageData || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // If mouse is idle for > 2.5s, create an ambient gentle breathing reveal
      const now = Date.now();
      if (!mouse.active || (now - mouse.lastMoveTime > 2500)) {
        idleAngle += 0.025;
        const autoX = width * 0.5 + Math.sin(idleAngle) * (width * 0.22);
        const autoY = height * 0.42 + Math.cos(idleAngle * 0.8) * (height * 0.18);
        burnAt(autoX, autoY, radius * 0.8, 0.22);
      }

      const outputImageData = ctx.createImageData(width, height);
      const srcData = originalImageData.data;
      const outData = outputImageData.data;

      // Render each cell
      for (let r = 0; r < rows; r++) {
        const startY = r * cellSize;
        const endY = Math.min(height, startY + cellSize);

        for (let c = 0; c < cols; c++) {
          const startX = c * cellSize;
          const endX = Math.min(width, startX + cellSize);
          const heatIdx = r * cols + c;
          const heat = heatGrid[heatIdx];

          // Sample central pixel of cell for luminance & color
          const sampleX = Math.min(width - 1, startX + Math.floor(cellSize / 2));
          const sampleY = Math.min(height - 1, startY + Math.floor(cellSize / 2));
          const sampleIdx = (sampleY * width + sampleX) * 4;

          const cr = srcData[sampleIdx];
          const cg = srcData[sampleIdx + 1];
          const cb = srcData[sampleIdx + 2];
          const ca = srcData[sampleIdx + 3];

          // Perceived luminance
          const luminance = (0.299 * cr + 0.587 * cg + 0.114 * cb);

          // Bayer threshold comparison for 1-bit dither
          const bayerValue = (bayer4x4[r % 4][c % 4] / 16) * 255;
          const isDitherLight = luminance > bayerValue;

          // Dither color (dark obsidian to cyan-tinted light pixel)
          const ditherR = isDitherLight ? 230 : 12;
          const ditherG = isDitherLight ? 240 : 16;
          const ditherB = isDitherLight ? 255 : 28;

          // Fill all pixels in cell
          for (let py = startY; py < endY; py++) {
            for (let px = startX; px < endX; px++) {
              const pIdx = (py * width + px) * 4;

              if (ca === 0) {
                outData[pIdx + 3] = 0;
                continue;
              }

              // Blend between dither pixel and original color by heat
              if (heat <= 0.01) {
                outData[pIdx] = ditherR;
                outData[pIdx + 1] = ditherG;
                outData[pIdx + 2] = ditherB;
                outData[pIdx + 3] = 255;
              } else if (heat >= 0.98) {
                outData[pIdx] = srcData[pIdx];
                outData[pIdx + 1] = srcData[pIdx + 1];
                outData[pIdx + 2] = srcData[pIdx + 2];
                outData[pIdx + 3] = 255;
              } else {
                // Smooth interpolation (burn trail transition)
                const origR = srcData[pIdx];
                const origG = srcData[pIdx + 1];
                const origB = srcData[pIdx + 2];

                outData[pIdx] = Math.round(ditherR * (1 - heat) + origR * heat);
                outData[pIdx + 1] = Math.round(ditherG * (1 - heat) + origG * heat);
                outData[pIdx + 2] = Math.round(ditherB * (1 - heat) + origB * heat);
                outData[pIdx + 3] = 255;
              }
            }
          }

          // Decay heat gradually back to 0 (knitting back)
          if (heat > 0) {
            heatGrid[heatIdx] = Math.max(0, heat - decay);
          }
        }
      }

      ctx.putImageData(outputImageData, 0, 0);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isDestroyed = true;
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchstart', handleTouchMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [src, cellSize, radius, decay]);

  return (
    <div
      ref={containerRef}
      className={`dither-veil-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: 'crosshair',
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      {children}
    </div>
  );
};

export default DitherVeil;
