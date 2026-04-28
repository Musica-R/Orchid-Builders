import { useEffect } from 'react';

const useScrollReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('vis');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.sr, .sr-l, .sr-r');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    });
};

export default useScrollReveal;