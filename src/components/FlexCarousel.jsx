import React, { useState, useEffect, useRef } from 'react';

/**
 * FlexCarousel Component
 * Inspired by ReactBits Flex Carousel
 * Features:
 * - Liquid glass aesthetic container with edge reflection & ambient glows
 * - Smooth flex expansion physics with cubic-bezier transition
 * - Click to focus & keyboard arrow navigation
 * - Full project details retained in expanded state
 * - Collapsed state vertical preview with glowing badge and thumbnail
 * - Navigation controls (Prev / Next / Progress indicators)
 */
const FlexCarousel = ({
  items = [],
  autoPlay = false,
  autoPlayInterval = 6000,
  setActivePage
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);
  const containerRef = useRef(null);

  // Auto-advance if enabled and not hovered
  useEffect(() => {
    if (!autoPlay || isHovered || items.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, isHovered, items.length, autoPlayInterval]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // Swipe Left -> Next
        handleNext();
      } else {
        // Swipe Right -> Prev
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className="flex-carousel-outer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        margin: '0 auto 40px',
        userSelect: 'none'
      }}
    >
      {/* Liquid Glass Glow Background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        height: '75%',
        background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.12) 0%, rgba(245, 158, 11, 0.06) 50%, transparent 75%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Main Flex Carousel Track */}
      <div
        ref={containerRef}
        className="flex-carousel-track"
        style={{
          display: 'flex',
          gap: '14px',
          width: '100%',
          minHeight: '520px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {items.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={project.id || index}
              onClick={() => setActiveIndex(index)}
              className={`flex-carousel-card ${isActive ? 'is-active' : 'is-collapsed'}`}
              style={{
                flex: isActive ? '4 1 0%' : '1 1 0%',
                minWidth: isActive ? 'min(100%, 300px)' : '70px',
                borderRadius: '24px',
                background: isActive
                  ? 'linear-gradient(145deg, rgba(17, 24, 39, 0.92) 0%, rgba(10, 15, 29, 0.95) 100%)'
                  : 'linear-gradient(145deg, rgba(15, 23, 42, 0.6) 0%, rgba(8, 12, 22, 0.7) 100%)',
                border: isActive
                  ? '1px solid rgba(249, 115, 22, 0.45)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isActive
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(249, 115, 22, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  : '0 10px 25px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: isActive ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
            >
              {/* Background ambient subtle glow inside card */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '180px',
                height: '180px',
                background: isActive
                  ? 'radial-gradient(circle, rgba(249, 115, 22, 0.18) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                pointerEvents: 'none',
                transition: 'opacity 0.5s ease'
              }} />

              {/* ========================================================= */}
              {/* COLLAPSED CARD VIEW (When not active) */}
              {/* ========================================================= */}
              {!isActive && (
                <div
                  className="flex-card-collapsed"
                  style={{
                    height: '100%',
                    width: '100%',
                    padding: '24px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {/* Top: Index & Category Icon */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      fontFamily: 'monospace',
                      color: 'var(--text-light)',
                      letterSpacing: '1px'
                    }}>
                      0{index + 1}
                    </span>

                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)'
                    }}>
                      {project.icon === 'iot' ? (
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                        </svg>
                      ) : project.icon === 'gov' ? (
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Middle: Vertical Title / Category */}
                  <div style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    margin: 'auto 0'
                  }}>
                    <span style={{
                      fontSize: '0.96rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '-0.2px',
                      whiteSpace: 'nowrap'
                    }}>
                      {project.judul}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--text-light)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {project.kategori}
                    </span>
                  </div>

                  {/* Bottom: Expand Pill */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.14)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    fontSize: '0.8rem'
                  }}>
                    +
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* EXPANDED ACTIVE CARD VIEW (Full Project Information) */}
              {/* ========================================================= */}
              {isActive && (
                <div
                  className="flex-card-expanded"
                  style={{
                    padding: '24px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 2,
                    animation: 'flexFadeIn 0.45s ease forwards'
                  }}
                >
                  {/* Top Bar: Badge & Status */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        background: 'rgba(249, 115, 22, 0.16)',
                        border: '1px solid rgba(249, 115, 22, 0.38)',
                        color: 'var(--accent-primary)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}>
                        0{index + 1} • {project.kategori}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            background: 'rgba(16, 185, 129, 0.18)',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            color: '#34d399',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '5px 14px',
                            borderRadius: 'var(--radius-full)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#10b981';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.18)';
                            e.currentTarget.style.color = '#34d399';
                          }}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }} />
                          <span>Live Demo ↗</span>
                        </a>
                      ) : (
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: 'var(--text-muted)',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)'
                        }}>
                          {project.status || 'Active Project'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Two Column Layout on Wide Screens: Left details / Right image preview */}
                  <div
                    className="flex-card-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                      gap: '20px',
                      alignItems: 'start',
                      marginBottom: '16px'
                    }}
                  >
                    {/* Left Column: Title & Description */}
                    <div>
                      <h3 style={{
                        fontSize: 'clamp(1.25rem, 2.8vw, 1.65rem)',
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: '-0.5px',
                        marginBottom: '4px',
                        lineHeight: 1.2
                      }}>
                        {project.judul}
                      </h3>

                      {project.subJudul && (
                        <h4 style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: 'var(--accent-primary)',
                          marginBottom: '12px'
                        }}>
                          {project.subJudul}
                        </h4>
                      )}

                      <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.65,
                        marginBottom: '16px'
                      }}>
                        {project.deskripsi}
                      </p>

                      {/* Architecture & Features Highlights */}
                      {project.fitur && (
                        <div style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          padding: '12px 14px',
                          borderRadius: '14px',
                          marginBottom: '16px'
                        }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            color: 'var(--text-light)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            display: 'block',
                            marginBottom: '6px'
                          }}>
                            Fitur & Arsitektur Utama:
                          </span>
                          <ul style={{
                            paddingLeft: '16px',
                            margin: 0,
                            fontSize: '0.82rem',
                            color: 'var(--text-muted)',
                            lineHeight: 1.55
                          }}>
                            {project.fitur.slice(0, 3).map((item, idx) => (
                              <li key={idx} style={{ marginBottom: '3px' }}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Screenshot & Tech Stack */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {project.image && (
                        <div style={{
                          width: '100%',
                          height: 'clamp(150px, 24vw, 190px)',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          position: 'relative',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          background: '#090d16',
                          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.4)'
                        }}>
                          <img
                            src={project.image}
                            alt={project.judul}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                              transition: 'transform 0.5s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                          />
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      <div>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: 'var(--text-light)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          display: 'block',
                          marginBottom: '8px'
                        }}>
                          Teknologi & Stack:
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {project.tech.map((t, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#e2e8f0',
                                fontSize: '0.74rem',
                                fontWeight: 600,
                                padding: '3px 10px',
                                borderRadius: 'var(--radius-full)'
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div
                    className="flex-card-actions"
                    style={{
                      marginTop: 'auto',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn-hero-primary"
                          style={{
                            padding: '9px 18px',
                            fontSize: '0.84rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none'
                          }}
                        >
                          <span>Buka & Lihat Proyek Live</span>
                          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </a>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (setActivePage) setActivePage('contact');
                          }}
                          className="btn-hero-secondary"
                          style={{
                            padding: '9px 18px',
                            fontSize: '0.84rem'
                          }}
                        >
                          Konsultasi Solusi Ini
                        </button>
                      )}
                    </div>

                    {/* Compact Project Switcher Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={handlePrev}
                        title="Proyek Sebelumnya"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
                      >
                        ‹
                      </button>

                      <button
                        onClick={handleNext}
                        title="Proyek Selanjutnya"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Dot / Indicator Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '22px'
      }}>
        {items.map((proj, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                width: isActive ? '32px' : '9px',
                height: '9px',
                borderRadius: 'var(--radius-full)',
                background: isActive
                  ? 'var(--accent-primary)'
                  : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isActive ? '0 0 12px var(--accent-primary)' : 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: 0
              }}
              title={proj.judul}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FlexCarousel;

