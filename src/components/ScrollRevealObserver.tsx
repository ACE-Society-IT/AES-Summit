'use client';

import React, { useEffect } from 'react';

export const ScrollRevealObserver: React.FC = () => {
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('reveal-in');
          el.classList.remove('reveal-out');
        } else {
          // Fade out when scrolling out of viewport (scrolling both down past it or back up away)
          el.classList.remove('reveal-in');
          el.classList.add('reveal-out');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '40px 0px 40px 0px', // Generous buffer so elements stay fully visible near edges
      threshold: 0.02
    });

    const registerElements = () => {
      const elements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom'
      );
      elements.forEach((el) => observer.observe(el));
    };

    registerElements();

    // Re-check once after page settles
    const timer = setTimeout(registerElements, 800);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ScrollRevealObserver;
