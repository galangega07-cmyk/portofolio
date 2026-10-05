import React, { useState, useEffect } from 'react';

/**
 * Minimalist AnimateIntro Component with Clean Loading Indicator
 * Inspired by https://animate-ui.com/
 * 
 * Features:
 * - Simple & elegant typography reveal without busy logos
 * - Sleek minimal hairline loading progress bar with solar glow
 * - Dynamic 0% -> 100% numeric counter
 * - Smooth cinematic blur-fade exit transition into portfolio
 */
const AnimateIntro = ({ onComplete, duration = 1600 }) => {
  const [stage, setStage] = useState('loading'); // 'loading' | 'exiting' | 'done'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const stepTime = duration / 50;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerating curve toward 100%
        const increment = Math.max(1, Math.floor((100 - prev) * 0.12) + 2);
        const nextVal = prev + increment;
        return nextVal >= 100 ? 100 : nextVal;
      });
    }, stepTime);

    const exitTimer = setTimeout(() => {
      setProgress(100);
      setStage('exiting');
    }, duration - 380);

    const completeTimer = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  // Click to skip instantly
  const handleSkip = () => {
    setStage('exiting');
    setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 200);
  };

  if (stage === 'done') return null;

  return (
    <div
      onClick={handleSkip}
      className="animate-ui-intro-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#060911',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease',
        opacity: stage === 'exiting' ? 0 : 1,
        transform: stage === 'exiting' ? 'translateY(-16px) scale(1.02)' : 'translateY(0) scale(1)',
        filter: stage === 'exiting' ? 'blur(10px)' : 'none'
      }}
    >
      {/* Ambient soft glow in background center */}
      <div
        style={{
          position: 'absolute',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.18) 0%, transparent 65%)',
          filter: 'blur(35px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Content Container */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', width: '100%', maxWidth: '380px' }}>
        {/* Subtle Category Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-primary)',
            boxShadow: '0 0 8px var(--accent-primary)',
            animation: 'pulseGlow 1.5s infinite'
          }} />
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '2px',
            color: 'var(--text-light)',
            textTransform: 'uppercase'
          }}>
            Portofolio
          </span>
        </div>

        {/* Clean Name Headline */}
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.8px',
            color: '#ffffff',
            margin: '0 0 22px',
            lineHeight: 1.15
          }}
        >
          Galang Ega Yudistira
        </h1>

        {/* Sleek Minimalist Loading Bar */}
        <div style={{
          width: '100%',
          maxWidth: '240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Track and Fill */}
          <div style={{
            height: '3px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #ff6b00 0%, #f97316 60%, #fbbf24 100%)',
                borderRadius: '9999px',
                boxShadow: '0 0 12px rgba(249, 115, 22, 0.9)',
                transition: 'width 0.08s ease-out'
              }}
            />
          </div>

          {/* Loading status & percentage */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            fontFamily: 'monospace',
            color: 'var(--text-muted)'
          }}>
            <span style={{ letterSpacing: '0.5px' }}>Loading...</span>
            <span style={{ color: '#f97316', fontWeight: 700 }}>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimateIntro;
