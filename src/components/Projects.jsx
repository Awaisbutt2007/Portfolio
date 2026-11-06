import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ExternalLink,
  Code2 as GithubIcon,
  CheckCircle2,
  ChevronDown,
  CalendarCheck,
  Share2,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  Smartphone,
  BookOpen,
  Globe,
  Play,
} from 'lucide-react';
import FadeIn from './FadeIn';
import { projects, categories } from '../data/projects';

const ICONS = {
  calendar: CalendarCheck,
  share: Share2,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  utensils: UtensilsCrossed,
  smartphone: Smartphone,
  book: BookOpen,
};

const CATEGORY_LABEL = {
  platform: 'SaaS / Platform',
  desktop: 'Desktop Software',
  website: 'Website',
};

/* Media: video (plays while on screen), image, or a generated gradient cover */
const Media = ({ project, compact }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [imgOk, setImgOk] = useState(true);
  const [a, b] = project.accent;
  const Icon = ICONS[project.icon] || Globe;

  React.useEffect(() => {
    const v = ref.current?.querySelector('video');
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <div ref={ref} className={`pmedia ${compact ? 'pmedia-compact' : ''}`} style={{ '--a': a, '--b': b }}>
      {project.video ? (
        <>
          <video src={project.video} muted loop playsInline preload="metadata" />
          <span className="pmedia-tag"><Play size={12} /> Product walkthrough</span>
        </>
      ) : project.image && imgOk ? (
        <img src={project.image} alt={project.title} loading="lazy" onError={() => setImgOk(false)} />
      ) : (
        <div className="pmedia-cover">
          <div className="pmedia-grid" />
          <Icon size={compact ? 40 : 64} strokeWidth={1.4} />
          <span>{project.title}</span>
        </div>
      )}
      <div className="pmedia-shine" />
    </div>
  );
};

const Tech = ({ tech }) => (
  <div className="ptech">
    {tech.map((t) => (
      <span key={t}>{t}</span>
    ))}
  </div>
);

const FeaturedCard = ({ project, index }) => {
  const [open, setOpen] = useState(false);
  const reverse = index % 2 === 1;

  return (
    <FadeIn>
      <article className={`pfeatured glass-panel ${reverse ? 'reverse' : ''}`} style={{ '--a': project.accent[0], '--b': project.accent[1] }}>
        <Media project={project} />

        <div className="pfeatured-body">
          <span className="pcat">{CATEGORY_LABEL[project.category]}</span>
          <h3>{project.title}</h3>
          <p className="ptagline">{project.tagline}</p>
          <Tech tech={project.tech} />
          <p className="pdesc">{project.description}</p>

          <div className="plinks">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-gradient">
                <ExternalLink size={16} style={{ marginRight: '0.4rem' }} /> Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary">
                <GithubIcon size={16} style={{ marginRight: '0.4rem' }} /> GitHub
              </a>
            )}
            <button className="ptoggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? 'Show less' : 'Case study'}
              <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ display: 'inline-flex' }}>
                <ChevronDown size={18} />
              </motion.span>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div className="pdetails">
                  <div>
                    <h4>⚡ Problem solved</h4>
                    <p>{project.problemSolved}</p>
                  </div>
                  <div>
                    <h4>✨ Key features</h4>
                    <ul>
                      {project.features.map((f) => (
                        <li key={f}>
                          <CheckCircle2 size={16} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>🚀 Challenge</h4>
                    <p>{project.challenges}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </FadeIn>
  );
};

const CompactCard = ({ project }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    ref.current.style.transform = '';
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3 }}
    >
      <div ref={ref} className="pcompact" onMouseMove={onMove} onMouseLeave={onLeave} style={{ '--a': project.accent[0], '--b': project.accent[1] }}>
        <Media project={project} compact />
        <div className="pcompact-body">
          <span className="pcat">{CATEGORY_LABEL[project.category]}</span>
          <h3>{project.title}</h3>
          <p>{project.tagline}</p>
          <Tech tech={project.tech} />
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const visible = projects.filter((p) => filter === 'all' || p.category === filter);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);
  const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.category === id).length);

  return (
    <section className="section" id="projects" style={{ paddingTop: '6rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <FadeIn>
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 className="section-title">Things I’ve Built</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              SaaS platforms, offline desktop software used by real businesses, and 3D animated websites, built end to end.
            </p>
          </div>
        </FadeIn>

        <div className="pfilters" role="tablist">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={filter === c.id}
              className={filter === c.id ? 'active' : ''}
              onClick={() => setFilter(c.id)}
            >
              {filter === c.id && <motion.span layoutId="pfilter-pill" className="pfilter-pill" />}
              <span className="pfilter-label">
                {c.label} <em>{count(c.id)}</em>
              </span>
            </button>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="pfeatured-list">
            {featured.map((p, i) => (
              <FeaturedCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <>
            {featured.length > 0 && <h3 className="pmore-title">More work</h3>}
            <motion.div layout className="pgrid">
              <AnimatePresence mode="popLayout">
                {rest.map((p) => (
                  <CompactCard key={p.id} project={p} />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
