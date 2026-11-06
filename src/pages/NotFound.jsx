import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <section className="section" style={{ minHeight: '80vh', textAlign: 'center', alignItems: 'center' }}>
    <div className="container">
      <h1 className="text-gradient-color" style={{ fontSize: 'clamp(5rem, 18vw, 10rem)', lineHeight: 1 }}>404</h1>
      <p className="section-sub" style={{ margin: '1rem auto 2rem' }}>This page doesn’t exist, or it moved.</p>
      <Link to="/" className="btn-primary" style={{ gap: '0.5rem' }}>
        <ArrowLeft size={18} /> Back home
      </Link>
    </div>
  </section>
);

export default NotFound;
