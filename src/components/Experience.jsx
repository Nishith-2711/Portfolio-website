import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Experience = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const experiences = [
    {
      company: "Qualcomm",
      position: "Software Engineering Intern - Embedded and Automotive Team",
      duration: "February 2023 - July 2023",
      location: "Bangalore, Karnataka",
      companyLogo: "📡",
      description: "Worked on embedded systems and automotive applications, focusing on performance optimization and cross-platform tool development for the automotive industry.",
      projects: [
        {
          title: "Performance Monitoring Unit (PMU) Optimization",
          technologies: ["C", "Embedded C", "QNX 7.1.0 OS"],
          achievements: [
            "Addressed hardware limitations by enabling profiling of more than 6 PMU events within a single time period using CPU-PMU registers",
            "Optimized profiling efficiency by implementing time multiplexing, evenly distributing time across event sets",
            "Reduced profiling time by 50% through efficient event management",
            "Improved system performance monitoring capabilities for automotive applications"
          ],
          impact: "Enhanced performance monitoring for automotive systems, enabling better optimization and debugging capabilities."
        },
        {
          title: "Cross-Platform Automation Tool",
          technologies: ["Python", "Plotly", "Pandas"],
          achievements: [
            "Developed cross-platform tool for Windows and Linux to automate reporting and result parsing",
            "Streamlined workflows for over 10 sister teams with 95% accuracy rate",
            "Created interactive tool for generating profiler data reports, reducing analysis time by 60%",
            "Enabled web embedding capabilities for more than 10 teams",
            "Implemented data correlation algorithms to validate solution reliability"
          ],
          impact: "Significantly improved team productivity and data analysis efficiency across multiple engineering teams."
        }
      ]
    }
  ];

  return (
    <section id="experience" className={`experience ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div className="company-info">
                  <span className="company-logo">{exp.companyLogo}</span>
                  <div>
                    <h3 className="company-name">{exp.company}</h3>
                    <h4 className="position">{exp.position}</h4>
                  </div>
                </div>
                <div className="experience-meta">
                  <span className="duration">{exp.duration}</span>
                  <span className="location">{exp.location}</span>
                </div>
              </div>
              <p className="experience-description">{exp.description}</p>
              <div className="experience-projects">
                {exp.projects.map((project, pIndex) => (
                  <div key={pIndex} className="project">
                    <h5 className="project-title">{project.title}</h5>
                    <div className="tech-stack">
                      {project.technologies.map((tech, tIndex) => (
                        <span key={tIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <ul className="achievements">
                      {project.achievements.map((achievement, aIndex) => (
                        <li key={aIndex}>{achievement}</li>
                      ))}
                    </ul>
                    <div className="project-impact">
                      <strong>Impact:</strong> {project.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
