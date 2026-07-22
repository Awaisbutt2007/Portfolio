import React from 'react';
import { Layers, MonitorSmartphone, LayoutTemplate, FileCode2, TestTube2, Blocks, Cpu } from 'lucide-react';
import FadeIn from './FadeIn';
import Counter from './Counter';

const Skills = () => {
  const skills = [
    { name: 'HTML5', icon: <FileCode2 size={20} /> },
    { name: 'CSS3', icon: <LayoutTemplate size={20} /> },
    { name: 'JavaScript', icon: <Cpu size={20} /> },
    { name: 'React.js', icon: <Blocks size={20} /> },
    { name: 'Tailwind CSS', icon: <MonitorSmartphone size={20} /> },
    { name: 'Bootstrap', icon: <Layers size={20} /> },
    { name: 'Testing', icon: <TestTube2 size={20} /> },
  ];

  return (
    <section className="section" id="skills">
      <div className="container">
        <FadeIn>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>
            Technical Expertise
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            The core technologies and tools I utilize to build modern web solutions.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {skills.map((skill, index) => (
            <div key={index} className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '999px', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.2)'; e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}>
              <div style={{ color: 'var(--text-primary)' }}>
                {skill.icon}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#fff' }}>{skill.name}</h3>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '5rem',
          paddingTop: '4rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <Counter value={15} suffix="+" label="Projects" />
          <Counter value={2} suffix="+" label="Years Learning" />
          <Counter value={100} suffix="%" label="Responsive" />
          <Counter value="Worldwide" label="Available" />
        </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Skills;
