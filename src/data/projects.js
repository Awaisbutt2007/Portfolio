// All projects, grouped by category. Source: the project folders on D:\ (projects, Web apps, tampletes).

export const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'platform', label: 'SaaS & Platforms' },
  { id: 'desktop', label: 'Desktop Software' },
  { id: 'website', label: '3D & Animated Websites' },
];

export const projects = [
  // ─────────────── SaaS & Platforms ───────────────
  {
    id: 'bookkaro',
    liveLink: 'https://bookkro.vercel.app',
    category: 'platform',
    featured: true,
    title: 'BookKaro',
    tagline: 'Appointment booking SaaS for salons, barbers & clinics',
    description:
      'A multi-business booking platform built for Pakistan. Every business gets its own public booking page that customers open straight from WhatsApp or Instagram, with no account needed. Owners run their day from a live dashboard.',
    problemSolved:
      'Small salons and clinics juggle bookings on WhatsApp and paper registers, which leads to double bookings and no-shows. BookKaro gives them a booking link, a live calendar and automatic WhatsApp reminders.',
    features: [
      'Public booking page per business (/b/your-salon)',
      'Owner dashboard: day/week booking board, walk-ins, customers, staff & reports',
      'Staff view: each member sees only their own schedule',
      'English + Urdu (RTL, Noto Nastaliq), dark mode, installable PWA',
      'Database-level double-booking protection & Row Level Security',
      'Realtime updates, WhatsApp reminders, PKR pricing & Asia/Karachi time',
      'Desktop builds for Windows, macOS and Linux',
    ],
    challenges:
      'Preventing double bookings under concurrent requests. Solved with Postgres constraints and booking functions, and by storing every time in UTC while always rendering in Pakistan time.',
    tech: ['Next.js 15', 'Supabase', 'PostgreSQL', 'Tailwind', 'shadcn/ui', 'PWA', 'Vitest'],
    accent: ['#10b981', '#06b6d4'],
    icon: 'calendar',
  },
  {
    id: 'posteverywhere',
    category: 'platform',
    featured: true,
    title: 'PostEverywhere',
    tagline: 'One upload, posted to every social platform',
    description:
      'Upload a video once and the app publishes it to YouTube, TikTok, Instagram Reels, Facebook Pages, LinkedIn and X (Twitter) through each platform’s official API.',
    problemSolved:
      'Creators waste hours re-uploading the same video to six platforms. PostEverywhere turns that into one upload and one click.',
    features: [
      'OAuth 2.0 connections to YouTube, TikTok, Instagram, Facebook, LinkedIn & X',
      'Plug-in connector architecture: drop a new file into /connectors to add a platform',
      'Guided in-app setup for each developer app and redirect URI',
      'Runs locally on 127.0.0.1, so tokens never leave the user’s machine',
      'Draft / private mode support for platforms still under review',
    ],
    challenges:
      'Every platform has a different auth flow, upload protocol and limits. A shared 4-method connector contract (fields, authUrl, callback, upload) keeps each integration isolated.',
    tech: ['Node.js', 'Express', 'OAuth 2.0', 'YouTube API', 'Meta Graph API', 'TikTok API'],
    accent: ['#f43f5e', '#8b5cf6'],
    icon: 'share',
  },
  {
    id: 'ai-cloth',
    category: 'platform',
    featured: true,
    title: 'AI Cloth Design',
    tagline: 'AI-powered apparel design studio',
    description:
      'An AI-powered application that helps users generate and visualise clothing designs from text descriptions and style preferences, then publish and download them.',
    problemSolved:
      'Bridges the gap between fashion imagination and digital prototyping, so designers can see their ideas before production.',
    features: [
      'Text-to-image generation for apparel',
      'Customisable colour palettes and patterns',
      'User accounts, published designs and tracked downloads (Supabase)',
      'Owner-only Super Admin dashboard secured by RLS + verified JWT',
      'Export for manufacturing',
    ],
    challenges:
      'Keeping the UI responsive during slow AI inference, and locking the admin dashboard down at the database level instead of trusting the client.',
    tech: ['React', 'Vite', 'Supabase', 'OpenAI API', 'Node.js'],
    liveLink: 'https://ai-cloth-design.vercel.app/',
    github: 'https://github.com/Awaisbutt2007/Ai-Cloth-Design.git',
    image: '/ai-cloth.jpg.png',
    accent: ['#a855f7', '#ec4899'],
    icon: 'sparkles',
  },

  // ─────────────── Desktop Software ───────────────
  {
    id: 'smart-clinic',
    category: 'desktop',
    featured: true,
    title: 'Smart Clinic Management',
    tagline: 'Appointments, tokens, doctors & billing in one system',
    description:
      'A complete clinic platform that runs both as a web app and as a Windows desktop app (.exe). Patients book online, reception issues tokens, doctors work from a live queue and a TV screen announces the next patient.',
    problemSolved:
      'Clinics lose time to crowded waiting rooms and manual registers. Live token tracking and smart slot suggestions cut waiting and keep the doctor’s queue moving.',
    features: [
      'Online appointment booking website for patients',
      'AI doctor suggestion from symptoms (English + Roman Urdu)',
      'Live token tracking + TV queue display with voice announcements',
      'Doctor, reception & admin dashboards with prescriptions and vitals',
      'Payments: Cash, Card, JazzCash, EasyPaisa, Bank, with refunds & invoices',
      'Email + WhatsApp notifications, revenue reports, CSV export',
      'LAN mode, licence keys, automatic daily backups',
    ],
    challenges:
      'Running the same product as a hosted web app and an offline desktop app, with several PCs and phones on the clinic Wi-Fi sharing one live queue.',
    tech: ['Electron', 'Node.js', 'JavaScript', 'WhatsApp API', 'SMTP'],
    video: '/videos/clinic.mp4',
    accent: ['#06b6d4', '#3b82f6'],
    icon: 'stethoscope',
  },
  {
    id: 'restaurant',
    category: 'desktop',
    featured: true,
    title: 'Restaurant Manager',
    tagline: 'Desktop POS & kitchen management software',
    description:
      'A Windows desktop POS for restaurants with role-based access for admin, cashier and chef, covering orders, tables, kitchen, inventory and reports. It needs no installation and runs from a USB stick.',
    problemSolved:
      'Restaurants need a POS that works without internet, keeps data safe and is simple enough for every staff member to use.',
    features: [
      'Role-based logins: admin (full), cashier (POS, tables), chef (kitchen, inventory)',
      'Hashed passwords and DevTools locked for staff',
      'File-based storage (no 5 MB browser limit) + 7-day automatic backups',
      'Validated restore, so a broken backup can never overwrite good data',
      'Red alert bar if data ever fails to save',
      'Automated “try to break the app” Playwright test suite',
    ],
    challenges:
      'Making data loss practically impossible: atomic saves, daily snapshots, and a restore path that rejects incomplete files.',
    tech: ['Electron', 'JavaScript', 'Node.js', 'Playwright'],
    video: '/videos/restaurant.mp4',
    accent: ['#f97316', '#ef4444'],
    icon: 'utensils',
  },
  {
    id: 'mobile-shop',
    category: 'desktop',
    featured: true,
    title: 'Mobile Shop Manager',
    tagline: 'Complete accounting for mobile phone shops',
    description:
      'Tracks every phone from purchase to sale by IMEI: profit per phone, customer and dealer ledgers (khata), accessories, repair jobs, expenses and reports. It works offline on a laptop or as an installable mobile app.',
    problemSolved:
      'Mobile shop owners track stock, credit and profit in registers. This app shows today’s sale, profit, cash in hand and who owes what at a glance.',
    features: [
      'Purchase & sale by IMEI with PTA status, condition, battery health',
      'Khata (ledger) with running balances + WhatsApp reminders',
      'Printable receipts and WhatsApp receipt sharing',
      'Repair job cards, accessories stock, low-stock alerts',
      'Reports: daily / monthly / custom, brand-wise, CSV export',
      'PIN lock, backup / restore, signed licence keys',
    ],
    challenges:
      'The same codebase ships as a desktop app (disk storage + daily backups) and an offline PWA, with backup files to move data between devices.',
    tech: ['JavaScript', 'Electron', 'PWA', 'Service Worker', 'Licensing'],
    video: '/videos/mobile-shop.mp4',
    accent: ['#22c55e', '#84cc16'],
    icon: 'smartphone',
  },
  {
    id: 'sunehri-khata',
    liveLink: 'https://sunehri-khata.vercel.app',
    category: 'desktop',
    title: 'Sunehri Khata',
    tagline: 'Digital udhaar khata for shopkeepers',
    description:
      'A credit-ledger app for shops: record udhaar, track payments and send reminders. Ships as a Windows installer, a portable .exe and an Android app from one React codebase.',
    problemSolved: 'Replaces the paper udhaar register that shopkeepers lose track of.',
    features: [
      'Windows installer + portable build with auto-update',
      'Android app via Capacitor with local notifications',
      'Urdu Nastaliq typography',
      'Cloud sync with Supabase',
    ],
    challenges: 'One codebase targeting Electron, Android and the web.',
    tech: ['React', 'Electron', 'Capacitor', 'Supabase'],
    accent: ['#eab308', '#f59e0b'],
    icon: 'book',
  },

  // ─────────────── Websites ───────────────
  {
    id: 'kinetik',
    category: 'website',
    title: 'KINETIK',
    tagline: 'Performance sportswear store with 360° product spin',
    tech: ['React', 'Framer Motion', 'Lenis'],
    image: '/projects/kinetik.png',
    accent: ['#bef264', '#65a30d'],
  },
  {
    id: 'aerox',
    category: 'website',
    title: 'AEROX',
    tagline: 'Sportswear collection with a 3D product carousel',
    tech: ['React', 'Three.js', 'R3F', 'GSAP'],
    image: '/projects/aerox.png',
    accent: ['#a3e635', '#16a34a'],
  },
  {
    id: 'whatsnext',
    category: 'website',
    title: 'WhatsNext',
    tagline: 'Custom apparel manufacturer, Sialkot',
    tech: ['React', 'Three.js', 'GSAP', 'Lenis'],
    image: '/projects/whatsnext.png',
    accent: ['#38bdf8', '#8b5cf6'],
  },
  {
    id: 'kalvora',
    category: 'website',
    title: 'Kalvora Surgical',
    tagline: 'Surgical instruments exporter: procedural 3D, 4 languages incl. Arabic RTL',
    tech: ['React', 'R3F', 'GSAP ScrollTrigger', 'i18n'],
    image: '/projects/kalvora.jpg',
    accent: ['#14b8a6', '#0ea5e9'],
  },
  {
    id: 'mediforge',
    category: 'website',
    title: 'MediForge',
    tagline: 'Surgical instruments site with a 3D anatomy hero & product customiser',
    tech: ['React', 'Three.js', 'GSAP', 'Lenis'],
    image: '/projects/mediforge.webp',
    accent: ['#60a5fa', '#2563eb'],
  },
  {
    id: 'gridforge',
    liveLink: 'https://gridforge-eta.vercel.app',
    category: 'website',
    title: 'GRIDFORGE',
    tagline: 'Football kit store with a live jersey customiser',
    tech: ['React', 'GSAP', 'Express', 'Lenis'],
    image: '/projects/gridforge.webp',
    accent: ['#3b82f6', '#1d4ed8'],
  },
  {
    id: 'ironwolves',
    category: 'website',
    title: 'Iron Wolves FC',
    tagline: 'Football club site with 3D kit viewer',
    tech: ['React', 'Three.js', 'R3F', 'Framer Motion'],
    image: '/projects/ironwolves.webp',
    accent: ['#ef4444', '#991b1b'],
  },
  {
    id: 'ironpulse',
    liveLink: 'https://4-five-pied.vercel.app',
    category: 'website',
    title: 'IRONPULSE',
    tagline: 'Gym site with a 240-frame scroll-scrubbed video hero',
    tech: ['React', 'GSAP', 'Framer Motion', 'Lenis'],
    image: '/projects/ironpulse.webp',
    accent: ['#f97316', '#dc2626'],
  },
  {
    id: 'ironforge',
    liveLink: 'https://gym-smoky-phi.vercel.app',
    category: 'website',
    title: 'IRONFORGE Gym',
    tagline: 'Strength & coaching gym: story-driven scroll site',
    tech: ['React', 'GSAP', 'Framer Motion', 'Lenis'],
    image: '/projects/ironforge.jpg',
    accent: ['#f59e0b', '#b45309'],
  },
  {
    id: 'kinetiq',
    liveLink: 'https://kinetiq-three-flame.vercel.app',
    category: 'website',
    title: 'KINETIQ Teamwear',
    tagline: 'Custom teamwear brand with product reels',
    tech: ['React', 'Video', 'Motion'],
    accent: ['#e11d48', '#1e3a8a'],
  },
  {
    id: 'lumen',
    category: 'website',
    title: 'Lumen Studio',
    tagline: 'Creative studio site + headless CMS with auth & roles',
    tech: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'GSAP'],
    accent: ['#c084fc', '#6366f1'],
  },
];

export const stats = {
  total: projects.length,
  platforms: projects.filter((p) => p.category === 'platform').length,
  desktop: projects.filter((p) => p.category === 'desktop').length,
  websites: projects.filter((p) => p.category === 'website').length,
};
