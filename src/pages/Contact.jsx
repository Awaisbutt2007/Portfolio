import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const CONTACT_EMAIL = 'buttawais2000@gmail.com';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus({ ok: false, text: 'Please fill in all fields before sending.' });
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setStatus({ ok: false, text: 'Please enter a valid email address.' });
      return;
    }
    setSending(true);
    setStatus(null);

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSending(false);
      setStatus({ ok: false, text: 'Email service configuration is missing. Restart the dev server.' });
      return;
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: CONTACT_EMAIL,
        to_name: 'Awais',
        subject: `Portfolio contact from ${trimmedName}`,
        from_name: trimmedName,
        from_email: trimmedEmail,
        user_name: trimmedName,
        user_email: trimmedEmail,
        name: trimmedName,
        email: trimmedEmail,
        reply_to: trimmedEmail,
        message: trimmedMessage,
        content: trimmedMessage,
      }, { publicKey: PUBLIC_KEY });
      setStatus({ ok: true, text: 'Message sent successfully.' });
      setName(''); setEmail(''); setMessage('');
    } catch (error) {
      console.error('EmailJS send failed:', error);
      const errorText = error?.text || error?.message || 'EmailJS rejected the request.';
      setStatus({ ok: false, text: `EmailJS error: ${errorText}` });
    } finally {
      setSending(false);
    }
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" style={{ width: '100%', padding: '0.9rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.9rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message..." rows={6} style={{ width: '100%', padding: '0.9rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }} />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button disabled={sending} type="submit" className="btn-primary" style={{ flex: 1, padding: '0.9rem 1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {sending ? 'Sending...' : 'Send Message'} <Send size={16} />
        </button>
      </div>

      {status && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            right: '1.5rem',
            bottom: '1.5rem',
            zIndex: 10000,
            maxWidth: 'min(360px, calc(100vw - 3rem))',
            padding: '0.9rem 1.1rem',
            border: `1px solid ${status.ok ? 'rgba(16,185,129,0.5)' : 'rgba(248,113,113,0.5)'}`,
            borderRadius: '8px',
            background: 'var(--bg-secondary)',
            color: status.ok ? '#6ee7b7' : '#fca5a5',
            boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
            fontSize: '0.9rem'
          }}
        >
          {status.text}
        </div>
      )}

    </form>
  );
};

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
                Have a project in mind? Send me a message and I will get back to you.
              </p>
            </div>

            <div className="glass-panel" style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
              <ContactForm />
            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
};

export default Contact;
