import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * ProfileCard Component (ReactBits)
 * Features:
 * - 3D Interactive Tilt on MouseMove & Device Orientation
 * - Dynamic Cursor-following Behind Glow
 * - Interactive Holographic Glare / Light Reflection
 * - Glassmorphic Container with Top Header & Bottom Status Pill
 */
const ProfileCard = ({
  avatarUrl = '/images/profile-galang.jpg',
  miniAvatarUrl = '/images/profile-galang.jpg',
  name = 'Galang Ega Yudistira',
  title = 'Software & IoT Developer',
  handle = 'galangega07',
  status = 'Online',
  contactText = 'Contact Me',
  onContactClick,
  enableTilt = true,
  enableMobileTilt = true,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(249, 115, 22, 0.45)',
  imagePosition = 'center 12%',
  imageHeight = 'clamp(300px, 46vw, 420px)',
  className = '',
  style = {}
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Tilt State
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, glareOpacity: 0 });
  // Behind Glow position
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // Max 12 deg
    const rotateY = ((x - centerX) / centerX) * 12;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      rotateX,
      rotateY,
      glareX,
      glareY,
      glareOpacity: 0.65
    });

    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  }, [enableTilt]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0
    });
  };

  // Device orientation for mobile tilt
  useEffect(() => {
    if (!enableMobileTilt) return;

    const handleOrientation = (e) => {
      if (e.beta === null || e.gamma === null) return;
      // Beta: front-back tilt [-180, 180], Gamma: left-right tilt [-90, 90]
      const rotateX = Math.min(Math.max((e.beta - 45) * 0.4, -12), 12);
      const rotateY = Math.min(Math.max(e.gamma * 0.4, -12), 12);

      setTilt((prev) => ({
        ...prev,
        rotateX,
        rotateY,
        glareX: 50 + rotateY * 2,
        glareY: 50 - rotateX * 2,
        glareOpacity: 0.35
      }));
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, [enableMobileTilt]);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        perspective: '1200px',
        width: '100%',
        maxWidth: '410px',
        ...style
      }}
      className={`reactbits-profile-card-wrapper ${className}`}
    >
      {/* 1. Behind Glow Element */}
      {behindGlowEnabled && (
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '36px',
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${behindGlowColor} 0%, rgba(129, 140, 248, 0.15) 45%, transparent 70%)`,
            filter: 'blur(35px)',
            opacity: isHovered ? 1 : 0.45,
            transition: isHovered ? 'opacity 0.25s ease' : 'opacity 0.6s ease, transform 0.6s ease',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}

      {/* 2. Main 3D Tilted Card Body */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          borderRadius: '26px',
          background: 'linear-gradient(160deg, rgba(17, 24, 39, 0.88) 0%, rgba(10, 15, 29, 0.94) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: isHovered
            ? '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(249, 115, 22, 0.28)'
            : '0 20px 45px -10px rgba(0, 0, 0, 0.65), 0 0 25px rgba(249, 115, 22, 0.12)',
          padding: '18px',
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(${isHovered ? '12px' : '0px'})`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.25s ease'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.5s ease',
          borderColor: isHovered ? 'rgba(249, 115, 22, 0.45)' : 'rgba(255, 255, 255, 0.14)',
          overflow: 'hidden'
        }}
      >
        {/* Holographic Glare Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 15,
            borderRadius: '26px',
            background: `radial-gradient(circle 280px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.22) 0%, rgba(249, 115, 22, 0.15) 30%, transparent 65%)`,
            opacity: tilt.glareOpacity,
            mixBlendMode: 'screen',
            transition: isHovered ? 'opacity 0.15s ease' : 'opacity 0.5s ease'
          }}
        />

        {/* Diagonal Shimmer Line */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 14,
            background: `linear-gradient(${115 + tilt.rotateY * 2}deg, transparent 20%, rgba(255, 255, 255, 0.08) 45%, rgba(249, 115, 22, 0.2) 50%, transparent 55%)`,
            opacity: isHovered ? 0.9 : 0.2,
            transition: 'opacity 0.3s ease'
          }}
        />

        {/* Card Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            padding: '2px 4px',
            transform: 'translateZ(18px)'
          }}
        >
          <div>
            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.3px',
                margin: 0,
                lineHeight: 1.2
              }}
            >
              {name}
            </h4>
            <span
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-light)',
                fontWeight: 500,
                display: 'block',
                marginTop: '2px'
              }}
            >
              {title}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981',
                animation: 'pulseGlow 2s infinite'
              }}
            />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {status}
            </span>
          </div>
        </div>

        {/* Card Main Image Frame */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: imageHeight,
            borderRadius: '18px',
            overflow: 'hidden',
            background: '#090d16',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transform: 'translateZ(10px)'
          }}
        >
          <img
            src={avatarUrl}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: imagePosition,
              transform: isHovered ? 'scale(1.035)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Inner Vignette / Dark Gradient at Bottom of Image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(6, 9, 17, 0.85) 0%, rgba(6, 9, 17, 0.2) 35%, transparent 65%)',
              pointerEvents: 'none'
            }}
          />

          {/* Floating User Info Status Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              zIndex: 20,
              background: 'rgba(10, 15, 28, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-full)',
              padding: '7px 12px 7px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transform: 'translateZ(24px)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(249, 115, 22, 0.6)',
                  boxShadow: '0 0 8px rgba(249, 115, 22, 0.4)'
                }}
              >
                <img
                  src={miniAvatarUrl || avatarUrl}
                  alt={name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.2px' }}>
                  @{handle}
                </span>
                <span style={{ fontSize: '0.66rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
                  {status}
                </span>
              </div>
            </div>

            <button
              onClick={onContactClick}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '0.76rem',
                fontWeight: 700,
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#090d16';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>{contactText}</span>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
