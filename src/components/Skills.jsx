import React, { useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [activeTab, setActiveTab] = useState("Programming Languages");

  const skills = [
    {
      section: "Programming Languages",
      items: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }
      ]
    },
    {
      section: "Frameworks & Libraries",
      items: [
        { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
        { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
        { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
        { name: "Plotly", icon: "https://images.plot.ly/logo/new-plotly-logo.png" },
        { name: "Matplotlib", icon: "https://matplotlib.org/stable/_static/logo2_compressed.svg" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
      ]
    },
    {
      section: "Software & Tools",
      items: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Jupyter Notebook", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
        { name: "Google Colab", icon: "https://colab.research.google.com/img/colab_favicon_256px.png" },
        { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
        { name: "Arduino IDE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
        { name: "Matlab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" },
        { name: "LaTeX", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg" },
        { name: "TinkerCAD", icon: "https://www.tinkercad.com/favicon.ico" },
        { name: "AutoCAD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/autocad/autocad-original.svg" }
      ]
    },
    {
      section: "Embedded & Hardware",
      items: [
        { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
        { name: "Raspberry Pi", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
        { name: "FPGA (Xilinx)", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Xilinx_logo.svg/200px-Xilinx_logo.svg.png" },
        { name: "Oscilloscope", icon: "https://cdn-icons-png.flaticon.com/512/3448/3448636.png" },
        { name: "Sensors", icon: "https://cdn-icons-png.flaticon.com/512/3448/3448658.png" }
      ]
    },
    {
      section: "Databases",
      items: [
        { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
      ]
    }
  ];

  return (
    <section
      id="skills"
      className={`skills-section ${isVisible ? "visible" : ""}`}
      ref={ref}
    >
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>

        <div className="skills-tabs">
          {skills.map((category) => (
            <button
              key={category.section}
              className={`tab-btn ${activeTab === category.section ? "active" : ""}`}
              onClick={() => setActiveTab(category.section)}
            >
              {category.section}
            </button>
          ))}
        </div>

        <div className="skills-content-display">
          {skills
            .filter((category) => category.section === activeTab)
            .map((category, index) => (
              <div key={index} className="skills-category-content">
                <div className="skills-grid">
                  {category.items.map((skill, idx) => (
                    <div key={idx} className="skill-item">
                      <div className="skill-icon">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <span style={{ display: 'none' }}>{skill.name.charAt(0)}</span>
                      </div>

                      <div className="skill-content">
                        <div className="skill-name">{skill.name}</div>
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


export default Skills;