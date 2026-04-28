import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../components/useScrollReveal';
import '../styles/InnerPage.css';
import { FaPencilRuler, FaBuilding, FaSmile, FaCogs } from "react-icons/fa";
import { FaBullseye, FaEye, FaLightbulb } from "react-icons/fa";
import AboutHero from '../components/Abouthero';

const About = () => {
    useScrollReveal();

    return (
        <div className="inner-page">
            {/* HERO BANNER */}
          
           <AboutHero />

            {/* INTRO */}
            <section className="ip-section">
                <div className="ip-two-col">
                    <div className="sr-l">
                        <div className="ip-img-wrap">
                            <img src="https://orchidbuilders.in/admin/uploads/image/dummy-projects/a1.jpg" alt="Orchid Builders Team"
                                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'; }} />
                            <div className="ip-img-badge">
                                <span className="badge-num">15</span>
                                <span className="badge-txt">Years of Excellence</span>
                            </div>
                        </div>
                    </div>
                    <div className="sr-r">
                        <div className="sec-tag">Welcome</div>
                        <h2 className="sec-title">Your Trusted<br /><span className="hl">Construction Partner</span></h2>
                        <p className="sec-desc" style={{ marginBottom: 18 }}>
                            Welcome to Orchid Builders in Palakkad! Whether you're looking to transform your home or office space from the best construction company in Palakkad, Orchid Builders is dedicated to delivering top-notch construction services tailored to your needs. With a focus on quality craftsmanship and client satisfaction, we strive to exceed expectations in every project we undertake.
                        </p>
                        <p className="sec-desc" style={{ marginBottom: 18 }}>
                            At Orchid Builders, we believe in the power of collaboration and communication. From the moment you reach out to us, our team works closely with you to understand your vision and bring it to life. We take pride in our attention to detail and commitment to delivering results that not only meet but exceed your expectations.
                        </p>
                        <p className="sec-desc">
                            We're more than just a construction company — we're your partners in turning your dreams into reality. Welcome to Orchid Builders, where excellence in construction meets unparalleled customer service.
                        </p>
                        <Link to="/contact" className="btn-glow" style={{ marginTop: 32, display: 'inline-block', textDecoration: 'none' }}>Start Your Project</Link>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="ip-section ip-dark-sec">
                <div className="ip-stats">
                    {[
                        { icon: <FaPencilRuler />, num: '1350+', lbl: 'Design Drawings' },
                        { icon: <FaBuilding />, num: '350+', lbl: 'Projects Completed' },
                        { icon: <FaSmile />, num: '250+', lbl: 'Happy Clients' },
                        { icon: <FaCogs />, num: '18+', lbl: 'Projects Running' },
                    ].map((s, i) => (
                        <div className={`ip-stat-card sr d${i}`} key={i}>
                            <div className="ip-stat-icon">{s.icon}</div>
                            <div className="ip-stat-num">{s.num}</div>
                            <div className="ip-stat-lbl">{s.lbl}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MISSION / VISION */}
            <section className="ip-section">
                <div className="ip-center-header sr">
                    <div className="sec-tag" style={{ justifyContent: 'center' }}>Our Foundation</div>
                    <h2 className="sec-title" style={{ textAlign: 'center' }}>Mission & <span className="hl">Vision</span></h2>
                </div>
                <div className="ip-mv-grid">

                    <div className="ip-mv-card sr">
                        <div className="ip-mv-icon"> <FaBullseye /></div>
                        <h3>Our Mission</h3>
                        <p>To deliver world-class construction services that transform our clients' visions into reality, while maintaining the highest standards of quality, safety, and customer satisfaction in every project we undertake.</p>
                    </div>
                    <div className="ip-mv-card sr d1">
                        <div className="ip-mv-icon"> <FaEye /></div>
                        <h3>Our Vision</h3>
                        <p>To be the most trusted and innovative construction company in Kerala and Tamil Nadu — creating architectural masterpieces that stand as testaments to human creativity, precision, and enduring quality.</p>
                    </div>
                    <div className="ip-mv-card sr d2">
                        <div className="ip-mv-icon"> <FaLightbulb /></div>
                        <h3>Our Values</h3>
                        <p>Integrity, excellence, innovation and collaboration are the cornerstones of everything we do. We believe every client deserves transparency, respect, and a result that exceeds their expectations.</p>
                    </div>

                </div>
            </section>

            {/* TEAM */}
            <section className="ip-section ip-alt-sec">
                <div className="ip-center-header sr">
                    <div className="sec-tag" style={{ justifyContent: 'center' }}>Our People</div>
                    <h2 className="sec-title" style={{ textAlign: 'center' }}>Meet the <span className="hl">Team</span></h2>
                    <p className="sec-desc" style={{ margin: '0 auto', textAlign: 'center' }}>Experienced professionals dedicated to bringing your construction vision to life.</p>
                </div>
                <div className="ip-team-grid">
                    {[
                        { name: 'Mohammed Shajahan', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
                        { name: 'Ar. Priya Menon', role: 'Lead Architect', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
                        { name: 'Rajesh Pillai', role: 'Project Manager', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
                        { name: 'Anitha Kumar', role: 'Interior Designer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
                    ].map((m, i) => (
                        <div className={`ip-team-card sr d${i}`} key={i}>
                            <div className="ip-team-img">
                                <img src={m.img} alt={m.name} />
                            </div>
                            <div className="ip-team-info">
                                <div className="ip-team-name">{m.name}</div>
                                <div className="ip-team-role">{m.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="ip-cta-band">
                <div className="cta-glow" />
                <div className="sr-l">
                    <h3>Get Started on Your Dream Project Today!</h3>
                    <p>Let's build something incredible together. Contact Orchid Builders now for a free consultation.</p>
                </div>
                <Link to="/contact" className="btn-glow sr-r" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Contact Us</Link>
            </div>
        </div>
    );
};

export default About;