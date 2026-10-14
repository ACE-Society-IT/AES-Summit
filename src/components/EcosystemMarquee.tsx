'use client';

import React from 'react';

interface Partner {
  name: string;
  tag: string;
  stage: string;
  logoImg: string;
}

const ROW_ONE_PARTNERS: Partner[] = [
  {
    name: 'SEQUOIA CAPITAL',
    tag: 'Lead Allocator',
    stage: 'Multi-Stage',
    logoImg: '/assets/partners/sequoia.svg'
  },
  {
    name: 'a16z',
    tag: 'Frontier AI Fund',
    stage: 'Seed to Growth',
    logoImg: '/assets/partners/a16z.svg'
  },
  {
    name: 'FOUNDERS FUND',
    tag: 'DeepTech & HardTech',
    stage: 'Venture & Growth',
    logoImg: '/assets/partners/founders-fund.svg'
  },
  {
    name: 'Y COMBINATOR',
    tag: 'Pre-Seed Engine',
    stage: 'Early Stage',
    logoImg: '/assets/partners/y-combinator.svg'
  },
  {
    name: 'LIGHTSPEED',
    tag: 'Global Syndicate',
    stage: 'Global Multi-Stage',
    logoImg: '/assets/partners/lightspeed.svg'
  },
  {
    name: 'BENCHMARK',
    tag: 'Founders Collective',
    stage: 'Series A Lead',
    logoImg: '/assets/partners/benchmark.svg'
  },
  {
    name: 'KHOSLA VENTURES',
    tag: 'Clean Fusion & Bio',
    stage: 'Frontier Science',
    logoImg: '/assets/partners/khosla.svg'
  },
  {
    name: 'ACCEL PARTNERS',
    tag: 'Early Growth Syndicate',
    stage: 'Series A & B',
    logoImg: '/assets/partners/accel.svg'
  }
];

const ROW_TWO_PARTNERS: Partner[] = [
  {
    name: 'INDEX VENTURES',
    tag: 'Cross-Border Capital',
    stage: 'Global Scale',
    logoImg: '/assets/partners/index-ventures.svg'
  },
  {
    name: 'BESSEMER VENTURE',
    tag: 'Cloud & Infrastructure',
    stage: 'Roadmap Lead',
    logoImg: '/assets/partners/bessemer.svg'
  },
  {
    name: 'GENERAL CATALYST',
    tag: 'Venture Creation',
    stage: 'Catalyst Fund',
    logoImg: '/assets/partners/general-catalyst.svg'
  },
  {
    name: 'KLEINER PERKINS',
    tag: 'Pioneering Ventures',
    stage: 'HardTech & Health',
    logoImg: '/assets/partners/kleiner-perkins.svg'
  },
  {
    name: 'LUX CAPITAL',
    tag: 'DeepTech Frontier',
    stage: 'Physical Sciences',
    logoImg: '/assets/partners/lux-capital.svg'
  },
  {
    name: 'TIGER GLOBAL',
    tag: 'Global Growth',
    stage: 'Late Stage',
    logoImg: '/assets/partners/tiger-global.svg'
  },
  {
    name: 'COATUE',
    tag: 'Tech Growth Fund',
    stage: 'Public & Private',
    logoImg: '/assets/partners/coatue.svg'
  },
  {
    name: 'INSIGHT PARTNERS',
    tag: 'ScaleUp Software',
    stage: 'Growth Equity',
    logoImg: '/assets/partners/insight-partners.svg'
  }
];

export const EcosystemMarquee: React.FC = () => {
  return (
    <section className="relative w-full py-12 bg-white border-y border-[#EAE0D3] overflow-hidden">
      {/* Section Subheader Bar in Clean White Theme */}
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 scroll-reveal">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-[#1B0805] font-extrabold">
            PARTNER SYNDICATES & INSTITUTIONAL ALLOCATORS
          </h2>
        </div>
        <span className="font-sans text-xs text-[#7D574F] font-semibold tracking-wider">
          OVER $18.5B COMBINED ASSETS UNDER MANAGEMENT REPRESENTED
        </span>
      </div>

      {/* Track 1: Sliding Left (Clean White Theme & White Cards) */}
      <div className="relative w-full flex overflow-x-hidden mb-4 group">
        <div className="animate-marquee-left flex gap-5 whitespace-nowrap py-2">
          {ROW_ONE_PARTNERS.concat(ROW_ONE_PARTNERS).map((p, idx) => (
            <div
              key={`row1-${p.name}-${idx}`}
              className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-white border border-[#EAE0D3] hover:border-[#A58A7A] hover:shadow-md transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(64,43,40,0.04)]"
            >
              {/* Small Logo Image Container */}
              <div className="w-8 h-8 rounded-lg bg-[#F8F4ED] border border-[#EAE0D3] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img
                  src={p.logoImg}
                  alt={`${p.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Graceful fallback to initial badge if image file is missing
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<span class="font-sans font-black text-xs text-[#402B28]">${p.name.charAt(0)}</span>`;
                    }
                  }}
                />
              </div>

              {/* Partner Name in Clean Bold Font */}
              <span className="font-sans font-bold text-xs tracking-wider text-[#1B0805]">
                {p.name}
              </span>

              <span className="w-1 h-1 rounded-full bg-[#A58A7A] opacity-40" />

              {/* Tag in Clean Sans */}
              <span className="font-sans text-[11px] text-[#7D574F] font-medium">
                {p.tag}
              </span>

              {/* Stage Badge */}
              <span className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F8F4ED] text-[#5E423B] border border-[#EAE0D3]">
                {p.stage}
              </span>
            </div>
          ))}
        </div>

        {/* Fading Edge Gradients in Clean White for Smooth Infinite Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
      </div>

      {/* Track 2: Sliding Right (Clean White Theme & White Cards) */}
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee-right flex gap-5 whitespace-nowrap py-2">
          {ROW_TWO_PARTNERS.concat(ROW_TWO_PARTNERS).map((p, idx) => (
            <div
              key={`row2-${p.name}-${idx}`}
              className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-white border border-[#EAE0D3] hover:border-[#A58A7A] hover:shadow-md transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(64,43,40,0.04)]"
            >
              {/* Small Logo Image Container */}
              <div className="w-8 h-8 rounded-lg bg-[#F8F4ED] border border-[#EAE0D3] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img
                  src={p.logoImg}
                  alt={`${p.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<span class="font-sans font-black text-xs text-[#402B28]">${p.name.charAt(0)}</span>`;
                    }
                  }}
                />
              </div>

              {/* Partner Name in Clean Bold Font */}
              <span className="font-sans font-bold text-xs tracking-wider text-[#1B0805]">
                {p.name}
              </span>

              <span className="w-1 h-1 rounded-full bg-[#A58A7A] opacity-40" />

              {/* Tag in Clean Sans */}
              <span className="font-sans text-[11px] text-[#7D574F] font-medium">
                {p.tag}
              </span>

              {/* Stage Badge */}
              <span className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F8F4ED] text-[#5E423B] border border-[#EAE0D3]">
                {p.stage}
              </span>
            </div>
          ))}
        </div>

        {/* Fading Edge Gradients in Clean White */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
      </div>
    </section>
  );
};
