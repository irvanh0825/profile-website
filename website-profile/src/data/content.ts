import type { Language } from "../i18n/language";

/* ==========================================================================
 * External links
 * TODO: replace the placeholder URLs below with the real profiles.
 * ======================================================================== */
export const LINKEDIN_URL = "https://www.linkedin.com/in/REPLACE_ME"; // TODO: real LinkedIn URL
export const GITHUB_URL = "https://github.com/REPLACE_ME"; // TODO: real GitHub URL

/* ==========================================================================
 * Shared constants (not translated)
 * ======================================================================== */
export const NAME = "Irvan Hidayat";
export const EMAIL = "irvanhidayat432@gmail.com";
export const LOCATION = "Semarang, Indonesia";
export const CV_FILE = "/CV_Irvan_Hidayat_QA_Engineer.pdf";
export const MONOGRAM = "IH";
export const PROFILE_PHOTO = "/profile-320.jpg";

/* ==========================================================================
 * Shared data — dates and tech names (not translated)
 * ======================================================================== */

/** ISO year-month range, e.g. { start: "2022-03", end: "2022-11" }. end: null = ongoing. */
export interface DateRange {
  start: string;
  end: string | null;
}

/** Keys for extra per-skill notes (see content[lang].skills.itemNotes). */
export type SkillNoteKey = "seleniumIde";

export interface SkillItem {
  name: string;
  /** True when the skill is actively being learned (rendered as a badge). */
  learning?: boolean;
  /** Lookup key into content[lang].skills.itemNotes for an extra note. */
  noteKey?: SkillNoteKey;
}

export type SkillGroupKey = "testing" | "automation" | "apiDatabase" | "programming" | "tools";

export interface SkillGroup {
  key: SkillGroupKey;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    key: "testing",
    items: [
      { name: "Functional Testing" },
      { name: "Regression Testing" },
      { name: "User Acceptance Testing (UAT)" },
      { name: "API Testing" },
      { name: "Test Case Design" },
      { name: "Bug Reporting" },
    ],
  },
  {
    key: "automation",
    items: [
      { name: "Playwright + TypeScript", learning: true },
      { name: "Selenium IDE", noteKey: "seleniumIde" },
    ],
  },
  {
    key: "apiDatabase",
    items: [{ name: "Postman" }, { name: "Apidog" }, { name: "MySQL" }, { name: "PostgreSQL" }],
  },
  {
    key: "programming",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript", learning: true },
      { name: "PHP" },
      { name: "Laravel" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    key: "tools",
    items: [
      { name: "Jira" },
      { name: "ClickUp" },
      { name: "Trello" },
      { name: "Figma" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "GitLab" },
      { name: "Jam" },
      { name: "Microsoft Office" },
      { name: "Google Workspace" },
    ],
  },
];

export type ExperienceKey = "kiara" | "nocturnal" | "neritama" | "jogjaAirport" | "dpmPtsp";

interface ExperienceMeta {
  key: ExperienceKey;
  location: string;
  period: DateRange;
}

/** Newest first. Company names and role titles live in the translated text. */
const experienceMeta: ExperienceMeta[] = [
  { key: "kiara", location: "Semarang, Indonesia", period: { start: "2022-03", end: null } },
  { key: "nocturnal", location: "Semarang, Indonesia", period: { start: "2022-09", end: "2022-11" } },
  { key: "neritama", location: "Jakarta, Indonesia", period: { start: "2021-03", end: "2021-12" } },
  { key: "jogjaAirport", location: "Yogyakarta, Indonesia", period: { start: "2019-06", end: "2019-07" } },
  { key: "dpmPtsp", location: "Semarang, Indonesia", period: { start: "2017-05", end: "2017-08" } },
];

export type ProjectKey = "mykiara" | "posNocturnal" | "erpNeritama" | "jogjaAirportPos" | "dpmPtspWeb";

interface ProjectMeta {
  key: ProjectKey;
  name: string;
  period: DateRange;
}

