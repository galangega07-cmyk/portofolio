export const PROFILE = {
  nama: "Galang Ega Yudistira",
  panggilan: "Galang",
  peran: "IT Student & Developer",
  tagline: "Tertarik pada pengembangan IoT, Cloud Computing, dan Web Development",
  alamat: "Malang, Jawa Timur, Indonesia",
  phone: "082120026900",
  email: "galangega07@gmail.com",
  github: "https://github.com/galangega07-cmyk",
  status: "Tersedia untuk Magang & Peluang Proyek",
  bio: "Mahasiswa Program Studi D3 Teknologi Informasi Fakultas Vokasi Universitas Brawijaya yang memiliki pengalaman di bidang pemasaran, pelayanan pelanggan, dan industri kopi. Memiliki kemampuan bekerja dalam tim, komunikasi yang baik, serta mampu beradaptasi dengan lingkungan kerja yang dinamis. Aktif dalam kegiatan olahraga basket dan memiliki prestasi di tingkat program studi maupun universitas. Tertarik pada bidang teknologi informasi, pengembangan aplikasi, cloud computing, dan Internet of Things (IoT).",
  highlights: [
    { label: "Pendidikan", value: "Universitas Brawijaya", sub: "D3 Teknologi Informasi" },
    { label: "Pengalaman Kerja", value: "3+ Pengalaman", sub: "Tech, Retail & F&B" },
    { label: "Fokus Keahlian", value: "IoT & Cloud", sub: "Web Application Dev" },
    { label: "Lokasi", value: "Malang, ID", sub: "Jawa Timur" }
  ],
  interests: [
    "Internet of Things (IoT)",
    "Cloud Computing & VPS",
    "Web Development",
    "WireGuard & Network Security",
    "Customer Relations & Marketing",
    "Olahraga Basket"
  ]
};

export const PENDIDIKAN = {
  institusi: "Universitas Brawijaya",
  fakultas: "Fakultas Vokasi",
  prodi: "Program Studi D3 Teknologi Informasi",
  jenjang: "Diploma III (D3)",
  tahun: "2024 – Sekarang",
  lokasi: "Malang, Jawa Timur",
  status: "Mahasiswa Aktif",
  deskripsi: "Menempuh pendidikan jenjang Diploma III (D3) di bidang Teknologi Informasi dengan fokus pada pengembangan perangkat lunak, sistem jaringan, Internet of Things (IoT), dan infrastruktur cloud computing.",
  fokusStudi: [
    "Pemrograman Web & Basis Data",
    "Sistem Jaringan Komputer & VPS",
    "Internet of Things (IoT) & Sensorik",
    "Cloud Architecture & Server Deployment",
    "Analisis dan Pemecahan Masalah Komputasi"
  ],
  prestasiDanAktivitas: [
    {
      kategori: "Organisasi / Non-Akademik",
      judul: "Pemain Basket Aktif Universitas Brawijaya",
      keterangan: "Berpartisipasi aktif dalam kegiatan olahraga basket dan meraih prestasi di kejuaraan tingkat program studi maupun universitas."
    },
    {
      kategori: "Akademik & Praktikum",
      judul: "Implementasi Proyek IoT & Server Mandiri",
      keterangan: "Mengonfigurasi VPS dan protokol WireGuard untuk pemantauan data sensor IoT secara real-time."
    }
  ]
};

export const PENGALAMAN = [
  {
    id: 1,
    tahun: "Juli 2025 – Juli 2026",
    perusahaan: "Critasena Cafe",
    posisi: "Barista",
    kategori: "Hospitality & Service",
    lokasi: "Malang",
    ringkasan: "Mengelola persiapan dan penyajian aneka minuman kopi berkualitas tinggi serta menjalin komunikasi prima dengan pelanggan.",
    tugas: [
      "Menyiapkan dan menyajikan berbagai jenis minuman kopi dan non-kopi sesuai standar cafe.",
      "Menguasai dasar-dasar Latte Art seperti teknik heart dan tulip secara konsisten.",
      "Menguasai teknik seduh manual (Manual Brew) dengan berbagai metode ekstraksi kopi.",
      "Menjaga kualitas rasa, higienitas, dan konsistensi seluruh minuman yang disajikan.",
      "Memberikan pelayanan yang ramah, komunikatif, dan profesional kepada setiap pelanggan.",
      "Bekerja sama erat dengan tim untuk menjaga kelancaran dan efisiensi operasional cafe."
    ],
    skills: ["Latte Art", "Manual Brew", "Customer Service", "Team Coordination", "Inventory Check"]
  },
  {
    id: 2,
    tahun: "Des. 2024 – April 2025",
    perusahaan: "Costslice",
    posisi: "Kitchen Staff & Server",
    kategori: "Food & Beverage",
    lokasi: "Malang",
    ringkasan: "Menjalankan rotasi peran ganda antara staf dapur dan pelayanan tamu dengan standar kecepatan dan ketepatan tinggi.",
    tugas: [
      "Berperan aktif sebagai Kitchen Staff selama 1 bulan dan melayani pelanggan sebagai Server selama 3 bulan.",
      "Melayani pelanggan dengan ramah, komunikatif, dan memastikan pesanan tersaji sesuai standar.",
      "Bekerja sama secara solid dengan tim operasional demi memastikan alur layanan cepat dan tepat waktu."
    ],
    skills: ["Customer Care", "Kitchen Operations", "Time Management", "Problem Solving"]
  },
  {
    id: 3,
    tahun: "Juli 2023 – Des. 2023",
    perusahaan: "PT PLN Icon Plus",
    posisi: "Marketing Intern",
    kategori: "Corporate & Technology",
    lokasi: "Indonesia",
    ringkasan: "Mendukung divisi pemasaran dalam mempromosikan produk jaringan dan telekomunikasi serta menangani relasi dengan klien.",
    tugas: [
      "Membantu kegiatan pemasaran produk dan layanan telekomunikasi/jaringan Icon Plus kepada target pasar.",
      "Berinteraksi langsung dengan pelanggan dan membantu kebutuhan administrasi operasional pemasaran.",
      "Mendukung strategi kegiatan promosi dan pengembangan relasi bisnis jangka panjang dengan pelanggan."
    ],
    skills: ["Marketing Communication", "Client Relationship", "Administrative Reporting", "Digital Promotion"]
  }
];

