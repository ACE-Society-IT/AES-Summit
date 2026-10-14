'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { FluxLines } from './FluxLines';
import { ArrowUpRight } from 'lucide-react';

const FLUX_COLORS = ['#FFFFFF', '#FAF5EE', '#EAE0D3', '#D4C1B1'];

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

// Interactive constellation particles canvas component matching old aes portal / index.html
const ConstellationCanvas = memo(function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const nodeCount = Math.min(Math.floor(width / 22), 70);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.3
      });
    }

    let animId = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const angle = Math.atan2(dy, dx);
            n.x += Math.cos(angle) * 1.2;
            n.y += Math.sin(angle) * 1.2;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 224, 211, ${n.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dX = n.x - n2.x;
          const dY = n.y - n2.y;
          const distance = Math.sqrt(dX * dX + dY * dY);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            const lineAlpha = (1 - distance / 120) * 0.22;
            ctx.strokeStyle = `rgba(212, 193, 177, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none z-[1]" />;
});

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-16 xl:px-20 pt-36 pb-24 overflow-hidden bg-[rgb(27,8,5)]">
      {/* Background Layer 1: Ambient Conic Gradient Rotation from old aes portal */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] max-w-[1400px] max-h-[1400px] rounded-full opacity-20 filter blur-[90px] pointer-events-none z-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #5E423B, #A58A7A, #B2A298, #D8B28E, #917A6D, #6F5A50, #5E423B)',
          animation: 'spin 30s linear infinite'
        }}
      />

      {/* Background Layer 2: FluxLines Interactive Fluid Waves from header background */}
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-auto">
        <FluxLines
          colors={['#ffffff', '#FAF5EE', '#EAE0D3']}
          glow={3.0}
          lineWidth={1.5}
          rimWidth={0.25}
          flowDirection="down"
          speed={0.35}
          scale={1.6}
          turbulence={0.8}
          fluidity={0.1}
          sharpness={2.5}
          shimmer={1.5}
          mouseStrength={1}
          mouseRadius={0.35}
          intro={false}
          clickSwirl
          mouseInteraction
        />
      </div>

      {/* Background Layer 3: Interactive Constellation Nodes & Connecting Lines */}
      <ConstellationCanvas />

      {/* Background Layer 4: Radial Center Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[rgba(64,43,40,0.35)] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Centered Hero Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Summit Edition Pill with Glassmorphism matching the navbar */}
        <div className="animate-hero-pill inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[rgba(0,0,0,0.6)] backdrop-blur-xl border border-[rgba(255,255,255,0.15)] font-sans text-xs uppercase tracking-[0.2em] text-[rgb(234,224,211)] mb-8 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[rgb(74,222,128)] animate-pulse" />
          Alpha Entrepreneurship Summit · 2026 Edition
        </div>

        {/* Centered Main Headline with Balanced Typography Scale and Brand Text Shimmer */}
        <h1 className="animate-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[rgb(248,244,237)] leading-[1.08] mb-6 sm:mb-8 font-sans max-w-5xl">
          WHERE BOLD IDEAS <br className="hidden sm:inline" />
          <span className="text-shimmer-brand font-black drop-shadow-[0_10px_30px_rgba(245,184,149,0.25)]">
            BECOME ICONIC VENTURES
          </span>
        </h1>

        {/* Centered Subtitle */}
        <p className="animate-hero-subtitle text-base sm:text-xl md:text-2xl lg:text-3xl text-[rgb(212,193,177)] leading-relaxed max-w-3xl mb-8 sm:mb-10 font-normal font-sans px-2">
          Join the next generation of founders at our flagship event. Engage with industry leaders, develop your skills, and launch your innovative ideas.
        </p>

        {/* Real Dates from old aes portal in Glassmorphism Cards like the Navbar */}
        <div className="animate-hero-dates flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8">
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
        <div className="animate-hero-dates mb-10 flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[rgb(165,138,122)] font-semibold">
            Summit Commencement Countdown
          </span>
          <HeroCountdown />
        </div>

        {/* Centered Call to Action Buttons */}
        <div className="animate-hero-cta flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-sm sm:max-w-none mx-auto mb-16">
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
        <div className="animate-hero-metrics grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 w-full pt-10 border-t border-[rgba(255,255,255,0.1)]">
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
