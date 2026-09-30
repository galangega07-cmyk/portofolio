import React from 'react';
import PageHeader from '../components/PageHeader';

const ProjectsPage = ({ proyek, setActivePage, profile }) => {
  return (
    <div className="page-view container">
      <PageHeader 
        badge="Portofolio Teknis"
        title="Proyek & Karya Implementasi"
        description="Eksplorasi proyek pengembangan sistem Internet of Things (IoT), infrastruktur server cloud VPS, dan aplikasi web informasi Laravel."
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        gap: '24px',
        marginBottom: '36px'
      }}>
        {proyek.map((project) => (
          <div key={project.id} className="card-base" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
            {/* Foto / Screenshot Proyek */}
            {project.image && (
              <div style={{
                width: '100%',
                height: '210px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '20px',
                border: '1px solid var(--border)',
                background: 'var(--bg-subtle)',
                position: 'relative',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img
                  src={project.image}
                  alt={project.judul}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
            )}

            {/* Header Proyek */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '14px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--accent-border)'
                }}>
                  {project.icon === 'iot' ? (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
                    </svg>
                  ) : project.icon === 'gov' ? (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: '0.76rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {project.kategori}
                </span>
              </div>

              <span className="tag-pill tag-accent" style={{ fontWeight: 700, fontSize: '0.74rem' }}>
                {project.status || 'Active Project'}
              </span>
            </div>

            {/* Judul & Subjudul */}
            <h3 style={{
              fontSize: 'clamp(1.25rem, 3.5vw, 1.45rem)',
              fontWeight: 800,
              marginBottom: '4px',
              letterSpacing: '-0.3px',
              color: 'var(--text-main)'
            }}>
              {project.judul}
            </h3>

            {project.subJudul && (
              <h4 style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                marginBottom: '14px'
              }}>
                {project.subJudul}
              </h4>
            )}

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.92rem',
              lineHeight: '1.65',
              marginBottom: '20px'
            }}>
              {project.deskripsi}
            </p>

            {/* Fitur Utama */}
            {project.fitur && (
              <div style={{
                background: 'var(--bg-subtle)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                border: '1px solid var(--border-light)'
              }}>
                <h5 style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px'
                }}>
                  Fitur & Arsitektur Utama:
                </h5>
                <ul style={{ paddingLeft: '16px', color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: '1.55' }}>
                  {project.fitur.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="tag-pill" style={{ fontSize: '0.74rem', padding: '3px 10px' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Callout Card */}
      <div className="card-base" style={{
        background: '#171717',
        color: '#ffffff',
        border: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
      }}>
        <div style={{ maxWidth: '560px' }}>
          <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', fontWeight: 800, marginBottom: '6px', color: '#ffffff' }}>
            Ingin Melihat Repositori & Kode Sumber?
          </h3>
          <p style={{ color: '#a3a3a3', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Kunjungi profil GitHub saya untuk melihat repositori kode terkini, eksperimen, dan proyek open-source lainnya.
          </p>
        </div>

        <a 
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="btn"
          style={{
            backgroundColor: '#ffffff',
            color: '#171717',
            fontWeight: 700,
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <span>Buka GitHub Profile</span>
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Navigation Footer for Page */}
      <div className="btn-group" style={{
        justifyContent: 'space-between',
        marginTop: '36px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border)'
      }}>
        <button className="btn btn-secondary" onClick={() => setActivePage('experience')}>
          ← Pengalaman Kerja
        </button>
        <button className="btn btn-primary" onClick={() => setActivePage('contact')}>
          Hubungi & Kolaborasi →
        </button>
      </div>
    </div>
  );
};

export default ProjectsPage;
