'use client';

import React, { useState } from 'react';
import { Sliders, Sparkles, DollarSign, PieChart, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  badge: string;
  pool: string;
  leads: string;
  accent: string;
}

const TRACKS: Track[] = [
  {
    id: 'ai',
    name: 'Frontier AI & Autonomous Agents',
    badge: 'STAGE ALPHA',
    pool: '$18M Track Allocation',
    leads: '4 Tier-1 Venture Partners',
    accent: 'rgb(74,222,128)'
  },
  {
    id: 'robotics',
    name: 'DeepTech Robotics & Spatial',
    badge: 'STAGE BETA',
    pool: '$14M Track Allocation',
    leads: '3 Hardware Syndicates',
    accent: 'rgb(96,165,250)'
  },
  {
    id: 'fusion',
    name: 'Clean Fusion & HardTech',
    badge: 'STAGE GAMMA',
    pool: '$12M Track Allocation',
    leads: 'Global Climate & Energy LPs',
    accent: 'rgb(250,204,21)'
  },
  {
    id: 'fintech',
    name: 'Fintech & Quantum Settlement',
    badge: 'STAGE DELTA',
    pool: '$10M Track Allocation',
    leads: 'Institutional Sovereign Funds',
    accent: 'rgb(192,132,252)'
  }
];

interface PitchArenaSimulatorProps {
  onOpenModal?: (tier?: string) => void;
}

