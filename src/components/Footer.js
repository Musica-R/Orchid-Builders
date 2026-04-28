import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => (
    <footer className="footer">
        <div className="footer-watermark">ORCHID</div>
        <div className="footer-main">
            <div className="f-brand sr">
                <div className="f-logo">
                    <div className="f-logo-dot" />
                    ORCHID BUILDERS
                </div>
                <p>Premier construction company in Palakkad, Kerala. Building dreams with expertise, dedication and a passion for craftsmanship since 2010.</p>
                <div className="f-social">
                    <a className="f-soc" href="https://facebook.com" target="_blank" rel="noreferrer">f</a>
                    <a className="f-soc" href="https://linkedin.com" target="_blank" rel="noreferrer">in</a>
                    <a className="f-soc" href="https://instagram.com" target="_blank" rel="noreferrer">ig</a>
                    <a className="f-soc" href="https://youtube.com" target="_blank" rel="noreferrer">yt</a>
                </div>
            </div>

            <div className="f-col sr d1">
                <h4>Quick Links</h4>
                <ul>
                    {[['Home', '/'], ['About Us', '/about'], ['Services', '/services'], ['Projects', '/projects'], ['Gallery', '/gallery'], ['Contact', '/contact']].map(([l, p]) => (
                        <li key={p}><Link to={p}>{l}</Link></li>
                    ))}
                </ul>
            </div>

            <div className="f-col sr d2">
                <h4>Services</h4>
                <ul>
                    {['Design & Construction', 'Renovation & Remodeling', 'Project Management', 'Interior Design', 'Landscaping', 'Vasthu Consultancy'].map(s => (
                        <li key={s}><Link to="/services">{s}</Link></li>
                    ))}
                </ul>
            </div>

            <div className="f-col sr d3">
                <h4>Contact</h4>
                <div className="f-contact-row">
                    <span className="f-contact-icon">
                        <FaMapMarkerAlt />
                    </span>
                    <div className="f-contact-text">
                        22/26 G.K Tower, Opp Bismi Hyper Mart, Near Stadium Bus Stand, Palakkad 1
                    </div>
                </div>

                <div className="f-contact-row">
                    <span className="f-contact-icon">
                        <FaPhoneAlt />
                    </span>
                    <div className="f-contact-text">
                        +91 907 209 7374<br />+91 938 800 6262
                    </div>
                </div>

                <div className="f-contact-row">
                    <span className="f-contact-icon">
                        <MdEmail />
                    </span>
                    <div className="f-contact-text">
                        orchiddesignerspkd@gmail.com
                    </div>
                </div>
            </div>

        </div>

        <div className="footer-bottom">
            <span>© 2025 Orchid Builders. All Rights Reserved.</span>
            <span>Terms · <Link to="/contact">Privacy Policy</Link> · Cookie Policy</span>
        </div>
    </footer>
);

export default Footer;