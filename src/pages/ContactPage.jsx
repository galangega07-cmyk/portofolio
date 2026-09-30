import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

const ContactPage = ({ profile, setActivePage }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    // Buka email client dengan pre-filled data
    const subject = encodeURIComponent(`Pesan dari ${formState.name} (Portofolio Web)`);
    const body = encodeURIComponent(`Nama: ${formState.name}\nEmail: ${formState.email}\n\nPesan:\n${formState.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setIsSent(true);
  };

  return (
    <div className="page-view container">
      <PageHeader 
        badge="Hubungi Saya"
        title="Mari Berkolaborasi & Terhubung"
        description="Terbuka untuk diskusi proyek IoT, pengembangan website, peluang magang, atau sekadar bertukar ide dan pengalaman teknologi."
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {/* Left Column: Direct Contact Bento Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Email Card */}
          <div className="card-base" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <div style={{
                width: '44px',
                height: '44px',
                minWidth: '44px',
                borderRadius: '12px',
                background: 'var(--accent-light)',
                border: '1px solid var(--accent-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)'
              }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Email Resmi
                </span>
                <p style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', wordBreak: 'break-all' }}>
                  {profile.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCopy(profile.email, 'email')}
              className="btn btn-secondary"
              style={{ padding: '8px 12px', fontSize: '0.78rem', flexShrink: 0 }}
              title="Salin Email"
            >
              {copiedField === 'email' ? '✓ Tersalin' : 'Salin'}
            </button>
          </div>

          {/* WhatsApp / Phone Card */}
          <div className="card-base" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                minWidth: '44px',
                borderRadius: '12px',
                background: 'var(--success-bg)',
                border: '1px solid var(--success-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--success)'
              }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  WhatsApp / Telepon
                </span>
                <p style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {profile.phone}
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/62${profile.phone.startsWith('0') ? profile.phone.slice(1) : profile.phone}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ padding: '8px 12px', fontSize: '0.78rem', flexShrink: 0 }}
            >
              Chat WA
            </a>
          </div>

          {/* Location Card */}
          <div className="card-base" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              minWidth: '44px',
              borderRadius: '12px',
              background: '#fef3c7',
              border: '1px solid #fde68a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#b45309'
            }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Domisili & Lokasi
              </span>
              <p style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {profile.alamat}
              </p>
            </div>
          </div>

          {/* GitHub Profile Link */}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="card-base"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                minWidth: '44px',
                borderRadius: '12px',
                background: '#f1f5f9',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)'
              }}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  GitHub Repository
                </span>
                <p style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  galangega07-cmyk
                </p>
              </div>
            </div>

            <span style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.85rem' }}>
              Kunjungi ↗
            </span>
          </a>
        </div>

        {/* Right Column: Direct Email Form */}
        <div className="card-base">
          <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            Kirim Pesan Langsung
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Tuliskan pesan Anda di bawah ini untuk langsung terhubung melalui email aplikasi.
          </p>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
                Nama Anda
              </label>
              <input
                type="text"
                required
                placeholder="Masukkan nama lengkap"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-subtle)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
                Alamat Email
              </label>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-subtle)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>
                Pesan atau Topik Diskusi
              </label>
              <textarea
                required
                rows="4"
                placeholder="Tuliskan pesan atau penawaran kolaborasi Anda..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-subtle)',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '4px', padding: '13px' }}
            >
              <span>Kirim ke Email Galang</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {isSent && (
              <p style={{ fontSize: '0.82rem', color: 'var(--success)', fontWeight: 600, textAlign: 'center', marginTop: '4px' }}>
                ✓ Membuka aplikasi email Anda... Terima kasih!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Navigation Footer for Page */}
      <div className="btn-group" style={{
        justifyContent: 'space-between',
        paddingTop: '20px',
        borderTop: '1px solid var(--border)'
      }}>
        <button className="btn btn-secondary" onClick={() => setActivePage('projects')}>
          ← Portofolio Proyek
        </button>
        <button className="btn btn-primary" onClick={() => setActivePage('profile')}>
          Kembali ke Halaman Profil 🏠
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
