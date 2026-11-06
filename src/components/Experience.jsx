import React, { useRef } from 'react';
import FadeIn from './FadeIn';
import { motion, useScroll, useTransform } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      year: '2026 - Present',
      role: 'Freelance Software Developer',
      company: 'Business Software, SaaS & Websites',
      description: 'Building complete products: desktop software for clinics, restaurants, mobile shops and retailers (Smart Clinic, Restaurant Manager, Mobile Shop Manager, Sunehri Khata), SaaS platforms like BookKaro and PostEverywhere, and 3D animated brand websites for sportswear, surgical and fitness businesses.'
    },
    {
      year: 'Foundations',
      role: 'Web Development, Self-Taught',
      company: 'Practical Projects',
      description: 'Dedicated 2 intensive years to mastering web development: HTML, CSS, JavaScript, React, Tailwind CSS, backend fundamentals, REST APIs, Postman and QA testing, then moved on to Next.js, Supabase, Electron and Three.js.'
    },
    {
      year: '2024',
      role: 'Matriculation',
      company: 'Formal Education',
      description: 'Successfully completed my Matriculation, laying down the educational foundation that eventually sparked my interest and transition into the tech industry.'
    },
    {
      year: '2022',
      role: 'Hifz-e-Quran',
      company: 'Religious Education',
      description: 'Achieved the significant milestone of completing Hifz (memorization of the Holy Quran). This rigorous discipline built my focus, memory, and dedication—traits that heavily support my coding journey today.'
    }
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="section" id="experience" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <FadeIn>
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>
            My Journey
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px' }}>
            A timeline of my professional and educational milestones.
          </p>
        </div>

        <div ref={containerRef} style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          
          {/* Static Background Line */}
          <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '4px', background: 'var(--border-color)', marginLeft: '1rem', borderRadius: '4px' }}></div>
          
          {/* Animated Growing Line */}
          <motion.div 
            style={{ 
              position: 'absolute', 
              left: '0', 
              top: '0', 
              bottom: '0', 
              width: '4px', 
              background: 'linear-gradient(to bottom, #10b981, #3b82f6)', 
              marginLeft: '1rem',
              borderRadius: '4px',
              scaleY: scrollYProgress,
              transformOrigin: 'top'
            }} 
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {experiences.map((exp, index) => (
              <div key={index} style={{ position: 'relative', paddingLeft: '4rem' }}>
                
                {/* Animated Timeline Node */}
                <motion.div 
                  initial={{ backgroundColor: '#0a0a0a', borderColor: '#333333' }}
                  whileInView={{ backgroundColor: '#10b981', borderColor: '#10b981', boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ duration: 0.4 }}
                  style={{ 
                    position: 'absolute', left: '-0.35rem', top: '0', 
                    width: '3.1rem', height: '3.1rem', 
                    borderRadius: '50%', 
                    border: '4px solid', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1
                  }}
                >
                  <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#fff' }}></div>
                </motion.div>

                <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-primary)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>{exp.year}</span>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.25rem' }}>{exp.role}</h3>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '400', marginBottom: '1rem' }}>{exp.company}</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                    {exp.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Experience;
