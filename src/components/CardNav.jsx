import React, { useState, useEffect, useRef } from 'react';

/**
 * CardNav Component
 * Inspired by ReactBits Card Nav (https://www.reactbits.dev/components/card-nav)
 * Features:
 * - Floating top glass bar with brand identity & quick links
 * - Expandable Card Panel revealing structured category cards and nested links
 * - Smooth transition animations and glowing hover interactions
 * - Full responsive adaptation for mobile & desktop
 * - Keyboard navigation (Esc to close) & Click-outside listener
 */
const CARD_NAV_ITEMS = [
  {
    id: 'profile',
    num: '01',
    title: 'Profil & Bio',
    subtitle: 'Mahasiswa IT & Pengembang Perangkat Lunak',
    accent: '#38bdf8',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    links: [
      { label: 'Ringkasan Biografi', page: 'profile' },
      { label: 'Sorotan Keahlian', page: 'profile' },
      { label: 'Minat & Olahraga Basket', page: 'profile' }
    ]
  },
  {
    id: 'projects',
    num: '02',
    title: 'Karya & Proyek',
    subtitle: 'Sistem IoT, VPS WireGuard & Web Laravel',
    accent: '#10b981',
    badge: '2 Live Demo',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    links: [
      { label: 'Tatik Catering (Live Demo ↗)', externalUrl: 'https://tatik-catering-web.vercel.app/' },
      { label: 'SIMIKP Kota Batu (Live Demo ↗)', externalUrl: 'https://simikp.onrender.com/login' },
      { label: 'SmartOryza - IoT Pertanian', page: 'projects' }
    ]
  },
  {
    id: 'education',
    num: '03',
    title: 'Pendidikan',
    subtitle: 'Universitas Brawijaya • D3 TI',
    accent: '#818cf8',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    links: [
      { label: 'Fakultas Vokasi D3 TI', page: 'education' },
      { label: 'Fokus Cloud & Networking', page: 'education' },
      { label: 'Prestasi & Organisasi', page: 'education' }
    ]
  },
  {
    id: 'experience',
    num: '04',
    title: 'Pengalaman',
    subtitle: 'Tech Intern, Hospitality & Retail',
    accent: '#f59e0b',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    links: [
      { label: 'Critasena Cafe (Barista)', page: 'experience' },
      { label: 'Costslice (Kitchen & Server)', page: 'experience' },
      { label: 'PT PLN Icon Plus (Marketing)', page: 'experience' }
    ]
  },
  {
    id: 'contact',
    num: '05',
    title: 'Kontak & Diskusi',
    subtitle: 'Tersedia untuk Magang & Proyek',
    accent: '#ec4899',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    links: [
      { label: 'WhatsApp: 0821-2002-6900', externalUrl: 'https://wa.me/6282120026900' },
      { label: 'Email: galangega07@gmail.com', externalUrl: 'mailto:galangega07@gmail.com' },
      { label: 'Form Pesan Langsung', page: 'contact' }
    ]
  }
];

