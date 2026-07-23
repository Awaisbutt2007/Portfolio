import React, { useState } from 'react';
import { ExternalLink, Code2 as GithubIcon, CheckCircle2, ChevronDown } from 'lucide-react';
import FadeIn from './FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <FadeIn delay={index * 0.2}>
      <div className="glass-panel project-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', padding: '3rem', overflow: 'hidden' }}>

        {/* Left Side: Image with Hover Overlay */}
        <div className="project-img-wrapper" style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', backgroundColor: 'var(--bg-tertiary)', aspectRatio: '16/10', alignSelf: 'start' }}>
          <img
            src={project.image}
            alt={project.title}
            className="project-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
            onError={(e) => {
              if (!e.target.src.endsWith('.JPG')) {
                e.target.src = project.image + '.JPG';
              } else {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }
            }}
          />
          {/* Fallback if image not found */}
          <div style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Image not found (Save as {project.image})
          </div>

          {/* Overlay */}
          <div className="project-overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }}>
            <a href={project.liveLink || '#'} target="_blank" rel="noreferrer" className="btn-gradient" style={{ padding: '0.75rem 1.5rem' }}>
              <ExternalLink size={20} style={{ marginRight: '0.5rem' }} /> Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.1)' }}>
              <GithubIcon size={20} style={{ marginRight: '0.5rem' }} /> GitHub
            </a>
          </div>
        </div>

        {/* Right Side: Details */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>

          {/* Tech Stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {project.tech.map((tech, i) => (
              <span key={i} style={{ fontSize: '0.875rem', padding: '0.25rem 1rem', background: 'linear-gradient(45deg, rgba(16,185,129,0.1), rgba(59,130,246,0.1))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '999px', color: '#fff', fontWeight: '500' }}>
                {tech}
              </span>
            ))}
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
            {project.description}
          </p>

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#10b981',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 0',
              marginBottom: '1rem',
              width: 'fit-content'
            }}
          >
            {isExpanded ? 'Show Less' : 'View Full Details'}
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
              <ChevronDown size={20} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  {/* Problem Solved */}
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#10b981' }}>⚡</span> Problem Solved
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{project.problemSolved}</p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#3b82f6' }}>✨</span> Key Features
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {project.features.map((feature, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={18} style={{ color: '#10b981', marginTop: '0.2rem', flexShrink: 0 }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#8b5cf6' }}>🚀</span> Challenges Overcome
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{project.challenges}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </FadeIn>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'AI Cloth Design',
      description: 'An innovative AI-powered application that helps users generate and visualize clothing designs based on textual descriptions and style preferences.',
      problemSolved: 'Bridging the gap between fashion imagination and digital prototyping, allowing designers and enthusiasts to instantly see their ideas before production.',
      features: [
        'Text-to-Image Generation for apparel',
        'Customizable color palettes and patterns',
        'Interactive 3D preview of designs',
        'Export capabilities for manufacturing'
      ],
      challenges: 'Handling the asynchronous nature of AI model inference while keeping the UI responsive and providing real-time feedback to the user.',
      tech: ['React', 'Tailwind CSS', 'OpenAI API', 'Node.js'],
      liveLink: 'https://ai-cloth-design.vercel.app/',
      link: '#',
      github: 'https://github.com/Awaisbutt2007/Ai-Cloth-Design.git',
      image: '/ai-cloth.jpg.png'
    }
  ];

  return (
    <section className="section" id="projects" style={{ paddingTop: '6rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <FadeIn>
          <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff' }}>
              Featured Projects
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
              A deep dive into my most significant builds, showcasing problem-solving and technical execution.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
