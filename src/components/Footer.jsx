import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Column */}
                    <div className="footer-col brand-col">
                        <div className="footer-logo">
                            <span className="logo-text">Nishith Hingoo</span>
                        </div>
                        <p className="footer-tagline">
                            Building digital experiences with passion and precision.
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div className="footer-col links-col">
                        <h3>Quick Links</h3>
                        <ul className="footer-nav">
                            <li><button onClick={() => scrollToSection('hero')}>Home</button></li>
                            <li><button onClick={() => scrollToSection('about')}>About</button></li>
                            <li><button onClick={() => scrollToSection('experience')}>Experience</button></li>
                            <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
                            <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
                        </ul>
                    </div>

                    {/* Contact & Social Column */}
                    <div className="footer-col social-col">
                        <h3>Connect</h3>
                        <p>Feel free to reach out for collaborations or just to say hi!</p>
                        <div className="footer-socials">
                            <a href="https://github.com/Nishith-2711" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/nishithhingoo" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="mailto:nishithhingoo@gmail.com" className="footer-social-link" aria-label="Email">
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        &copy; {currentYear} Nishith Hingoo. All rights reserved.
                    </p>
                    {/* <p className="footer-credit">
                        Made with <FaHeart className="heart-icon" /> and React
                    </p> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
