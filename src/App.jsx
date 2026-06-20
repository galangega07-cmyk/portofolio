import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen'; // <--- Memanggil komponen animasi yang dipisah

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Mencegah scroll selama animasi layar masih berjalan
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  // ==========================================
  // DATA PORTOFOLIO RESMI (GALANG EGA YUDISTIRA)
  // ==========================================
  const PROFILE = {
    nama: "Galang Ega Yudistira",
    peran: "IT Student & Developer",
    alamat: "Malang, Indonesia",
    phone: "082120026900",
    email: "galangega07@gmail.com",
    github: "https://github.com/galangega07-cmyk",
    bio: "Mahasiswa Program Studi Teknologi Informasi Fakultas Vokasi Universitas Brawijaya yang memiliki pengalaman di bidang pemasaran, pelayanan pelanggan, dan industri kopi. Memiliki kemampuan bekerja dalam tim, komunikasi yang baik, serta mampu beradaptasi dengan lingkungan kerja yang dinamis. Aktif dalam kegiatan olahraga basket dan memiliki prestasi di tingkat program studi maupun universitas. Tertarik pada bidang teknologi informasi, pengembangan aplikasi, cloud computing, dan Internet of Things (IoT)."
  };

  const PENDIDIKAN = {
    tahun: "2024 – Sekarang",
    institusi: "Universitas Brawijaya",
    fakultas: "Fakultas Vokasi",
    prodi: "Program Studi Teknologi Informasi"
  };

  const PENGALAMAN = [
    {
      id: 1,
      tahun: "Juli 2025 – Juli 2026",
      perusahaan: "Critasena Cafe",
      posisi: "Barista",
      tugas: [
        "Menyiapkan dan menyajikan berbagai jenis minuman kopi dan non-kopi sesuai standar cafe.",
        "Menguasai dasar-dasar Latte Art seperti heart dan tulip.",
        "Menguasai dasar-dasar Manual Brew menggunakan metode seduh manual.",
        "Menjaga kualitas rasa dan konsistensi minuman yang disajikan.",
        "Memberikan pelayanan yang ramah dan profesional kepada pelanggan.",
        "Bekerja sama dengan tim untuk menjaga kelancaran operasional cafe."
      ]
    },
    {
      id: 2,
      tahun: "Des. 2024 – April 2025",
      perusahaan: "Costslice",
      posisi: "Kitchen Staff & Server",
      tugas: [
        "Berperan sebagai Kitchen Staff selama 1 bulan dan Server selama 3 bulan.",
        "Melayani pelanggan dengan baik dan menjaga kualitas pelayanan.",
        "Bekerja sama dengan tim operasional untuk memastikan kelancaran layanan."
      ]
    },
    {
      id: 3,
      tahun: "Juli 2023 – Des. 2023",
      perusahaan: "PT PLN Icon Plus",
      posisi: "Marketing Intern",
      tugas: [
        "Membantu kegiatan pemasaran produk dan layanan perusahaan.",
        "Berinteraksi dengan pelanggan dan membantu kebutuhan administrasi pemasaran.",
        "Mendukung kegiatan promosi dan pengembangan relasi pelanggan."
      ]
    }
  ];

  const PROYEK = [
    {
      id: 1,
      judul: "IoT & Cloud Monitoring",
      deskripsi: "Menghubungkan perangkat IoT dengan layanan cloud menggunakan VPS dan WireGuard. Membangun dashboard monitoring yang dapat diakses melalui jaringan publik serta mengimplementasikan pertukaran data.",
      tech: ["IoT", "Cloud Server", "VPS", "WireGuard"]
    },
    {
      id: 2,
      judul: "Web Monitoring Laravel",
      deskripsi: "Mengembangkan aplikasi web menggunakan Laravel untuk mengelola data dan menampilkan informasi monitoring secara real-time, serta melakukan proses deployment aplikasi ke server cloud.",
      tech: ["Laravel", "PHP", "Cloud", "Real-time"]
    }
  ];

  return (
    <>
      {/* 1. RENDER SPLASH SCREEN JIKA MASIH LOADING */}
      {isLoading && <SplashScreen finishLoading={() => setIsLoading(false)} />}

      {/* 2. RENDER KONTEN WEB UTAMA */}
      <div style={{
        opacity: isLoading ? 0 : 1,
        transform: isLoading ? 'translateY(30px) scale(0.98)' : 'translateY(0) scale(1)',
        transition: 'opacity 1s cubic-bezier(0.76, 0, 0.24, 1), transform 1s cubic-bezier(0.76, 0, 0.24, 1)',
        pointerEvents: isLoading ? 'none' : 'auto'
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

          :root {
            --bg-color: #fafafa;
            --surface: #ffffff;
            --text-main: #171717;
            --text-muted: #525252;
            --text-light: #a3a3a3;
            --accent-1: #4f46e5;
            --accent-2: #7c3aed;
            --border: #f0f0f0;
            --border-hover: #e5e5e5;
          }
          
          * { box-sizing: border-box; scroll-behavior: smooth; margin: 0; padding: 0; }
          body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--bg-color); color: var(--text-main); line-height: 1.7; overflow-x: hidden; }

          .container { max-width: 900px; margin: 0 auto; padding: 0 24px; }
          .section { padding: 100px 0; }

          .ambient-glow { position: absolute; top: -150px; left: 50%; transform: translateX(-50%); width: 80vw; height: 600px; background: radial-gradient(ellipse at top, rgba(79, 70, 229, 0.08), transparent 60%); z-index: -1; pointer-events: none; }

          .navbar { position: fixed; top: 0; left: 0; right: 0; padding: 24px 0; background: rgba(250, 250, 250, 0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(240, 240, 240, 0.8); z-index: 1000; }
          .nav-content { display: flex; justify-content: flex-end; gap: 36px; }
          .nav-link { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.3px; transition: color 0.3s ease; }
          .nav-link:hover { color: var(--text-main); }

          .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding-top: 60px; position: relative; }
          .status-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 100px; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 32px; width: max-content; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
          .status-dot { width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); animation: pulse 2s infinite; }
          .hero-title { font-size: clamp(3.2rem, 8vw, 5.5rem); font-weight: 800; line-height: 1.05; margin: 0 0 16px 0; letter-spacing: -2.5px; color: var(--text-main); }
          .hero-subtitle { font-size: clamp(1.2rem, 3vw, 2rem); font-weight: 500; background: linear-gradient(135deg, var(--accent-1), var(--accent-2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 24px 0; letter-spacing: -0.5px; }
          .hero-desc { font-size: 1.1rem; color: var(--text-muted); max-width: 650px; margin-bottom: 48px; line-height: 1.8; text-align: justify; }

          .btn-group { display: flex; gap: 16px; flex-wrap: wrap; }
          .btn { padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 0.95rem; text-decoration: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: inline-flex; align-items: center; gap: 10px; }
          .btn-primary { background-color: var(--text-main); color: white; }
          .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 25px -5px rgba(23, 23, 23, 0.3); }
          .btn-primary:hover .arrow-icon { transform: translateX(4px); }
          .btn-secondary { background-color: var(--surface); color: var(--text-main); border: 1px solid var(--border); }
          .btn-secondary:hover { background-color: var(--bg-color); border-color: var(--text-muted); transform: translateY(-3px); }
          .arrow-icon { transition: transform 0.3s ease; }

          .section-header { margin-bottom: 60px; }
          .section-num { font-size: 1rem; font-weight: 700; color: var(--text-light); margin-bottom: 8px; display: block; letter-spacing: 2px; }
          .section-title { font-size: 2.2rem; font-weight: 800; letter-spacing: -1px; color: var(--text-main); }

          .timeline-wrapper { border-left: 2px solid var(--border); padding-left: 40px; margin-left: 10px; }
          .timeline-item { position: relative; margin-bottom: 48px; }
          .timeline-item:last-child { margin-bottom: 0; }
          .timeline-dot { position: absolute; left: -47px; top: 6px; width: 12px; height: 12px; border-radius: 50%; background: var(--surface); border: 2px solid var(--accent-1); box-shadow: 0 0 0 4px var(--bg-color); }
          .timeline-date { font-family: monospace; font-size: 0.9rem; color: var(--text-light); margin-bottom: 8px; letter-spacing: 0.5px; }
          .timeline-content { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 32px; transition: all 0.4s ease; }
          .timeline-content:hover { border-color: var(--border-hover); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.04); transform: translateY(-2px); }
          .timeline-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 4px; }
          .timeline-subtitle { font-size: 1rem; color: var(--accent-1); font-weight: 600; margin-bottom: 16px; }
          .timeline-list { padding-left: 18px; color: var(--text-muted); font-size: 0.95rem; }
          .timeline-list li { margin-bottom: 8px; }

          .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; }
          .project-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 40px; height: 100%; display: flex; flex-direction: column; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
          .project-card:hover { border-color: rgba(79, 70, 229, 0.3); box-shadow: 0 20px 40px -10px rgba(79, 70, 229, 0.08); transform: translateY(-5px); }
          .project-icon { width: 48px; height: 48px; background: #f5f3ff; color: var(--accent-1); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
          .project-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.5px; }
          .project-desc { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 32px; flex-grow: 1; }
          .tech-stack { display: flex; flex-wrap: wrap; gap: 10px; }
          .tech-tag { font-size: 0.8rem; font-weight: 600; color: var(--text-main); background: var(--bg-color); border: 1px solid var(--border); padding: 6px 14px; border-radius: 100px; }

          .bento-contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; }
          .bento-main-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 40px; display: flex; flex-direction: column; justify-content: center; transition: all 0.4s ease; }
          .bento-main-card:hover { border-color: rgba(79, 70, 229, 0.3); box-shadow: 0 20px 40px -10px rgba(79, 70, 229, 0.08); }
          .bento-main-card h4 { font-size: 2rem; font-weight: 800; margin-bottom: 16px; letter-spacing: -1px; }
          .bento-main-card p { color: var(--text-muted); font-size: 1.05rem; margin-bottom: 32px; }
          .bento-details { display: flex; flex-direction: column; gap: 16px; }
          .bento-item { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 24px; display: flex; align-items: center; gap: 20px; transition: all 0.3s ease; text-decoration: none; color: inherit; }
          .bento-item:hover { transform: translateX(-5px); border-color: var(--border-hover); background: var(--bg-color); }
          .bento-icon-wrapper { width: 48px; height: 48px; background: #f5f3ff; color: var(--accent-1); border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .bento-text h5 { font-size: 0.8rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
          .bento-text p { font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin: 0; word-break: break-all; }

          .footer { text-align: center; padding: 40px 0 60px 0; color: var(--text-light); font-size: 0.9rem; font-weight: 500; }
          
          @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
          
          @media (max-width: 768px) {
            .nav-content { justify-content: center; gap: 20px; }
            .hero-title { font-size: 3rem; }
            .timeline-wrapper { padding-left: 24px; margin-left: 8px; }
            .timeline-dot { left: -31px; }
            .timeline-content { padding: 24px; }
            .bento-contact-grid { grid-template-columns: 1fr; }
            .btn-group { justify-content: center; width: 100%; }
            .btn { width: 100%; justify-content: center; }
          }
        `}</style>

        <div className="ambient-glow"></div>

        <nav className="navbar">
          <div className="container nav-content">
            <a href="#about" className="nav-link">Tentang</a>
            <a href="#experience" className="nav-link">Pengalaman</a>
            <a href="#projects" className="nav-link">Proyek</a>
            <a href="#contact" className="nav-link">Kontak</a>
          </div>
        </nav>

        <section id="about" className="container hero">
          <div className="status-badge">
            <span className="status-dot"></span>
            Tersedia untuk peluang baru
          </div>
          <h1 className="hero-title">{PROFILE.nama}</h1>
          <h2 className="hero-subtitle">{PROFILE.peran}</h2>
          <p className="hero-desc">{PROFILE.bio}</p>
          <div className="btn-group">
            <a href="#projects" className="btn btn-primary">
              Lihat Proyek
              <svg className="arrow-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">
              Hubungi Saya
            </a>
          </div>
        </section>

        <section id="education" className="container section">
          <div className="section-header">
            <span className="section-num">01.</span>
            <h3 className="section-title">Riwayat Pendidikan</h3>
          </div>
          
          <div className="timeline-wrapper">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">{PENDIDIKAN.tahun}</div>
              <div className="timeline-content">
                <h4 className="timeline-title">{PENDIDIKAN.institusi}</h4>
                <p className="timeline-subtitle">{PENDIDIKAN.fakultas}</p>
                <p style={{ color: "var(--text-muted)", margin: 0 }}>{PENDIDIKAN.prodi}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="container section">
          <div className="section-header">
            <span className="section-num">02.</span>
            <h3 className="section-title">Pengalaman Kerja</h3>
          </div>
          
          <div className="timeline-wrapper">
            {PENGALAMAN.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">{exp.tahun}</div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{exp.posisi}</h4>
                  <p className="timeline-subtitle">@ {exp.perusahaan}</p>
                  <ul className="timeline-list">
                    {exp.tugas.map((tugas, index) => (
                      <li key={index}>{tugas}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="container section">
          <div className="section-header">
            <span className="section-num">03.</span>
            <h3 className="section-title">Proyek & Aktivitas</h3>
          </div>
          
          <div className="project-grid">
            {PROYEK.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <h4 className="project-title">{project.judul}</h4>
                <p className="project-desc">{project.deskripsi}</p>
                <div className="tech-stack">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="container section">
          <div className="section-header">
            <span className="section-num">04.</span>
            <h3 className="section-title">Mari Berkolaborasi</h3>
          </div>
          
          <div className="bento-contact-grid">
            <div className="bento-main-card">
              <h4>Punya ide menarik?</h4>
              <p>Saya selalu terbuka untuk diskusi teknologi, kolaborasi proyek IoT/Cloud, atau sekadar bertukar pikiran. Silakan hubungi saya melalui jalur komunikasi di samping.</p>
              <div className="btn-group" style={{ marginTop: 'auto' }}>
                <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
                  Kirim Email Cepat
                </a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  GitHub Profile
                </a>
              </div>
            </div>

            <div className="bento-details">
              <div className="bento-item">
                <div className="bento-icon-wrapper">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div className="bento-text">
                  <h5>Lokasi</h5>
                  <p>{PROFILE.alamat}</p>
                </div>
              </div>

              <a href={`mailto:${PROFILE.email}`} className="bento-item">
                <div className="bento-icon-wrapper">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="bento-text">
                  <h5>Email</h5>
                  <p style={{fontSize: "0.95rem"}}>{PROFILE.email}</p>
                </div>
              </a>

              <a href={`tel:${PROFILE.phone}`} className="bento-item">
                <div className="bento-icon-wrapper">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div className="bento-text">
                  <h5>Telepon / WA</h5>
                  <p>{PROFILE.phone}</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <footer className="footer container">
          <p>&copy; {new Date().getFullYear()} {PROFILE.nama}. Dirancang dengan React & CSS Modern.</p>
        </footer>
      </div>
    </>
  );
}

export default App;