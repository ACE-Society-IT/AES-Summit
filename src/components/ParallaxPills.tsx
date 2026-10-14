'use client';

import React, { useEffect, useRef } from 'react';

export interface PillItem {
  id: string;
  label: string;
  theme: 'white' | 'dark';
  depth: number;       // Parallax depth multiplier (0.5 to 1.8)
  initialX: number;    // % position
  initialY: number;    // % position
  rotation: number;    // Natural resting angle in degrees
}

const DEFAULT_PILLS: PillItem[] = [
  {
    id: '1',
    label: 'Venture Capital & Allocators',
    theme: 'dark',
    depth: 1.3,
    initialX: 10,
    initialY: 15,
    rotation: -3
  },
  {
    id: '2',
    label: 'Investomania Simulation',
    theme: 'white',
    depth: 0.8,
    initialX: 56,
    initialY: 16,
    rotation: 2
  },
  {
    id: '3',
    label: 'Market Monopoly Arena',
    theme: 'white',
    depth: 1.6,
    initialX: 24,
    initialY: 42,
    rotation: -4
  },
  {
    id: '4',
    label: 'Planning Prism',
    theme: 'dark',
    depth: 1.1,
    initialX: 68,
    initialY: 42,
    rotation: 1
  },
  {
    id: '5',
    label: 'Defend The Empire',
    theme: 'white',
    depth: 0.9,
    initialX: 12,
    initialY: 72,
    rotation: -1
  },
  {
    id: '6',
    label: 'Viral Velocity Studio',
    theme: 'dark',
    depth: 1.5,
    initialX: 52,
    initialY: 74,
    rotation: 3
  },
  {
    id: '7',
    label: '3,500+ Next-Gen Founders',
    theme: 'dark',
    depth: 1.2,
    initialX: 38,
    initialY: 26,
    rotation: -2
  },
  {
    id: '8',
    label: 'Institutional Backers',
    theme: 'white',
    depth: 0.7,
    initialX: 74,
    initialY: 68,
    rotation: -2
  }
];

interface ParallaxPillsProps {
  pills?: PillItem[];
  title?: string;
  subtitle?: string;
  strength?: number;
  className?: string;
}

export const ParallaxPills: React.FC<ParallaxPillsProps> = ({
  pills = DEFAULT_PILLS,
  title = "THE ENTREPRENEURSHIP CONVERGENCE",
  subtitle = "Interactive thematic vectors connecting 3,500+ founders, venture allocators, and industry leaders.",
  strength = 36,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = relX;
      targetY = relY;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      pills.forEach((pill, index) => {
        const el = pillRefs.current[index];
        if (!el) return;
        const moveX = currentX * strength * pill.depth;
        const moveY = currentY * strength * pill.depth;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${pill.rotation}deg)`;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pills, strength]);

  return (
    <section className={`relative w-full py-32 bg-white text-[rgb(27,8,5)] overflow-hidden select-none border-y border-[rgba(0,0,0,0.08)] ${className}`}>
      {/* Subtle architectural dot grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(27, 8, 5, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header Container */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 mb-16 scroll-reveal">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F4ED] border border-[#EAE0D3] font-sans text-xs uppercase tracking-[0.2em] text-[#5E423B] font-bold mb-4 shadow-xs">
          CORE SUMMIT VECTORS · AES 2026
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[rgb(27,8,5)] mb-3 font-sans">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-[rgb(75,85,99)] max-w-2xl font-normal font-sans">
          {subtitle}
        </p>
      </div>

      {/* Mobile-optimized interactive pill cloud (Clean, fully responsive, no clipping or overlapping) */}
      <div className="md:hidden relative z-10 w-full px-6 flex flex-wrap items-center justify-center gap-3">
        {pills.map((pill) => {
          const isWhite = pill.theme === 'white';
          return (
            <div
              key={pill.id}
              className={`px-5 py-3 rounded-full transition-all duration-300 active:scale-95 ${
                isWhite
                  ? 'bg-white text-[rgb(27,8,5)] border border-[rgba(0,0,0,0.12)] shadow-md'
                  : 'bg-[rgb(27,8,5)] text-white border border-[rgba(255,255,255,0.1)] shadow-md'
              }`}
            >
              <span className="font-sans font-bold text-sm tracking-tight select-none">
                {pill.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Desktop & Tablet Parallax Pills Stage Container */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full max-w-[1800px] h-[520px] md:h-[580px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 z-10 cursor-crosshair"
      >
        {pills.map((pill, index) => {
          const isWhite = pill.theme === 'white';
          return (
            <div
              key={pill.id}
              ref={(el) => { pillRefs.current[index] = el; }}
              className="absolute transition-transform duration-75 ease-out will-change-transform"
              style={{
                left: `${pill.initialX}%`,
                top: `${pill.initialY}%`,
                transform: `translate3d(0, 0, 0) rotate(${pill.rotation}deg)`
              }}
            >
              <div
                className={`group px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-5 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isWhite
                    ? 'bg-white text-[rgb(27,8,5)] border border-[rgba(0,0,0,0.12)] shadow-[0_20px_48px_rgba(0,0,0,0.12)] hover:shadow-[0_28px_64px_rgba(0,0,0,0.18)]'
                    : 'bg-[rgb(27,8,5)] text-white border border-[rgba(255,255,255,0.1)] shadow-[0_20px_48px_rgba(27,8,5,0.35)] hover:shadow-[0_28px_64px_rgba(27,8,5,0.5)]'
                }`}
              >
                <span className="font-sans font-bold text-base sm:text-lg md:text-xl tracking-tight select-none">
                  {pill.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ParallaxPills;
