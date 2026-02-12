import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  const row1 = [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  ];

  const row2 = [
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    { name: "Plotly", icon: "https://cdn.simpleicons.org/plotly" },
    { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
    { name: "Colab", icon: "https://cdn.simpleicons.org/googlecolab" },
    { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
  ];

  const row3 = [
    { name: "Arduino IDE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
    { name: "Matlab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" },
    { name: "LaTeX", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg" },
    { name: "TinkerCAD", icon: "https://www.tinkercad.com/favicon.ico" },
    { name: "AutoCAD", icon: "https://cdn.simpleicons.org/autocad" },
    { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
    { name: "Raspberry Pi", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
    // { name: "FPGA", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Xilinx_logo.svg/200px-Xilinx_logo.svg.png" },
    // { name: "Oscilloscope", icon: "https://cdn-icons-png.flaticon.com/512/3448/3448636.png" },
    // { name: "Sensors", icon: "https://cdn-icons-png.flaticon.com/512/3448/3448658.png" },
  ];

  return (
    <section
      id="skills"
      className={`skills-section ${isVisible ? "visible" : ""}`}
      ref={ref}
    >
      <div className="container-fluid">
        <h2 className="section-title">Technical Skills</h2>

        <div className="marquee-container">
          {/* Helper to render row 4 times for seamless infinite scroll on wide screens */}
          {(() => {
            const renderSkillRow = (row) => (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    {row.map((skill, index) => (
                      <div key={`${i}-${index}`} className="skill-card-marquee">
                        <img src={skill.icon} alt={skill.name} />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </>
            );

            return (
              <>
                {/* Row 1 - Left to Right */}
                <div className="marquee-row marquee-left">
                  <div className="marquee-content">
                    {renderSkillRow(row1)}
                  </div>
                </div>

                {/* Row 2 - Right to Left */}
                <div className="marquee-row marquee-right">
                  <div className="marquee-content">
                    {renderSkillRow(row2)}
                  </div>
                </div>

                {/* Row 3 - Left to Right */}
                <div className="marquee-row marquee-left">
                  <div className="marquee-content">
                    {renderSkillRow(row3)}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default Skills;