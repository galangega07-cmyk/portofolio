import React, { useState, useEffect, useMemo } from 'react';

/**
 * Animate UI - SplittingText & ShimmeringText Components
 * Inspired by https://animate-ui.com/ (Texts / Splitting Text / Shimmering Text)
 * 
 * Features:
 * - Staggered character-by-character blur-fade entrance
 * - Continuous & hover-activated radiant solar light shimmer
 * - Interactive character spring bounce & wave on cursor hover
 * - High-performance CSS transform/filter animations
 */

export const SplittingText = ({
  text = '',
  className = '',
  style = {},
  delay = 0.04,
  initialDelay = 0.1,
  shimmer = true,
  interactive = true,
  tag: Tag = 'h1'
}) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const characters = useMemo(() => {
    return text.split('');
  }, [text]);

  return (
    <Tag
      className={`animate-ui-splitting-text ${shimmer ? 'animate-ui-shimmer' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        margin: 0,
        position: 'relative',
        ...style
      }}
      aria-label={text}
    >
      {characters.map((char, index) => {
        const isSpace = char === ' ';
        const isHovered = hoveredIndex === index;
        const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;

        return (
          <span
            key={index}
            onMouseEnter={() => interactive && setHoveredIndex(index)}
            onMouseLeave={() => interactive && setHoveredIndex(null)}
            className="animate-ui-char"
            style={{
              display: 'inline-block',
              whiteSpace: isSpace ? 'pre' : 'normal',
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered
                ? isHovered
                  ? 'translateY(-6px) scale(1.15)'
                  : isNeighbor
                  ? 'translateY(-3px) scale(1.06)'
                  : 'translateY(0) scale(1)'
                : 'translateY(24px) scale(0.85)',
              filter: hasEntered ? 'blur(0px)' : 'blur(8px)',
              transition: hasEntered
                ? 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease, text-shadow 0.25s ease'
                : `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${initialDelay + index * delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${initialDelay + index * delay}s, filter 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${initialDelay + index * delay}s`,
              color: isHovered ? '#fb923c' : 'inherit',
              textShadow: isHovered
                ? '0 0 20px rgba(249, 115, 22, 0.8), 0 0 35px rgba(251, 146, 60, 0.4)'
                : 'none',
              cursor: interactive ? 'default' : 'inherit',
              willChange: 'transform, opacity, filter'
            }}
          >
            {isSpace ? '\u00A0' : char}
          </span>
        );
      })}
    </Tag>
  );
};

export const ShimmeringText = ({
  children,
  className = '',
  style = {},
  shimmerColor = 'rgba(255, 255, 255, 0.85)',
  baseColor = 'rgba(255, 255, 255, 0.7)',
  tag: Tag = 'span'
}) => {
  return (
    <Tag
      className={`animate-ui-shimmer-wrap ${className}`}
      style={{
        display: 'inline-block',
        background: `linear-gradient(110deg, ${baseColor} 0%, ${baseColor} 35%, ${shimmerColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'animateUiShimmer 3.5s infinite linear',
        ...style
      }}
    >
      {children}
    </Tag>
  );
};

export const MorphingBadge = ({
  text,
  icon,
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`animate-ui-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '9999px',
        background: 'rgba(249, 115, 22, 0.1)',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        boxShadow: '0 0 16px rgba(249, 115, 22, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Moving shimmer gleam across badge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)',
          transform: 'skewX(-20deg)',
          animation: 'badgeShimmer 3s infinite ease-in-out'
        }}
      />
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span style={{
        fontSize: '0.8rem',
        fontWeight: 700,
        color: '#f97316',
        letterSpacing: '0.8px',
        textTransform: 'uppercase'
      }}>
        {text}
      </span>
    </div>
  );
};

export default SplittingText;
