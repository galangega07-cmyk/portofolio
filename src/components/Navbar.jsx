import React, { useState } from 'react';

const navItems = [
  { 
    id: 'profile', 
    label: 'Profil', 
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  { 
    id: 'education', 
    label: 'Pendidikan', 
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  },
  { 
    id: 'experience', 
    label: 'Pengalaman', 
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  { 
    id: 'projects', 
    label: 'Proyek', 
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  { 
    id: 'contact', 
    label: 'Kontak', 
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }
];

const Navbar = ({ activePage, setActivePage, profile }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="container nav-wrapper">
        <button 
          className="nav-brand" 
          onClick={() => handleNavClick('profile')}
          title="Ke Halaman Profil"
        >
          <div className="brand-avatar">
            {profile.nama.slice(0, 1)}
          </div>
          <div className="brand-text">
            <span className="brand-name">{profile.nama}</span>
            <span className="brand-title">{profile.peran}</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle Button (Hamburger) */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Menu navigasi"
        >
          {isMobileOpen ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="mobile-menu-drawer">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
