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
      {/* REACTBITS TOP/BOTTOM RESPONSIVE DOCK */}
      {/* ========================================================================= */}
      <Dock
        activeSection={activeSection}
        onNavigate={scrollToSection}
        baseItemSize={36}
        magnification={52}
        distance={105}
      />

      {/* Main Single-Page Content Stream */}
      <main className="main-content">
        <div className="container">

          {/* ===================================================================== */}
          {/* 1. HERO SECTION (With Dither Veil & Typewriter) */}
          {/* ===================================================================== */}
          <section id="hero" className="hero-section">
            {/* Left Hero Text Column */}
            <div className="hero-text-col">
              <div className="hero-stagger-1 hero-eyebrow">
                <span className="hero-eyebrow-line" />
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
                  className="hero-headline"
                  style={{
                    fontSize: 'clamp(1.9rem, 6.2vw, 3.6rem)',
                    fontWeight: 900,
                    lineHeight: 1.15,
                    letterSpacing: '-1px',
                    color: '#ffffff',
                    margin: 0,
                    wordBreak: 'break-word'
                  }}
                />
              </div>

              {/* Typewriter Subtitle */}
              <div className="hero-stagger-3 hero-subtitle-row">
                <span className="hero-subtitle-prefix">
                  Seorang
                </span>
                <span className="typewriter-underline hero-typewriter-box">
                  <span>{currentText}</span>
                  <span className="typewriter-cursor">|</span>
                </span>
              </div>

              {/* Social Icons Bar */}
              <div className="hero-stagger-4 hero-social-bar">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
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
                  aria-label="WhatsApp Direct"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="social-icon-btn"
                  title="Kirim Email"
                  aria-label="Kirim Email"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>

              {/* Bio Pitch */}
              <p className="hero-stagger-5 hero-bio-text">
                Saya membantu bisnis dan institusi mengubah ide menjadi solusi digital & sistem IoT yang andal, efisien, dan berfungsi optimal.
              </p>

              {/* Action Buttons */}
              <div className="hero-stagger-5 hero-btn-group">
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
            <div className="hero-profile-wrapper">
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
                imageHeight="clamp(290px, 44vw, 420px)"
              />
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 2. TENTANG SAYA & HIGHLIGHTS (Scroll Reveal) */}
          {/* ===================================================================== */}
          <section id="about" className="scroll-reveal about-section">
            {/* Section Header */}
            <div className="section-header-block">
              <div className="section-badge-tag">
                <span className="section-badge-line" />
                <span>Profil & Latar Belakang</span>
              </div>
              <h2 className="section-main-heading">
                Tentang Saya
              </h2>
            </div>

            {/* Main Bio Card */}
            <div className="card-base about-bio-card">
              <p className="about-bio-text">
                {PROFILE.bio}
              </p>
              <div className="about-interests-row">
                <span className="about-interests-label">
                  Minat & Fokus:
                </span>
                <div className="about-interests-tags">
                  {PROFILE.interests.map((interest, iIdx) => (
                    <span key={iIdx} className="tag-pill tag-interest">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stat Highlights */}
            <div className="stats-grid">
              {/* Card 1: Pendidikan */}
              <div
                className="card-base stat-card"
                onClick={() => scrollToSection('education')}
              >
                <div className="stat-card-top">
                  <span className="stat-card-label">
                    Pendidikan
                  </span>
                  <span className="stat-card-icon">🎓</span>
                </div>
                <div>
                  <div className="stat-card-value">
                    Universitas Brawijaya
                  </div>
                  <div className="stat-card-sub accent">
                    D3 Teknologi Informasi
                  </div>
                </div>
              </div>

              {/* Card 2: Proyek Live */}
              <div
                className="card-base stat-card"
                onClick={() => scrollToSection('projects')}
              >
                <div className="stat-card-top">
                  <span className="stat-card-label">
                    Proyek Online
                  </span>
                  <span className="status-dot-active" />
                </div>
                <div>
                  <div className="stat-card-value">
                    2 Web Live Online
                  </div>
                  <div className="stat-card-sub">
                    Tatik Catering & SIMIKP ↗
                  </div>
                </div>
              </div>

              {/* Card 3: Fokus Keahlian */}
              <div
                className="card-base stat-card"
              >
                <div className="stat-card-top">
                  <span className="stat-card-label">
                    Keahlian
                  </span>
                  <span className="stat-card-icon">⚡</span>
                </div>
                <div>
                  <div className="stat-card-value">
                    IoT & Web Dev
                  </div>
                  <div className="stat-card-sub">
                    Laravel, VPS & WireGuard
                  </div>
                </div>
              </div>

              {/* Card 4: Domisili */}
              <div
                className="card-base stat-card"
                onClick={() => scrollToSection('contact')}
              >
                <div className="stat-card-top">
                  <span className="stat-card-label">
                    Domisili
                  </span>
                  <span className="stat-card-icon">📍</span>
                </div>
                <div>
                  <div className="stat-card-value">
                    Malang, Jawa Timur
                  </div>
                  <div className="stat-card-sub success">
                    Siap On-Site & Remote
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Clean Tech Badges Row */}
            <div className="card-base tech-stack-card">
              <span className="tech-stack-title">
                Tech Stack
              </span>
              <div className="tech-stack-pills">
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
          <section id="projects" className="scroll-reveal projects-section">
            <div className="projects-header-row">
              <div>
                <div className="section-badge-tag">
                  <span className="section-badge-line" />
                  <span>Portofolio Teknis</span>
                </div>
                <h2 className="section-main-heading">
                  Proyek & Karya Implementasi
                </h2>
                <p className="section-sub-desc">
                  Eksplorasi sistem Internet of Things (IoT), infrastruktur server cloud VPS, dan aplikasi web informasi Laravel.
                </p>
              </div>

              {/* View Switcher: Flex Carousel / Grid */}
              <div className="projects-view-switcher">
                <button
                  onClick={() => setProjectViewMode('flex')}
                  className={`view-switch-btn ${projectViewMode === 'flex' ? 'active' : ''}`}
                >
                  ✨ Flex Carousel
                </button>
                <button
                  onClick={() => setProjectViewMode('grid')}
                  className={`view-switch-btn ${projectViewMode === 'grid' ? 'active' : ''}`}
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
              <div className="projects-grid-view">
                {PROYEK.map((project, pIdx) => (
                  <div key={project.id || pIdx} className="card-base project-grid-card">
                    {project.image && (
                      <div className="project-grid-thumb">
                        <img src={project.image} alt={project.judul} />
                      </div>
                    )}
                    <h3 className="project-grid-title">
                      {project.judul}
                    </h3>
                    {project.subJudul && (
                      <h4 className="project-grid-subtitle">
                        {project.subJudul}
                      </h4>
                    )}
                    <p className="project-grid-desc">
                      {project.deskripsi}
                    </p>
                    <div className="project-grid-footer">
                      {project.demoUrl ? (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                          Buka Proyek Live ↗
                        </a>
                      ) : (
                        <button onClick={() => scrollToSection('contact')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                          Konsultasi Solusi Ini
                        </button>
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
          <section id="experience" className="scroll-reveal experience-section">
            <div className="section-header-block">
              <div className="section-badge-tag">
                <span className="section-badge-line" />
                <span>Perjalanan Karir</span>
              </div>
              <h2 className="section-main-heading">
                Pengalaman Kerja & Magang
              </h2>
            </div>

            <div className="experience-list-wrapper">
              {PENGALAMAN.map((item) => (
                <div key={item.id} className="card-base experience-card">
                  <div className="experience-card-header">
                    <div>
                      <h3 className="experience-position-title">
                        {item.posisi} <span className="experience-company">@ {item.perusahaan}</span>
                      </h3>
                      <span className="experience-meta">
                        {item.kategori} • {item.lokasi}
                      </span>
                    </div>

                    <span className="experience-year-badge">
                      {item.tahun}
                    </span>
                  </div>

                  <p className="experience-summary-text">
                    {item.ringkasan}
                  </p>

                  {/* Duties list */}
                  <ul className="experience-duties-list">
                    {item.tugas.map((t, tIdx) => (
                      <li key={tIdx}>{t}</li>
                    ))}
                  </ul>

                  {/* Skills tags */}
                  <div className="experience-skills-tags">
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
          <section id="education" className="scroll-reveal education-section">
            <div className="section-header-block">
              <div className="section-badge-tag">
                <span className="section-badge-line" />
                <span>Riwayat Pendidikan</span>
              </div>
              <h2 className="section-main-heading">
                Jejak Akademik & Studi
              </h2>
            </div>

            <div className="card-base education-card">
              <div className="education-card-header">
                <div>
                  <h3 className="education-institution-name">
                    {PENDIDIKAN.institusi}
                  </h3>
                  <p className="education-faculty-name">
                    {PENDIDIKAN.fakultas} — {PENDIDIKAN.prodi}
                  </p>
                </div>

                <div className="education-meta-badges">
                  <span className="tag-pill tag-accent" style={{ fontWeight: 700 }}>
                    {PENDIDIKAN.tahun}
                  </span>
                  <span className="education-location-text">
                    {PENDIDIKAN.lokasi}
                  </span>
                </div>
              </div>

              <p className="education-desc-text">
                {PENDIDIKAN.deskripsi}
              </p>

              {/* Focus List */}
              <div className="education-focus-box">
                <h4 className="education-focus-title">
                  Fokus Bidang Keilmuan:
                </h4>
                <div className="education-focus-grid">
                  {PENDIDIKAN.fokusStudi.map((focus, fIdx) => (
                    <div key={fIdx} className="education-focus-item">
                      <span className="education-focus-dot" />
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
          <section id="contact" className="scroll-reveal contact-section">
            <div className="section-header-block">
              <div className="section-badge-tag">
                <span className="section-badge-line" />
                <span>Hubungi Saya</span>
              </div>
              <h2 className="section-main-heading">
                Mari Berkolaborasi & Terhubung
              </h2>
            </div>

            <div className="contact-grid">
              {/* Direct Info Cards */}
              <div className="contact-info-col">
                {/* Email Card */}
                <div className="card-base contact-item-card">
                  <div className="contact-item-left">
                    <div className="contact-item-icon-box email">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div className="contact-item-details">
                      <span className="contact-item-label">Email</span>
                      <p className="contact-item-val email-text">
                        {PROFILE.email}
                      </p>
                    </div>
                  </div>
                  <button onClick={handleCopyEmail} className="btn btn-secondary contact-action-btn">
                    {copiedEmail ? '✓ Copied' : 'Salin'}
                  </button>
                </div>

                {/* WhatsApp Card */}
                <div className="card-base contact-item-card">
                  <div className="contact-item-left">
                    <div className="contact-item-icon-box whatsapp">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="contact-item-details">
                      <span className="contact-item-label">WhatsApp</span>
                      <p className="contact-item-val">
                        +62 821-2002-6900
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/62${PROFILE.phone ? PROFILE.phone.replace(/^0/, '') : '82120026900'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary contact-action-btn"
                  >
                    Chat WA ↗
                  </a>
                </div>

                {/* GitHub Callout */}
                <div className="card-base contact-github-card">
                  <h4 className="contact-github-title">
                    Kunjungi GitHub Profile
                  </h4>
                  <p className="contact-github-desc">
                    Lihat repositori kode sumber dan eksplorasi eksperimen teknologi saya di GitHub.
                  </p>
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary contact-github-btn">
                    Buka Profil GitHub ↗
                  </a>
                </div>
              </div>

              {/* Direct Message Form */}
              <div className="card-base contact-form-card">
                <h3 className="contact-form-title">
                  Kirim Pesan Langsung
                </h3>

                {isMessageSent ? (
                  <div className="contact-success-alert">
                    ✓ Pesan Anda telah disiapkan di aplikasi email!
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="contact-form">
                    <div className="form-group">
                      <label className="form-label">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="nama@perusahaan.com"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Pesan Anda
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tuliskan kebutuhan proyek atau pertanyaan Anda..."
                        className="form-input form-textarea"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary form-submit-btn">
                      <span>Kirim Pesan Sekarang ↗</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="portfolio-footer">
            <span className="footer-copyright">
              © {new Date().getFullYear()} Galang Ega Yudistira. Built with React & ReactBits.
            </span>
            <div className="footer-actions">
              <button
                onClick={() => {
                  setShowIntro(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="footer-replay-btn"
              >
                <span>↻ Putar Ulang Intro</span>
              </button>

              <button
                onClick={() => scrollToSection('hero')}
                className="footer-top-btn"
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