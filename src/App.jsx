import React from 'react';

function App() {
  // ==========================================
  // 1. DATA PORTOFOLIO RESMI (GALANG EGA YUDISTIRA)
  // ==========================================
  const PROFILE = {
    nama: "Galang Ega Yudistira",
    peran: "Teknologi Informasi Student & Developer",
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
      tahun: "10 Juli 2025 – Juli 2026",
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
      tahun: "Desember 2024 – April 2025",
      perusahaan: "Costslice",
      posisi: "Kitchen Staff & Server",
      tugas: [
        "Kitchen Staff (1 bulan) & Server (3 bulan).",
        "Melayani pelanggan dengan baik dan menjaga kualitas pelayanan.",
        "Bekerja sama dengan tim operasional untuk memastikan kelancaran layanan."
      ]
    },
    {
      id: 3,
      tahun: "Juli 2023 – Desember 2023",
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
      judul: "Implementasi IoT dan Cloud Monitoring",
      deskripsi: "Menghubungkan perangkat IoT dengan layanan cloud menggunakan VPS dan WireGuard. Membangun dashboard monitoring yang dapat diakses melalui jaringan publik serta mengimplementasikan pertukaran data antara perangkat IoT dan cloud server.",
      tech: ["IoT", "Cloud Server", "VPS", "WireGuard"]
    },
    {
      id: 2,
      judul: "Website Monitoring Berbasis Laravel",
      deskripsi: "Mengembangkan aplikasi web menggunakan Laravel untuk mengelola data dan menampilkan informasi monitoring secara real-time, serta melakukan proses deployment aplikasi ke server cloud.",
      tech: ["Laravel", "PHP", "Cloud Deployment", "Real-time Data"]
    }
  ];

  return (
    <div style={styles.wrapper}>
      {/* HEADER / NAVBAR (Logo Inisial GEY Sudah Dihilangkan) */}
      <nav style={styles.navbar}>
        <div style={styles.navLinks}>
          <a href="#about" style={styles.navLink}>Tentang</a>
          <a href="#education" style={styles.navLink}>Pendidikan</a>
          <a href="#experience" style={styles.navLink}>Pengalaman</a>
          <a href="#projects" style={styles.navLink}>Proyek</a>
          <a href="#contact" style={styles.navLink}>Kontak</a>
        </div>
      </nav>

      {/* HERO / TENTANG SAYA */}
      <section id="about" style={styles.heroSection}>
        <p style={styles.heroGreeting}>Selamat Datang, Saya</p>
        <h1 style={styles.heroName}>{PROFILE.nama}</h1>
        <h2 style={styles.heroRole}>{PROFILE.peran}</h2>
        <p style={styles.heroBio}>{PROFILE.bio}</p>
        <div style={styles.heroActions}>
          <a href="#projects" style={styles.btnPrimary}>Lihat Proyek</a>
          <a href="#experience" style={styles.btnSecondary}>Riwayat Kerja</a>
        </div>
      </section>

      {/* PENDIDIKAN SECTION */}
      <section id="education" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionNumber}>01.</span>
          <h3 style={styles.sectionTitle}>Pendidikan</h3>
        </div>
        <div style={styles.educationCard}>
          <div style={styles.timeLine}>{PENDIDIKAN.tahun}</div>
          <div>
            <h4 style={styles.eduInstitution}>{PENDIDIKAN.institusi}</h4>
            <p style={styles.eduDetail}>{PENDIDIKAN.fakultas} &bull; {PENDIDIKAN.prodi}</p>
          </div>
        </div>
      </section>

      {/* PENGALAMAN SECTION */}
      <section id="experience" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionNumber}>02.</span>
          <h3 style={styles.sectionTitle}>Pengalaman Kerja</h3>
        </div>
        <div style={styles.timelineContainer}>
          {PENGALAMAN.map((exp) => (
            <div key={exp.id} style={styles.experienceCard}>
              <div style={styles.timeLine}>{exp.tahun}</div>
              <div style={styles.expContent}>
                <h4 style={styles.expTitle}>{exp.posisi} <span style={styles.atCompany}>@ {exp.perusahaan}</span></h4>
                <ul style={styles.bulletList}>
                  {exp.tugas.map((tugas, index) => (
                    <li key={index} style={styles.bulletItem}>{tugas}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROYEK & PRESTASI SECTION */}
      <section id="projects" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionNumber}>03.</span>
          <h3 style={styles.sectionTitle}>Proyek & Aktivitas</h3>
        </div>
        <div style={styles.projectGrid}>
          {PROYEK.map((project) => (
            <div key={project.id} style={styles.projectCard}>
              <div>
                <div style={styles.projectHeader}>
                  <span style={styles.folderIcon}>💻</span>
                </div>
                <h4 style={styles.projectTitle}>{project.judul}</h4>
                <p style={styles.projectDesc}>{project.deskripsi}</p>
              </div>
              <div style={styles.projectTech}>
                {project.tech.map((t, idx) => (
                  <span key={idx} style={styles.techTag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION (Sudah Dirapikan & Elegan) */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.sectionHeaderCentered}>
          <span style={styles.sectionNumber}>04.</span>
          <h3 style={styles.sectionTitle}>Hubungi Saya</h3>
        </div>
        <p style={styles.contactDesc}>
          Saya selalu terbuka untuk kolaborasi proyek IT, pengembangan sistem IoT/Cloud, atau sekadar bertukar ide. Silakan hubungi saya melalui jalur di bawah ini:
        </p>
        
        <div style={styles.contactGrid}>
          <div style={styles.contactCardItem}>
            <span style={styles.contactIcon}>📍</span>
            <h5 style={styles.contactCardLabel}>Lokasi</h5>
            <p style={styles.contactCardValue}>{PROFILE.alamat}</p>
          </div>
          <div style={styles.contactCardItem}>
            <span style={styles.contactIcon}>📞</span>
            <h5 style={styles.contactCardLabel}>Telepon</h5>
            <p style={styles.contactCardValue}>{PROFILE.phone}</p>
          </div>
          <div style={styles.contactCardItem}>
            <span style={styles.contactIcon}>📧</span>
            <h5 style={styles.contactCardLabel}>Email</h5>
            <p style={styles.contactCardValue}>{PROFILE.email}</p>
          </div>
        </div>

        <div style={styles.contactActions}>
          <a href={`mailto:${PROFILE.email}`} style={styles.btnCta}>Kirim Email Langsung</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" style={styles.btnGithub}>Kunjungi GitHub</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>Dirancang & Dibangun oleh {PROFILE.nama}</p>
        <p style={styles.footerSub}>Vite + React &bull; Hosted di Vercel</p>
      </footer>
    </div>
  );
}

// ==========================================
// PREMIUM LIGHT STYLING
// ==========================================
const styles = {
  wrapper: {
    backgroundColor: "#ffffff",
    color: "#4a5568",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    minHeight: "100vh",
    padding: "0 24px",
    lineHeight: "1.6",
  },
  navbar: {
    display: "flex",
    justifyContent: "flex-end", // Bergeser ke kanan penuh karena logo dihapus
    alignItems: "center",
    padding: "32px 0",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  navLinks: {
    display: "flex",
    gap: "32px",
  },
  navLink: {
    color: "#4a5568",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "color 0.2s"
  },
  heroSection: {
    maxWidth: "1000px",
    margin: "80px auto 140px auto",
    display: "flex",
    flexDirection: "column",
  },
  heroGreeting: {
    color: "#3182ce",
    fontWeight: "600",
    fontSize: "0.9rem",
    margin: "0 0 12px 0",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  heroName: {
    color: "#1a202c",
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: "800",
    margin: 0,
    letterSpacing: "-1.5px"
  },
  heroRole: {
    color: "#718096",
    fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
    fontWeight: "600",
    margin: "5px 0 25px 0",
    letterSpacing: "-0.5px"
  },
  heroBio: {
    maxWidth: "750px",
    fontSize: "1.05rem",
    color: "#4a5568",
    marginBottom: "45px",
    textAlign: "justify"
  },
  heroActions: {
    display: "flex",
    gap: "16px",
  },
  btnPrimary: {
    backgroundColor: "#1a202c",
    color: "#ffffff",
    padding: "14px 28px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
  btnSecondary: {
    backgroundColor: "transparent",
    color: "#1a202c",
    border: "1px solid #cbd5e0",
    padding: "14px 28px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
  section: {
    maxWidth: "1000px",
    margin: "0 auto 120px auto",
    scrollMarginTop: "40px"
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "35px",
    borderBottom: "1px solid #edf2f7",
    paddingBottom: "15px"
  },
  sectionHeaderCentered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "25px",
  },
  sectionNumber: {
    color: "#3182ce",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  sectionTitle: {
    color: "#1a202c",
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: 0,
  },
  educationCard: {
    backgroundColor: "#f7fafc",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    display: "flex",
    gap: "30px",
    flexWrap: "wrap"
  },
  timeLine: {
    fontFamily: "monospace",
    fontSize: "0.95rem",
    color: "#3182ce",
    fontWeight: "600",
    minWidth: "200px"
  },
  eduInstitution: {
    color: "#1a202c",
    fontSize: "1.25rem",
    margin: "0 0 5px 0",
    fontWeight: "700"
  },
  eduDetail: {
    color: "#4a5568",
    margin: 0
  },
  timelineContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  experienceCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
  },
  expContent: {
    flex: 1
  },
  expTitle: {
    color: "#1a202c",
    fontSize: "1.2rem",
    margin: "0 0 15px 0",
    fontWeight: "700"
  },
  atCompany: {
    color: "#3182ce"
  },
  bulletList: {
    margin: 0,
    paddingLeft: "20px",
    color: "#4a5568"
  },
  bulletItem: {
    marginBottom: "8px",
    fontSize: "0.95rem"
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gap: "24px",
  },
  projectCard: {
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.04)"
  },
  projectHeader: {
    marginBottom: "15px",
  },
  projectTitle: {
    color: "#1a202c",
    fontSize: "1.3rem",
    fontWeight: "700",
    margin: "0 0 12px 0",
  },
  projectDesc: {
    fontSize: "0.95rem",
    color: "#4a5568",
    margin: "0 0 24px 0",
    lineHeight: "1.6",
    textAlign: "justify"
  },
  projectTech: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  techTag: {
    fontSize: "0.8rem",
    color: "#4a5568",
    backgroundColor: "#edf2f7",
    padding: "4px 10px",
    borderRadius: "4px",
    fontWeight: "500"
  },
  contactSection: {
    maxWidth: "800px",
    margin: "0 auto 160px auto",
    textAlign: "center",
    scrollMarginTop: "40px"
  },
  contactDesc: {
    fontSize: "1.05rem",
    color: "#4a5568",
    marginBottom: "40px",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },
  contactCardItem: {
    backgroundColor: "#ffffff",
    padding: "24px 15px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
  },
  contactIcon: {
    fontSize: "1.5rem",
    display: "block",
    marginBottom: "10px"
  },
  contactCardLabel: {
    margin: "0 0 6px 0",
    color: "#718096",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  contactCardValue: {
    margin: 0,
    color: "#1a202c",
    fontWeight: "600",
    fontSize: "1rem"
  },
  contactActions: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap"
  },
  btnCta: {
    display: "inline-block",
    backgroundColor: "#3182ce",
    color: "#ffffff",
    padding: "14px 32px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    boxShadow: "0 4px 14px rgba(49, 130, 206, 0.3)"
  },
  btnGithub: {
    display: "inline-block",
    backgroundColor: "#1a202c",
    color: "#ffffff",
    padding: "14px 32px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
  footer: {
    textAlign: "center",
    padding: "40px 0",
    fontSize: "0.85rem",
    color: "#a0aec0",
    borderTop: "1px solid #edf2f7",
  },
  footerSub: {
    color: "#3182ce",
    marginTop: "4px",
    fontWeight: "500"
  }
};

export default App;