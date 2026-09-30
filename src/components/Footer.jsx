import React from 'react';

const Footer = ({ profile, setActivePage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-content">
        <div>
          <p style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
            {profile.nama}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
            &copy; {new Date().getFullYear()} {profile.nama}. Dirancang dengan React.
          </p>
        </div>

        <ul className="footer-nav">
          <li>
            <button className="footer-nav-link" onClick={() => { setActivePage('profile'); scrollToTop(); }}>
              Profil
            </button>
          </li>
          <li>
            <button className="footer-nav-link" onClick={() => { setActivePage('education'); scrollToTop(); }}>
              Pendidikan
            </button>
          </li>
          <li>
            <button className="footer-nav-link" onClick={() => { setActivePage('experience'); scrollToTop(); }}>
              Pengalaman
            </button>
          </li>
          <li>
            <button className="footer-nav-link" onClick={() => { setActivePage('projects'); scrollToTop(); }}>
              Proyek
            </button>
          </li>
          <li>
            <button className="footer-nav-link" onClick={() => { setActivePage('contact'); scrollToTop(); }}>
              Kontak
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
