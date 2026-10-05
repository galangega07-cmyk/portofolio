import React, { useState, useEffect } from 'react';
import { PROFILE, PENDIDIKAN, PENGALAMAN, PROYEK, SKILLS } from './data/portfolioData';

// Interactive Components
import Dock from './components/Dock';
import ProfileCard from './components/ProfileCard';
import FlexCarousel from './components/FlexCarousel';
import AnimateIntro from './components/AnimateIntro';
import { SplittingText, ShimmeringText, MorphingBadge } from './components/AnimateText';

const ROLES = [
  "IT Student & Web Developer",
  "IoT & Cloud Specialist",
  "Fullstack Laravel Developer",
  "Network & VPS Administrator"
];

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [projectViewMode, setProjectViewMode] = useState('flex'); // 'flex' | 'grid'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Typewriter role animation
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = ROLES[textIndex % ROLES.length];
    let timer;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

  // Track active section on scroll using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'experience', 'education', 'contact'];

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.1
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Track scroll progress and show/hide back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
      setShowScrollTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Reveal Observer for silky smooth entry animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  // ReactBits Border Glow Cursor Tracking on all containers and cards
  useEffect(() => {
    const handlePointerMove = (e) => {
      const card = e.target.closest('.card-base, .border-glow-card, .flex-carousel-card');
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
      const card = e.target.closest('.card-base, .border-glow-card, .flex-carousel-card');
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

  // Smooth scroll handler for Dock & Navigation
  const scrollToSection = (id) => {
    const targetId = id === 'profile' ? 'hero' : id;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    const subject = encodeURIComponent(`Pesan dari ${contactForm.name} (Portofolio Web)`);
    const body = encodeURIComponent(`Nama: ${contactForm.name}\nEmail: ${contactForm.email}\n\nPesan:\n${contactForm.message}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setIsMessageSent(true);
  };

  return (
    <div className="app-container" style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Animate UI Entrance Intro Screen */}
      {showIntro && (
        <AnimateIntro onComplete={() => setShowIntro(false)} duration={2100} />
      )}

      {/* Scroll Progress Bar at very top */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Ambient Radial Background Glows */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-glow-top" />
        <div className="ambient-glow-bottom" />
      </div>

      {/* ========================================================================= */}
      {/* REACTBITS TOP COMPACT DOCK (Positioned at Top Center) */}
      {/* ========================================================================= */}
      <Dock
        activeSection={activeSection}
        onNavigate={scrollToSection}
        baseItemSize={36}
        magnification={52}
        distance={105}
      />

      {/* Main Single-Page Content Stream */}
      <main className="main-content" style={{ paddingTop: '80px', paddingBottom: '50px' }}>
        <div className="container">

          {/* ===================================================================== */}
          {/* 1. HERO SECTION (With Dither Veil & Typewriter) */}
          {/* ===================================================================== */}
          <section id="hero" style={{
            padding: '20px 0 54px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Hero Text Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="hero-stagger-1" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '1.2px',
                color: 'var(--accent-primary)',
                textTransform: 'uppercase'
              }}>
                <span style={{ width: '18px', height: '2px', background: 'var(--accent-primary)', display: 'inline-block' }} />
                <span>HALO, SAYA</span>
              </div>

              {/* Animate UI Splitting & Shimmering Name */}
              <div className="hero-stagger-2">
                <SplittingText
                  text={PROFILE.nama}
                  tag="h1"
                  initialDelay={0.2}
                  delay={0.035}
                  shimmer={true}
                  interactive={true}
                  style={{
                    fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
                    fontWeight: 900,
                    lineHeight: 1.12,
                    letterSpacing: '-1px',
                    color: '#ffffff',
                    margin: 0
                  }}
                />
              </div>

              {/* Typewriter Subtitle */}
              <div className="hero-stagger-3" style={{ marginTop: '2px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
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

              {/* Social Icons Bar */}
              <div className="hero-stagger-4" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: '8px 0 4px'
              }}>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="GitHub Profile"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                <a
                  href={`https://wa.me/62${PROFILE.phone ? PROFILE.phone.replace(/^0/, '') : '82120026900'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="WhatsApp Direct"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="social-icon-btn"
                  title="Kirim Email"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>

              {/* Bio Pitch */}
              <p className="hero-stagger-5" style={{
                fontSize: '0.98rem',
                color: 'var(--text-muted)',
                lineHeight: '1.75',
                maxWidth: '520px'
              }}>
                Saya membantu bisnis dan institusi mengubah ide menjadi solusi digital & sistem IoT yang andal, efisien, dan berfungsi optimal.
              </p>

              {/* Action Buttons */}
              <div className="hero-stagger-5" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexWrap: 'wrap',
                marginTop: '8px'
              }}>
                <button
                  className="btn-hero-primary"
                  onClick={() => scrollToSection('projects')}
                >
                  <span>Lihat Proyek</span>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                <button
                  className="btn-hero-secondary"
                  onClick={() => scrollToSection('contact')}
                >
                  <span>Kontak Saya</span>
                </button>
              </div>
            </div>

            {/* Right Hero Portrait Card with ReactBits ProfileCard */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-18px', alignSelf: 'center' }}>
              <ProfileCard
                avatarUrl={PROFILE.foto || "/images/profile-galang.jpg"}
                miniAvatarUrl={PROFILE.foto || "/images/profile-galang.jpg"}
                name={PROFILE.nama}
                title="Software & IoT Developer"
                handle="galangega07"
                status="Online"
                contactText="Contact Me"
                onContactClick={() => scrollToSection('contact')}
                enableTilt={true}
                enableMobileTilt={true}
                behindGlowEnabled={true}
                behindGlowColor="rgba(249, 115, 22, 0.45)"
                imagePosition="center 10%"
                imageHeight="420px"
              />
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 2. TENTANG SAYA & HIGHLIGHTS (Scroll Reveal) */}
          {/* ===================================================================== */}
          <section id="about" className="scroll-reveal" style={{ padding: '36px 0 44px' }}>
            {/* Section Header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                <span style={{ width: '16px', height: '2px', background: 'var(--accent-primary)' }} />
                <span>Profil & Latar Belakang</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', margin: 0 }}>
                Tentang Saya
              </h2>
            </div>

            {/* Main Bio Card */}
            <div className="card-base" style={{ padding: '24px 28px', marginBottom: '20px' }}>
              <p style={{ fontSize: '0.98rem', color: '#e2e8f0', lineHeight: '1.8', margin: '0 0 16px' }}>
                {PROFILE.bio}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '4px' }}>
                  Minat & Fokus:
                </span>
                {PROFILE.interests.map((interest, iIdx) => (
                  <span key={iIdx} className="tag-pill" style={{ fontSize: '0.76rem', padding: '4px 12px' }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stat Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '14px',
              marginBottom: '20px'
            }}>
              {/* Card 1: Pendidikan */}
              <div
                className="card-base"
                onClick={() => scrollToSection('education')}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '125px',
                  background: 'rgba(13, 18, 32, 0.65)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    Pendidikan
                  </span>
                  <span style={{ fontSize: '1rem' }}>🎓</span>
                </div>
                <div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>
                    Universitas Brawijaya
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600, marginTop: '2px' }}>
                    D3 Teknologi Informasi
                  </div>
                </div>
              </div>

              {/* Card 2: Proyek Live */}
              <div
                className="card-base"
                onClick={() => scrollToSection('projects')}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '125px',
                  background: 'rgba(13, 18, 32, 0.65)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    Proyek Online
                  </span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>
                    2 Web Live Online
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>
                    Tatik Catering & SIMIKP ↗
                  </div>
                </div>
              </div>

              {/* Card 3: Fokus Keahlian */}
              <div
                className="card-base"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '125px',
                  background: 'rgba(13, 18, 32, 0.65)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    Keahlian
                  </span>
                  <span style={{ fontSize: '1rem', color: '#f59e0b' }}>⚡</span>
                </div>
                <div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>
                    IoT & Web Dev
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>
                    Laravel, VPS & WireGuard
                  </div>
                </div>
              </div>

              {/* Card 4: Domisili */}
              <div
                className="card-base"
                onClick={() => scrollToSection('contact')}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '125px',
                  background: 'rgba(13, 18, 32, 0.65)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    Domisili
                  </span>
                  <span style={{ fontSize: '1rem' }}>📍</span>
                </div>
                <div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>
                    Malang, Jawa Timur
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, marginTop: '2px' }}>
                    Siap On-Site & Remote
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Clean Tech Badges Row */}
            <div className="card-base" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Tech Stack
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {[
                  "Laravel", "PHP", "React.js", "MySQL", "Ubuntu VPS", "WireGuard", "IoT & Sensor", "Tailwind CSS", "Git"
                ].map((chip, idx) => (
                  <span
                    key={idx}
                    className="tag-pill"
                    style={{ fontSize: '0.76rem', padding: '4px 11px' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 3. FEATURED PROJECTS (Scroll Reveal) */}
          {/* ===================================================================== */}
          <section id="projects" className="scroll-reveal" style={{ padding: '40px 0 60px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '6px'
                }}>
                  <span style={{ width: '16px', height: '2px', background: 'var(--accent-primary)' }} />
                  <span>Portofolio Teknis</span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', margin: 0 }}>
                  Proyek & Karya Implementasi
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginTop: '6px', maxWidth: '600px' }}>
                  Eksplorasi sistem Internet of Things (IoT), infrastruktur server cloud VPS, dan aplikasi web informasi Laravel.
                </p>
              </div>

              {/* View Switcher: Flex Carousel / Grid */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'var(--bg-subtle)',
                padding: '4px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border)'
              }}>
                <button
                  onClick={() => setProjectViewMode('flex')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: projectViewMode === 'flex' ? 'var(--accent-primary)' : 'transparent',
                    color: projectViewMode === 'flex' ? '#090d16' : 'var(--text-muted)'
                  }}
                >
                  ✨ Flex Carousel
                </button>
                <button
                  onClick={() => setProjectViewMode('grid')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: projectViewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
                    color: projectViewMode === 'grid' ? '#090d16' : 'var(--text-muted)'
                  }}
                >
                  ⊞ Grid View
                </button>
              </div>
            </div>

            {/* Render Flex Carousel or Grid */}
            {projectViewMode === 'flex' ? (
              <FlexCarousel
                items={PROYEK}
                setActivePage={scrollToSection}
                autoPlay={false}
              />
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '24px'
              }}>
                {PROYEK.map((project, pIdx) => (
                  <div key={project.id || pIdx} className="card-base" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
                    {project.image && (
                      <div style={{ width: '100%', height: '210px', borderRadius: '16px', overflow: 'hidden', marginBottom: '18px', background: '#090d16' }}>
                        <img src={project.image} alt={project.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                      {project.judul}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
                      {project.deskripsi}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                          Buka Proyek Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ===================================================================== */}
          {/* 4. EXPERIENCE & CAREER TIMELINE (Scroll Reveal) */}
          {/* ===================================================================== */}
          <section id="experience" className="scroll-reveal" style={{ padding: '40px 0 60px' }}>
            <div style={{ marginBottom: '28px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                <span style={{ width: '16px', height: '2px', background: 'var(--accent-primary)' }} />
                <span>Perjalanan Karir</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', margin: 0 }}>
                Pengalaman Kerja & Magang
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {PENGALAMAN.map((item) => (
                <div key={item.id} className="card-base" style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                        {item.posisi} <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>@ {item.perusahaan}</span>
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 600 }}>
                        {item.kategori} • {item.lokasi}
                      </span>
                    </div>

                    <span style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      color: '#e2e8f0'
                    }}>
                      {item.tahun}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                    {item.ringkasan}
                  </p>

                  {/* Duties list */}
                  <ul style={{ paddingLeft: '18px', color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: '1.6', marginBottom: '16px' }}>
                    {item.tugas.map((t, tIdx) => (
                      <li key={tIdx} style={{ marginBottom: '4px' }}>{t}</li>
                    ))}
                  </ul>

                  {/* Skills tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.skills.map((s, sIdx) => (
                      <span key={sIdx} className="tag-pill" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 5. ACADEMIC & EDUCATION (Scroll Reveal) */}
          {/* ===================================================================== */}
          <section id="education" className="scroll-reveal" style={{ padding: '40px 0 60px' }}>
            <div style={{ marginBottom: '28px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                <span style={{ width: '16px', height: '2px', background: 'var(--accent-primary)' }} />
                <span>Riwayat Pendidikan</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', margin: 0 }}>
                Jejak Akademik & Studi
              </h2>
            </div>

            <div className="card-base" style={{ padding: '26px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '14px',
                marginBottom: '18px'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {PENDIDIKAN.institusi}
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--accent-primary)', fontWeight: 700, marginTop: '2px' }}>
                    {PENDIDIKAN.fakultas} — {PENDIDIKAN.prodi}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="tag-pill tag-accent" style={{ fontWeight: 700 }}>
                    {PENDIDIKAN.tahun}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600 }}>
                    {PENDIDIKAN.lokasi}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: '1.75', marginBottom: '20px' }}>
                {PENDIDIKAN.deskripsi}
              </p>

              {/* Focus List */}
              <div style={{ background: 'var(--bg-subtle)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  Fokus Bidang Keilmuan:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '8px' }}>
                  {PENDIDIKAN.fokusStudi.map((focus, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                      <span>{focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 6. CONTACT & COLLABORATION (Scroll Reveal) */}
          {/* ===================================================================== */}
          <section id="contact" className="scroll-reveal" style={{ padding: '40px 0 40px' }}>
            <div style={{ marginBottom: '28px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                <span style={{ width: '16px', height: '2px', background: 'var(--accent-primary)' }} />
                <span>Hubungi Saya</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', margin: 0 }}>
                Mari Berkolaborasi & Terhubung
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '24px'
            }}>
              {/* Direct Info Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Email Card */}
                <div className="card-base" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'var(--accent-light)',
                      border: '1px solid var(--accent-border)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Email</span>
                      <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', margin: 0, wordBreak: 'break-all' }}>
                        {PROFILE.email}
                      </p>
                    </div>
                  </div>
                  <button onClick={handleCopyEmail} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.76rem' }}>
                    {copiedEmail ? '✓ Copied' : 'Salin'}
                  </button>
                </div>

                {/* WhatsApp Card */}
                <div className="card-base" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'var(--success-bg)',
                      border: '1px solid var(--success-border)',
                      color: 'var(--success)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>WhatsApp</span>
                      <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                        +62 821-2002-6900
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/62${PROFILE.phone ? PROFILE.phone.replace(/^0/, '') : '82120026900'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ padding: '6px 12px', fontSize: '0.76rem', textDecoration: 'none' }}
                  >
                    Chat WA ↗
                  </a>
                </div>

                {/* GitHub Callout */}
                <div className="card-base" style={{ padding: '20px', background: 'rgba(15, 23, 42, 0.7)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                    Kunjungi GitHub Profile
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.55', marginBottom: '14px' }}>
                    Lihat repositori kode sumber dan eksplorasi eksperimen teknologi saya di GitHub.
                  </p>
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    Buka Profil GitHub ↗
                  </a>
                </div>
              </div>

              {/* Direct Message Form */}
              <div className="card-base" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                  Kirim Pesan Langsung
                </h3>

                {isMessageSent ? (
                  <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#34d399',
                    fontSize: '0.88rem',
                    textAlign: 'center'
                  }}>
                    ✓ Pesan Anda telah disiapkan di aplikasi email!
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '4px' }}>
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '4px' }}>
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="nama@perusahaan.com"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '4px' }}>
                        Pesan Anda
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tuliskan kebutuhan proyek atau pertanyaan Anda..."
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}>
                      <span>Kirim Pesan Sekarang ↗</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{
            padding: '30px 0 10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
              © {new Date().getFullYear()} Galang Ega Yudistira. Built with React & ReactBits.
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setShowIntro(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: 'rgba(249, 115, 22, 0.12)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>↻ Putar Ulang Intro</span>
              </button>

              <button
                onClick={() => scrollToSection('hero')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Kembali ke Atas ↑
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* Floating Back to Top Action */}
      <button
        onClick={() => scrollToSection('hero')}
        className={`scroll-top-btn ${showScrollTop ? 'is-active' : ''}`}
        title="Kembali ke Atas"
        aria-label="Scroll to top"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default App;