const projectMeta: ProjectMeta[] = [
  { key: "mykiara", name: "myKiara", period: { start: "2022-03", end: null } },
  { key: "posNocturnal", name: "POS Nocturnal", period: { start: "2022-09", end: "2022-11" } },
  { key: "erpNeritama", name: "ERP PT Neritama Karya Lestari", period: { start: "2021-03", end: "2021-12" } },
  { key: "jogjaAirportPos", name: "Jogja Airport Resto POS", period: { start: "2019-06", end: "2019-07" } },
  { key: "dpmPtspWeb", name: "Web App DPM-PTSP", period: { start: "2017-05", end: "2017-08" } },
];

interface EducationMeta {
  school: string;
  gpa: number;
  period: DateRange;
}

const educationMeta: EducationMeta = {
  school: "Universitas Semarang",
  gpa: 3.92,
  period: { start: "2019-03", end: "2023-02" },
};

const publicationMeta = {
  publisher: "Universitas Semarang Library",
  /** ISO year-month. */
  date: "2023-05",
};

/** Number of listed publications (currently a single entry). */
export const PUBLICATION_COUNT = 1;

/* ==========================================================================
 * Date formatting helpers
 * ======================================================================== */

const MONTHS: Record<Language, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  id: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
};

/** "2022-03" → "Mar 2022" (language-aware month name). */
export function formatMonth(isoYearMonth: string, language: Language): string {
  const [year, month] = isoYearMonth.split("-").map(Number);
  return `${MONTHS[language][month - 1]} ${year}`;
}

/** "Mar 2022 – Present" / "Mar 2022 – Sekarang" (present label from content[language].common). */
export function formatPeriod(range: DateRange, language: Language): string {
  const start = formatMonth(range.start, language);
  const end = range.end === null ? content[language].common.present : formatMonth(range.end, language);
  return `${start} – ${end}`;
}

/* ==========================================================================
 * Translated content
 * ======================================================================== */

export interface NavItem {
  /** Anchor id of the target section, without "#". */
  id: string;
  label: string;
}

export interface SectionText {
  /** Small mono label above the title, e.g. "01 // ABOUT". */
  eyebrow: string;
  title: string;
}

export type RoleType = "qa" | "pm" | "analyst" | "developer";

export interface ExperienceText {
  company: string;
  role: string;
  roleType: RoleType;
  bullets: string[];
}

export interface ProjectText {
  role: string;
  roleType: RoleType;
  description: string;
  tags: string[];
}

