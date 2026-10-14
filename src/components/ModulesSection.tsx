'use client';

import React, { useRef, useState } from 'react';
import { 
  TrendingUp, 
  Trophy, 
  Lightbulb, 
  ShieldAlert, 
  Megaphone, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ColoredGradientWave } from './ColoredGradientWave';

interface ModuleItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan?: string;
}

const MODULES: ModuleItem[] = [
  {
    id: 'investomania',
    category: 'FINANCE & STRATEGY',
    title: 'Investomania',
    description: 'Step into the shoes of investors navigating volatile markets, insider leaks, and financial crises—adapt, trade, and survive!',
    icon: <TrendingUp className="w-6 h-6 transition-colors duration-300" />,
    colSpan: 'col-span-12 md:col-span-6 lg:col-span-4'
  },
  {
    id: 'market-monopoly',
    category: 'BUSINESS ACUMEN',
    title: 'Market Monopoly',
    description: 'Compete, trade, and build empires in a fast-paced twist on the classic board game—bid, negotiate, and outsmart rivals to dominate the market!',
    icon: <Trophy className="w-6 h-6 transition-colors duration-300" />,
    colSpan: 'col-span-12 md:col-span-6 lg:col-span-4'
  },
  {
    id: 'planning-prism',
    category: 'INNOVATION & PITCHING',
    title: 'Planning Prism',
    description: 'Design bold business solutions to global crises, pitch to investors, and battle through intense rounds testing creativity, strategy, and teamwork!',
    icon: <Lightbulb className="w-6 h-6 transition-colors duration-300" />,
    colSpan: 'col-span-12 md:col-span-6 lg:col-span-4'
  },
  {
    id: 'defend-the-empire',
    category: 'CRISIS MANAGEMENT',
    title: 'Defend the Empire',
    description: 'Take charge as HR and PR strategists—manage crises, handle media backlash, and craft recovery plans to save your company from collapse!',
    icon: <ShieldAlert className="w-6 h-6 transition-colors duration-300" />,
    colSpan: 'col-span-12 md:col-span-6 lg:col-span-6'
  },
  {
    id: 'viral-velocity',
    category: 'MARKETING & BRANDING',
    title: 'Viral Velocity',
    description: 'Revive failed products, tackle brand scandals, and create futuristic innovations in a high-speed simulation blending marketing, strategy, and creativity.',
    icon: <Megaphone className="w-6 h-6 transition-colors duration-300" />,
    colSpan: 'col-span-12 md:col-span-12 lg:col-span-6'
  }
];

interface ModulesSectionProps {
  onOpenRegister: () => void;
}

export const ModulesSection: React.FC<ModulesSectionProps> = ({ onOpenRegister }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section id="modules" className="relative w-full py-28 bg-[#F8F4ED] border-t border-[rgba(64,43,40,0.08)] overflow-hidden">
      {/* Colored Gradient Wave Animated Background (Fiery sunset, amber flame, warm gold) */}
      <ColoredGradientWave
        speed={0.35}
        opacity={0.65}
        colorScheme="modules-flame"
      />

      {/* Subtle radial architectural dots */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(64, 43, 40, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Section Header in Brown and White Theme */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 scroll-reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-[rgba(64,43,40,0.12)] font-sans text-xs uppercase tracking-[0.2em] text-[#5E423B] mb-4 font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#5E423B]" />
              HIGH-STAKES SIMULATIONS
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#402B28] font-sans">
              Our Flagship Modules
            </h2>
          </div>
          <p className="text-base text-gray-700 max-w-md font-sans">
            Dive into our series of high-stakes simulations, each designed to test your strategy, creativity, and leadership under pressure.
          </p>
        </div>

        {/* Modules Grid with Clean White Glassmorphism Cards & Brown Theme Accents */}
        <div 
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-12 gap-6 relative"
        >
          {MODULES.map((item, idx) => (
            <div
              key={item.id}
              className={`${item.colSpan || 'col-span-12 md:col-span-6 lg:col-span-4'} group relative rounded-3xl bg-white/90 backdrop-blur-xl border border-[rgba(64,43,40,0.1)] shadow-[0_12px_36px_rgba(64,43,40,0.05)] p-8 transition-all duration-300 hover:border-[#402B28] hover:shadow-[0_24px_50px_rgba(64,43,40,0.12)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden scroll-reveal reveal-delay-${(idx % 3) + 1}`}
            >
              {/* Subtle cursor spotlight effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle 260px at ${mousePos.x}px ${mousePos.y}px, rgba(234, 224, 211, 0.4), transparent 80%)`
                }}
              />

              <div className="relative z-10">
                {/* Icon & Category Pill in Brown & White Theme */}
                <div className="flex items-center justify-between mb-6">
                  <div 
                    className="w-13 h-13 rounded-2xl flex items-center justify-center bg-[#F8F4ED] border border-[rgba(64,43,40,0.12)] text-[#5E423B] group-hover:scale-110 group-hover:bg-[#402B28] group-hover:text-white group-hover:border-[#402B28] transition-all shadow-sm"
                  >
                    {item.icon}
                  </div>
                  <span 
                    className="font-sans text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#F8F4ED] border border-[rgba(64,43,40,0.15)] text-[#5E423B]"
                  >
                    {item.category}
                  </span>
                </div>

                {/* Module Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-[#402B28] mb-3 font-sans group-hover:text-[#5E423B] transition-colors">
                  {item.title}
                </h3>

                {/* Module Description */}
                <p className="text-sm text-gray-600 leading-relaxed font-sans font-normal mb-8">
                  {item.description}
                </p>
              </div>

              {/* Bottom Action in Brown & White Theme */}
              <div className="relative z-10 pt-5 border-t border-[rgba(64,43,40,0.08)] flex items-center justify-between">
                <a
                  href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#402B28] hover:bg-[#5E423B] text-white font-sans text-xs font-bold transition-all cursor-pointer shadow-md group-hover:shadow-lg"
                >
                  <span>Register for Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
                <span className="font-mono text-[10px] text-[#A58A7A] font-semibold">
                  SIMULATION // 2026
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
