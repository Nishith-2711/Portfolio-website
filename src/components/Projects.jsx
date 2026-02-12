import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const projects = [
    {
      title: "Real-Time Tactical Football Analysis with AI",
      description: "Built a computer vision–based football analytics system using YOLOv8 to detect and track players, referees, and footballs in real time with over 90% detection accuracy.",
      technologies: ["Python", "OpenCV", "YOLOv8"],
      features: [
        "Trained a custom YOLO model and applied KMeans clustering, achieving 95% correct team classification",
        "Implemented optical flow and perspective transformation to correct camera motion",
        "Computed player speed and distance within ±5% of ground-truth estimates"
      ],
      date: "September 2025",
      github: "#",
      demo: "#"
    },
    {
      title: "Airflow Feature Extraction From Car Data",
      description: "Developed Physics-Informed Neural Networks (PINNs) in PyTorch to model 3D aerodynamic velocity fields, embedding Navier–Stokes constraints for physics-consistent flow prediction.",
      technologies: ["Python", "PyTorch", "PINNs", "Autoencoders"],
      features: [
        "Utilized DrivAerNet++ dataset and designed autoencoder–KMeans pipeline",
        "Identified distinct aerodynamic regions with 92% clustering accuracy",
        "Optimized preprocessing by reducing CFD input dimensionality by 80%"
      ],
      date: "April 2025",
      github: "#",
      demo: "#"
    },
    {
      title: "Uber Rides Data Analysis",
      description: "Conducted comprehensive exploratory data analysis on over 1M Uber rides dataset to identify trends in ride frequency, trip duration, and peak hours for refined pricing strategies.",
      technologies: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
      features: [
        "Analyzed 1M+ ride records for trend identification",
        "Built interactive visualizations for ride patterns and demand fluctuations",
        "Implemented data preprocessing techniques improving model accuracy by 20%",
        "Created fare correlation analysis for data-driven decision making"
      ],
      date: "January 2025",
      github: "#",
      demo: "#"
    },
    {
      title: "COVID-19 Analytics Portfolio",
      description: "Designed and implemented a comprehensive COVID-19 analytics dashboard using SQL and Tableau, aggregating 500K+ records from public health databases.",
      technologies: ["SQL", "Tableau", "ETL Pipelines"],
      features: [
        "Aggregated 500K+ records from public health databases",
        "Enhanced ETL pipelines reducing data processing time by 40%",
        "Created interactive dashboards with dynamic filtering capabilities",
        "Enabled real-time updates for public health monitoring"
      ],
      date: "October 2024",
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className={`projects ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-date">{project.date}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="tech-stack">
                {project.technologies.map((tech, tIndex) => (
                  <span key={tIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <ul className="project-features">
                {project.features.map((feature, fIndex) => (
                  <li key={fIndex}>{feature}</li>
                ))}
              </ul>
              <div className="project-links">
                <a href={project.github} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  <span>GitHub</span>
                </a>
                <a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
