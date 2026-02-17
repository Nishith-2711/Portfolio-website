import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from "./Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingParticles from "./components/FloatingParticles";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <FloatingParticles />
        <ScrollToTop />
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App
