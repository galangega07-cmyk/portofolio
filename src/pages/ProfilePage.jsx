import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import DitherVeil from '../components/DitherVeil';

const ROLES = [
  "IT Student & Web Developer",
  "IoT & Cloud Specialist",
  "Fullstack Laravel Developer",
  "Network & VPS Administrator"
];

const ProfilePage = ({ profile, skills, setActivePage }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = ROLES[textIndex % ROLES.length];
    
    let timer;
    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        // Typing characters
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 85);
      } else {
        // Pause when full text is typed
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        // Deleting characters
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 45);
      } else {
        // Pause when completely cleared, then move to next role
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

  // ReactBits Border Glow Cursor Tracking
  useEffect(() => {
    const handlePointerMove = (e) => {
      const card = e.target.closest('.card-base, .border-glow-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.setProperty('--glow-opacity', '1');
      }
    };

    const handlePointerOut = (e) => {
      const card = e.target.closest('.card-base, .border-glow-card');
      if (card && (!e.relatedTarget || !card.contains(e.relatedTarget))) {
        card.style.setProperty('--glow-opacity', '0');
      }
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <div className="page-view container">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (EXACT MATCH TO REFERENCE SCREENSHOT) */}
      {/* ========================================================================= */}
      <section style={{
        padding: '24px 0 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '40px',
        alignItems: 'center'
      }}>
        {/* LEFT COLUMN: HERO TEXT & ACTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Kicker */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '1px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase'
          }}>
            <span style={{ width: '18px', height: '2px', background: 'var(--accent-primary)', display: 'inline-block' }}></span>
            <span>HALO, SAYA</span>
          </div>

          {/* Main Name Headline */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-1px',
            color: '#ffffff',
            margin: 0
          }}>
            {profile.nama}
          </h1>

          {/* Role / Subtitle with Typewriter Animation */}
          <div style={{ marginTop: '2px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Seorang
            </span>
            <span className="typewriter-underline" style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#ffffff'
            }}>
              <span>{currentText}</span>
              <span className="typewriter-cursor">|</span>
            </span>
          </div>

          {/* Social Media Icons Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '8px 0 4px'
          }}>
            {/* GitHub */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="GitHub Profile"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/62${profile.phone ? profile.phone.replace(/^0/, '') : '82120026900'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="WhatsApp Direct"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href={`mailto:${profile.email}`}
              className="social-icon-btn"
              title="Kirim Email"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>

          {/* Short Bio Paragraph */}
          <p style={{
            fontSize: '0.96rem',
            color: 'var(--text-muted)',
            lineHeight: '1.75',
            maxWidth: '520px'
          }}>
            Saya membantu bisnis dan institusi mengubah ide menjadi solusi digital & sistem IoT yang andal, efisien, dan berfungsi optimal.
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            marginTop: '8px'
          }}>
            <button
              className="btn-hero-primary"
              onClick={() => setActivePage('projects')}
            >
              <span>Lihat Proyek</span>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>

            <button
              className="btn-hero-secondary"
              onClick={() => setActivePage('contact')}
            >
              <span>Kontak Saya</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: FEATURED PORTRAIT CARD WITH PHOTO */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card-base" style={{
            maxWidth: '400px',
            width: '100%',
            padding: '18px',
            borderRadius: '26px',
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(249, 115, 22, 0.15)',
            position: 'relative'
          }}>
            {/* Header inside Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              padding: '0 4px'
            }}>
              <div>
                <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px', margin: 0 }}>
                  Galang Ega Yudistira
                </h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 500 }}>
                  Software & IoT Developer
                </span>
              </div>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981'
              }}></div>
            </div>

            {/* Photo Container with Dither Veil Effect */}
            <div style={{
              width: '100%',
              height: '380px',
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
              background: '#0a0e1a'
            }}>
              <DitherVeil
                src={profile.foto || "/images/profile-galang.jpg"}
                alt={profile.nama}
                cellSize={3}
                radius={75}
                decay={0.03}
                style={{ width: '100%', height: '100%' }}
              >
                {/* Floating Bottom Status Pill */}
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '12px',
                  right: '12px',
                  zIndex: 10,
                  pointerEvents: 'auto',
                  background: 'rgba(10, 15, 28, 0.85)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <img
                        src={profile.foto || "/images/profile-galang.jpg"}
                        alt="Avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
                        @galangega07
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }}></span>
                        Online
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage('contact');
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#090d16'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; e.currentTarget.style.color = '#ffffff'; }}
                  >
                    Contact Me
                  </button>
                </div>
              </DitherVeil>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BENTO GRID HIGHLIGHTS SECTION */}
      {/* ========================================================================= */}
      <section style={{ padding: '10px 0 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {/* Bento 1: Pendidikan */}
          <div
            className="card-base"
            style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
            onClick={() => setActivePage('education')}
          >
            <div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pendidikan
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '3px' }}>
                Universitas Brawijaya
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                D3 Teknologi Informasi
              </div>
            </div>
            <div style={{ marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Lihat Detail Studi →
            </div>
          </div>

          {/* Bento 2: Proyek Live */}
          <div
            className="card-base"
            style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
            onClick={() => setActivePage('projects')}
          >
            <div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--success-bg)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Proyek Online
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '3px' }}>
                2 Web Live Online
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                Tatik Catering & SIMIKP
              </div>
            </div>
            <div style={{ marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Buka Live Demo →
            </div>
          </div>

          {/* Bento 3: Fokus Teknologi */}
          <div
            className="card-base"
            style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.12)',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Fokus Keahlian
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '3px' }}>
                IoT & Web Dev
              </div>
              <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
                Laravel • WireGuard VPN
              </div>
            </div>
            <div style={{ marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Cloud Infrastructure
            </div>
          </div>

          {/* Bento 4: Pengalaman */}
          <div
            className="card-base"
            style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
            onClick={() => setActivePage('experience')}
          >
            <div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pengalaman
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '3px' }}>
                3+ Pengalaman Nyata
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                PLN Icon Plus & Retail
              </div>
            </div>
            <div style={{ marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Lihat Riwayat Kerja →
            </div>
          </div>
        </div>

        {/* Tentang Saya (Bio Lengkap) */}
        <div className="card-base" style={{ padding: '26px', marginBottom: '28px' }}>
          <h3 style={{
            fontSize: '1.08rem',
            fontWeight: 800,
            marginBottom: '12px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Tentang Saya & Latar Belakang
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            lineHeight: '1.85',
            textAlign: 'left'
          }}>
            {profile.bio}
          </p>
        </div>
      </section>

      {/* Skills & Focus Areas Section */}
      <section style={{ padding: '24px 0 36px', borderTop: '1px solid var(--border)' }}>
        <PageHeader 
          badge="Keahlian & Minat"
          title="Fokus Teknologi & Kemampuan"
          description="Kombinasi keahlian teknis komputasi, infrastruktur cloud/IoT, serta kompetensi komunikasi dan pelayanan."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '18px'
        }}>
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="card-base">
              <h4 style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: idx === 0 ? 'var(--accent-primary)' : 'var(--success)'
                }}></span>
                {skillGroup.kategori}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skillGroup.items.map((skill, sIdx) => (
                  <span key={sIdx} className="tag-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access Bento Cards */}
      <section style={{ padding: '16px 0 28px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
          Jelajahi Halaman Lainnya
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '14px'
        }}>
          <div 
            className="card-base" 
            style={{ cursor: 'pointer' }}
            onClick={() => setActivePage('education')}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h4 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)' }}>Pendidikan</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Studi D3 Teknologi Informasi di Universitas Brawijaya & kegiatan kampus.
            </p>
          </div>

          <div 
            className="card-base" 
            style={{ cursor: 'pointer' }}
            onClick={() => setActivePage('experience')}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h4 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)' }}>Pengalaman Kerja</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Riwayat barista di Critasena, kitchen di Costslice, & marketing PLN Icon Plus.
            </p>
          </div>

          <div 
            className="card-base" 
            style={{ cursor: 'pointer' }}
            onClick={() => setActivePage('projects')}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h4 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)' }}>Proyek & IoT</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Sistem Cloud IoT WireGuard & Web Monitoring Laravel real-time.
            </p>
          </div>

          <div 
            className="card-base" 
            style={{ cursor: 'pointer' }}
            onClick={() => setActivePage('contact')}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h4 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)' }}>Hubungi Saya</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Email, WhatsApp, GitHub, dan formulir pesan cepat.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
