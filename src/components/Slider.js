import React, { useEffect, useRef } from 'react';
import '../styles/slider.css';

/**
 * Orchid Builders Hero Slider — v5
 *
 * ZERO inline styles.
 * All animation/layout is driven by external CSS classes:
 *
 *   Slides   → .is-active  .is-incoming
 *   Left     → .is-visible  .is-leaving
 *   Right    → .is-visible  .is-leaving
 *   Words    → .is-visible  .is-leaving
 *   CTA      → .is-visible  .is-leaving
 *   Preloader→ .is-hidden
 *   Dots     → .on
 *   Photo    → .paused  (to restart ken-burns)
 *
 * Stagger timing uses CSS custom property --word-delay,
 * --cta-delay set via element.style.setProperty() — these
 * are TIMING-ONLY vars, not layout, which is acceptable.
 */

const Slider = () => {
    const preloaderRef = useRef(null);
    const sliderInit = useRef(false);

    /* ── Helpers ── */
    const add = (el, cls) => el?.classList.add(cls);
    const remove = (el, cls) => el?.classList.remove(cls);
    const swap = (el, rem, add2) => { remove(el, rem); add(el, add2); };

    useEffect(() => {
        /* ── Build preloader letters ── */
        const w1 = 'ORCHID';
        const w2 = 'BUILDERS';
        const l1 = document.getElementById('pL1');
        const l2 = document.getElementById('pL2');
        const shimmer = l2?.querySelector('.ob-pre-shimmer');

        if (l1 && l2 && shimmer) {
            w1.split('').forEach((c, i) => {
                const s = document.createElement('span');
                s.className = 'pre-char';
                s.textContent = c;
                s.style.animationDelay = (0.25 + i * 0.07) + 's'; /* timing-only */
                l1.appendChild(s);
            });
            w2.split('').forEach((c, i) => {
                const s = document.createElement('span');
                s.className = 'pre-char';
                s.textContent = c;
                s.style.animationDelay = (0.42 + i * 0.065) + 's'; /* timing-only */
                l2.insertBefore(s, shimmer);
            });
        }

        /* ── Hide preloader via class ── */
        const pre = preloaderRef.current;
        const timeout = setTimeout(() => {
            add(pre, 'is-hidden');
            setTimeout(() => {
                if (pre) pre.style.display = 'none'; /* remove from flow after fade */
                if (!sliderInit.current) {
                    sliderInit.current = true;
                    initSlider();
                }
            }, 580);
        }, 2750);

        return () => clearTimeout(timeout);
    }, []);

    /* ══════════════════════════════════════════════════════
       SLIDER ENGINE
    ══════════════════════════════════════════════════════ */
    function initSlider() {
        const slides = Array.from(document.querySelectorAll('.ob-slide'));
        const N = slides.length;
        let cur = 0, busy = false, timer;

        const OUT_DUR = 500;   /* ms — must match CSS var(--dur-out) */
        const IN_DUR = 620;   /* ms — must match CSS var(--dur-in)  */

        /* ── Counter ── */
        const curEl = document.querySelector('.ob-slide-count .cur');
        const totEl = document.querySelector('.ob-slide-count .tot');
        if (totEl) totEl.textContent = String(N).padStart(2, '0');
        const setCounter = i => { if (curEl) curEl.textContent = String(i + 1).padStart(2, '0'); };

        /* ── Dots ── */
        const setDots = i =>
            document.querySelectorAll('.ob-dot')
                .forEach((d, j) => d.classList.toggle('on', j === i));

        /* ── Animate a slide's content IN ── */
        function animateIn(sl) {
            const left = sl.querySelector('.ob-s-left');
            const right = sl.querySelector('.ob-s-right');
            const words = sl.querySelectorAll('.ob-hl-txt');
            const cta = sl.querySelector('.ob-cta');

            /* Remove leaving state, trigger reflow, add visible */
            remove(left, 'is-leaving');
            remove(right, 'is-leaving');
            words.forEach(w => remove(w, 'is-leaving'));
            remove(cta, 'is-leaving');

            /* Force reflow so transition restarts cleanly */
            void left?.offsetWidth;

            add(left, 'is-visible');
            add(right, 'is-visible');

            /* Stagger words via CSS custom property (timing only) */
            words.forEach((w, wi) => {
                w.style.setProperty('--word-delay', `${130 + wi * 100}ms`);
                add(w, 'is-visible');
            });

            /* CTA after last word */
            const ctaDelay = 130 + words.length * 100 + 90;
            cta?.style.setProperty('--cta-delay', `${ctaDelay}ms`);
            add(cta, 'is-visible');
        }

        /* ── Animate a slide's content OUT ── */
        function animateOut(sl) {
            const left = sl.querySelector('.ob-s-left');
            const right = sl.querySelector('.ob-s-right');
            const words = sl.querySelectorAll('.ob-hl-txt');
            const cta = sl.querySelector('.ob-cta');

            swap(left, 'is-visible', 'is-leaving');
            swap(right, 'is-visible', 'is-leaving');
            words.forEach(w => swap(w, 'is-visible', 'is-leaving'));
            swap(cta, 'is-visible', 'is-leaving');
        }

        /* ── Reset content to initial hidden state (no transition) ── */
        function resetContent(sl) {
            const left = sl.querySelector('.ob-s-left');
            const right = sl.querySelector('.ob-s-right');
            const words = sl.querySelectorAll('.ob-hl-txt');
            const cta = sl.querySelector('.ob-cta');

            ['is-visible', 'is-leaving'].forEach(cls => {
                remove(left, cls);
                remove(right, cls);
                words.forEach(w => remove(w, cls));
                remove(cta, cls);
            });
        }

        /* ── Restart ken-burns on photo ── */
        function restartKenBurns(sl) {
            const photo = sl.querySelector('.ob-ltr-photo');
            if (!photo) return;
            add(photo, 'paused');
            void photo.offsetWidth; /* reflow */
            remove(photo, 'paused');
        }

        /* ── Initialise slide 0 ── */
        slides.forEach((sl, i) => {
            resetContent(sl);
            if (i === 0) {
                add(sl, 'is-active');
                animateIn(sl);
            }
        });

        setDots(0);
        setCounter(0);

        /* ── Main transition ── */
        function goTo(next) {
            if (busy || next === cur) return;
            busy = true;
            clearInterval(timer);

            const outSl = slides[cur];
            const inSl = slides[next];

            /* Stage incoming behind active */
            add(inSl, 'is-incoming');
            resetContent(inSl);
            restartKenBurns(inSl);

            /* Animate current slide out */
            animateOut(outSl);

            setTimeout(() => {
                /* Swap active/incoming */
                swap(outSl, 'is-active', 'is-incoming');  /* outgoing → staged */
                swap(inSl, 'is-incoming', 'is-active');    /* incoming → active  */
                remove(outSl, 'is-incoming');               /* hide outgoing      */

                cur = next;
                setDots(cur);
                setCounter(cur);

                /* Animate new active slide in */
                animateIn(inSl);

                setTimeout(() => { busy = false; resetTimer(); }, IN_DUR + 200);
            }, OUT_DUR + 30);
        }

        window.__obGoTo = goTo;

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(() => goTo((cur + 1) % N), 5200);
        }
        resetTimer();
    }

    /* ══════════════════════════════════════════════════════
       JSX  — no inline style props anywhere
    ══════════════════════════════════════════════════════ */
    return (
        <>
            {/* ── PRELOADER ── */}
            <div id="ob-preloader" ref={preloaderRef} className="ob-preloader">
                <div className="ob-pre-spinner" />
                <div className="ob-pre-brand">
                    <span className="ob-pre-line ob-pre-line1" id="pL1" />
                    <span className="ob-pre-line ob-pre-line2" id="pL2">
                        <span className="ob-pre-shimmer" />
                    </span>
                </div>
            </div>

            {/* ── HERO ── */}
            <div id="ob-hero" className="ob-hero">
                <nav className="ob-nav" />
                <div className="ob-accent-line" />

                {/* ══ SLIDE 0 — WE BUILD / Your Dream ══ */}
                <div className="ob-slide" id="ob-s0">
                    <div className="ob-s-left">
                        <p className="ob-eyebrow">Residential &amp; Commercial</p>
                        <div className="ob-hl">
                            <span className="ob-hl-row">
                                <span className="ob-hl-txt">We Build</span>
                            </span>
                            <span className="ob-hl-row">
                                <span className="ob-hl-txt ob-hl-accent">Your Dream</span>
                            </span>
                        </div>
                        <p className="ob-sub">
                            Crafting exceptional spaces with precision,<br />
                            quality materials &amp; timeless design.
                        </p>
                        <a href="/" className="ob-cta">
                            Get A Free Quote <span className="ob-cta-arrow">→</span>
                        </a>
                    </div>

                    <div className="ob-s-right">
                        <svg className="ob-ltr-svg"
                            viewBox="0 0 560 700"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <clipPath id="ob-c0">
                                    <text x="50%" y="52%"
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        fontFamily="'Montserrat',sans-serif"
                                        fontWeight="900"
                                        fontSize="560"
                                        letterSpacing="-10">D</text>
                                </clipPath>
                            </defs>
                            <image className="ob-ltr-photo"
                                href="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90"
                                x="0" y="0" width="560" height="700"
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="url(#ob-c0)" />
                        </svg>
                    </div>
                </div>

                {/* ══ SLIDE 1 — CRAFTING / Your Spaces ══ */}
                <div className="ob-slide" id="ob-s1">
                    <div className="ob-s-left">
                        <p className="ob-eyebrow">Interior &amp; Exterior</p>
                        <div className="ob-hl">
                            <span className="ob-hl-row">
                                <span className="ob-hl-txt">Crafting</span>
                            </span>
                            <span className="ob-hl-row">
                                <span className="ob-hl-txt ob-hl-accent">Your Spaces</span>
                            </span>
                        </div>
                        <p className="ob-sub">
                            From concept to completion, we transform<br />
                            visions into stunning realities.
                        </p>
                        <a href="/" className="ob-cta">
                            Free Consultation <span className="ob-cta-arrow">→</span>
                        </a>
                    </div>

                    <div className="ob-s-right">
                        <svg className="ob-ltr-svg"
                            viewBox="0 0 560 700"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <clipPath id="ob-c1">
                                    <text x="50%" y="52%"
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        fontFamily="'Montserrat',sans-serif"
                                        fontWeight="900"
                                        fontSize="620"
                                        letterSpacing="-10">S</text>
                                </clipPath>
                            </defs>
                            <image className="ob-ltr-photo"
                                href="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90"
                                x="0" y="0" width="560" height="700"
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="url(#ob-c1)" />
                        </svg>
                    </div>
                </div>

                {/* ══ SLIDE 2 — BUILDERS / of Excellence ══ */}
                <div className="ob-slide" id="ob-s2">
                    <div className="ob-s-left">
                        <p className="ob-eyebrow">Award-Winning Construction</p>
                        <div className="ob-hl">
                            <span className="ob-hl-row">
                                <span className="ob-hl-txt">Builders</span>
                            </span>
                            <span className="ob-hl-row">
                                <span className="ob-hl-txt ob-hl-accent">of Excellence</span>
                            </span>
                        </div>
                        <p className="ob-sub">
                            Over a decade of building trust,<br />
                            quality &amp; landmark structures.
                        </p>
                        <a href="/" className="ob-cta">
                            View Our Projects <span className="ob-cta-arrow">→</span>
                        </a>
                    </div>

                    <div className="ob-s-right">
                        <svg className="ob-ltr-svg"
                            viewBox="0 0 560 700"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <clipPath id="ob-c2">
                                    <text x="50%" y="52%"
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        fontFamily="'Montserrat',sans-serif"
                                        fontWeight="900"
                                        fontSize="620"
                                        letterSpacing="-10">E</text>
                                </clipPath>
                            </defs>
                            <image className="ob-ltr-photo"
                                href="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90"
                                x="0" y="0" width="560" height="700"
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="url(#ob-c2)" />
                        </svg>
                    </div>
                </div>

                {/* ── DOTS ── */}
                <div className="ob-dots" id="ob-dots">
                    <button className="ob-dot on" onClick={() => window.__obGoTo?.(0)} aria-label="Slide 1" />
                    <button className="ob-dot" onClick={() => window.__obGoTo?.(1)} aria-label="Slide 2" />
                    <button className="ob-dot" onClick={() => window.__obGoTo?.(2)} aria-label="Slide 3" />
                </div>

                {/* ── COUNTER ── */}
                <div className="ob-slide-count">
                    <span className="cur">01</span>
                    <span className="sep">/</span>
                    <span className="tot">03</span>
                </div>
            </div>
        </>
    );
};

export default Slider;