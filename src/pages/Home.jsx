import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import CTA from '../components/CTA';

function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <About />
      <Services />
      <Projects />
      <Experience />
      <CTA />
    </>
  );
}

export default Home;