export const PitchArenaSimulator: React.FC<PitchArenaSimulatorProps> = ({ onOpenModal }) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('ai');
  const [targetRaise, setTargetRaise] = useState<number>(2500000); // $2.5M
  const [valuationCap, setValuationCap] = useState<number>(20000000); // $20M

  const dilutionPercent = ((targetRaise / valuationCap) * 100).toFixed(1);
  const leadCheckEstimate = (targetRaise * 0.55).toLocaleString();
  const syndicateSlots = Math.max(3, Math.floor(targetRaise / 250000));

  const currentTrack = TRACKS.find(t => t.id === selectedTrack) || TRACKS[0];

  return (
    <section id="simulator" className="relative w-full py-28 bg-[rgb(27,8,5)] border-t border-[rgba(255,255,255,0.08)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(64,43,40,0.18)] filter blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(64,43,40,0.2)] border border-[rgba(255,255,255,0.1)] font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(234,224,211)] mb-4">
            <Sliders className="w-3.5 h-3.5 text-[rgb(74,222,128)]" />
            INTERACTIVE ALLOCATION CALCULATOR
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[rgb(248,244,237)] mb-4 font-display">
            The AES Pitch Arena Simulator
          </h2>
          <p className="text-base md:text-lg text-[rgb(212,193,177)]">
            Model your summit fundraising round in real-time. Calculate post-money SAFE dilution and preview syndicate allocation dynamics before stepping onto the main stage.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Controls Side */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {/* Track Selector */}
            <div className="bezel-shell rounded-2xl">
              <div className="bezel-core p-6 bg-[rgba(0,0,0,0.5)]">
                <label className="block font-mono text-xs uppercase tracking-wider text-[rgb(165,138,122)] mb-3">
                  Select Venture Arena Track
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TRACKS.map((t) => {
                    const isSelected = selectedTrack === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTrack(t.id)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[rgb(64,43,40)] border-[rgb(234,224,211)] shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
                            : 'bg-[rgba(64,43,40,0.1)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[rgba(0,0,0,0.5)] text-[rgb(212,193,177)]">
                            {t.badge}
                          </span>
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: t.accent }}
                          />
                        </div>
                        <div className="font-sans font-bold text-sm text-[rgb(248,244,237)] mb-1">
                          {t.name}
                        </div>
                        <div className="font-sans text-[11px] text-[rgba(248,244,237,0.7)] font-medium">
                          {t.pool}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="bezel-shell rounded-2xl">
              <div className="bezel-core p-6 bg-[rgba(0,0,0,0.5)] space-y-8">
                {/* Target Raise Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[rgb(165,138,122)]">
                      Target Funding Round (USD)
                    </span>
                    <span className="font-mono font-bold text-base text-[rgb(74,222,128)]">
                      ${(targetRaise / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="250000"
                    value={targetRaise}
                    onChange={(e) => setTargetRaise(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-[rgba(64,43,40,0.5)] accent-[rgb(74,222,128)] cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-[rgba(255,255,255,0.4)] mt-1">
                    <span>$500K</span>
                    <span>$5.0M</span>
                    <span>$10.0M</span>
                  </div>
                </div>

                {/* Valuation Cap Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[rgb(165,138,122)]">
                      Post-Money Valuation Cap (USD)
                    </span>
                    <span className="font-mono font-bold text-base text-[rgb(234,224,211)]">
                      ${(valuationCap / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000000"
                    max="60000000"
                    step="1000000"
                    value={valuationCap}
                    onChange={(e) => setValuationCap(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-[rgba(64,43,40,0.5)] accent-[rgb(234,224,211)] cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-[rgba(255,255,255,0.4)] mt-1">
                    <span>$5.0M</span>
                    <span>$30.0M</span>
                    <span>$60.0M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Math Output Card */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bezel-shell rounded-2xl sticky top-28">
              <div className="bezel-core p-8 bg-gradient-to-b from-[rgba(64,43,40,0.4)] to-[rgba(27,8,5,0.95)]">
                <div className="flex items-center justify-between pb-6 border-b border-[rgba(255,255,255,0.1)] mb-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[rgb(165,138,122)]">
                      PROJECTED SYNDICATE ALLOCATION
                    </span>
                    <h3 className="text-xl font-bold font-sans text-[rgb(248,244,237)] mt-0.5">
                      {currentTrack.name}
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.1)]">
                    <PieChart className="w-5 h-5 text-[rgb(74,222,128)]" />
                  </div>
                </div>

                {/* Metrics Matrix */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.06)]">
                    <span className="font-mono text-xs text-[rgb(212,193,177)]">
                      Post-Money SAFE Dilution
                    </span>
                    <span className="font-mono font-bold text-lg text-[rgb(74,222,128)]">
                      {dilutionPercent}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.06)]">
                    <span className="font-mono text-xs text-[rgb(212,193,177)]">
                      Estimated Lead Check (55%)
                    </span>
                    <span className="font-mono font-bold text-lg text-[rgb(248,244,237)]">
                      ${leadCheckEstimate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.06)]">
                    <span className="font-mono text-xs text-[rgb(212,193,177)]">
                      Syndicate Participant Slots
                    </span>
                    <span className="font-mono font-bold text-lg text-[rgb(250,204,21)]">
                      {syndicateSlots} Entities
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.06)]">
                    <span className="font-mono text-xs text-[rgb(212,193,177)]">
                      Track Review Lead
                    </span>
                    <span className="font-mono text-xs text-[rgb(96,165,250)] font-semibold">
                      {currentTrack.leads}
                    </span>
                  </div>
                </div>

                {/* Perks Checklist */}
                <div className="space-y-2 mb-8 text-xs font-mono text-[rgb(212,193,177)]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[rgb(74,222,128)] shrink-0" />
                    <span>Includes 5-minute main stage keynote demo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[rgb(74,222,128)] shrink-0" />
                    <span>Access to private VC greenroom lounges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[rgb(74,222,128)] shrink-0" />
                    <span>Post-summit LP syndication memo distribution</span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={() => onOpenModal && onOpenModal('Founder VIP Pass')}
                  className="w-full btn-nested py-3.5 rounded-xl bg-[rgb(234,224,211)] text-[rgb(27,8,5)] font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[rgb(248,244,237)] transition-all cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                >
                  <Sparkles className="w-4 h-4" />
                  Apply For On-Stage Pitch Spot
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
