import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from "./Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
// import Contact from "./components/Contact";
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
          {/* <Contact /> */}
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <p>&copy; 2025 Nishith Hingoo. All rights reserved.</p>
              <div className="footer-links">
                <a href="https://linkedin.com/in/nishithhingoo" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/Nishith-2711" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="mailto:nishithhingoo@gmail.com">Email</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App
