import React from 'react';
import { Layout, Smartphone, Zap, Search } from 'lucide-react';
import FadeIn from './FadeIn';

const Services = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'Building fast, responsive, and robust websites using modern frameworks like React.',
      icon: <Layout size={32} />
    },
    {
      title: 'Responsive Design',
      description: 'Ensuring your application looks and functions flawlessly across all screen sizes and devices.',
      icon: <Smartphone size={32} />
    },
    {
      title: 'Performance Optimization',
      description: 'Optimizing frontend assets and code to deliver lightning-fast load times and smooth interactions.',
      icon: <Zap size={32} />
    },
    {
      title: 'SEO Friendly',
      description: 'Implementing semantic HTML and technical SEO best practices to help your site rank higher.',
      icon: <Search size={32} />
    }
  ];

  return (
    <section className="section" id="services" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <FadeIn>
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>
            What I Do
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px' }}>
            I provide comprehensive frontend solutions tailored to your business needs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {services.map((service, index) => (
            <div key={index} className="glass-panel" style={{ padding: '2.5rem', background: 'var(--bg-primary)' }}>
              <div style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#fff' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Services;
