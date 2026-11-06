import React from 'react';
import { GraduationCap, Briefcase, Code2, CheckCircle2 } from 'lucide-react';
import FadeIn from './FadeIn';

const About = () => {
  return (
    <section className="section" id="about" style={{ paddingTop: '6rem' }}>
      <div className="container">
        
        {/* Who I Am Section */}
        <FadeIn>
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#fff', textAlign: 'center' }}>
              Who I Am
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              
              {/* Text Side */}
              <div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff' }}>
                  Full-Stack Developer: Web, Desktop & SaaS
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.8', fontSize: '1.125rem' }}>
                  I'm Awais, a self-taught software engineer with a deep passion for crafting beautiful, functional, and responsive web applications. My journey into tech has been driven by pure curiosity and a relentless desire to build things that live on the internet.
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8', fontSize: '1.125rem' }}>
                  Despite starting with a basic educational background (Matric pass), my dedication to self-learning has taken me from HTML and CSS to shipping full products: SaaS platforms on Next.js and Supabase, offline Electron desktop software used by clinics, restaurants and shops, and 3D animated websites with Three.js and GSAP.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {['Ships complete products, end to end', 'Builds for real Pakistani businesses (Urdu, PKR, WhatsApp)', 'Fast learner & creative problem solver', 'Detail & design oriented'].map((trait, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                      <span style={{ color: '#fff', fontWeight: '500', fontSize: '1rem' }}>{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Side */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '350px',
                  aspectRatio: '3/4',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  backgroundColor: 'var(--bg-secondary)'
                }}>
                  <img 
                    src="/about-photo.jpg.JPG" 
                    alt="Awais - Who I Am" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => { e.target.src = '/about-photo.jpg' }} // fallback for extension
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Timeline Section */}
        <FadeIn delay={0.2}>
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#fff', textAlign: 'center' }}>
              My Journey
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              
              {/* Education Timeline Item */}
              <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, #10b981, #3b82f6)' }}></div>
                <GraduationCap size={32} style={{ color: '#10b981', marginBottom: '1.25rem' }} />
                <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Education</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Self-Taught Foundation</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }}>
                  Starting with a <strong style={{ color: '#fff', fontWeight: '500' }}>Matric pass</strong>, I took charge of my own education. I leveraged online resources, documentation, and endless practice to build my foundation in software engineering.
                </p>
              </div>

              {/* Experience Timeline Item */}
              <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' }}></div>
                <Briefcase size={32} style={{ color: '#3b82f6', marginBottom: '1.25rem' }} />
                <div style={{ fontSize: '0.875rem', color: '#3b82f6', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Products, Not Just Pages</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }}>
                  From booking SaaS and social media automation to Windows desktop software with licensing, backups and role-based access, I build the whole thing: database, API, UI, installer and tests. </p>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* Philosophy Section */}
        <FadeIn delay={0.4}>
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)' }}>
            <Code2 size={48} style={{ color: 'var(--text-primary)', margin: '0 auto 1.5rem auto' }} />
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>My Philosophy</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', fontStyle: 'italic' }}>
              "I believe in writing clean, maintainable code. A great user experience stems from thoughtful design, reliable APIs, and meticulous attention to detail across the frontend and backend. Every project is an opportunity to learn and push boundaries."
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default About;
