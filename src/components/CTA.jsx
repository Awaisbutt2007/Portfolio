import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

const CTA = ({ title = 'Have an idea? Let’s build it.', text = 'Booking system, shop software, social automation or a 3D website: tell me what you need and I’ll reply with a plan.' }) => (
  <section className="cta-band">
    <div className="container" style={{ maxWidth: '1000px' }}>
      <FadeIn>
        <div className="cta-card">
          <h2>{title}</h2>
          <p>{text}</p>
          <Link to="/contact" className="btn-primary" style={{ gap: '0.5rem' }}>
            Start a project <ArrowRight size={18} />
          </Link>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default CTA;
