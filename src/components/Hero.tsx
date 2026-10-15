'use client';

import React, { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { FluxLines } from './FluxLines';

// Isolated memoized countdown component
const HeroCountdown = memo(function HeroCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '24',
    hours: '08',
    minutes: '45',
    seconds: '12'
  });

  useEffect(() => {
    const targetDate = new Date('2026-11-07T09:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0')
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 sm:gap-4 font-mono text-sm sm:text-base font-bold text-[rgb(250,204,21)] px-6 py-2.5 rounded-full bg-[rgba(0,0,0,0.65)] backdrop-blur-xl border border-[rgba(255,255,255,0.18)] shadow-2xl">
      <span className="flex items-center gap-1">
        <span className="text-xl sm:text-2xl text-[rgb(248,244,237)]">{timeLeft.days}</span>
        <span className="text-[10px] text-[rgb(165,138,122)] uppercase tracking-wider">d</span>
      </span>
      <span className="text-[rgba(255,255,255,0.3)]">:</span>
      <span className="flex items-center gap-1">
        <span className="text-xl sm:text-2xl text-[rgb(248,244,237)]">{timeLeft.hours}</span>
        <span className="text-[10px] text-[rgb(165,138,122)] uppercase tracking-wider">h</span>
      </span>
      <span className="text-[rgba(255,255,255,0.3)]">:</span>
      <span className="flex items-center gap-1">
        <span className="text-xl sm:text-2xl text-[rgb(248,244,237)]">{timeLeft.minutes}</span>
        <span className="text-[10px] text-[rgb(165,138,122)] uppercase tracking-wider">m</span>
      </span>
      <span className="text-[rgba(255,255,255,0.3)]">:</span>
      <span className="flex items-center gap-1">
        <span className="text-xl sm:text-2xl text-[rgb(250,204,21)]">{timeLeft.seconds}</span>
        <span className="text-[10px] text-[rgb(165,138,122)] uppercase tracking-wider">s</span>
      </span>
    </div>
  );
});

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-16 xl:px-20 pt-36 pb-24 overflow-hidden bg-[rgb(27,8,5)]">
      {/* Background Layer 1: Ambient Conic Gradient Warm Illumination */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] max-w-[1400px] max-h-[1400px] rounded-full opacity-25 filter blur-[100px] pointer-events-none z-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #5E423B, #A58A7A, #B2A298, #D8B28E, #917A6D, #6F5A50, #5E423B)',
          animation: 'spin 35s linear infinite'
        }}
      />

      {/* Background Layer 2: FluxLines Fluid Waves with Crisp High-DPI Vector Definition */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <FluxLines
          colors={['#ffffff', '#FAF5EE', '#EAE0D3']}
          glow={0.4}
          lineWidth={1.1}
          rimWidth={0.1}
          flowDirection="down"
          speed={0.15}
          scale={2.0}
          turbulence={0.7}
          fluidity={0.12}
          sharpness={2.5}
          shimmer={0.8}
          mouseStrength={0.7}
          mouseRadius={0.35}
          intro={false}
          clickSwirl
          mouseInteraction
        />
      </div>

      {/* Background Layer 3: Radial Center Ambient Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(94,66,59,0.35),rgba(42,20,16,0.2)_50%,transparent_75%)] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(245,184,149,0.18),transparent_70%)] blur-[110px] pointer-events-none z-0" />

      {/* Centered Hero Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Big AES Logo in the Center */}
        <div className="relative mb-3 sm:mb-5 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[560px] flex items-center justify-center">
          {/* Subtle Ambient Backlight Halo behind the logo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,184,149,0.28),rgba(234,224,211,0.08)_45%,transparent_70%)] blur-3xl pointer-events-none" />
          <Image
            src="/assets/aes-logo.png"
            alt="Alpha Entrepreneurship Summit (AES) Logo"
            width={560}
            height={280}
            priority
            className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Alpha Entrepreneurship Summit with Text Color Changing Animation */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-center leading-[1.1] mb-6 sm:mb-8 font-sans max-w-5xl">
          <span className="text-shimmer-brand font-black drop-shadow-[0_10px_35px_rgba(245,184,149,0.35)]">
            Alpha Entrepreneurship Summit
          </span>
        </h1>

        {/* Centered Subtitle */}
        <p className="text-base sm:text-xl md:text-2xl text-[rgb(212,193,177)] leading-relaxed max-w-3xl mb-8 sm:mb-10 font-normal font-sans px-2">
          Join the next generation of founders at our flagship event. Engage with industry leaders, develop your skills, and launch your innovative ideas.
        </p>

        {/* Real Dates in Glassmorphism Cards */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8">
          <div className="bg-[rgba(0,0,0,0.65)] backdrop-blur-xl rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-[rgba(255,255,255,0.15)] shadow-xl text-center min-w-[88px] sm:min-w-[105px] hover:border-[rgba(255,255,255,0.3)] transition-all hover:scale-105">
            <p className="text-2xl sm:text-4xl font-extrabold text-[rgb(248,244,237)] font-sans">07</p>
            <p className="text-[10px] sm:text-xs font-bold text-[rgb(234,224,211)] uppercase tracking-wider font-sans mt-0.5">NOV</p>
            <p className="text-[9px] sm:text-[10px] text-[rgb(165,138,122)] font-mono uppercase tracking-widest mt-1">FRIDAY</p>
          </div>
          <div className="bg-[rgba(0,0,0,0.65)] backdrop-blur-xl rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-[rgba(255,255,255,0.15)] shadow-xl text-center min-w-[88px] sm:min-w-[105px] hover:border-[rgba(255,255,255,0.3)] transition-all hover:scale-105">
            <p className="text-2xl sm:text-4xl font-extrabold text-[rgb(248,244,237)] font-sans">08</p>
            <p className="text-[10px] sm:text-xs font-bold text-[rgb(234,224,211)] uppercase tracking-wider font-sans mt-0.5">NOV</p>
            <p className="text-[9px] sm:text-[10px] text-[rgb(165,138,122)] font-mono uppercase tracking-widest mt-1">SATURDAY</p>
          </div>
          <div className="bg-[rgba(0,0,0,0.65)] backdrop-blur-xl rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-[rgba(255,255,255,0.15)] shadow-xl text-center min-w-[88px] sm:min-w-[105px] hover:border-[rgba(255,255,255,0.3)] transition-all hover:scale-105">
            <p className="text-2xl sm:text-4xl font-extrabold text-[rgb(248,244,237)] font-sans">09</p>
            <p className="text-[10px] sm:text-xs font-bold text-[rgb(234,224,211)] uppercase tracking-wider font-sans mt-0.5">NOV</p>
            <p className="text-[9px] sm:text-[10px] text-[rgb(165,138,122)] font-mono uppercase tracking-widest mt-1">SUNDAY</p>
          </div>
        </div>

        {/* Centered Timer directly below the text & dates */}
        <div className="mb-10 flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[rgb(165,138,122)] font-semibold">
            Summit Commencement Countdown
          </span>
          <HeroCountdown />
        </div>

        {/* Centered Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-sm sm:max-w-none mx-auto mb-16">
          <a
            href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-nested btn-primary px-8 sm:px-9 py-3.5 sm:py-4 text-base font-sans font-semibold cursor-pointer shadow-2xl hover:scale-105 active:scale-95 transition-all justify-center sm:justify-between"
          >
            <span>Register Now</span>
            <span className="btn-icon-circle">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('modules');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              if (typeof window !== 'undefined' && window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
              }
            }}
            className="w-full sm:w-auto btn-nested btn-secondary px-8 sm:px-9 py-3.5 sm:py-4 text-base font-sans font-semibold cursor-pointer shadow-xl hover:scale-105 active:scale-95 transition-all justify-center sm:justify-between"
          >
            <span>Explore Modules</span>
            <span className="btn-icon-circle">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Centered Trust Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 w-full pt-10 border-t border-[rgba(255,255,255,0.1)]">
          <div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[rgb(234,224,211)]">5+</div>
            <div className="font-sans text-xs uppercase tracking-wider text-[rgb(165,138,122)] mt-1.5 font-medium">Flagship Modules</div>
          </div>
          <div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[rgb(234,224,211)]">3 Days</div>
            <div className="font-sans text-xs uppercase tracking-wider text-[rgb(165,138,122)] mt-1.5 font-medium">Nov 07 - 09, 2026</div>
          </div>
          <div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[rgb(234,224,211)]">3,500+</div>
            <div className="font-sans text-xs uppercase tracking-wider text-[rgb(165,138,122)] mt-1.5 font-medium">Future Founders</div>
          </div>
          <div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-[rgb(234,224,211)]">100%</div>
            <div className="font-sans text-xs uppercase tracking-wider text-[rgb(165,138,122)] mt-1.5 font-medium">High-Stakes Simulations</div>
          </div>
        </div>
      </div>
    </section>
  );
};
