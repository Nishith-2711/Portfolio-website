import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="about" className={`about ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="about-inner">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text-terminal">
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">nishith_profile.js</span>
            </div>
            <div className="terminal-body">
              <p>
                <span className="keyword">const</span> <span className="variable">nishith</span> = {'{'}
              </p>
              <div className="indent">
                <p>
                  <span className="property">role</span>: <span className="string">"Software Engineer & Embedded Systems Enthusiast"</span>,
                </p>
                <p>
                  <span className="property">education</span>: <span className="string">"MS in Computer Science @ RIT"</span>,
                </p>
                <p>
                  <span className="property">passion</span>: [<span className="string">"Coding"</span>, <span className="string">"IoT"</span>, <span className="string">"Open Source"</span>],
                </p>
                <p>
                  <span className="property">mission</span>: <span className="string">"Building efficient, scalable systems that bridge hardware and software."</span>
                </p>
              </div>
              <p>{'};'}</p>
              <br />
              <p>
                <span className="comment">// Hello! I'm a developer who loves diving deep into code.</span>
              </p>
              <p>
                <span className="comment">// Whether it's optimizing embedded firmware or building dynamic web apps, I enjoy the challenge of solving complex problems.</span>
              </p>
              <p>
                <span className="function">console</span>.<span className="method">log</span>(<span className="string">"Let's build something amazing together!"</span>);
              </p>
            </div>
          </div>
          <div className="about-stats-container">
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
                <p>Research Paper</p>
              </div>
              <div className="stat">
                <h3>95%</h3>
                <p>Solution Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
