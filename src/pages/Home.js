import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';           // ← NEW: hero slider component
import useScrollReveal from '../components/useScrollReveal';
import '../styles/Home.css';
import { GiPencilRuler } from "react-icons/gi";
import { FaBuilding, FaSmile } from "react-icons/fa";
import { MdEngineering } from "react-icons/md";
import { FaGem, FaStar } from "react-icons/fa";
import { FaHardHat, FaClock, FaMoneyBillWave } from "react-icons/fa";

/* ─── TICKER ─── */
const Ticker = () => {
    const items = [
        'Design & Construction', 'Renovation & Remodeling', 'Interior Design',
        'Project Management', 'Landscaping', 'Vasthu Consultancy',
        'Structural Design', 'Property Consultancy',
    ];
    const doubled = [...items, ...items];
    return (
        <div className="ticker-wrap">
            <div className="ticker-inner">
                {doubled.map((it, i) => (
                    <span className="ticker-item" key={i}>
                        {it} <span className="ticker-sep">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

/* ─── STATS STRIP ─── */
const StatsStrip = () => {

    
    const stats = [
        { icon: <GiPencilRuler />, target: 1350, label: 'Design Drawings' },
        { icon: <FaBuilding />, target: 350, label: 'Projects Completed' },
        { icon: <FaSmile />, target: 250, label: 'Happy Clients' },
        { icon: <MdEngineering />, target: 18, label: 'Projects Running' },
    ];

    const [counts, setCounts] = useState(stats.map(() => 0));
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started) {
                setStarted(true);
                stats.forEach((s, idx) => {
                    let count = 0;
                    const step = Math.ceil(s.target / 80);
                    const iv = setInterval(() => {
                        count = Math.min(count + step, s.target);
                        setCounts(prev => {
                            const c = [...prev];
                            c[idx] = count;
                            return c;
                        });
                        if (count >= s.target) clearInterval(iv);
                    }, 20);
                });
            }
        }, { threshold: 0.4 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    return (
        <div className="stats-strip" ref={ref}>
            {stats.map((s, i) => (
                <div className={`stat-item sr d${i}`} key={i}>
                    <div className="stat-circle">{s.icon}</div>
                    <div>
                        <div className="stat-num">{counts[i].toLocaleString()}+</div>
                        <div className="stat-lbl">{s.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

/* ─── HOME PAGE ─── */
const Home = () => {
    useScrollReveal();

    const [activeTab, setActiveTab] = useState(0);

    const services = [
        {
            icon: '/assets/1.jpg',
            n: '01',
            title: 'Design & Construction',
            desc: 'Crafting architectural marvels with expertise. From concept to reality, precision at every stage.'
        },
        {
            icon: '/assets/1.jpg',
            n: '02',
            title: 'Renovation & Remodeling',
            desc: 'Transforming existing spaces with inspired design, superior craftsmanship and minimal disruption.'
        },
        {
            icon: '/assets/1.jpg',
            n: '03',
            title: 'Project Management',
            desc: 'Seamless coordination from site surveys to final handover — on schedule, within budget.'
        },
        {
            icon: '/assets/1.jpg',
            n: '04',
            title: 'Landscaping',
            desc: 'Creating tranquil outdoor escapes that complement your property with natural beauty.'
        },
        {
            icon: '/assets/1.jpg',
            n: '05',
            title: 'Vasthu Consultancy',
            desc: 'Harmonizing your home with Vasthu principles for positive energy and lasting prosperity.'
        },
        {
            icon: '/assets/1.jpg',
            n: '06',
            title: 'Interior Design',
            desc: 'Elevating every interior to reflect your unique personality with finesse and attention to detail.'
        },
    ];


    const gallery = [
        { img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80', cat: 'Residential', name: 'Village Kerala Home', loc: 'Palakkad, Kerala' },
        { img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', cat: 'Commercial', name: 'Mini Shopping Complex', loc: 'Palakkad, Kerala' },
        { img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80', cat: 'Villa', name: '4BHK Luxury Villa', loc: 'Thrissur, Kerala' },
        { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80', cat: 'Interior', name: 'Modern Living Interiors', loc: 'Coimbatore, TN' },
        { img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', cat: 'Residence', name: 'Premium Residence', loc: 'Palakkad, Kerala' },
    ];

    const testimonials = [
        { init: 'R', name: 'Rajesh Kumar', loc: 'Palakkad', text: 'Orchid Builders delivered our dream home within budget and ahead of schedule. The attention to detail in the interiors is absolutely stunning.' },
        { init: 'P', name: 'Priya Nair', loc: 'Thrissur', text: "From the initial consultation to final handover, the team was communicative, professional and truly cared about our family's needs." },
        { init: 'A', name: 'Anil Menon', loc: 'Coimbatore', text: 'I strongly recommend Orchid Builders. The quality, the schedule adherence and the customer service were all exceptional throughout.' },
    ];

    return (
        <div className="home-page">

            {/* ── HERO SLIDER (replaces old HeroSlider) ── */}
            <Slider />
            <Ticker />
            <StatsStrip />

            {/* ── FEATURES ── */}
            <section className="features-sec">
                <div className="features-header">
                    <div className="sec-tag sr">What We Offer</div>
                    <h2 className="sec-title sr">
                        Empowering Your<br />Projects, Every <span className="hl">Step</span>
                    </h2>
                    <p className="sec-desc sr">
                        A complete suite of construction services tailored to transform your vision into reality.
                    </p>
                </div>
                <div className="features-row">
                    {[
                        {
                            icon: <FaBuilding />,
                            num: '01',
                            title: 'Innovative Design',
                            text: 'Our architects blend contemporary aesthetics with functional practicality, delivering spaces that inspire.'
                        },
                        {
                            icon: <FaGem />,
                            num: '02',
                            title: 'Quality Craftsmanship',
                            text: 'Every joint, every surface, every finish executed to the highest standard using premium materials.'
                        },
                        {
                            icon: <FaStar />,
                            num: '03',
                            title: 'Client Satisfaction',
                            text: 'We measure success by your satisfaction — from first consultation to final handover.'
                        },
                    ].map((f, i) => (
                        <div className={`feat-card sr d${i}`} key={i}>
                            <div className="feat-glow" />
                            <span className="feat-num">{f.num}</span>
                            <span className="feat-icon">{f.icon}</span>
                            <div className="feat-title">{f.title}</div>
                            <p className="feat-text">{f.text}</p>
                            <Link to="/services" className="feat-link">Explore ›</Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── ABOUT ── */}
            <section className="about-sec">
                <div className="about-grid">
                    <div className="about-img-side sr-l">
                        <div className="about-float">
                            <div className="about-float-num">350+</div>
                            <div className="about-float-txt">Projects<br />Delivered</div>
                        </div>
                        <div className="about-img-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                                alt="Orchid Builders"
                            />
                        </div>
                        <div className="about-accent-box">
                            <span className="aab-num">15</span>
                            <span className="aab-txt">Years of<br />Excellence</span>
                        </div>
                    </div>
                    <div className="sr-r">
                        <div className="sec-tag">About Orchid</div>
                        <h2 className="sec-title">
                            Welcome to<br /><span className="hl">Orchid Builders</span>
                        </h2>
                        <p className="sec-desc">
                            Looking for a reliable builder in Palakkad? Orchid Builders stands out as one of the best
                            construction companies in the region. We offer construction, design, interior decoration,
                            turnkey projects and expert plot selection.
                        </p>
                        <p className="sec-desc" style={{ marginTop: 14 }}>
                            Our skilled team of architects and engineers work closely with clients to ensure every
                            detail — from design to finish — meets the highest standard.
                        </p>
                        <div className="about-checks">
                            {[
                                'Residential Building', 'Renovation Works', '3D Designing',
                                'Commercial Spaces', 'Interior Design', 'Vasthu Consultancy',
                            ].map(c => (
                                <div className="chk" key={c}>
                                    <div className="chk-icon">✓</div>{c}
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/about"
                            className="btn-glow"
                            style={{ marginTop: 36, display: 'inline-block', textDecoration: 'none' }}
                        >
                            Read More About Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}


            <section className="services-sec">
                <div className="services-hd">
                    <div className="sec-tag sr">Our Services</div>
                    <h2 className="sec-title sr">What We <span className="hl">Do Best</span></h2>
                    <Link to="/services" className="svc-view-all sr">View All Services</Link>
                </div>

                <div className="svc-tabs-panel-wrap">
                    <div className="svc-tabs">
                        {services.map((s, i) => (
                            <button
                                key={i}
                                className={`svc-tab ${activeTab === i ? 'active' : ''}`}
                                onClick={() => setActiveTab(i)}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>

                    <div className="svc-panel">
                        <div className="svc-panel-left">
                            <div className="svc-panel-icon">
                                <img src={services[activeTab].icon} alt={services[activeTab].title} />
                            </div>
                        </div>
                        <div className="svc-panel-right">
                            <div className="svc-panel-meta">
                                <span className="svc-panel-num">{services[activeTab].n}</span>
                                <span className="svc-panel-title">{services[activeTab].title}</span>
                            </div>
                            <p className="svc-panel-desc">{services[activeTab].desc}</p>
                            <Link to="/services" className="svc-arr">Read More →</Link>
                        </div>
                    </div>
                </div>
            </section>



            {/* ── GALLERY ── */}
            <section className="gallery-sec">
                <div className="gallery-header sr">
                    <div className="sec-tag" style={{ justifyContent: 'center' }}>Portfolio</div>
                    <h2 className="sec-title" style={{ textAlign: 'center' }}>
                        PROJECT <span className="hl">GALLERY</span>
                    </h2>
                    <p>
                        Discover our finest work — residential masterpieces, commercial landmarks and stunning
                        interiors across Kerala and Tamil Nadu.
                    </p>
                </div>
                <div className="gallery-grid sr">
                    {gallery.map((g, i) => (
                        <div className="g-card" key={i}>
                            <img src={g.img} alt={g.name} />
                            <div className="g-info">
                                <div className="g-cat">{g.cat}</div>
                                <div className="g-name">{g.name}</div>
                                <div className="g-loc">{g.loc}</div>
                                <Link to="/gallery" className="g-btn">View Project →</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="gallery-more sr">
                    <Link to="/gallery" className="btn-ghost">View All Projects</Link>
                </div>
            </section>

            {/* ── PROCESS ── */}
            <section className="process-sec">
                <div className="process-header">
                    <div className="sec-tag sr" style={{ justifyContent: 'center' }}>How We Work</div>
                    <h2 className="sec-title sr" style={{ textAlign: 'center' }}>
                        Our Simple <span className="hl">Process</span>
                    </h2>
                    <p className="sec-desc sr" style={{ margin: '0 auto', textAlign: 'center' }}>
                        From your first call to the final handover key — we guide every step seamlessly.
                    </p>
                </div>
                <div className="process-wrap">
                    {[
                        { n: '01', t: 'Consultation', d: 'We understand your vision, requirements and budget in a free initial meeting.' },
                        { n: '02', t: 'Design & Plan', d: 'Architects craft detailed plans, 3D renders and precise cost estimates.' },
                        { n: '03', t: 'Construction', d: 'Expert craftsmen build using premium materials with regular site updates.' },
                        { n: '04', t: 'Handover', d: 'Quality inspection, final walk-through and keys to your dream space — on time.' },
                    ].map((p, i) => (
                        <div className={`p-step sr d${i}`} key={i}>
                            <div className="p-num">{p.n}</div>
                            <div className="p-t">{p.t}</div>
                            <p className="p-d">{p.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── WHY US ── */}
            <section className="why-sec">
                <div className="why-grid">
                    <div className="why-img-wrap sr-l">
                        <img
                            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                            alt="Why Choose Orchid"
                        />
                    </div>
                    <div className="sr-r">
                        <div className="sec-tag">Why Orchid</div>
                        <h2 className="sec-title">Why Choose <span className="hl">Us?</span></h2>
                        <p className="sec-desc">
                            We combine deep Kerala expertise with modern techniques to deliver results that exceed
                            expectations every time.
                        </p>
                        <div className="why-items">
                            {[
                                {
                                    icon: <FaHardHat />,
                                    t: 'Expert Team',
                                    d: 'Qualified architects, engineers and skilled labourers with years of on-ground experience in Kerala and Tamil Nadu construction.'
                                },
                                {
                                    icon: <FaGem />,
                                    t: 'Premium Quality',
                                    d: 'Materials sourced from trusted suppliers — your building stands the test of time, weather and decades of living.'
                                },
                                {
                                    icon: <FaClock />,
                                    t: 'On-Time Delivery',
                                    d: 'Streamlined processes and tight project management ensure you get your keys on the promised date.'
                                },
                                {
                                    icon: <FaMoneyBillWave />,
                                    t: 'Transparent Pricing',
                                    d: 'Detailed estimates, no hidden costs, regular financial reporting — you stay fully in control.'
                                },
                            ].map((w, i) => (
                                <div className="w-item" key={i}>
                                    <div className="w-icon">{w.icon}</div>
                                    <div>
                                        <div className="w-t">{w.t}</div>
                                        <p className="w-d">{w.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="testi-sec">
                <div className="testi-header">
                    <div className="sec-tag sr" style={{ justifyContent: 'center' }}>Testimonials</div>
                    <h2 className="sec-title sr" style={{ textAlign: 'center' }}>
                        What Clients <span className="hl">Say</span>
                    </h2>
                </div>
                <div className="testi-grid">
                    {testimonials.map((t, i) => (
                        <div className={`t-card sr d${i}`} key={i}>
                            <div className="t-stars">★★★★★</div>
                            <div className="t-quote">"</div>
                            <p className="t-text">{t.text}</p>
                            <div className="t-author">
                                <div className="t-av">{t.init}</div>
                                <div>
                                    <div className="t-name">{t.name}</div>
                                    <div className="t-loc">{t.loc}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA BAND ── */}
            <div className="cta-band">
                <div className="cta-glow" />
                <div className="cta-text sr-l">
                    <h3>Let's Discuss Your<br />Next Dream Project</h3>
                    <p>
                        Whether it's your family home, a commercial landmark or a stunning renovation — we're
                        ready to begin.
                    </p>
                </div>
                <div className="cta-btns sr-r">
                    <Link to="/contact" className="btn-glow">Get Free Quote</Link>
                    <a
                        href="https://wa.me/919388006262"
                        className="btn-ghost"
                        target="_blank"
                        rel="noreferrer"
                    >
                        WhatsApp Us
                    </a>
                </div>
            </div>

        </div>
    );
};

export default Home;