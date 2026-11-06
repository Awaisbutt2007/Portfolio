import React from 'react';
import { Blocks, Server, MonitorDown, Box, Plug, ShieldCheck } from 'lucide-react';
import FadeIn from './FadeIn';
import Counter from './Counter';
import { stats } from '../data/projects';

const groups = [
  {
    title: 'Frontend',
    icon: <Blocks size={20} />,
    items: ['React 18 / 19', 'Next.js 15–16 (App Router)', 'TypeScript', 'JavaScript (ES2023)', 'Tailwind CSS', 'shadcn/ui', 'HTML5 / CSS3', 'Bootstrap', 'Responsive & RTL (Urdu / Arabic)'],
  },
  {
    title: 'Backend & Data',
    icon: <Server size={20} />,
    items: ['Node.js', 'Express', 'Supabase (Auth, RLS, Realtime, Storage)', 'PostgreSQL', 'Prisma', 'SQLite', 'REST APIs', 'Server Actions', 'Zod'],
  },
  {
    title: 'Desktop & Mobile Apps',
    icon: <MonitorDown size={20} />,
    items: ['Electron (.exe installers)', 'Offline-first data + auto backups', 'PWA / Service Workers', 'Capacitor (Android)', 'Licence key systems', 'Auto-update'],
  },
  {
    title: '3D & Motion',
    icon: <Box size={20} />,
    items: ['Three.js', 'React Three Fiber', 'GSAP ScrollTrigger', 'Framer Motion', 'Lenis smooth scroll', 'Scroll-scrubbed video', 'Canvas animation'],
  },
  {
    title: 'Integrations & AI',
    icon: <Plug size={20} />,
    items: ['OAuth 2.0', 'YouTube / Meta / TikTok / LinkedIn / X APIs', 'WhatsApp Cloud API', 'SMTP email', 'OpenAI API', 'JazzCash / EasyPaisa flows'],
  },
  {
    title: 'Quality & Shipping',
    icon: <ShieldCheck size={20} />,
    items: ['Playwright', 'Vitest', 'Postman', 'QA testing', 'Git & GitHub', 'Vercel', 'Security audits & RLS'],
  },
];

const marquee = ['React', 'Next.js', 'Supabase', 'Electron', 'Three.js', 'GSAP', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind', 'Framer Motion', 'Prisma'];

const Skills = () => (
  <section className="section" id="skills">
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...marquee, ...marquee].map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
    </div>

    <div className="container" style={{ maxWidth: '1200px' }}>
      <FadeIn>
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            The stack I use to ship complete products, from database to pixels to installer.
          </p>
        </div>
      </FadeIn>

      <div className="skill-groups">
        {groups.map((g, i) => (
          <FadeIn key={g.title} delay={i * 0.08}>
            <div className="glass-panel skill-group">
              <h3>
                {g.icon} {g.title}
              </h3>
              <div className="skill-chips">
                {g.items.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            marginTop: '5rem',
            paddingTop: '4rem',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <Counter value={stats.total} suffix="+" label="Projects Built" />
          <Counter value={stats.desktop} label="Desktop Apps" />
          <Counter value={stats.platforms} label="SaaS Platforms" />
          <Counter value={stats.websites} label="3D / Animated Sites" />
        </div>
      </FadeIn>
    </div>
  </section>
);

export default Skills;
