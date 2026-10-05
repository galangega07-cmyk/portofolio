import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import FlexCarousel from '../components/FlexCarousel';

const ProjectsPage = ({ proyek, setActivePage, profile }) => {
  const [viewMode, setViewMode] = useState('flex'); // 'flex' | 'grid'

  return (
    <div className="page-view container">
      {/* Top Header with View Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '10px'
      }}>
        <div style={{ flex: '1 1 320px' }}>
          <PageHeader 
            badge="Portofolio Teknis"
            title="Proyek & Karya Implementasi"
            description="Eksplorasi proyek pengembangan sistem Internet of Things (IoT), infrastruktur server cloud VPS, dan aplikasi web informasi Laravel."
          />
        </div>

        {/* View Mode Switcher Buttons */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--bg-subtle)',
          padding: '5px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          marginTop: '12px'
        }}>
          <button
            onClick={() => setViewMode('flex')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              background: viewMode === 'flex' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'flex' ? '#090d16' : 'var(--text-muted)'
            }}
          >
            <span>✨ Flex Carousel</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              background: viewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'grid' ? '#090d16' : 'var(--text-muted)'
            }}
          >
            <span>⊞ Grid View</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. FLEX CAROUSEL MODE (Inspired by ReactBits Flex Carousel) */}
      {/* ========================================================================= */}
      {viewMode === 'flex' && (
        <div style={{ marginTop: '10px' }}>
          <FlexCarousel
            items={proyek}
            setActivePage={setActivePage}
            autoPlay={false}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GRID VIEW MODE (Traditional Card Grid) */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '24px',
          marginBottom: '36px',
          marginTop: '10px'
        }}>
          {proyek.map((project, idx) => (
            <div key={project.id || idx} className="card-base" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
              {/* Foto / Screenshot Proyek */}
              {project.image && (
                project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%',
                      height: '210px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      marginBottom: '20px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-subtle)',
                      position: 'relative',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'block',
                      cursor: 'pointer'
                    }}
                  >
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
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(23, 23, 23, 0.82)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                      <span>Live Demo ↗</span>
                    </div>
                  </a>
                ) : (
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
                )
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

                <span className={`tag-pill ${project.demoUrl ? 'tag-accent' : ''}`} style={{ fontWeight: 700, fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  {project.demoUrl && (
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                  )}
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
                    {project.fitur.map((item, fIdx) => (
                      <li key={fIdx} style={{ marginBottom: '4px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {project.tech.map((tech, tIdx) => (
                    <span key={tIdx} className="tag-pill" style={{ fontSize: '0.74rem', padding: '3px 10px' }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button: Buka Proyek */}
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px 18px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <span>Buka & Lihat Proyek Live</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                      <line x1="6" y1="6" x2="6.01" y2="6" />
                      <line x1="6" y1="18" x2="6.01" y2="18" />
                    </svg>
                    <span>Infrastruktur IoT & Server VPS</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GitHub Callout Card */}
      <div className="card-base" style={{
        background: 'rgba(15, 23, 42, 0.8)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        marginTop: '20px'
      }}>
        <div style={{ maxWidth: '560px' }}>
          <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', fontWeight: 800, marginBottom: '6px', color: '#ffffff' }}>
            Ingin Melihat Repositori & Kode Sumber?
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Kunjungi profil GitHub saya untuk melihat repositori kode terkini, eksperimen, dan proyek open-source lainnya.
          </p>
        </div>

        <a 
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
          style={{
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
