import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../components/useScrollReveal';
import '../styles/InnerPage.css';
import {
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineSquare3Stack3D
} from "react-icons/hi2";

const projectList = [
    { cat: 'Residential', name: 'Village Kerala Home', loc: 'Palakkad, Kerala', year: '2023', area: '2800 sqft', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', desc: 'A stunning traditional Kerala-style home blending heritage aesthetics with modern amenities.' },
    { cat: 'Commercial', name: 'Mini Shopping Complex', loc: 'Palakkad, Kerala', year: '2023', area: '5500 sqft', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', desc: 'A modern commercial complex designed for maximum retail footfall and functional efficiency.' },
    { cat: 'Villa', name: '4BHK Luxury Villa', loc: 'Thrissur, Kerala', year: '2022', area: '4200 sqft', img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80', desc: 'An opulent villa featuring premium finishes, private pool, and landscaped gardens.' },
    { cat: 'Interior', name: 'Modern Living Interiors', loc: 'Coimbatore, TN', year: '2022', area: '1800 sqft', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', desc: 'Contemporary interior design with custom furniture and smart home integration.' },
    { cat: 'Residential', name: 'Premium Residence', loc: 'Palakkad, Kerala', year: '2023', area: '3100 sqft', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', desc: 'A premium modern home with clean lines, open plan living, and luxury finishes throughout.' },
    { cat: 'Farm House', name: 'Thamara Farm House', loc: 'Palakkad, Kerala', year: '2022', area: '3600 sqft', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', desc: 'A serene farmhouse retreat designed to harmonize with its natural surroundings.' },
    { cat: 'Renovation', name: 'Home Renovation', loc: 'Palakkad, Kerala', year: '2023', area: '2200 sqft', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', desc: 'Complete home renovation transforming a 20-year-old structure into a contemporary haven.' },
    { cat: 'Residential', name: '3BHK Home at Thrissur', loc: 'Thrissur, Kerala', year: '2021', area: '1950 sqft', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', desc: 'A compact, well-planned 3BHK residence optimizing every square foot for comfortable living.' },
    { cat: 'Commercial', name: 'Office Complex', loc: 'Coimbatore, TN', year: '2021', area: '6800 sqft', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', desc: 'A state-of-the-art office building designed for productivity, collaboration and brand identity.' },
];

const cats = ['All', ...Array.from(new Set(projectList.map(p => p.cat)))];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selected, setSelected] = useState(null);
    useScrollReveal();

    const filtered = filter === 'All' ? projectList : projectList.filter(p => p.cat === filter);

    return (
        <div className="inner-page">
            <div className="page-hero">
                <div className="page-hero-grid" />
                <div className="page-hero-watermark">PROJECTS</div>
                <div className="content-wrap">
                    <div className="page-hero-breadcrumb">
                        <Link to="/">Home</Link> › <span>Projects</span>
                    </div>
                    <h1>OUR <span className="hl">PROJECTS</span></h1>
                    <p className="page-hero-sub">350+ completed projects across Kerala and Tamil Nadu — each one a testament to our commitment to quality and innovation.</p>
                </div>
            </div>

            <section className="ip-section">
                {/* FILTER */}
                <div className="proj-filter-wrap sr">
                    {cats.map(c => (
                        <button key={c} className={`proj-filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
                            {c}
                        </button>
                    ))}
                </div>

                {/* GRID */}
                <div className="proj-grid">
                    {filtered.map((p, i) => (
                        <div className={`proj-card sr d${i % 3}`} key={i} onClick={() => setSelected(p)}>
                            <div className="proj-img">
                                <img src={p.img} alt={p.name} />
                                <div className="proj-overlay">
                                    <div className="proj-cat">{p.cat}</div>
                                    <div className="proj-name">{p.name}</div>
                                    <div className="proj-loc">📍 {p.loc}</div>
                                    <div className="proj-view-btn">View Details →</div>
                                </div>
                            </div>
                            <div className="proj-info">
                                <span className="proj-cat-tag">{p.cat}</span>
                                <div className="proj-title">{p.name}</div>
                                <div className="proj-meta">
                                    <span><HiOutlineMapPin /> {p.loc}</span>
                                    <span><HiOutlineCalendarDays /> {p.year}</span>
                                    <span><HiOutlineSquare3Stack3D /> {p.area}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MODAL */}
            {selected && (
                <div className="proj-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="proj-modal" onClick={e => e.stopPropagation()}>
                        <button className="proj-modal-close" onClick={() => setSelected(null)}>✕</button>
                        <div className="proj-modal-img">
                            <img src={selected.img} alt={selected.name} />
                        </div>
                        <div className="proj-modal-body">
                            <div className="proj-cat-tag">{selected.cat}</div>
                            <h2 className="proj-modal-title">{selected.name}</h2>
                            <p className="proj-modal-desc">{selected.desc}</p>
                            <div className="proj-modal-meta">
                                <div><strong>Location</strong><span>{selected.loc}</span></div>
                                <div><strong>Year</strong><span>{selected.year}</span></div>
                                <div><strong>Area</strong><span>{selected.area}</span></div>
                            </div>
                            <Link to="/contact" className="btn-glow" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginTop: 24 }}>Enquire About This Project</Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="ip-cta-band">
                <div className="cta-glow" />
                <div className="sr-l">
                    <h3>Ready to Build Your Dream Project?</h3>
                    <p>Join 250+ satisfied clients who trusted Orchid Builders to bring their vision to life.</p>
                </div>
                <Link to="/contact" className="btn-glow sr-r" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Start Your Project</Link>
            </div>
        </div>
    );
};

export default Projects;