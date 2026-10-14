'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { EcosystemMarquee } from '../components/EcosystemMarquee';
import { VisionSection } from '../components/VisionSection';
import { ModulesSection } from '../components/ModulesSection';
import { ConcaveCarousel } from '../components/ConcaveCarousel';
import { ParallaxPills } from '../components/ParallaxPills';
import { CommunitySection } from '../components/CommunitySection';
import { FaqAccordion } from '../components/FaqAccordion';
import { Footer } from '../components/Footer';
import { ScrollRevealObserver } from '../components/ScrollRevealObserver';

const OFFICIAL_REGISTRATION_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg';

export default function HomePage() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleOpenRegister = () => {
    window.open(OFFICIAL_REGISTRATION_URL, '_blank', 'noopener,noreferrer');
  };

  // Tactile audio feedback on interaction
  useEffect(() => {
    if (!soundEnabled) return;

    const playTactileClick = () => {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
      } catch {
        // Ignore audio context autoplay restrictions
      }
    };

    const handleInteract = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, select')) {
        playTactileClick();
      }
    };

    window.addEventListener('click', handleInteract);
    return () => window.removeEventListener('click', handleInteract);
  }, [soundEnabled]);

  // Clean URL handler: scrolls to target without exposing #hash in address bar
  useEffect(() => {
    // 1. Immediately clean address bar if any hash exists
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashTarget = window.location.hash.replace('#', '');
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      if (hashTarget) {
        setTimeout(() => {
          const el = document.getElementById(hashTarget);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }

    // 2. Check for scroll target stored in sessionStorage
    try {
      const target = sessionStorage.getItem('scroll_target');
      if (target) {
        sessionStorage.removeItem('scroll_target');
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } catch {
      // Ignore storage restrictions
    }

    // 3. Keep address bar hash-free on any sudden hash changes
    const handleHash = () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        if (hashId) {
          const el = document.getElementById(hashId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <main className="relative min-h-screen bg-[rgb(27,8,5)] text-[rgb(248,244,237)] overflow-x-hidden selection:bg-[rgb(234,224,211)] selection:text-[rgb(27,8,5)]">
      {/* Bidirectional Scroll Animation Engine */}
      <ScrollRevealObserver />

      {/* Floating Island Glassmorphism Navbar */}
      <Navbar
        onOpenRegister={handleOpenRegister}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
      />

      {/* Keynote Hero Stage with WebGL2 Fluid Lines + Constellation Particles + Dates */}
      <Hero onOpenRegister={handleOpenRegister} />

      {/* Partner Allocators & Ecosystem Marquee */}
      <EcosystemMarquee />

      {/* Authentic AES Vision Section (Clean White Theme & White Glassmorphism Cards) */}
      <VisionSection />

      {/* React Bits Pro Concave Carousel: 3D Gallery Wall Curving Around the Viewer */}
      <div id="gallery">
        <ConcaveCarousel />
      </div>

      {/* Authentic AES 5 Flagship Simulation Modules (Navbar-matching Glassmorphism Cards) */}
      <ModulesSection onOpenRegister={handleOpenRegister} />

      {/* Interactive Parallax Pills: AES Core Vectors */}
      <div id="pills">
        <ParallaxPills
          title="THE ENTREPRENEURSHIP CONVERGENCE"
          subtitle="Explore the key pillars connecting 3,500+ founders, venture allocators, and industry mentors."
          strength={34}
        />
      </div>

      {/* Brand Ambassador & Community Section (Navbar Glassmorphism) */}
      <CommunitySection />

      {/* Authentic AES Operations & FAQs (Clean White Theme) */}
      <div id="faq">
        <FaqAccordion />
      </div>

      {/* Master Footer with Dynamic Ambient Gradient */}
      <Footer />
    </main>
  );
}
