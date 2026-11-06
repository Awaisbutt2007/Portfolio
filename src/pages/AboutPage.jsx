import React from 'react';
import PageHeader from '../components/PageHeader';
import About from '../components/About';
import Experience from '../components/Experience';
import CTA from '../components/CTA';

const AboutPage = () => (
  <>
    <PageHeader
      kicker="About me"
      title="From Hifz to full-stack."
      subtitle="Self-taught developer from Pakistan building software that small businesses actually use every day."
      crumbs={[{ label: 'About' }]}
    />
    <About />
    <Experience />
    <CTA title="Let’s work together." />
  </>
);

export default AboutPage;
