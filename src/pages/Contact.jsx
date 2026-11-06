import React, { useState } from 'react';
import { Send, Mail, Code2 as GithubIcon, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import FadeIn from '../components/FadeIn';
import PageHeader from '../components/PageHeader';

const CONTACT_EMAIL = 'buttawais2000@gmail.com';
const PROJECT_TYPES = ['SaaS / Web app', 'Desktop software', '3D / animated website', 'API & automation', 'Something else'];

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState(PROJECT_TYPES[0]);
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

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus({ ok: false, text: 'Please fill in all fields before sending.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus({ ok: false, text: 'Please enter a valid email address.' });
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({ ok: false, text: `The form is not available right now. Please email me directly at ${CONTACT_EMAIL}.` });
      return;
    }

    setSending(true);
    setStatus(null);
    const fullMessage = `Project type: ${type}\n\n${trimmedMessage}`;

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: CONTACT_EMAIL,
          to_name: 'Awais',
          subject: `Portfolio contact from ${trimmedName} (${type})`,
          from_name: trimmedName,
          from_email: trimmedEmail,
          user_name: trimmedName,
          user_email: trimmedEmail,
          name: trimmedName,
          email: trimmedEmail,
          reply_to: trimmedEmail,
          project_type: type,
          message: fullMessage,
          content: fullMessage,
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus({ ok: true, text: 'Message sent! I’ll get back to you soon.' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setStatus({ ok: false, text: `Couldn’t send the message. Please email me directly at ${CONTACT_EMAIL}.` });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="cform" onSubmit={handleSubmit} noValidate>
      <div className="cform-field">
        <span className="cform-label">What are you looking for?</span>
        <div className="cform-chips" role="radiogroup" aria-label="Project type">
          {PROJECT_TYPES.map((t) => (
            <button
              type="button"
              key={t}
              role="radio"
              aria-checked={type === t}
              className={type === t ? 'active' : ''}
              onClick={() => setType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="cform-row">
        <label className="cform-field">
          <span className="cform-label">Your name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ali Khan" autoComplete="name" />
        </label>
        <label className="cform-field">
          <span className="cform-label">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" autoComplete="email" />
        </label>
      </div>

      <label className="cform-field">
        <span className="cform-label">Tell me about your project</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What does your business do, what should the software solve, and when do you need it?"
          rows={6}
        />
      </label>

      <button disabled={sending} type="submit" className="btn-gradient cform-submit">
        {sending ? 'Sending…' : 'Send message'} <Send size={16} />
      </button>

      <AnimatePresence>
        {status && (
          <motion.div
            role="status"
            aria-live="polite"
            className={`cform-status ${status.ok ? 'ok' : 'err'}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {status.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{status.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

const info = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`,
  },
  { icon: GithubIcon, label: 'GitHub', value: 'github.com/Awaisbutt2007', href: 'https://github.com/Awaisbutt2007' },
  { icon: MapPin, label: 'Location', value: 'Pakistan · working remotely worldwide' },
  { icon: Clock, label: 'Availability', value: 'Open to freelance & full-time work' },
];

const Contact = () => (
  <>
    <PageHeader
      kicker="Contact"
      title="Let’s build something."
      subtitle="Have a project in mind? Tell me about it and I’ll get back to you with ideas and a plan."
      crumbs={[{ label: 'Contact' }]}
    />

    <section className="contact-section">
      <div className="container contact-grid" style={{ maxWidth: '1200px' }}>
        <FadeIn direction="right">
          <aside className="contact-info">
            <h2>Get in touch</h2>
            <p>Booking system, shop or clinic software, social automation or a 3D website: I build the whole thing, end to end.</p>
            <ul>
              {info.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <span className="contact-icon">
                    <Icon size={20} />
                  </span>
                  <div>
                    <em>{label}</em>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer">
                        {value}
                      </a>
                    ) : (
                      <strong>{value}</strong>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </FadeIn>

        <FadeIn direction="left" delay={0.1}>
          <div className="contact-card">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </section>
  </>
);

export default Contact;
