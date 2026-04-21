import { lazy, Suspense, Component } from 'react';
import { motion } from 'framer-motion';
import useTypewriter from '../hooks/useTypewriter';

const HeroScene = lazy(() => import('./HeroScene'));

// Error boundary: Three.js crash won't kill the page
class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// Variants use ONLY transform — content is ALWAYS visible (no opacity:0)
// so even if framer-motion is slow to run, text is never hidden
const itemVariants = {
  hidden: { y: 24 },
  visible: (i) => ({
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 + 0.1 },
  }),
};

const Hero = () => {
  const { displayText } = useTypewriter('Nishith Hingoo');

  return (
    <section id="hero" className="hero">
      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </SceneErrorBoundary>

      <div className="hero-content">
        <div className="hero-text">
          <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
            <h2 className="hero-subtitle">Software Engineer</h2>
          </motion.div>

          <motion.h1
            className="hero-title"
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Hi, I'm{' '}
            <span className="highlight">
              {displayText}
              <span className="cursor">|</span>
            </span>
          </motion.h1>

          <motion.p
            className="hero-description"
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Master's student at Rochester Institute of Technology with experience in embedded systems,
            data analysis, and full-stack development. Passionate about creating innovative solutions
            and leveraging technology to solve real-world problems.
          </motion.p>

          <motion.div
            className="hero-buttons"
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="/Nishith_resume.pdf" download="Nishith_Hingoo_Resume.pdf" className="btn btn-secondary">Download Resume</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </motion.div>
        </div>

        <motion.div
          className="hero-image"
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="profile-ring">
            <div className="profile-placeholder">
              <div className="profile-icon">👨‍💻</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;
