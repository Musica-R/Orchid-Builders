import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Projects', path: '/projects' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'solid' : ''} ${menuOpen ? 'menu-open' : ''}`}>
            <Link to="/" className="nav-logo">
                <div className="nav-logo-dot" />
                ORCHID BUILDERS
            </Link>

            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                {navLinks.map(link => (
                    <li key={link.path}>
                        <Link
                            to={link.path}
                            className={location.pathname === link.path ? 'active' : ''}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li className="mobile-cta">
                    <Link to="/contact" className="nav-cta-link">Free Quote</Link>
                </li>
            </ul>

            <div className="nav-right">
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    {isDark ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>
                <Link to="/contact" className="nav-cta">Free Quote</Link>
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className={menuOpen ? 'open' : ''}></span>
                    <span className={menuOpen ? 'open' : ''}></span>
                    <span className={menuOpen ? 'open' : ''}></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;