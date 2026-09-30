import React, { useState, useEffect } from 'react';
import { PROFILE, PENDIDIKAN, PENGALAMAN, PROYEK, SKILLS } from './data/portfolioData';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Halaman-halaman terpisah (Modular Pages)
import ProfilePage from './pages/ProfilePage';
import EducationPage from './pages/EducationPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState('profile');

  // Mencegah scroll selama animasi Splash Screen masih aktif
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  // Sinkronisasi dengan URL Hash (jika pengguna membuka link langsung atau back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '');
      if (['profile', 'education', 'experience', 'projects', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };

    // Cek hash awal
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash saat activePage berubah
  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    window.location.hash = `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render halaman sesuai activePage
  const renderActivePage = () => {
    switch (activePage) {
      case 'education':
        return <EducationPage pendidikan={PENDIDIKAN} setActivePage={handlePageChange} />;
      case 'experience':
        return <ExperiencePage pengalaman={PENGALAMAN} setActivePage={handlePageChange} />;
      case 'projects':
        return <ProjectsPage proyek={PROYEK} setActivePage={handlePageChange} profile={PROFILE} />;
      case 'contact':
        return <ContactPage profile={PROFILE} setActivePage={handlePageChange} />;
      case 'profile':
      default:
        return <ProfilePage profile={PROFILE} skills={SKILLS} setActivePage={handlePageChange} />;
    }
  };

  return (
    <>
      {/* 1. Splash Screen Animasi Awal */}
      {isLoading && <SplashScreen finishLoading={() => setIsLoading(false)} />}

      {/* 2. Tata Letak Aplikasi Web Utama */}
      <div 
        className="app-container"
        style={{
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'translateY(24px) scale(0.99)' : 'translateY(0) scale(1)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isLoading ? 'none' : 'auto'
        }}
      >
        {/* Ambient background glows */}
        <div className="ambient-glow-wrapper">
          <div className="ambient-glow-top"></div>
          <div className="ambient-glow-bottom"></div>
        </div>

        {/* Navbar Navigasi Antar Halaman */}
        <Navbar 
          activePage={activePage} 
          setActivePage={handlePageChange} 
          profile={PROFILE} 
        />

        {/* Main Content: Render Halaman Aktif */}
        <main className="main-content">
          {renderActivePage()}
        </main>

        {/* Footer */}
        <Footer 
          profile={PROFILE} 
          setActivePage={handlePageChange} 
        />
      </div>
    </>
  );
}

export default App;