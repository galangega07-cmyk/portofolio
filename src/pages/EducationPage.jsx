import React from 'react';
import PageHeader from '../components/PageHeader';

const EducationPage = ({ pendidikan, setActivePage }) => {
  return (
    <div className="page-view container">
      <PageHeader 
        badge="Riwayat Pendidikan"
        title="Jejak Akademik & Studi"
        description="Informasi mengenai latar belakang pendidikan tinggi, fokus bidang keilmuan, dan aktivitas kampus."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* Main Education Card */}
        <div className="card-base">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                minWidth: '48px',
                borderRadius: '14px',
                background: 'var(--accent-light)',
                border: '1px solid var(--accent-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)'
              }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.55rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                  {pendidikan.institusi}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                  {pendidikan.fakultas} — {pendidikan.prodi}
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span className="tag-pill tag-accent" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                {pendidikan.tahun}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {pendidikan.lokasi}
              </span>
            </div>
          </div>

          <p style={{
            fontSize: '0.98rem',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            marginBottom: '24px'
          }}>
            {pendidikan.deskripsi}
          </p>

          {/* Fokus Studi */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px',
            marginBottom: '24px',
            border: '1px solid var(--border-light)'
          }}>
            <h3 style={{
              fontSize: '0.88rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginBottom: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              Fokus Pembelajaran:
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '10px'
            }}>
              {pendidikan.fokusStudi.map((fokus, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--surface)',
                  padding: '9px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)'
                }}>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>✓</span>
                  <span>{fokus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prestasi dan Aktivitas */}
          <div>
            <h3 style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
                <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              Aktivitas & Pencapaian Kampus
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '12px'
            }}>
              {pendidikan.prestasiDanAktivitas.map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 18px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{
                    fontSize: '0.74rem',
                    color: 'var(--accent-primary)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '4px'
                  }}>
                    {item.kategori}
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    {item.judul}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {item.keterangan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer for Page */}
      <div className="btn-group" style={{
        justifyContent: 'space-between',
        marginTop: '36px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border)'
      }}>
        <button className="btn btn-secondary" onClick={() => setActivePage('profile')}>
          ← Kembali ke Profil
        </button>
        <button className="btn btn-primary" onClick={() => setActivePage('experience')}>
          Lihat Pengalaman Kerja →
        </button>
      </div>
    </div>
  );
};

export default EducationPage;