const en = {
  intro: {
    header: "irvan.qa / test suite",
    checks: ["Functional", "Regression", "End-to-End", "Smoke", "UAT", "API"],
    passed: "All tests passed",
    skip: "Skip",
    progressAria: "Test progress",
  },
  common: {
    present: "Present",
  },
  nav: {
    brand: "irvan.hidayat",
    items: [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "workflow", label: "Workflow" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    languageOptions: { id: "ID", en: "EN" },
    languageAria: "Change language",
    menuOpenAria: "Open menu",
    menuCloseAria: "Close menu",
  },
  hero: {
    eyebrow: "// QUALITY ASSURANCE ENGINEER",
    name: "Irvan Hidayat",
    role: "Quality Assurance Engineer",
    valueProposition:
      "I keep a live loyalty membership app reliable through functional, regression, UAT, and API testing — backed by 3+ years of QA experience.",
    scrollLabel: "scroll",
    report: {
      passedLabel: "PASSED",
      experienceValue: "3+",
      experienceLabel: "years of QA experience",
      areasTitle: "Testing areas",
      areas: [
        "Functional Testing",
        "Regression Testing",
        "End-to-End Testing",
        "Smoke Testing",
        "User Acceptance Testing",
        "API Testing",
      ],
      learningLabel: "Currently learning",
      learningValue: "Playwright + TypeScript",
      photoAlt: "Profile photo of Irvan Hidayat",
    },
  },
  about: {
    eyebrow: "01 // ABOUT",
    title: "About",
    summary: [
      "QA professional with 3+ years of experience testing a live loyalty membership application, covering functional, regression, User Acceptance, and API testing. I work closely with developers to document and follow up on bugs.",
      "My background as a System Analyst and Project Manager on ERP and POS systems supports strong requirement analysis and cross-team communication. I am currently developing into test automation with Playwright and TypeScript.",
    ],
    glanceTitle: "At a glance",
    locationLabel: "Location",
    currentRoleLabel: "Current role",
    educationLabel: "Education",
    publicationLabel: "Publication",
    languages: {
      title: "Languages",
      items: [
        { name: "Bahasa Indonesia", level: "Native" },
        { name: "English", level: "Professional working proficiency" },
      ],
    },
    highlights: ["Live app testing", "API testing", "Requirement analysis", "Cross-team communication"],
  },
  skills: {
    eyebrow: "02 // SKILLS",
    title: "Skills",
    filters: { all: "All" },
    groups: {
      testing: "Testing",
      automation: "Automation",
      apiDatabase: "API & Database",
      programming: "Programming",
      tools: "Tools",
    },
    softSkills: {
      label: "Soft Skills",
      items: [
        "Problem Solving",
        "Critical Thinking",
        "Communication & Collaboration",
        "Time Management",
        "Attention to Detail",
      ],
    },
    learningLabel: "learning",
    itemNotes: { seleniumIde: "Record & playback" } satisfies Record<SkillNoteKey, string>,
  },
  workflow: {
    eyebrow: "03 // WORKFLOW",
    title: "Workflow",
    stepperLabel: "// bug lifecycle",
    stepListAria: "QA workflow steps",
    steps: [
      {
        key: "requirement",
        title: "Requirement",
        description:
          "Review specifications and business requirements — a habit carried over from my system analyst days — before anything is tested.",
        tags: ["Requirement analysis", "Specifications"],
      },
      {
        key: "testCase",
        title: "Test Case",
        description:
          "Design test cases based on the requirements, covering functional, regression, and UAT scenarios.",
        tags: ["Test case design", "UAT scenarios"],
      },
      {
        key: "execute",
        title: "Execute",
        description:
          "Run functional, regression, and UAT cycles, plus API testing with Postman and Apidog when new features or endpoints are released.",
        tags: ["Functional & regression", "Postman · Apidog"],
      },
      {
        key: "bugReport",
        title: "Bug Report",
        description:
          "Document bugs clearly and follow up with developers until each one is resolved.",
        tags: ["Jira", "Documentation", "Developer follow-up"],
      },
      {
        key: "retest",
        title: "Retest",
        description:
          "Retest resolved bugs and re-run regression checks to make sure nothing else broke.",
        tags: ["Retesting", "Regression"],
      },
      {
        key: "release",
        title: "Release",
        description: "Verify the application meets specifications before it is released to users.",
        tags: ["UAT", "Verification"],
      },
    ],
    controls: {
      play: "Play",
      pause: "Pause",
      previous: "Previous",
      next: "Next",
    },
  },
  experience: {
    eyebrow: "04 // EXPERIENCE",
    title: "Experience",
    expandLabel: "Show details",
    collapseLabel: "Hide details",
    currentLabel: "Current",
    typeLabels: {
      qa: "QA",
      pm: "Project Manager",
      analyst: "System Analyst",
      developer: "Developer",
    },
    items: {
      kiara: {
        company: "PT Kiara Inovasi Teknologi",
        role: "Quality Assurance",
        roleType: "qa",
        bullets: [
          "Ensure the quality of myKiara, a loyalty membership platform where users join partner merchants and earn points and vouchers.",
          "Design and execute functional testing, regression testing, and UAT to verify the application meets specifications.",
          "Perform API testing with Postman and Apidog whenever new features or endpoints are released.",
          "Collaborate closely with developers to identify, document, and follow up on bugs until resolved.",
          "Built automated test flows using Selenium IDE (record and playback); currently learning Playwright with TypeScript to move toward code-based automation.",
        ],
      },
      nocturnal: {
        company: "Nocturnal Resto",
        role: "Project Manager",
        roleType: "pm",
        bullets: [
          "Managed the full lifecycle of a restaurant POS application, from planning and team coordination to implementation.",
          "Identified business requirements, built project timelines, and oversaw key features: order management, payment processing, inventory management, and sales reporting.",
          "Communicated with stakeholders to keep the solution aligned with operational needs.",
        ],
      },
      neritama: {
        company: "PT Neritama Karya Lestari",
        role: "System Analyst / Quality Assurance (Freelance)",
        roleType: "analyst",
        bullets: [
          "Analyzed business requirements, designed system architecture, and prepared technical documentation for ERP modules: Purchasing, Inventory, Production Planning, and Sales & Distribution.",
          "Coordinated with the development team to ensure integration between modules and implementation aligned with operational needs.",
        ],
      },
      jogjaAirport: {
        company: "Jogja Airport Resto",
        role: "System Analyst / Quality Assurance (Freelance)",
        roleType: "analyst",
        bullets: [
          "Analyzed requirements, designed system workflows, and prepared technical documentation for a restaurant POS application, coordinating with developers.",
        ],
      },
      dpmPtsp: {
        company: "DPM-PTSP (Investment and One-Stop Integrated Service Office)",
        role: "Junior Web Developer (Internship)",
        roleType: "developer",
        bullets: ["Designed, developed, and tested a licensing application for SIUP and TDP permits."],
      },
    } satisfies Record<ExperienceKey, ExperienceText>,
  },
  projects: {
    eyebrow: "05 // PROJECTS",
    title: "Projects",
    filters: { all: "All" },
    roleLabel: "Role",
    typeLabels: {
      qa: "QA",
      pm: "Project Manager",
      analyst: "System Analyst",
      developer: "Developer",
    },
    viewDetailsLabel: "View details",
    closeLabel: "Close",
    modalAria: "Project details",
    items: {
      mykiara: {
        role: "Quality Assurance",
        roleType: "qa",
        description:
          "Mobile-based loyalty membership platform connecting merchants and customers through membership programs, points, and promotional vouchers.",
        tags: ["Loyalty membership", "Functional testing", "UAT", "API testing"],
      },
      posNocturnal: {
        role: "Project Manager",
        roleType: "pm",
        description:
          "Web-based POS for Nocturnal Restaurant with menu and ingredient management, stock opname, promotional discounts, and a cashier system.",
        tags: ["POS", "Menu management", "Inventory"],
      },
      erpNeritama: {
        role: "System Analyst / Quality Assurance",
        roleType: "analyst",
        description:
          "ERP suite including E-Procurement, E-Accounting (automatically receives journal entries from other systems), Nicole's Chocolaterie Production, and Fashion Outlet POS.",
        tags: ["ERP", "E-Procurement", "Production", "POS"],
      },
      jogjaAirportPos: {
        role: "System Analyst / Quality Assurance",
        roleType: "analyst",
        description: "Web-based POS for ordering, payment processing, and restaurant operations.",
        tags: ["POS", "Restaurant operations"],
      },
      dpmPtspWeb: {
        role: "Junior Web Developer",
        roleType: "developer",
        description:
          "Web-based application for submitting and tracking SIUP and TDP licensing, with digital permits.",
        tags: ["Web app", "Licensing", "SIUP", "TDP"],
      },
    } satisfies Record<ProjectKey, ProjectText>,
  },
  education: {
    eyebrow: "06 // EDUCATION",
    title: "Education",
    degree: "Bachelor of Computer Science (Informatics Engineering)",
    gpaLabel: "GPA",
    focusLabel: "Focus",
    focusAreas: [
      "Software development",
      "Database systems",
      "Information system analysis and design",
      "IT project management",
      "Software testing methodologies",
    ],
  },
  publication: {
    label: "Publication",
    title:
      "Implementation of a Web-Based E-Procurement System Using the Laravel Framework to Improve Procurement Effectiveness at PT. Neritama Karya Lestari",
    alternateLabel: "Original Indonesian title",
  },
  contact: {
    eyebrow: "07 // CONTACT",
    title: "Contact",
    headline: "Let's work together",
    body: "I'm open to QA roles, freelance projects, and discussions about software quality. Reach out by email.",
    emailMeLabel: "Email me",
    emailLabel: "Email",
    copyLabel: "Copy",
    copiedLabel: "Copied!",
  },
  actions: {
    downloadCv: "Download CV",
    contactMe: "Contact me",
    showMore: "Show more",
    showLess: "Show less",
  },
  social: {
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    linkedinAria: "Irvan Hidayat on LinkedIn",
    githubAria: "Irvan Hidayat on GitHub",
  },
  footer: {
    backToTop: "Top",
  },
  seo: {
    title: "Irvan Hidayat — Quality Assurance Engineer",
    description:
      "Professional portfolio of Irvan Hidayat, a Quality Assurance Engineer with 3+ years of experience in functional, regression, UAT, and API testing.",
    imageAlt: "Irvan Hidayat — Quality Assurance Engineer",
  },
};

/** Fully typed content shape — both language objects must match it exactly. */
export type Content = typeof en;

const id: Content = {
  intro: {
    header: "irvan.qa / test suite",
    checks: ["Functional", "Regression", "End-to-End", "Smoke", "UAT", "API"],
    passed: "Semua pengujian lolos",
    skip: "Lewati",
    progressAria: "Progres pengujian",
  },
  common: {
    present: "Sekarang",
  },
  nav: {
    brand: "irvan.hidayat",
    items: [
      { id: "about", label: "Tentang" },
      { id: "skills", label: "Keahlian" },
      { id: "workflow", label: "Alur Kerja" },
      { id: "experience", label: "Pengalaman" },
      { id: "projects", label: "Proyek" },
      { id: "contact", label: "Kontak" },
    ],
    languageOptions: { id: "ID", en: "EN" },
    languageAria: "Ganti bahasa",
    menuOpenAria: "Buka menu",
    menuCloseAria: "Tutup menu",
  },
  hero: {
    eyebrow: "// QUALITY ASSURANCE ENGINEER",
    name: "Irvan Hidayat",
    role: "Quality Assurance Engineer",
    valueProposition:
      "Saya menjaga aplikasi loyalty membership yang live tetap andal melalui functional, regression, UAT, dan API testing — dengan pengalaman QA lebih dari 3 tahun.",
    scrollLabel: "gulir",
    report: {
      passedLabel: "LOLOS",
      experienceValue: "3+",
      experienceLabel: "tahun pengalaman QA",
      areasTitle: "Area pengujian",
      areas: [
        "Functional Testing",
        "Regression Testing",
        "End-to-End Testing",
        "Smoke Testing",
        "User Acceptance Testing",
        "API Testing",
      ],
      learningLabel: "Sedang dipelajari",
      learningValue: "Playwright + TypeScript",
      photoAlt: "Foto profil Irvan Hidayat",
    },
  },
  about: {
    eyebrow: "01 // TENTANG",
    title: "Tentang",
    summary: [
      "QA professional dengan pengalaman lebih dari 3 tahun menguji aplikasi loyalty membership yang live, mencakup functional, regression, User Acceptance, dan API testing. Saya bekerja erat dengan developer untuk mendokumentasikan dan menindaklanjuti bug.",
      "Latar belakang saya sebagai System Analyst dan Project Manager pada sistem ERP dan POS mendukung analisis kebutuhan yang kuat dan komunikasi lintas tim. Saat ini saya sedang berkembang ke arah otomasi pengujian dengan Playwright dan TypeScript.",
    ],
    glanceTitle: "Sekilas",
    locationLabel: "Lokasi",
    currentRoleLabel: "Peran saat ini",
    educationLabel: "Pendidikan",
    publicationLabel: "Publikasi",
    languages: {
      title: "Bahasa",
      items: [
        { name: "Bahasa Indonesia", level: "Penutur asli" },
        { name: "Bahasa Inggris", level: "Kemahiran kerja profesional" },
      ],
    },
    highlights: ["Pengujian aplikasi live", "API testing", "Analisis kebutuhan", "Komunikasi lintas tim"],
  },
  skills: {
    eyebrow: "02 // KEAHLIAN",
    title: "Keahlian",
    filters: { all: "Semua" },
    groups: {
      testing: "Pengujian",
      automation: "Otomasi",
      apiDatabase: "API & Database",
      programming: "Pemrograman",
      tools: "Perangkat",
    },
    softSkills: {
      label: "Soft Skills",
      items: [
        "Pemecahan Masalah",
        "Berpikir Kritis",
        "Komunikasi & Kolaborasi",
        "Manajemen Waktu",
        "Perhatian terhadap Detail",
      ],
    },
    learningLabel: "dipelajari",
    itemNotes: { seleniumIde: "Record & playback" } satisfies Record<SkillNoteKey, string>,
  },
  workflow: {
    eyebrow: "03 // ALUR KERJA",
    title: "Alur Kerja",
    stepperLabel: "// siklus bug",
    stepListAria: "Langkah-langkah alur kerja QA",
    steps: [
      {
        key: "requirement",
        title: "Kebutuhan",
        description:
          "Meninjau spesifikasi dan kebutuhan bisnis — kebiasaan yang terbawa dari pengalaman sebagai System Analyst — sebelum pengujian dimulai.",
        tags: ["Analisis kebutuhan", "Spesifikasi"],
      },
      {
        key: "testCase",
        title: "Test Case",
        description:
          "Merancang test case berdasarkan kebutuhan, mencakup skenario functional, regression, dan UAT.",
        tags: ["Desain test case", "Skenario UAT"],
      },
      {
        key: "execute",
        title: "Eksekusi",
        description:
          "Menjalankan pengujian functional, regression, dan UAT, ditambah API testing dengan Postman dan Apidog saat fitur atau endpoint baru dirilis.",
        tags: ["Functional & regression", "Postman · Apidog"],
      },
      {
        key: "bugReport",
        title: "Laporan Bug",
        description:
          "Mendokumentasikan bug dengan jelas dan menindaklanjutinya bersama developer hingga setiap bug terselesaikan.",
        tags: ["Jira", "Dokumentasi", "Tindak lanjut developer"],
      },
      {
        key: "retest",
        title: "Retest",
        description:
          "Menguji ulang bug yang telah diperbaiki dan menjalankan kembali regression untuk memastikan tidak ada fungsi lain yang rusak.",
        tags: ["Retest", "Regression"],
      },
      {
        key: "release",
        title: "Rilis",
        description:
          "Memverifikasi bahwa aplikasi memenuhi spesifikasi sebelum dirilis ke pengguna.",
        tags: ["UAT", "Verifikasi"],
      },
    ],
    controls: {
      play: "Putar",
      pause: "Jeda",
      previous: "Sebelumnya",
      next: "Selanjutnya",
    },
  },
  experience: {
    eyebrow: "04 // PENGALAMAN",
    title: "Pengalaman",
    expandLabel: "Tampilkan detail",
    collapseLabel: "Sembunyikan detail",
    currentLabel: "Saat ini",
    typeLabels: {
      qa: "QA",
      pm: "Project Manager",
      analyst: "System Analyst",
      developer: "Developer",
    },
    items: {
      kiara: {
        company: "PT Kiara Inovasi Teknologi",
        role: "Quality Assurance",
        roleType: "qa",
        bullets: [
          "Menjaga kualitas myKiara, platform loyalitas membership tempat pengguna bergabung dengan merchant mitra dan memperoleh poin serta voucher.",
          "Merancang dan mengeksekusi functional testing, regression testing, dan UAT untuk memverifikasi bahwa aplikasi memenuhi spesifikasi.",
          "Melakukan API testing dengan Postman dan Apidog setiap kali fitur atau endpoint baru dirilis.",
          "Berkolaborasi erat dengan developer untuk mengidentifikasi, mendokumentasikan, dan menindaklanjuti bug hingga terselesaikan.",
          "Membangun alur pengujian otomatis menggunakan Selenium IDE (record and playback); saat ini sedang mempelajari Playwright dengan TypeScript untuk beralih ke otomasi berbasis kode.",
        ],
      },
      nocturnal: {
        company: "Nocturnal Resto",
        role: "Project Manager",
        roleType: "pm",
        bullets: [
          "Mengelola siklus penuh aplikasi POS restoran, mulai dari perencanaan dan koordinasi tim hingga implementasi.",
          "Mengidentifikasi kebutuhan bisnis, menyusun timeline proyek, dan mengawasi fitur-fitur utama: manajemen pesanan, proses pembayaran, manajemen inventaris, dan laporan penjualan.",
          "Berkomunikasi dengan pemangku kepentingan agar solusi tetap selaras dengan kebutuhan operasional.",
        ],
      },
      neritama: {
        company: "PT Neritama Karya Lestari",
        role: "System Analyst / Quality Assurance (Freelance)",
        roleType: "analyst",
        bullets: [
          "Menganalisis kebutuhan bisnis, merancang arsitektur sistem, dan menyiapkan dokumentasi teknis untuk modul ERP: Purchasing, Inventory, Production Planning, dan Sales & Distribution.",
          "Berkoordinasi dengan tim pengembang untuk memastikan integrasi antarmodul dan implementasi yang selaras dengan kebutuhan operasional.",
        ],
      },
      jogjaAirport: {
        company: "Jogja Airport Resto",
        role: "System Analyst / Quality Assurance (Freelance)",
        roleType: "analyst",
        bullets: [
          "Menganalisis kebutuhan, merancang alur kerja sistem, dan menyiapkan dokumentasi teknis untuk aplikasi POS restoran, serta berkoordinasi dengan developer.",
        ],
      },
      dpmPtsp: {
        company: "DPM-PTSP (Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu)",
        role: "Junior Web Developer (Magang)",
        roleType: "developer",
        bullets: ["Merancang, mengembangkan, dan menguji aplikasi perizinan untuk SIUP dan TDP."],
      },
    } satisfies Record<ExperienceKey, ExperienceText>,
  },
  projects: {
    eyebrow: "05 // PROYEK",
    title: "Proyek",
    filters: { all: "Semua" },
    roleLabel: "Peran",
    typeLabels: {
      qa: "QA",
      pm: "Project Manager",
      analyst: "System Analyst",
      developer: "Developer",
    },
    viewDetailsLabel: "Lihat detail",
    closeLabel: "Tutup",
    modalAria: "Detail proyek",
    items: {
      mykiara: {
        role: "Quality Assurance",
        roleType: "qa",
        description:
          "Platform loyalitas membership berbasis mobile yang menghubungkan merchant dan pelanggan melalui program membership, poin, dan voucher promosi.",
        tags: ["Loyalitas membership", "Functional testing", "UAT", "API testing"],
      },
      posNocturnal: {
        role: "Project Manager",
        roleType: "pm",
        description:
          "POS berbasis web untuk Nocturnal Restaurant dengan manajemen menu dan bahan, stok opname, diskon promosi, dan sistem kasir.",
        tags: ["POS", "Manajemen menu", "Inventory"],
      },
      erpNeritama: {
        role: "System Analyst / Quality Assurance",
        roleType: "analyst",
        description:
          "Paket ERP yang mencakup E-Procurement, E-Accounting (menerima entri jurnal secara otomatis dari sistem lain), Nicole's Chocolaterie Production, dan Fashion Outlet POS.",
        tags: ["ERP", "E-Procurement", "Production", "POS"],
      },
      jogjaAirportPos: {
        role: "System Analyst / Quality Assurance",
        roleType: "analyst",
        description: "POS berbasis web untuk pemesanan, proses pembayaran, dan operasional restoran.",
        tags: ["POS", "Operasional restoran"],
      },
      dpmPtspWeb: {
        role: "Junior Web Developer",
        roleType: "developer",
        description:
          "Aplikasi berbasis web untuk pengajuan dan pelacakan perizinan SIUP dan TDP, dilengkapi surat izin digital.",
        tags: ["Web app", "Perizinan", "SIUP", "TDP"],
      },
    } satisfies Record<ProjectKey, ProjectText>,
  },
  education: {
    eyebrow: "06 // PENDIDIKAN",
    title: "Pendidikan",
    degree: "S1 Ilmu Komputer (Teknik Informatika)",
    gpaLabel: "IPK",
    focusLabel: "Fokus",
    focusAreas: [
      "Pengembangan perangkat lunak",
      "Sistem basis data",
      "Analisis dan perancangan sistem informasi",
      "Manajemen proyek TI",
      "Metodologi pengujian perangkat lunak",
    ],
  },
  publication: {
    label: "Publikasi",
    title:
      "Implementasi Sistem E-Procurement Berbasis Web dengan Menggunakan Teknologi Framework Laravel untuk Meningkatkan Efektifitas Pengadaan Barang Di PT. Neritama Karya Lestari",
    alternateLabel: "English title",
  },
  contact: {
    eyebrow: "07 // KONTAK",
    title: "Kontak",
    headline: "Mari bekerja sama",
    body: "Saya terbuka untuk peran QA, proyek freelance, dan diskusi tentang kualitas perangkat lunak. Hubungi saya melalui email.",
    emailMeLabel: "Kirim email",
    emailLabel: "Email",
    copyLabel: "Salin",
    copiedLabel: "Tersalin!",
  },
  actions: {
    downloadCv: "Unduh CV",
    contactMe: "Hubungi Saya",
    showMore: "Tampilkan lebih banyak",
    showLess: "Tampilkan lebih sedikit",
  },
  social: {
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    linkedinAria: "Irvan Hidayat di LinkedIn",
    githubAria: "Irvan Hidayat di GitHub",
  },
  footer: {
    backToTop: "Atas",
  },
  seo: {
    title: "Irvan Hidayat — Quality Assurance Engineer",
    description:
      "Portofolio profesional Irvan Hidayat, Quality Assurance Engineer dengan pengalaman lebih dari 3 tahun dalam functional, regression, UAT, dan API testing.",
    imageAlt: "Irvan Hidayat — Quality Assurance Engineer",
  },
};

export const content: Record<Language, Content> = { en, id };

/* ==========================================================================
 * Typed view helpers — merge shared meta + translated text for components
 * ======================================================================== */

export interface ExperienceEntry {
  key: ExperienceKey;
  company: string;
  role: string;
  roleType: RoleType;
  location: string;
  period: DateRange;
  /** Formatted, e.g. "Mar 2022 – Present" / "Mar 2022 – Sekarang". */
  periodLabel: string;
  bullets: string[];
}

export function getExperience(language: Language): ExperienceEntry[] {
  const items = content[language].experience.items;
  return experienceMeta.map((meta) => {
    const text = items[meta.key];
    return {
      key: meta.key,
      company: text.company,
      role: text.role,
      roleType: text.roleType,
      location: meta.location,
      period: meta.period,
      periodLabel: formatPeriod(meta.period, language),
      bullets: text.bullets,
    };
  });
}

export interface ProjectEntry {
  key: ProjectKey;
  name: string;
  role: string;
  roleType: RoleType;
  description: string;
  tags: string[];
  period: DateRange;
  periodLabel: string;
}

export function getProjects(language: Language): ProjectEntry[] {
  const items = content[language].projects.items;
  return projectMeta.map((meta) => {
    const text = items[meta.key];
    return {
      key: meta.key,
      name: meta.name,
      role: text.role,
      roleType: text.roleType,
      description: text.description,
      tags: text.tags,
      period: meta.period,
      periodLabel: formatPeriod(meta.period, language),
    };
  });
}

export interface EducationView {
  school: string;
  degree: string;
  periodLabel: string;
  gpa: number;
  gpaLabel: string;
  focusLabel: string;
  focusAreas: string[];
}

export function getEducation(language: Language): EducationView {
  const t = content[language].education;
  return {
    school: educationMeta.school,
    degree: t.degree,
    periodLabel: formatPeriod(educationMeta.period, language),
    gpa: educationMeta.gpa,
    gpaLabel: t.gpaLabel,
    focusLabel: t.focusLabel,
    focusAreas: t.focusAreas,
  };
}

export interface PublicationView {
  label: string;
  title: string;
  /** The same publication title in the other language. */
  alternateTitle: string;
  publisher: string;
  dateLabel: string;
}

export function getPublication(language: Language): PublicationView {
  const t = content[language].publication;
  const alternateLanguage = language === "id" ? "en" : "id";
  const alternate = content[alternateLanguage].publication;
  return {
    label: t.label,
    title: t.title,
    alternateTitle: alternate.title,
    publisher: publicationMeta.publisher,
    dateLabel: formatMonth(publicationMeta.date, language),
  };
}

export interface SkillViewItem {
  name: string;
  learning?: boolean;
  /** Extra note resolved from content[lang].skills.itemNotes (e.g. "Record & playback"). */
  note?: string;
}

export interface SkillGroupView {
  key: SkillGroupKey;
  label: string;
  items: SkillViewItem[];
}

/** Hard-skill groups with translated labels. Soft skills live in content[lang].skills.softSkills. */
export function getSkillGroups(language: Language): SkillGroupView[] {
  const t = content[language].skills;
  return skillGroups.map((group) => ({
    key: group.key,
    label: t.groups[group.key],
    items: group.items.map((item) => ({
      name: item.name,
      learning: item.learning,
      note: item.noteKey ? t.itemNotes[item.noteKey] : undefined,
    })),
  }));
}
