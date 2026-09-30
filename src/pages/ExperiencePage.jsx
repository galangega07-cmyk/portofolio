import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

const ExperiencePage = ({ pengalaman, setActivePage }) => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredExp = pengalaman.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'TECH') return item.kategori.includes('Corporate') || item.kategori.includes('Technology');
    if (selectedFilter === 'SERVICE') return item.kategori.includes('Hospitality') || item.kategori.includes('Food');
    return true;
  });

  return (
    <div className="page-view container">
      <PageHeader 
        badge="Pengalaman Profesional"
        title="Pengalaman Kerja & Magang"
        description="Rekam jejak praktis di berbagai bidang industri mulai dari telekomunikasi B2B/B2C hingga industri hospitality & pelayanan pelanggan."
      />

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '28px',
        flexWrap: 'wrap'
      }}>
        <button
          className={`btn ${selectedFilter === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          onClick={() => setSelectedFilter('ALL')}
        >
          Semua ({pengalaman.length})
        </button>
        <button
          className={`btn ${selectedFilter === 'TECH' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          onClick={() => setSelectedFilter('TECH')}
        >
          Tech & Corporate
        </button>
        <button
          className={`btn ${selectedFilter === 'SERVICE' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          onClick={() => setSelectedFilter('SERVICE')}
        >
          Hospitality & Service
        </button>
      </div>

      {/* Experience Timeline */}
      <div className="timeline-list-wrapper">
        {filteredExp.map((exp) => (
          <div key={exp.id} className="timeline-card-item">
            <div className="timeline-card-bullet"></div>
            
            <div className="card-base">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '12px'
              }}>
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    background: 'var(--accent-light)',
                    border: '1px solid var(--accent-border)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: '8px'
                  }}>
                    {exp.kategori}
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '3px' }}>
                    {exp.posisi}
                  </h3>
                  <h4 style={{
                    fontSize: '0.96rem',
                    color: 'var(--accent-primary)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <path d="M9 22v-4h6v4" />
                      <path d="M8 6h.01" />
                      <path d="M16 6h.01" />
                      <path d="M8 10h.01" />
                      <path d="M16 10h.01" />
                      <path d="M8 14h.01" />
                      <path d="M16 14h.01" />
                    </svg>
                    {exp.perusahaan}
                  </h4>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span className="code-inline" style={{ fontWeight: 600, fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {exp.tahun}
                  </span>
                  {exp.lokasi && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {exp.lokasi}
                    </span>
                  )}
                </div>
              </div>

              {exp.ringkasan && (
                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                  fontStyle: 'italic',
                  borderLeft: '3px solid var(--accent-border)',
                  paddingLeft: '12px'
                }}>
                  "{exp.ringkasan}"
                </p>
              )}

              <div style={{ marginBottom: '16px' }}>
                <h5 style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--text-light)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px'
                }}>
                  Tanggung Jawab & Kontribusi:
                </h5>
                <ul style={{
                  paddingLeft: '18px',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  lineHeight: '1.7'
                }}>
                  {exp.tugas.map((tugas, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>
                      {tugas}
                    </li>
                  ))}
                </ul>
              </div>

              {exp.skills && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '6px',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-light)'
                }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-light)', marginRight: '4px' }}>
                    Keahlian:
                  </span>
                  {exp.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="tag-pill" style={{ fontSize: '0.74rem', padding: '3px 10px' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Footer for Page */}
      <div className="btn-group" style={{
        justifyContent: 'space-between',
        marginTop: '36px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border)'
      }}>
        <button className="btn btn-secondary" onClick={() => setActivePage('education')}>
          ← Riwayat Pendidikan
        </button>
        <button className="btn btn-primary" onClick={() => setActivePage('projects')}>
          Lihat Portofolio Proyek →
        </button>
      </div>
    </div>
  );
};

export default ExperiencePage;
