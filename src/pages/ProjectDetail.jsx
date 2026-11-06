import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Code2 as GithubIcon, CheckCircle2, Mail } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { projects } from '../data/projects';
import NotFound from './NotFound';

const CATEGORY_LABEL = { platform: 'SaaS / Platform', desktop: 'Desktop Software', website: '3D & Animated Website' };
const TYPE = {
  platform: 'Web platform',
  desktop: 'Desktop + offline app',
  website: 'Marketing / brand website',
};

const ProjectDetail = () => {
  const { id } = useParams();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];

  useEffect(() => {
    if (project) document.title = `${project.title} | Awais Butt`;
    return () => {
      document.title = 'Awais - Portfolio';
    };
  }, [project]);

  if (!project) return <NotFound />;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const related = projects.filter((p) => p.category === project.category && p.id !== project.id).slice(0, 3);
  const [a, b] = project.accent;

  return (
    <article className="pdetail" style={{ '--a': a, '--b': b }}>
      {/* Header */}
      <section className="pdetail-hero">
        <div className="pdetail-glow" />
        <div className="container" style={{ maxWidth: '1200px', position: 'relative' }}>
          <Link to="/projects" className="pdetail-back">
            <ArrowLeft size={16} /> All projects
          </Link>
          <motion.span className="pcat" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {CATEGORY_LABEL[project.category]}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {project.title}
          </motion.h1>
          <motion.p className="pdetail-tagline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            {project.tagline}
          </motion.p>
          <motion.div className="plinks" style={{ marginTop: '1.75rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-gradient">
                <ExternalLink size={16} style={{ marginRight: '0.4rem' }} /> Visit live site
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary">
                <GithubIcon size={16} style={{ marginRight: '0.4rem' }} /> Source code
              </a>
            )}
            <Link to="/contact" className="btn-secondary">
              <Mail size={16} style={{ marginRight: '0.4rem' }} /> Want one like this?
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Media */}
      <div className="container" style={{ maxWidth: '1200px' }}>
        <motion.div
          className="pdetail-media"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.17, 0.55, 0.55, 1] }}
        >
          {project.video ? (
            <video src={project.video} controls muted autoPlay loop playsInline poster={project.image} />
          ) : project.image ? (
            <img src={project.image} alt={`${project.title} screenshot`} />
          ) : (
            <div className="pmedia-cover" style={{ position: 'relative', aspectRatio: '16/8' }}>
              <div className="pmedia-grid" />
              <span style={{ fontSize: '2.5rem' }}>{project.title}</span>
            </div>
          )}
        </motion.div>

        {/* Facts */}
        <FadeIn>
          <div className="pdetail-facts">
            <div>
              <span>Type</span>
              <strong>{TYPE[project.category]}</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>Design, development & delivery</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{project.liveLink ? 'Live' : project.category === 'desktop' ? 'Shipped (.exe)' : 'Built'}</strong>
            </div>
            <div className="pdetail-stack">
              <span>Stack</span>
              <div className="ptech">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Case study */}
        <div className="pdetail-body">
          <FadeIn>
            <section>
              <h2>Overview</h2>
              <p>{project.description || project.tagline}</p>
            </section>
          </FadeIn>

          {project.problemSolved && (
            <FadeIn>
              <section>
                <h2>The problem</h2>
                <p>{project.problemSolved}</p>
              </section>
            </FadeIn>
          )}

          {project.features && (
            <FadeIn>
              <section>
                <h2>What I built</h2>
                <ul className="pdetail-features">
                  {project.features.map((f) => (
                    <li key={f}>
                      <CheckCircle2 size={18} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          )}

          {project.challenges && (
            <FadeIn>
              <section>
                <h2>Hardest part</h2>
                <p>{project.challenges}</p>
              </section>
            </FadeIn>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <FadeIn>
            <section className="pdetail-related">
              <h2>More {CATEGORY_LABEL[project.category].toLowerCase()} work</h2>
              <div className="pgrid">
                {related.map((r) => (
                  <Link key={r.id} to={`/projects/${r.id}`} className="prelated" style={{ '--a': r.accent[0], '--b': r.accent[1] }}>
                    <div className="pmedia pmedia-compact">
                      {r.image ? (
                        <img src={r.image} alt={r.title} loading="lazy" />
                      ) : (
                        <div className="pmedia-cover">
                          <div className="pmedia-grid" />
                          <span>{r.title}</span>
                        </div>
                      )}
                    </div>
                    <div className="pcompact-body">
                      <h3>{r.title}</h3>
                      <p>{r.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        {/* Prev / next */}
        <nav className="pdetail-pager">
          <Link to={`/projects/${prev.id}`}>
            <ArrowLeft size={18} />
            <span>
              <em>Previous</em>
              {prev.title}
            </span>
          </Link>
          <Link to={`/projects/${next.id}`} className="next">
            <span>
              <em>Next</em>
              {next.title}
            </span>
            <ArrowRight size={18} />
          </Link>
        </nav>
      </div>
    </article>
  );
};

export default ProjectDetail;