const CardNav = ({ activePage, setActivePage, profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navContainerRef = useRef(null);

  // Close CardNav on outside click
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (link, e) => {
    e.stopPropagation();
    if (link.externalUrl) {
      window.open(link.externalUrl, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    } else if (link.page) {
      handleNavigate(link.page);
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="card-nav-container"
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 16px',
        pointerEvents: 'none'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. TOP FLOATING NAVBAR BAR */}
      {/* ========================================================================= */}
      <div
        className="card-nav-bar"
        style={{
          pointerEvents: 'auto',
          maxWidth: '1060px',
          width: '100%',
          height: '64px',
          borderRadius: isOpen ? '24px 24px 0 0' : 'var(--radius-full)',
          background: 'rgba(10, 15, 29, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: isOpen ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isOpen
            ? '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(249, 115, 22, 0.16)'
            : '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(249, 115, 22, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px 0 22px',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Brand Logo & Online Status */}
        <button
          onClick={() => handleNavigate('profile')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: 0
          }}
          title="Ke Halaman Beranda"
        >
          <span style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#ffffff',
            fontFamily: 'Outfit, sans-serif'
          }}>
            Galang<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </span>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '2px 8px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.68rem',
            fontWeight: 700,
            color: '#34d399'
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34d399' }} />
            <span>Dev</span>
          </span>
        </button>

        {/* Center: Desktop Quick Pills */}
        <div className="card-nav-quick-pills" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {CARD_NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 500,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {item.title.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Right: CardNav Expand Trigger Button & CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* CardNav Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="card-nav-toggle-btn"
            style={{
              background: isOpen
                ? 'var(--accent-primary)'
                : 'rgba(255, 255, 255, 0.08)',
              border: isOpen
                ? '1px solid var(--accent-primary)'
                : '1px solid rgba(255, 255, 255, 0.15)',
              color: isOpen ? '#090d16' : '#ffffff',
              padding: '7px 15px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isOpen ? '0 0 15px rgba(249, 115, 22, 0.45)' : 'none'
            }}
            title="Buka Menu Panel Kartu (CardNav)"
          >
            {/* Animated Grid / Close Icon */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isOpen ? (
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                </svg>
              )}
            </div>
            <span>{isOpen ? 'Tutup' : 'Menu'}</span>
          </button>

          {/* Quick CTA Button (Hubungi) */}
          <button
            onClick={() => handleNavigate('contact')}
            className="card-nav-cta-btn"
            style={{
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.16) 0%, rgba(245, 158, 11, 0.2) 100%)',
              border: '1px solid rgba(249, 115, 22, 0.35)',
              color: 'var(--accent-primary)',
              padding: '7px 15px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
              e.currentTarget.style.color = '#090d16';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249, 115, 22, 0.16) 0%, rgba(245, 158, 11, 0.2) 100%)';
              e.currentTarget.style.color = 'var(--accent-primary)';
            }}
          >
            <span>Hubungi</span>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. EXPANDABLE CARD PANELS (The ReactBits CardNav Experience) */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          className="card-nav-panel-dropdown"
          style={{
            pointerEvents: 'auto',
            maxWidth: '1060px',
            width: '100%',
            background: 'rgba(8, 12, 24, 0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderTop: 'none',
            borderRadius: '0 0 28px 28px',
            padding: '24px',
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 40px rgba(249, 115, 22, 0.15)',
            animation: 'cardNavDropdownIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {/* Card Grid Container */}
          <div
            className="card-nav-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              width: '100%'
            }}
          >
            {CARD_NAV_ITEMS.map((card, idx) => {
              const isActive = activePage === card.id;
              const isHovered = hoveredCard === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => handleNavigate(card.id)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="card-nav-item-card"
                  style={{
                    borderRadius: '18px',
                    padding: '18px 16px',
                    background: isActive
                      ? 'linear-gradient(145deg, rgba(26, 38, 66, 0.85) 0%, rgba(13, 20, 38, 0.95) 100%)'
                      : isHovered
                      ? 'linear-gradient(145deg, rgba(20, 28, 48, 0.7) 0%, rgba(10, 15, 30, 0.85) 100%)'
                      : 'rgba(15, 23, 42, 0.45)',
                    border: isActive
                      ? `1px solid ${card.accent}`
                      : isHovered
                      ? '1px solid rgba(255, 255, 255, 0.22)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isActive
                      ? `0 12px 28px -6px rgba(0,0,0,0.6), 0 0 20px ${card.accent}25`
                      : isHovered
                      ? '0 10px 24px -6px rgba(0,0,0,0.5)'
                      : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '220px',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'translateY(-4px)' : 'none',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Subtle Card Ambient Glow */}
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${card.accent}30 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    opacity: isHovered || isActive ? 1 : 0.3,
                    transition: 'opacity 0.3s ease'
                  }} />

                  {/* Card Top: Number & Icon & Badge */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px'
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '12px',
                        background: `${card.accent}18`,
                        border: `1px solid ${card.accent}35`,
                        color: card.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {card.icon}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {card.badge && (
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            background: 'rgba(16, 185, 129, 0.2)',
                            color: '#34d399',
                            border: '1px solid rgba(16, 185, 129, 0.4)'
                          }}>
                            {card.badge}
                          </span>
                        )}
                        <span style={{
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          fontFamily: 'monospace',
                          color: 'var(--text-light)'
                        }}>
                          {card.num}
                        </span>
                      </div>
                    </div>

                    {/* Card Title & Subtitle */}
                    <h4 style={{
                      fontSize: '1.02rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '4px',
                      letterSpacing: '-0.3px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>{card.title}</span>
                      {isActive && (
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: card.accent }} />
                      )}
                    </h4>

                    <p style={{
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                      marginBottom: '14px'
                    }}>
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Card Nested Quick Links */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    {card.links.map((link, lIdx) => (
                      <button
                        key={lIdx}
                        onClick={(e) => handleLinkClick(link, e)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px 0',
                          textAlign: 'left',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: 'var(--text-light)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = card.accent; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-light)'; }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          • {link.label}
                        </span>
                        <span style={{ fontSize: '0.68rem', opacity: 0.7 }}>›</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Footer Info inside CardNav */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '18px',
            paddingTop: '14px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                📍 Malang, Jawa Timur, Indonesia
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600 }}>
                Open to Internship & Project Collaboration
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>

              <a
                href={`https://wa.me/62${profile.phone ? profile.phone.replace(/^0/, '') : '82120026900'}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#10b981'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <span>WhatsApp</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardNav;
