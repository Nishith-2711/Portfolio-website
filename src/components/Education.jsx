import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Education = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const education = [
    {
      institution: "Rochester Institute of Technology",
      degree: "Master of Science in Computer Science",
      duration: "Expected May 2026",
      location: "Rochester, NY",
      relevantCoursework: ["Data Structures", "Computer Vision", "Deep Learning", "Natural Language Processing"],
      status: "current"
    },
    {
      institution: "BMS College Of Engineering",
      degree: "Bachelor of Science in Electronics And Communication",
      duration: "August 2019 - May 2023",
      location: "Bangalore, Karnataka",
      // relevantCoursework: ["Data Structures", "Computer Vision", "Deep Learning", "Natural Language Processing"],
      status: "completed"
    }
  ];

  return (
    <section id="education" className={`education ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-timeline">
          {education.map((edu, index) => (
            <div key={index} className={`education-item ${edu.status}`}>
              <div className="education-header">
                <h3 className="institution">{edu.institution}</h3>
                <h4 className="degree">{edu.degree}</h4>
                <div className="education-meta">
                  <span className="duration">{edu.duration}</span>
                  <span className="location">{edu.location}</span>
                </div>
                {edu.status === 'current' && (
                  <span className="status-badge">Current</span>
                )}
              </div>
              {edu.relevantCoursework && (
                <div className="coursework">
                  <h5>Relevant Coursework:</h5>
                  <div className="coursework-list">
                    {edu.relevantCoursework.map((course, cIndex) => (
                      <span key={cIndex} className="course-tag">{course}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
