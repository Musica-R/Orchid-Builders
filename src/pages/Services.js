import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../components/useScrollReveal';
import '../styles/InnerPage.css';
import { FaDraftingCompass, FaTools, FaProjectDiagram, FaLeaf, FaHome, FaCouch, FaRulerCombined, FaFileInvoiceDollar, FaBuilding } from "react-icons/fa";
import { FaCheckCircle, FaClock, FaComments, FaRupeeSign, FaUsers, FaShieldAlt } from "react-icons/fa";

const servicesList = [
    {
        icon: <FaDraftingCompass />, n: '01', title: 'Design & Construction',
        short: 'Crafting architectural marvels with expertise from concept to reality.',
        desc: 'Our design and construction service is a comprehensive offering that covers every aspect of your building project. From initial concept and architectural planning to structural engineering, material selection, and final construction, we handle it all. Our team of qualified architects and skilled builders work in perfect coordination to ensure your vision becomes a stunning reality.',
        features: ['Architectural design & planning', '3D rendering and visualization', 'Structural engineering', 'Quality material procurement', 'Site supervision & management', 'Timely completion guarantee'],
        img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    },
    {
        icon: <FaTools />, n: '02', title: 'Renovation & Remodeling',
        short: 'Transforming existing spaces with inspired design and superior craftsmanship.',
        desc: 'Breathe new life into your existing property with our comprehensive renovation and remodeling services. Whether it\'s a full-home transformation or targeted improvements, we combine modern design sensibilities with precision execution. Minimal disruption to your daily life is our promise throughout the renovation journey.',
        features: ['Full home renovation', 'Kitchen & bathroom remodeling', 'Structural modifications', 'Flooring & ceiling work', 'Facade improvements', 'Space optimization'],
        img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    },
    {
        icon: <FaProjectDiagram />, n: '03', title: 'Project Management',
        short: 'Seamless coordination from site surveys to final handover, on schedule and within budget.',
        desc: 'Our project management service ensures your construction project runs smoothly from groundbreaking to ribbon-cutting. We act as your dedicated project partner — coordinating contractors, managing timelines, controlling costs, and keeping you informed at every stage with transparent reporting and regular updates.',
        features: ['Complete timeline management', 'Budget control & reporting', 'Contractor coordination', 'Quality assurance checks', 'Regular progress updates', 'Risk mitigation planning'],
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    },
    {
        icon: <FaLeaf />, n: '04', title: 'Landscaping',
        short: 'Creating tranquil outdoor escapes that complement your property with natural beauty.',
        desc: 'Transform your outdoor spaces into breathtaking retreats that complement your architecture and enhance your property value. Our landscaping team combines horticultural expertise with artistic vision to create gardens, pathways, water features, and outdoor living spaces that are as beautiful as they are functional.',
        features: ['Garden design & layout', 'Lawn installation & care', 'Water features & fountains', 'Pathway & paving design', 'Outdoor lighting', 'Plant selection & maintenance'],
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    {
        icon: <FaHome />, n: '05', title: 'Vasthu Consultancy',
        short: 'Harmonizing your home with Vasthu principles for positive energy and lasting prosperity.',
        desc: 'Our Vasthu Shastra consultancy service integrates ancient Indian architectural science with modern construction practices. A certified Vasthu expert works alongside our architects to ensure your property\'s orientation, room placement, and spatial arrangement align with Vasthu principles, promoting prosperity, health, and harmony for your family.',
        features: ['Site & plot evaluation', 'Building orientation guidance', 'Room placement planning', 'Door & window positioning', 'Remedial Vasthu solutions', 'Post-construction corrections'],
        img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    },
    {
        icon: <FaCouch />, n: '06', title: 'Interior Design',
        short: 'Elevating every interior to reflect your unique personality with finesse and detail.',
        desc: 'Our interior design team transforms empty spaces into beautifully curated environments that reflect your personality and lifestyle. From contemporary minimalism to traditional Kerala aesthetics, we design interiors that are visually stunning, functionally perfect, and built to last — using premium materials and finishes throughout.',
        features: ['Concept & mood board creation', 'Space planning & layout', 'Furniture design & selection', 'Lighting design', 'Custom joinery & cabinetry', 'Material & finish selection'],
        img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    },
    {
        icon: <FaRulerCombined />, n: '07', title: 'Structural Design',
        short: 'Engineering robust, safe and efficient structural systems for every building type.',
        desc: 'Safety and structural integrity are non-negotiable. Our structural engineering team designs robust frameworks that can withstand the test of time, seismic activity, and environmental conditions specific to Kerala. Every structural design is calculated with precision and certified by qualified structural engineers.',
        features: ['Foundation design', 'RCC & steel structures', 'Seismic analysis', 'Load calculation', 'Structural drawings & BOQ', 'Site inspection & certification'],
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    },
    {
        icon: <FaFileInvoiceDollar />, n: '08', title: 'Estimation & Cost Evaluation',
        short: 'Accurate, transparent cost estimates that keep your project on budget from day one.',
        desc: 'Eliminate budget surprises with our precise construction cost estimation service. Our quantity surveyors prepare detailed bills of quantities, material schedules, and cost breakdowns. We provide complete transparency so you know exactly where every rupee is spent — from foundation to final coat of paint.',
        features: ['Detailed BOQ preparation', 'Material cost estimation', 'Labour cost analysis', 'Contingency planning', 'Value engineering suggestions', 'Cost tracking during construction'],
        img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    },
    {
        icon: <FaBuilding />, n: '09', title: 'Property Consultancy',
        short: 'Expert guidance on plot selection, property investment and documentation.',
        desc: 'Make smarter property decisions with our expert consultancy service. We help you evaluate plots for construction suitability, navigate legal documentation, understand zoning regulations, and assess investment potential. Our deep local knowledge of the Palakkad and Kerala real estate market ensures you make the right choice.',
        features: ['Plot evaluation & site study', 'Legal documentation assistance', 'Zoning & regulation guidance', 'Investment analysis', 'Panchayat & municipality approvals', 'Soil testing coordination'],
        img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    },
];

const Services = () => {
    const [active, setActive] = useState(null);
    useScrollReveal();

    return (
        <div className="inner-page">

            <section className="page-hero">
                <img src="/assets/2.jpg" alt="Orchid Builders construction site" className="page-hero-img" />
                <div className="page-hero-overlay" />
                <div className="page-hero-badge">
                    <span className="badge-year">2010</span>
                    <span className="badge-since">Est. Palakkad</span>
                </div>
                <div className="page-hero-content">
                    <nav className="page-hero-breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-cur" style={{ color: "white" }}>Services</span>
                    </nav>
                    <div className="page-hero-line" />
                    <h2 className='about-h2'>Services</h2>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="ip-section">
                <div className="ip-center-header sr">
                    <div className="sec-tag" style={{ justifyContent: 'center' }}>What We Do</div>
                    <h2 className="sec-title" style={{ textAlign: 'center' }}>Complete <span className="hl">Service Suite</span></h2>
                    <p className="sec-desc" style={{ margin: '0 auto', textAlign: 'center' }}>Click on any service to explore full details, features, and how we deliver excellence.</p>
                </div>

                <div className="svc-detail-grid">
                    {servicesList.map((s, i) => (
                        <div key={i} className={`svc-detail-card sr d${i % 4}`}>
                            <div className="svc-detail-top">
                                <div className="svc-detail-icon-wrap">{s.icon}</div>
                                <span className="svc-n">{s.n}</span>
                            </div>
                            <div className="svc-t" style={{ marginBottom: 10 }}>{s.title}</div>
                            <p className="svc-d">{s.short}</p>

                            {active === i && (
                                <div className="svc-expand">
                                    <div className="svc-expand-img">
                                        <img src={s.img} alt={s.title} />
                                    </div>
                                    <p className="svc-expand-desc">{s.desc}</p>
                                    <div className="svc-features">
                                        {s.features.map(f => (
                                            <div className="svc-feat" key={f}>
                                                <span className="svc-feat-dot">✦</span>
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button className="svc-toggle-btn" onClick={() => setActive(active === i ? null : i)}>
                                {active === i ? '— Close' : '+ Explore'} {s.title}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHY CHOOSE */}
            <section className="ip-section ip-alt-sec">
                <div className="ip-center-header sr">
                    <div className="sec-tag" style={{ justifyContent: 'center' }}>Why Orchid</div>
                    <h2 className="sec-title" style={{ textAlign: 'center' }}>What Sets Us <span className="hl">Apart</span></h2>
                </div>
                <div className="ip-mv-grid">
                    {[
                        { icon: <FaCheckCircle />, t: 'Quality Guarantee', d: 'Every service is backed by our quality promise. We don\'t cut corners — ever.' },
                        { icon: <FaClock />, t: 'On-Time Always', d: 'Strict project timelines with milestone tracking and client updates at every stage.' },
                        { icon: <FaComments />, t: 'Transparent Communication', d: 'Regular updates, clear reporting, and always accessible project managers.' },
                        { icon: <FaRupeeSign />, t: 'Fair Pricing', d: 'Competitive rates with no hidden costs. Full cost breakdown before work begins.' },
                        { icon: <FaUsers />, t: 'Expert Team', d: 'Qualified architects, engineers, and certified tradespeople on every project.' },
                        { icon: <FaShieldAlt />, t: 'Insured & Certified', d: 'All work is insured and certified to Kerala building regulations and standards.' },
                    ].map((w, i) => (
                        <div className={`ip-mv-card sr d${i % 3}`} key={i}>
                            <div className="ip-mv-icon">{w.icon}</div>
                            <h3>{w.t}</h3>
                            <p>{w.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="ip-cta-band">
                <div className="cta-glow" />
                <div className="sr-l">
                    <h3>Need a Custom Service Package?</h3>
                    <p>Talk to our team and we'll build a service plan specifically tailored to your project needs and budget.</p>
                </div>
                <Link to="/contact" className="btn-glow sr-r" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Get Free Quote</Link>
            </div>
        </div>
    );
};

export default Services;