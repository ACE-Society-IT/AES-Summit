'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, User } from 'lucide-react';

interface AgendaItem {
  time: string;
  stage: string;
  title: string;
  speaker: string;
  description: string;
  type: 'Keynote' | 'Pitch' | 'Workshop' | 'Networking';
  badgeColor: string;
}

const AGENDA_DATA: Record<number, AgendaItem[]> = {
  1: [
    {
      time: '09:00 - 10:15 AM',
      stage: 'Grand Arena Alpha',
      title: 'Opening Convocation: The Next Generation of High-Conviction Builders',
      speaker: 'AES Executive Committee & Dr. Elena Vance',
      description: 'Framing the next decade of macro innovation, geopolitical realignment, and capital syndication.',
      type: 'Keynote',
      badgeColor: 'rgb(74,222,128)'
    },
    {
      time: '10:45 - 12:30 PM',
      stage: 'Keynote Stage',
      title: 'Embodied Autonomy: Deploying Intelligent Physical Systems at Scale',
      speaker: 'Marcus Thorne (Aether Systems) & Guests',
      description: 'Technical teardown of humanoid control stacks, real-world edge inferencing, and hardware manufacturing economics.',
      type: 'Workshop',
      badgeColor: 'rgb(96,165,250)'
    },
    {
      time: '02:00 - 04:30 PM',
      stage: 'Pitch Arena Alpha',
      title: 'DeepTech & HardTech Venture Showcases (Batch 1)',
      speaker: '12 Vetted Seed/Series A Teams',
      description: '5-minute live presentations followed by rapid partner interrogation and allocation bids.',
      type: 'Pitch',
      badgeColor: 'rgb(250,204,21)'
    },
    {
      time: '05:00 - 07:30 PM',
      stage: 'Skyline Terrace',
      title: 'Opening Night Syndicate Cocktail & Private Founder Salon',
      speaker: 'Institutional LPs & Sovereign Wealth Allocators',
      description: 'Curated networking with open bar and live acoustic ambient soundscapes.',
      type: 'Networking',
      badgeColor: 'rgb(192,132,252)'
    }
  ],
  2: [
    {
      time: '09:30 - 11:00 AM',
      stage: 'Main Auditorium',
      title: 'The Clean Energy Nexus: Sovereign Megawatt Fusion & Grid Storage',
      speaker: 'Clara Chen (Horizon Fusion LP)',
      description: 'Capital deployment models for multi-billion dollar gigawatt energy projects.',
      type: 'Keynote',
      badgeColor: 'rgb(74,222,128)'
    },
    {
      time: '11:30 - 01:30 PM',
      stage: 'VC Executive Suites',
      title: '1-on-1 Closed-Door Dealflow Sessions',
      speaker: 'Participating Venture Partners & Qualified Teams',
      description: 'Pre-scheduled 25-minute bilateral term sheet negotiations.',
      type: 'Networking',
      badgeColor: 'rgb(192,132,252)'
    },
    {
      time: '02:30 - 05:00 PM',
      stage: 'Pitch Arena Alpha',
      title: 'Frontier AI & Autonomous Agents Pitch Finals',
      speaker: 'Finalist Startups & Judging Council',
      description: 'Top-scoring AI ventures competing for the $1.5M syndicate prize pool.',
      type: 'Pitch',
      badgeColor: 'rgb(250,204,21)'
    },
    {
      time: '06:30 - 09:30 PM',
      stage: 'Grand Ballroom',
      title: 'AES Founders Banquet & Deal Syndicate Dinner',
      speaker: 'Keynote: The Anatomy of a $10B Exit',
      description: 'Private black-tie dining with summit speakers and Tier-1 fund leadership.',
      type: 'Networking',
      badgeColor: 'rgb(74,222,128)'
    }
  ],
  3: [
    {
      time: '10:00 - 11:45 AM',
      stage: 'Security & Quantum Hall',
      title: 'Post-Quantum Financial Settlement & Sovereign Digital Reserves',
      speaker: 'David Zhao (Synapse Quantum Networks)',
      description: 'Lattice-cryptography architectures, liquidity clearing, and cross-border central bank protocols.',
      type: 'Workshop',
      badgeColor: 'rgb(96,165,250)'
    },
    {
      time: '01:00 - 03:00 PM',
      stage: 'Global Scale Room',
      title: '0 to $100M ARR Playbooks: Tactical Go-To-Market Masterclass',
      speaker: 'Unicorn Operators & Growth Architects',
      description: 'Distribution strategies, enterprise pricing design, and international sales org scaling.',
      type: 'Workshop',
      badgeColor: 'rgb(96,165,250)'
    },
    {
      time: '03:30 - 05:00 PM',
      stage: 'Grand Arena Alpha',
      title: 'AES 2026 Term Sheet Award Ceremony & Closing Addresses',
      speaker: 'AES Investment Committee',
      description: 'Official announcement of syndicate allocations, audience choice winners, and AES 2027 manifesto.',
      type: 'Keynote',
      badgeColor: 'rgb(74,222,128)'
    }
  ]
};

export const AgendaSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(1);

  return (
    <section id="agenda" className="relative w-full py-28 bg-[rgb(27,8,5)] border-t border-[rgba(255,255,255,0.08)] overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(64,43,40,0.2)] border border-[rgba(255,255,255,0.1)] font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(234,224,211)] mb-4">
              <Calendar className="w-3.5 h-3.5 text-[rgb(74,222,128)]" />
              SUMMIT CURRICULUM & TIMELINE
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[rgb(248,244,237)] font-display">
              72 Hours of High-Density Execution
            </h2>
          </div>

          {/* Day Tabs */}
          <div className="flex items-center gap-2 bg-[rgba(64,43,40,0.3)] p-1.5 rounded-2xl border border-[rgba(255,255,255,0.1)]">
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2.5 rounded-xl font-sans font-semibold text-xs tracking-wider transition-all cursor-pointer ${
                  activeDay === day
                    ? 'bg-[rgb(234,224,211)] text-[rgb(27,8,5)] shadow-md'
                    : 'text-[rgb(212,193,177)] hover:text-[rgb(248,244,237)]'
                }`}
              >
                DAY 0{day}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {AGENDA_DATA[activeDay].map((item, idx) => (
            <div
              key={idx}
              className="bezel-shell rounded-2xl group transition-all duration-300 hover:border-[rgba(255,255,255,0.2)]"
            >
              <div className="bezel-core p-6 md:p-8 bg-gradient-to-r from-[rgba(64,43,40,0.2)] to-[rgba(27,8,5,0.7)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Time & Stage */}
                <div className="md:w-64 shrink-0">
                  <div className="flex items-center gap-2 font-mono text-xs text-[rgb(74,222,128)] mb-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[rgb(165,138,122)]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.stage}</span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider font-semibold"
                      style={{
                        backgroundColor: `${item.badgeColor}20`,
                        color: item.badgeColor,
                        border: `1px solid ${item.badgeColor}40`
                      }}
                    >
                      {item.type}
                    </span>
                    <span className="font-mono text-[11px] text-[rgb(212,193,177)]">
                      {item.speaker}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-[rgb(248,244,237)] mb-1 group-hover:text-[rgb(234,224,211)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[rgba(248,244,237,0.7)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
