import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Research from './components/Research';
import Certifications from './components/Certifications';
import Resume from './components/Resume';
import Contact from './components/Contact';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Hero />
        <About />
        <Projects />
        <Research />
        <Certifications />
        <Resume />
        <Contact />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
