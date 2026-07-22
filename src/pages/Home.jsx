import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="app-wrapper">
      <header className="nav-header">
        <div className="container nav-container">
          <a href="/#home" className="logo">Awais.dev</a>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="/#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>About</a>
            <a href="/#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Services</a>
            <a href="/#skills" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Skills</a>
            <a href="/#projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Projects</a>
            <Link to="/contact" className="btn-gradient">Contact</Link>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Skills />
        <About />
        <Services />
        <Projects />
        <Experience />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
