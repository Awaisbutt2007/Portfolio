import React from 'react';
import { Code2 as GithubIcon, User as LinkedinIcon, Mail, FileText } from 'lucide-react';
import FadeIn from './FadeIn';
import Magnetic from './Magnetic';
import html2pdf from 'html2pdf.js';

const Footer = () => {
  const handleDownload = () => {
    const element = document.getElementById('root');
    const width = element.scrollWidth;
    const height = element.scrollHeight;

    const opt = {
      margin:       0,
      filename:     'Awais_Portfolio.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true, 
        scrollY: 0,
        backgroundColor: '#000000'
      },
      jsPDF:        { 
        unit: 'px', 
        format: [width, height], 
        orientation: 'portrait' 
      }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  return (
    <footer id="contact" style={{ borderTop: '1px solid var(--border-color)', padding: '5rem 0 2rem 0', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          
          {/* Column 1: About */}
          <div>
            <h2 className="logo" style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>Awais.dev</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              Building the future of the web, one line of code at a time. Let's create something impactful together.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <strong style={{ color: '#fff', fontWeight: '500' }}>Location:</strong> Gujrat, Punjab, Pakistan
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <strong style={{ color: '#10b981', fontWeight: '600' }}>Availability:</strong> Open for opportunities
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div style={{ paddingLeft: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="/#home" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: '500' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Home</a>
              <a href="/#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: '500' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>About Journey</a>
              <a href="/#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: '500' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>My Services</a>
              <a href="/#skills" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: '500' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Technical Skills</a>
              <a href="/#projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: '500' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Featured Projects</a>
            </div>
          </div>

          {/* Column 3: Contact & Social */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>Connect & Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Drop me an email</p>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=buttawais2000@gmail.com" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '1.05rem', borderBottom: '1px solid #10b981', paddingBottom: '0.1rem' }}>
                  buttawais2000@gmail.com
                </a>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <a href="https://github.com/Awaisbutt2007" target="_blank" rel="noreferrer" className="glass-panel" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '50%' }}>
                  <GithubIcon size={20} />
                </a>
                <a href="#" className="glass-panel" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '50%' }}>
                  <LinkedinIcon size={20} />
                </a>
              </div>

              <Magnetic>
                <button onClick={handleDownload} className="btn-gradient" style={{ display: 'inline-flex', padding: '0.75rem 1.5rem', width: 'fit-content', marginTop: '0.5rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <FileText size={18} style={{ marginRight: '0.5rem' }} /> Get My Resume
                </button>
              </Magnetic>
              
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>&copy; {new Date().getFullYear()} Awais. All rights reserved.</p>
          <p>Designed with minimalism and performance in mind.</p>
        </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default Footer;
