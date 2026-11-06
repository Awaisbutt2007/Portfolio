import React from 'react';
import PageHeader from '../components/PageHeader';
import Projects from '../components/Projects';
import CTA from '../components/CTA';
import { stats } from '../data/projects';

const ProjectsPage = () => (
  <>
    <PageHeader
      kicker="Portfolio"
      title="Projects"
      subtitle={`${stats.total} products: ${stats.platforms} SaaS platforms, ${stats.desktop} desktop apps used by real businesses, and ${stats.websites} 3D / animated websites. Open any project for the full case study.`}
      crumbs={[{ label: 'Projects' }]}
    />
    <Projects hideHeading />
    <CTA />
  </>
);

export default ProjectsPage;
