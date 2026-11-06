import React from 'react';
import { MessageSquare, PenTool, Code2, Rocket, LifeBuoy } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Services from '../components/Services';
import Skills from '../components/Skills';
import FadeIn from '../components/FadeIn';
import CTA from '../components/CTA';

const steps = [
  { icon: MessageSquare, title: 'Talk', text: 'We discuss your business, the problem and what “done” looks like, over WhatsApp, a call or email.' },
  { icon: PenTool, title: 'Plan & design', text: 'Screens, features and a timeline you sign off on before any code is written.' },
  { icon: Code2, title: 'Build', text: 'Regular previews so you see progress every few days, not just at the end.' },
  { icon: Rocket, title: 'Launch', text: 'Deploy to the web, or hand over a Windows installer, with training or a tutorial video.' },
  { icon: LifeBuoy, title: 'Support', text: 'Bug fixes, backups and new features after launch.' },
];

const ServicesPage = () => (
  <>
    <PageHeader
      kicker="Services"
      title="What I build for you"
      subtitle="Complete software, from first idea to installed and running."
      crumbs={[{ label: 'Services' }]}
    />
    <Services />

    <section className="section" style={{ minHeight: 'auto' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <FadeIn>
          <h2 className="section-title">How we’ll work</h2>
          <p className="section-sub" style={{ marginBottom: '3rem' }}>A simple, transparent process.</p>
        </FadeIn>
        <div className="process">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="process-step">
                <span className="process-num">0{i + 1}</span>
                <s.icon size={26} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <Skills />
    <CTA />
  </>
);

export default ServicesPage;
