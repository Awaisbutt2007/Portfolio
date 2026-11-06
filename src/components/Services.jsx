import React from 'react';
import { CalendarCheck, MonitorDown, Box, Workflow, Server, Smartphone } from 'lucide-react';
import FadeIn from './FadeIn';

const services = [
  {
    title: 'SaaS & Booking Platforms',
    description: 'Multi-tenant web apps with auth, dashboards, roles, realtime updates and secure databases. BookKaro is one example.',
    icon: <CalendarCheck size={30} />,
  },
  {
    title: 'Business Desktop Software',
    description: 'Offline Windows software (.exe) for clinics, restaurants and shops: POS, billing, ledgers, reports, backups and licence keys.',
    icon: <MonitorDown size={30} />,
  },
  {
    title: '3D & Animated Websites',
    description: 'Brand websites with Three.js, GSAP scroll stories, scroll-scrubbed video heroes and smooth scrolling that make people stop and look.',
    icon: <Box size={30} />,
  },
  {
    title: 'Automation & API Integrations',
    description: 'Connecting apps to YouTube, Meta, TikTok, LinkedIn, X and WhatsApp through official APIs and OAuth, like PostEverywhere.',
    icon: <Workflow size={30} />,
  },
  {
    title: 'Backend & Databases',
    description: 'Node.js / Express APIs, Supabase and PostgreSQL schemas, Row Level Security, Prisma and REST endpoints tested with Postman.',
    icon: <Server size={30} />,
  },
  {
    title: 'PWA & Mobile',
    description: 'Installable, offline-ready apps that work on phones, plus Android builds with Capacitor from the same codebase.',
    icon: <Smartphone size={30} />,
  },
];

const Services = () => (
  <section className="section" id="services" style={{ background: 'var(--bg-secondary)' }}>
    <div className="container" style={{ maxWidth: '1200px' }}>
      <FadeIn>
        <div style={{ marginBottom: '4rem' }}>
          <h2 className="section-title">What I Can Build For You</h2>
          <p className="section-sub">
            From an idea on WhatsApp to a working product your business uses every day.
          </p>
        </div>
      </FadeIn>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {services.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.08}>
            <div className="glass-panel" style={{ padding: '2.25rem', background: 'var(--bg-primary)', height: '100%', borderRadius: '16px' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: '1.5rem',
                  color: '#fff',
                  background: 'linear-gradient(135deg, rgba(16,185,129,.25), rgba(59,130,246,.25))',
                  border: '1px solid rgba(59,130,246,.3)',
                }}
              >
                {s.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#fff' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{s.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
