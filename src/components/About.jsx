import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="about" className={`about ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="about-inner">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate Computer Science graduate student at Rochester Institute of Technology,
              with a strong foundation in software engineering and embedded systems. My journey in
              technology began with a Bachelor's in Electronics and Communication Engineering, which
              gave me a unique perspective on both hardware and software integration.
            </p>
            <p>
              During my internship at Qualcomm, I worked on embedded systems and automotive applications,
              where I developed expertise in performance optimization and cross-platform tool development.
              I'm particularly interested in data analysis, machine learning, and creating tools that
              improve developer productivity.
            </p>
            <p>
              When I'm not coding, I enjoy contributing to open-source projects, volunteering for
              community initiatives, and exploring new technologies. I believe in using technology
              as a force for good and am always eager to take on new challenges.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <h3>2+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h3>10+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat">
              <h3>1</h3>
              <p>Research Paper Published</p>
            </div>
            <div className="stat">
              <h3>95%</h3>
              <p>Solution Accuracy Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
