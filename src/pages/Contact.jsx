import React from 'react';
import { Mail, MapPin, Phone, ArrowLeft, Send } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="nav-header">
        <div className="container nav-container">
          <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: '8rem', paddingBottom: '4rem' }}>
        <section className="container" style={{ width: '100%' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem', color: '#fff' }}>
                Get in <span className="text-gradient">Touch.</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                Have a project in mind or just want to say hi? I'd love to hear from you. Let's create something amazing together.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
              
              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--accent)' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Email</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>hello@awais.dev</p>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--accent)' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Phone</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--accent)' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Location</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>San Francisco, CA</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      style={{ width: '100%', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '1rem', outline: 'none' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      style={{ width: '100%', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '1rem', outline: 'none' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Message</label>
                    <textarea 
                      placeholder="Your message..." 
                      rows={5}
                      style={{ width: '100%', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }} 
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', padding: '1rem' }}>
                    Send Message <Send size={18} />
                  </button>
                </form>
              </div>

            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
};

export default Contact;
