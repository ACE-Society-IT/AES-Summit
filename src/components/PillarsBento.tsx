'use client';

import React, { useState } from 'react';
import { 
  Rocket, 
  Cpu, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight,
  Zap,
  Globe
} from 'lucide-react';

interface BentoItem {
  id: string;
  colSpan: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: React.ReactNode;
  accent: string;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 'syndicate',
    colSpan: 'col-span-12 lg:col-span-8',
    badge: 'CORE INITIATIVE',
    title: 'High-Stakes Syndicate Arena',
    subtitle: 'Direct LP & VC capital matchmaking',
    description: 'Pitch live to vetted managing partners deploying $50M+ in collective checks. No intermediary gatekeepers — real-time term sheets and term syndicate discussions.',
    metric: '$50M+',
    metricLabel: 'Capital Committed on Stage',
    icon: <Rocket className="w-6 h-6 text-[rgb(74,222,128)]" />,
    accent: 'rgb(74,222,128)'
  },
  {
    id: 'dealflow',
    colSpan: 'col-span-12 lg:col-span-4',
    badge: 'EXCLUSIVE ACCESS',
    title: 'Curated Dealflow Dossiers',
    subtitle: 'Verified audited metrics',
    description: 'Every showcase venture passes our rigorous technical and commercial due diligence before entering the summit arena.',
    metric: '4.2%',
    metricLabel: 'Acceptance Rate',
    icon: <ShieldCheck className="w-6 h-6 text-[rgb(96,165,250)]" />,
    accent: 'rgb(96,165,250)'
  },
  {
    id: 'frontier',
    colSpan: 'col-span-12 lg:col-span-4',
    badge: 'TECHNICAL SYMPOSIUM',
    title: 'Frontier AI & Physical Systems',
    subtitle: 'Beyond standard foundation models',
    description: 'Deep dive sessions on neuromorphic computing, humanoid robotics, quantum-safe networks, and modular fusion energy systems.',
    metric: '18+',
    metricLabel: 'Breakthrough Demos',
    icon: <Cpu className="w-6 h-6 text-[rgb(192,132,252)]" />,
    accent: 'rgb(192,132,252)'
  },
  {
    id: 'alumni',
    colSpan: 'col-span-12 lg:col-span-4',
    badge: 'FOUNDER GUILD',
    title: '1-on-1 Tier-1 Mentorship',
    subtitle: 'Unfiltered scaling blueprints',
    description: 'Private 30-minute tactical strategy sessions with unicorn founders who scaled from zero to IPO.',
    metric: '100+',
    metricLabel: 'Private Sessions',
    icon: <Users className="w-6 h-6 text-[rgb(250,204,21)]" />,
    accent: 'rgb(250,204,21)'
  },
  {
    id: 'global',
    colSpan: 'col-span-12 lg:col-span-4',
    badge: 'GLOBAL REACH',
    title: 'Worldwide Sovereign Reach',
    subtitle: 'Cross-border syndicate syndication',
    description: 'Delegations from North America, Europe, MENA, and Asia-Pacific synchronizing frontier innovation policy.',
    metric: '48+',
    metricLabel: 'Countries Represented',
    icon: <Globe className="w-6 h-6 text-[rgb(248,113,113)]" />,
    accent: 'rgb(248,113,113)'
  }
];

export const PillarsBento: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section id="pillars" className="relative w-full py-28 bg-[rgb(27,8,5)] overflow-hidden">
      {/* Background glow & subtle geometry */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgba(64,43,40,0.12)] filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[rgba(165,138,122,0.06)] filter blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(64,43,40,0.2)] border border-[rgba(255,255,255,0.1)] font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(234,224,211)] mb-4">
              <Zap className="w-3 h-3 text-[rgb(250,204,21)]" />
              ARCHITECTURAL PILLARS
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[rgb(248,244,237)] font-display">
              Built for High-Conviction Founders
            </h2>
          </div>
          <p className="text-base text-[rgb(212,193,177)] max-w-md">
            Every minute at AES is calibrated to compress 12 months of fundraising, talent acquisition, and strategic partnerships into 72 intensive hours.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {BENTO_ITEMS.map((item) => {
            const isHovered = activeItem === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveItem(item.id)}
                onMouseLeave={() => setActiveItem(null)}
                className={`${item.colSpan} bezel-shell rounded-2xl group transition-all duration-300 relative`}
              >
                <div className="bezel-core p-8 flex flex-col justify-between h-full relative overflow-hidden bg-gradient-to-br from-[rgba(64,43,40,0.25)] to-[rgba(27,8,5,0.85)]">
                  {/* Subtle Grid Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[rgb(165,138,122)]">
                        {item.badge}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[rgb(165,138,122)] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-[rgb(248,244,237)] mb-2 font-sans">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[rgb(212,193,177)] mb-3 font-medium">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-[rgba(248,244,237,0.8)] leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Metric Stat Bottom */}
                  <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex items-baseline justify-between relative z-10">
                    <div>
                      <div className="text-2xl md:text-3xl font-extrabold font-sans text-[rgb(248,244,237)] group-hover:text-[rgb(234,224,211)] transition-colors">
                        {item.metric}
                      </div>
                      <div className="font-sans text-[11px] uppercase tracking-wider text-[rgb(165,138,122)] font-medium">
                        {item.metricLabel}
                      </div>
                    </div>
                    <span className="font-sans text-[10px] text-[rgba(255,255,255,0.4)] group-hover:text-[rgb(74,222,128)] transition-colors font-medium">
                      VERIFIED 2026 // AES
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
