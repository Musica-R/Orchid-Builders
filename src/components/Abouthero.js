import { Link } from 'react-router-dom';
import '../styles/Abouthero.css';

const HERO_IMG ='/assets/2.jpg';

export default function AboutHero() {
    return (
        <>
            {/* ══ HERO BANNER ══ */}
            <section className="page-hero">

                {/* Full-bleed background photo */}
                <img src={HERO_IMG} alt="Orchid Builders construction site" className="page-hero-img"/>

                {/* Brand diagonal overlay */}
                <div className="page-hero-overlay" />

                {/* Watermark year — decorative, top-right */}
                <div className="page-hero-badge">
                    <span className="badge-year">2010</span>
                    <span className="badge-since">Est. Palakkad</span>
                </div>

                {/* Text content */}
                <div className="page-hero-content">
                    <nav className="page-hero-breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-cur" style={{color:"white"}}>About Us</span>
                    </nav>

                    {/* Brand accent line */}
                    <div className="page-hero-line" />
                    <h2 className='about-h2'>About Us</h2>

                    {/* <p>A comprehensive suite of construction and design services to bring every project vision to life with precision and excellence.</p> */}
                </div>
            </section>

            {/* ══ STATS STRIP ══ */}
            {/* <div className="page-hero-strip">
                <div className="strip-item">
                    <span className="strip-dot" />
                    <span className="strip-label">Years of Excellence</span>
                    <span className="strip-val">14<sup>+</sup></span>
                </div>

                <div className="strip-item">
                    <span className="strip-dot" />
                    <span className="strip-label">Projects Delivered</span>
                    <span className="strip-val">200<sup>+</sup></span>
                </div>

                <div className="strip-item">
                    <span className="strip-dot" />
                    <span className="strip-label">Happy Clients</span>
                    <span className="strip-val">98<sup>%</sup></span>
                </div>

                <div className="strip-item">
                    <span className="strip-location">Palakkad, Kerala</span>
                </div>
            </div> */}
        </>
    );
}