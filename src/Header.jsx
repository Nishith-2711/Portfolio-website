import React, { useState, useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Education', href: '#education' },
        { name: 'Contact', href: '#contact' }
    ];

    const handleNavClick = (href) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
                            <span className="logo-text">Nishith Hingoo</span>
                        </a>
                    </div>
                    
                    <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
                        <ul className="nav-list">
                            {navItems.map((item, index) => (
                                <li key={index} className="nav-item">
                                    <a 
                                        href={item.href} 
                                        className="nav-link"
                                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="header-actions">
                        <ThemeToggle />
                        <button 
                            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header