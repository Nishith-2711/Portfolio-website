import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
// Import your LinkedIn photo - replace 'linkedin-photo.jpg' with your actual photo filename
// import linkedinPhoto from '../assets/images/linkedin-photo.jpg';

const Hero = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <section id="hero" className={`hero ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Nishith Hingoo</span>
          </h1>
          <h2 className="hero-subtitle">Software Engineer</h2>
          <p className="hero-description">
            Master's student at Rochester Institute of Technology with experience in embedded systems,
            data analysis, and full-stack development. Passionate about creating innovative solutions
            and leveraging technology to solve real-world problems.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-placeholder">
            <div className="profile-icon">👨‍💻</div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;
