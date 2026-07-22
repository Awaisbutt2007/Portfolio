import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';

const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </span>
  );
};

const Hero = () => {
  return (
    <section className="section" id="home" style={{ paddingTop: '8rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '4rem', 
        alignItems: 'center' 
      }}>
        
        {/* Left Side: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <FadeIn delay={0.2}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '999px', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              Available for work
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: '1.1', marginBottom: '1.5rem', color: '#fff' }}>
              Awais.<br />
              <span className="text-gradient" style={{ display: 'inline-block', minHeight: '1.2em' }}>
                <Typewriter words={['Frontend Developer.', 'React Enthusiast.', 'QA Tester.', 'Web Designer.']} />
              </span>
            </h1>
            
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: '1.8' }}>
              I specialize in building high-performance, scalable web applications with a focus on modern user interfaces and clean code architecture.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Magnetic>
                <a href="#projects" className="btn-primary" style={{ gap: '0.5rem' }}>
                  Explore Projects <ArrowRight size={18} />
                </a>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="btn-secondary" style={{ gap: '0.5rem' }}>
                  <Mail size={18} /> Contact Me
                </Link>
              </Magnetic>
            </div>
          </FadeIn>
        </div>

        {/* Right Side: Professional Photo */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <FadeIn delay={0.4}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '3/4',
                borderRadius: '2rem',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
                zIndex: 1,
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <img 
                  src="/profile.jpg.JPG" 
                  alt="Awais - Professional" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

export default Hero;
