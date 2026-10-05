import React, { useState, useRef } from 'react';

/**
 * Compact Top Dock Component (ReactBits Pro Portfolio Template)
 * Positioned at the top center, compact sizing with proximity magnification scaling.
 */
const DOCK_ITEMS = [
  {
    id: 'hero',
    label: 'Beranda',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: 'about',
    label: 'Tentang',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    id: 'projects',
    label: 'Proyek',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    id: 'experience',
    label: 'Pengalaman',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    id: 'education',
    label: 'Pendidikan',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  },
  {
    id: 'contact',
    label: 'Kontak',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  },
  {
    id: 'divider',
    isDivider: true
  },
  {
    id: 'github',
    label: 'GitHub Profile',
    externalUrl: 'https://github.com/galangega07-cmyk',
    icon: (
      <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Direct',
    externalUrl: 'https://wa.me/6282120026900',
    icon: (
      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  }
];

const Dock = ({
  activeSection = 'hero',
  onNavigate,
  baseItemSize = 36,
  magnification = 52,
  distance = 105
}) => {
  const [mouseX, setMouseX] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const dockRef = useRef(null);
  const itemRefs = useRef({});

  const handleMouseMove = (e) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
    setHoveredId(null);
  };

  const handleItemClick = (item) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (item.id && onNavigate) {
      onNavigate(item.id);
    }
  };

  // Calculate dynamic size using Cosine proximity falloff
  const getItemSize = (id) => {
    if (mouseX === null) return baseItemSize;
    const el = itemRefs.current[id];
    if (!el || !dockRef.current) return baseItemSize;

    const dockRect = dockRef.current.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2 - dockRect.left;

    const dist = Math.abs(mouseX - itemCenter);
    if (dist > distance) return baseItemSize;

    const scale = Math.cos((dist / distance) * (Math.PI / 2));
    return baseItemSize + (magnification - baseItemSize) * scale;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      <nav
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="reactbits-dock-container"
        style={{
          pointerEvents: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: '24px',
          background: 'rgba(10, 15, 29, 0.84)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.55), 0 0 25px rgba(249, 115, 22, 0.15)',
          height: `${magnification + 12}px`,
          transition: 'all 0.25s ease'
        }}
      >
        {DOCK_ITEMS.map((item, idx) => {
          if (item.isDivider) {
            return (
              <div
                key={`divider-${idx}`}
                style={{
                  width: '1px',
                  height: '20px',
                  background: 'rgba(255, 255, 255, 0.14)',
                  margin: '0 3px',
                  alignSelf: 'center'
                }}
              />
            );
          }

          const isActive = activeSection === item.id || (activeSection === 'profile' && item.id === 'hero');
          const currentSize = getItemSize(item.id);
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[item.id] = el)}
              onMouseEnter={() => setHoveredId(item.id)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* macOS Style Magnified Item Button */}
              <button
                onClick={() => handleItemClick(item)}
                aria-label={item.label}
                style={{
                  width: `${currentSize}px`,
                  height: `${currentSize}px`,
                  borderRadius: '13px',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.28) 0%, rgba(245, 158, 11, 0.2) 100%)'
                    : isHovered
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isActive
                    ? '1px solid rgba(249, 115, 22, 0.55)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive
                    ? 'var(--accent-primary)'
                    : isHovered
                    ? '#ffffff'
                    : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  transition: mouseX === null ? 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)' : 'width 0.06s ease, height 0.06s ease, background 0.2s ease',
                  boxShadow: isActive
                    ? '0 0 14px rgba(249, 115, 22, 0.35)'
                    : isHovered
                    ? '0 8px 18px rgba(0, 0, 0, 0.4)'
                    : 'none'
                }}
              >
                {/* Scale Icon Proportionally */}
                <div style={{
                  transform: `scale(${currentSize / baseItemSize})`,
                  transformOrigin: 'center center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: mouseX === null ? 'transform 0.28s ease' : 'none'
                }}>
                  {item.icon}
                </div>
              </button>

              {/* Running Active Status Dot underneath */}
              <div style={{
                position: 'absolute',
                bottom: '-5px',
                width: '3.5px',
                height: '3.5px',
                borderRadius: '50%',
                background: isActive ? 'var(--accent-primary)' : 'transparent',
                boxShadow: isActive ? '0 0 6px var(--accent-primary)' : 'none',
                transition: 'all 0.2s ease'
              }} />

              {/* Floating Tooltip below Top Dock */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(8, 12, 24, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6), 0 0 12px rgba(249, 115, 22, 0.2)',
                    animation: 'dockTooltipDown 0.18s ease forwards'
                  }}
                >
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Dock;
