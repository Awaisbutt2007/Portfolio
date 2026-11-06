import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHeader = ({ kicker, title, subtitle, crumbs = [] }) => (
  <section className="page-header">
    <div className="page-header-glow" />
    <div className="container" style={{ maxWidth: '1200px', position: 'relative' }}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        {crumbs.map((c) => (
          <React.Fragment key={c.label}>
            <ChevronRight size={14} />
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
          </React.Fragment>
        ))}
      </nav>
      <motion.span className="hero-kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {kicker}
      </motion.span>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          {subtitle}
        </motion.p>
      )}
    </div>
  </section>
);

export default PageHeader;