export const PROYEK = [
  {
    id: 1,
    judul: "IoT & Cloud Monitoring System",
    subJudul: "SmartOryza - Pertanian Padi Berbasis IoT",
    kategori: "IoT & Cloud Infrastructure",
    status: "Completed",
    image: "/images/smart-oryza.png",
    deskripsi: "Sistem pemantauan data perangkat Internet of Things (IoT) yang terhubung ke cloud server secara aman menggunakan Virtual Private Server (VPS) dan tunneling WireGuard untuk modernisasi pertanian padi (SmartOryza). Dilengkapi dashboard interaktif untuk monitoring metrik data secara real-time.",
    fitur: [
      "Koneksi aman IoT to Cloud via WireGuard VPN tunnel",
      "Deployment VPS cloud server mandiri dengan akses publik",
      "Real-time data visualization & sensor telemetri sawah",
      "Sistem monitoring otomatis aktif 24/7"
    ],
    tech: ["IoT Hardware", "Cloud Server", "Ubuntu VPS", "WireGuard", "Networking", "REST API"],
    icon: "iot"
  },
  {
    id: 2,
    judul: "Web Laravel",
    subJudul: "Tatik Catering - Web Profil & Layanan Katering",
    kategori: "Fullstack Web Application",
    status: "Completed",
    image: "/images/tatik-catering.png",
    deskripsi: "Aplikasi web informasi dan katalog profil usaha kuliner Tatik Catering berbasis framework PHP Laravel. Menyajikan informasi menu katering, ulasan pelanggan, FAQ, serta sistem kontak pemesanan langsung.",
    fitur: [
      "Katalog menu makanan lengkap & sistem informasi katering",
      "Halaman ulasan/review pelanggan dan FAQ interaktif",
      "Desain antarmuka (UI) elegan, bersih, dan responsif",
      "Manajemen data berbasis Laravel dan basis data MySQL"
    ],
    tech: ["Laravel", "PHP", "MySQL", "Blade Templating", "Responsive UI", "Web Information"],
    icon: "web"
  },
  {
    id: 3,
    judul: "SIMIKP Kota Batu",
    subJudul: "Sistem Informasi Manajemen Informasi & Komunikasi Publik",
    kategori: "Government & Enterprise Web Application",
    status: "Completed",
    image: "/images/simikp-kota-batu.png",
    deskripsi: "Aplikasi sistem informasi berbasis web untuk tata kelola administrasi informasi dan komunikasi publik di lingkungan Pemerintah Kota Batu (Dinas Komunikasi dan Informatika / Diskominfo). Dilengkapi portal autentikasi kedinasan aman dan dashboard manajemen data publik terintegrasi.",
    fitur: [
      "Sistem autentikasi login terenkripsi untuk akun kedinasan",
      "Manajemen publikasi informasi dan komunikasi publik Diskominfo",
      "Dashboard administrasi & pelaporan data terpusat",
      "Desain antarmuka profesional berstandar instansi pemerintah"
    ],
    tech: ["Web Application", "PHP / Framework", "MySQL", "Diskominfo Kota Batu", "Enterprise Portal"],
    icon: "gov"
  }
];

export const SKILLS = [
  {
    kategori: "Teknologi & Komputasi",
    items: ["PHP / Laravel", "JavaScript (React)", "HTML5 & CSS3", "MySQL / Database", "Linux / VPS Deployment", "WireGuard VPN", "Internet of Things (IoT)"]
  },
  {
    kategori: "Soft Skills & Profesional",
    items: ["Komunikasi & Pemasaran", "Kerja Sama Tim (Teamwork)", "Adaptabilitas Cepat", "Customer Service & Hospitality", "Manajemen Waktu", "Pemecahan Masalah"]
  }
];
