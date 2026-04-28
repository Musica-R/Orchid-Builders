import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../components/useScrollReveal';
import '../styles/InnerPage.css';
import { IoSearch } from "react-icons/io5";

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80', cat: 'Residential', title: 'Village Kerala Home' },
    { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', cat: 'Commercial', title: 'Shopping Complex' },
    { src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80', cat: 'Villa', title: '4BHK Luxury Villa' },
    { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80', cat: 'Interior', title: 'Modern Living Room' },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', cat: 'Residential', title: 'Premium Residence' },
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80', cat: 'Residential', title: 'Contemporary Home' },
    { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', cat: 'Farm House', title: 'Thamara Farm House' },
    { src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', cat: 'Renovation', title: 'Home Renovation' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', cat: 'Interior', title: 'Luxury Interior' },
    { src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', cat: 'Interior', title: 'Living Space Design' },
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', cat: 'Commercial', title: 'Office Complex' },
    { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', cat: 'Residential', title: 'Family Home' },
];

const cats = ['All', ...Array.from(new Set(galleryImages.map(g => g.cat)))];

const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const [lightbox, setLightbox] = useState(null);
    useScrollReveal();

    const filtered = filter === 'All' ? galleryImages : galleryImages.filter(g => g.cat === filter);

    const nav = (dir) => {
        const newIdx = (lightbox + dir + filtered.length) % filtered.length;
        setLightbox(newIdx);
    };

    return (
        <div className="inner-page">
            <div className="page-hero">
                <div className="page-hero-grid" />
                <div className="page-hero-watermark">GALLERY</div>
                <div className="content-wrap">
                    <div className="page-hero-breadcrumb">
                        <Link to="/">Home</Link> › <span>Gallery</span>
                    </div>
                    <h1>PROJECT <span className="hl">GALLERY</span></h1>
                    <p className="page-hero-sub">Visual portfolio of our finest work — from architectural masterpieces to stunning interiors across Kerala and Tamil Nadu.</p>
                </div>
            </div>

            <section className="ip-section">
                <div className="proj-filter-wrap sr">
                    {cats.map(c => (
                        <button key={c} className={`proj-filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
                            {c}
                        </button>
                    ))}
                </div>

                <div className="gallery-masonry">
                    {filtered.map((g, i) => (
                        <div className={`gm-card sr d${i % 4}`} key={i} onClick={() => setLightbox(i)}>
                            <img src={g.src} alt={g.title} />
                            <div className="gm-info">
                                <div className="gm-cat">{g.cat}</div>
                                <div className="gm-title">{g.title}</div>
                                <div className="gm-zoom"><IoSearch /> View</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* LIGHTBOX */}
            {lightbox !== null && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
                        <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
                        <button className="lb-nav lb-prev" onClick={() => nav(-1)}>←</button>
                        <img src={filtered[lightbox].src} alt={filtered[lightbox].title} />
                        <button className="lb-nav lb-next" onClick={() => nav(1)}>→</button>
                        <div className="lb-caption">
                            <span className="lb-cat">{filtered[lightbox].cat}</span>
                            <span className="lb-title">{filtered[lightbox].title}</span>
                            <span className="lb-count">{lightbox + 1} / {filtered.length}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="ip-cta-band">
                <div className="cta-glow" />
                <div className="sr-l">
                    <h3>Want to See More of Our Work?</h3>
                    <p>Schedule a site visit to one of our completed projects or browse our full portfolio in person.</p>
                </div>
                <Link to="/contact" className="btn-glow sr-r" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Contact Us</Link>
            </div>
        </div>
    );
};

export default Gallery;