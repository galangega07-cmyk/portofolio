import React, { useState, useRef, useCallback } from 'react';

/**
 * BorderGlow Component (ReactBits)
 * https://www.reactbits.dev/components/border-glow
 * 
 * Features:
 * - Real-time cursor tracking along the container perimeter
 * - Radiant glowing cone/halo along the border
 * - Subtle ambient spotlight inside the card
 * - Smooth fade in/out on hover
 */
const BorderGlow = ({
  children,
  className = '',
  style = {},
  glowColor = 'rgba(249, 115, 22, 0.85)',
  glowRadius = 260,
  glowIntensity = 1,
  borderRadius = 22,
  innerSpotlight = true,
  onClick,
  ...props
}) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`reactbits-border-glow ${className}`}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: isHovered
          ? '0 12px 32px -4px rgba(0, 0, 0, 0.6), 0 0 20px rgba(249, 115, 22, 0.15)'
          : 'var(--shadow-sm)',
        transition: 'box-shadow 0.3s ease, transform 0.25s ease',
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style
      }}
      {...props}
    >
      {/* 1. Outer Border Glow Halo via Mask */}
      <div
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: `${borderRadius}px`,
          padding: '1.5px',
          background: `radial-gradient(${glowRadius}px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor} 0%, rgba(251, 146, 60, 0.45) 30%, rgba(249, 115, 22, 0.08) 60%, transparent 75%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          opacity: isHovered ? glowIntensity : 0,
          transition: 'opacity 0.25s ease',
          zIndex: 10
        }}
      />

      {/* 2. Inner Ambient Spotlight */}
      {innerSpotlight && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: `${borderRadius}px`,
            background: `radial-gradient(${glowRadius + 60}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249, 115, 22, 0.08) 0%, transparent 70%)`,
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 0
          }}
        />
      )}

      {/* 3. Card Inner Content */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
