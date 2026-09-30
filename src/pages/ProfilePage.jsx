import React from 'react';
import PageHeader from '../components/PageHeader';

const ProfilePage = ({ profile, skills, setActivePage }) => {
  return (
    <div className="page-view container">
      {/* Hero Section */}
      <section style={{ padding: '10px 0 36px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          marginBottom: '22px',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: '100%'
        }}>
          <span className="status-dot-active"></span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {profile.status || "Tersedia untuk peluang baru"}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-1.5px',
          color: 'var(--text-main)',
          marginBottom: '12px'
        }}>
          {profile.nama}
        </h1>

        <h2 style={{
          fontSize: 'clamp(1.15rem, 3.5vw, 1.85rem)',
          fontWeight: 600,
          background: 'var(--accent-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '24px',
          letterSpacing: '-0.3px'
        }}>
          {profile.peran}
        </h2>

        <div className="card-base" style={{ marginBottom: '28px' }}>
          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            marginBottom: '12px',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Tentang Saya
          </h3>
          <p style={{
            fontSize: '0.98rem',
            color: 'var(--text-muted)',
            lineHeight: 1.85,
            textAlign: 'left'
          }}>
            {profile.bio}
          </p>
        </div>

        {/* Quick Stats / Highlights */}
        {profile.highlights && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: '14px',
            marginBottom: '32px'
          }}>
            {profile.highlights.map((item, idx) => (
              <div 
                key={idx} 
                className="card-base"
                style={{ padding: '18px 20px' }}
              >
                <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2px' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="btn-group">
          <button 
            className="btn btn-primary"
            onClick={() => setActivePage('projects')}
          >
            <span>Lihat Portofolio Proyek</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => setActivePage('education')}
          >
            <span>Riwayat Pendidikan</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => setActivePage('experience')}
          >
            <span>Pengalaman Kerja</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => setActivePage('contact')}
          >
            <span>Hubungi Saya</span>
          </button>
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
