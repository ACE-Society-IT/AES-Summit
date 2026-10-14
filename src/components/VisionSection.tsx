'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Rocket, 
  TrendingUp, 
  Link2, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import { ColoredGradientWave } from './ColoredGradientWave';

interface VisionPillar {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PILLARS: VisionPillar[] = [
  {
    title: 'Vibrant Ecosystem',
    description: 'Nurture innovation, creativity, and entrepreneurship across high-potential founders.',
    icon: <Sparkles className="w-6 h-6 transition-colors duration-300" />
  },
  {
    title: 'Empower Founders',
    description: 'Empower young entrepreneurs to turn their unique ideas into viable, scaling realities.',
    icon: <Rocket className="w-6 h-6 transition-colors duration-300" />
  },
  {
    title: 'Drive Growth',
    description: 'Drive positive change, market resilience, and sustainable economic growth in respective fields.',
    icon: <TrendingUp className="w-6 h-6 transition-colors duration-300" />
  },
  {
    title: 'Bridge The Gap',
    description: 'Bridge the critical divide between academia and the high-speed professional startup ecosystem.',
    icon: <Link2 className="w-6 h-6 transition-colors duration-300" />
  },
  {
    title: 'Connect & Thrive',
    description: 'Provide an authentic platform for ambitious talent to connect, collaborate, and thrive.',
    icon: <Users className="w-6 h-6 transition-colors duration-300" />
  },
  {
    title: 'Build Confidence',
    description: 'Equip participants with rigorous commercial knowledge and founder conviction to excel.',
    icon: <ShieldCheck className="w-6 h-6 transition-colors duration-300" />
  }
];

export const VisionSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  return (
    <section id="vision" className="relative w-full py-28 bg-[#F8F4ED] overflow-hidden">
      {/* Colored Gradient Wave Animated Background (Celestial aurora, cosmic violet, cyan & gold) */}
      <ColoredGradientWave
        speed={0.35}
        opacity={0.65}
        colorScheme="vision-aurora"
      />

      {/* Subtle grid pattern background */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(64, 43, 40, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-2 text-left scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-[rgba(0,0,0,0.08)] font-sans text-xs uppercase tracking-[0.2em] text-[#5E423B] mb-5 shadow-sm font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#5E423B]" />
              FOUNDATIONAL VISION
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#402B28] font-sans leading-[1.1]">
              Our Vision for Future Founders
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed font-sans">
              To cultivate a vibrant ecosystem that nurtures innovation and empowers a new generation of entrepreneurs. We aim to bridge the gap between academia and industry, providing a premier platform for talented individuals to connect, learn, and launch ventures that drive positive change.
            </p>
          </div>

          {/* Ambition Meets Opportunity Card in White Glassmorphism */}
          <div className="lg:col-span-3 scroll-reveal reveal-delay-2">
            <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-[rgba(0,0,0,0.08)] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden group">
              {/* Subtle ambient light gradient flowing behind the text */}
              <div 
                className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-[#F5B895]/20 via-[#D89065]/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" 
              />
              <div className="flex justify-between items-start text-[#A58A7A] text-xs font-mono uppercase tracking-widest mb-8">
                <span>Fostering Innovation · AES 2026</span>
                <span className="px-3 py-1 bg-[#F8F4ED] rounded-full text-[#402B28] font-sans font-bold">
                  FLAGSHIP INITIATIVE
                </span>
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug font-sans mb-4 text-shimmer-warm">
                This is where{' '}
                <span className="relative inline-block text-shimmer-terracotta font-black drop-shadow-[0_2px_12px_rgba(196,104,60,0.25)]">
                  ambition meets opportunity
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#8C452A] via-[#E89D77] to-[#8C452A] bg-[length:200%_auto] rounded-full opacity-80" />
                </span>
                . A platform to develop your ideas, build your network, and forge the future.
              </p>
              <p className="text-xl sm:text-2xl text-[#A58A7A] font-semibold font-sans mt-6">
                Your journey starts here.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Vision Pillars Grid in Clean White Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const isActive = activePillar === idx;
            return (
              <div
                key={idx}
                onClick={() => setActivePillar(isActive ? null : idx)}
                className={`rounded-3xl backdrop-blur-xl p-8 transition-all duration-300 flex items-start gap-5 group cursor-pointer select-none scroll-reveal reveal-delay-${(idx % 3) + 1} ${
                  isActive
                    ? 'bg-white border-2 border-[#5E423B]/40 shadow-[0_20px_45px_rgba(64,43,40,0.12)] -translate-y-1'
                    : 'bg-white/90 border border-[rgba(0,0,0,0.08)] shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-[#5E423B]/20'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm ${
                    isActive
                      ? 'bg-[#5E423B] text-white border-[#5E423B] scale-105 shadow-md'
                      : 'bg-[#FAF5EE] text-[#5E423B] border-[rgba(64,43,40,0.12)] group-hover:scale-110 group-hover:bg-[#5E423B] group-hover:text-white group-hover:border-[#5E423B]'
                  }`}
                >
                  {pillar.icon}
                </div>
                <div>
                  <h3
                    className={`text-xl font-bold mb-2 font-sans transition-colors ${
                      isActive ? 'text-[#5E423B]' : 'text-[#402B28] group-hover:text-[#5E423B]'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
