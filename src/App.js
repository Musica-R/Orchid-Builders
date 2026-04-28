import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import './styles/global.css';
import Button from './components/Whatsapp';
import MobileArrow from './components/MobileArrow';

/* ─── LOADER ─── */
const Loader = ({ onDone }) => {
  const [pct, setPct] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    let count = 0;
    const iv = setInterval(() => {
      count = Math.min(count + Math.random() * 18, 100);
      setPct(Math.floor(count));
      if (count >= 100) {
        clearInterval(iv);
        setTimeout(onDone, 300);
      }
    }, 70);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div className={`loader-screen theme-${isDark ? 'dark' : 'light'}`}>
      <div className="loader-logo-text">ORCHID</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" style={{ width: `${pct}%` }} />
      </div>
      <div className="loader-pct">{pct}%</div>
    </div>
  );
};

/* ─── CUSTOM CURSOR ─── */
const Cursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mx = useRef(0), my = useRef(0), rx = useRef(0), ry = useRef(0);

  useEffect(() => {
    const onMove = e => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener('mousemove', onMove);

    let raf;
    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx.current}px`;
        ringRef.current.style.top = `${ry.current}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const addHover = () => {
      document.querySelectorAll('button, a, .g-card, .svc-card, .feat-card, .proj-card, .gm-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (cursorRef.current) cursorRef.current.classList.add('hover');
          if (ringRef.current) ringRef.current.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
          if (cursorRef.current) cursorRef.current.classList.remove('hover');
          if (ringRef.current) ringRef.current.classList.remove('hover');
        });
      });
    };
    addHover();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

/* ─── PAGE TRANSITION ─── */
const PageWrapper = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)',
    }}>
      {children}
    </div>
  );
};

/* ─── APP CONTENT ─── */
const AppContent = () => {
  const { isDark } = useTheme();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`theme-${isDark ? 'dark' : 'light'}`} style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.4s' }}>
      <div className="noise-overlay" />

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Cursor />
      <Navbar />

      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageWrapper>

      <Footer />

      <Button /> 
      <MobileArrow />

      {/* <a className="wa-fab" href="https://wa.me/919388006262" target="_blank" rel="noreferrer">💬</a> */}

    </div> 
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;