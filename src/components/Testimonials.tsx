'use client';

import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  roundClosed: string;
  avatarSeed: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "AES is unlike any commercial conference. Within 4 hours of our pitch demo, we received 3 term sheets and filled our entire $3.5M Seed round lead by tier-1 partners.",
    author: "Julian Richter",
    role: "Co-Founder & CEO",
    company: "Veloce Robotics",
    roundClosed: "$3.5M Seed Closed at AES",
    avatarSeed: "JR"
  },
  {
    quote: "The quality density of founders in the room is unprecedented. In 3 days we evaluated 40 high-conviction deeptech teams and issued two lead commitments on stage.",
    author: "Sarah Lindqvist",
    role: "General Partner",
    company: "Nordic Frontier Ventures",
    roundClosed: "$12M Deployed",
    avatarSeed: "SL"
  },
  {
    quote: "As a repeat founder, I usually skip summits. AES is the sole exception. The closed-door founder dinners alone were worth 100x the pass cost.",
    author: "Tariq Mansoor",
    role: "Founder",
    company: "Hyperion Lattice Systems",
    roundClosed: "Series A ($18M)",
    avatarSeed: "TM"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="relative w-full py-28 bg-[rgb(27,8,5)] border-t border-[rgba(255,255,255,0.08)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[400px] bg-[rgba(64,43,40,0.15)] filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(64,43,40,0.2)] border border-[rgba(255,255,255,0.1)] font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(234,224,211)] mb-4">
            <Quote className="w-3.5 h-3.5 text-[rgb(74,222,128)]" />
            FOUNDER & LP PROOF OF WORK
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[rgb(248,244,237)] mb-4 font-display">
            Endorsed by the Frontier Vanguard
          </h2>
          <p className="text-base text-[rgb(212,193,177)]">
            Over $140M in venture funding rounds have been originated and closed directly on the AES syndicate stage.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bezel-shell rounded-3xl group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bezel-core p-8 bg-gradient-to-b from-[rgba(64,43,40,0.25)] to-[rgba(27,8,5,0.9)] flex flex-col justify-between h-full">
                <div>
                  {/* Rating Stars & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-[rgb(250,204,21)]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] uppercase px-2.5 py-0.5 rounded-full bg-[rgba(74,222,128,0.15)] text-[rgb(74,222,128)] border border-[rgba(74,222,128,0.3)]">
                      {t.roundClosed}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm md:text-base text-[rgba(248,244,237,0.85)] leading-relaxed italic mb-8">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[rgb(64,43,40)] border border-[rgb(234,224,211)] flex items-center justify-center font-display font-bold text-xs text-[rgb(248,244,237)]">
                    {t.avatarSeed}
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-[rgb(248,244,237)] flex items-center gap-1.5">
                      {t.author}
                      <CheckCircle className="w-3.5 h-3.5 text-[rgb(74,222,128)]" />
                    </div>
                    <div className="font-mono text-[11px] text-[rgb(165,138,122)]">
                      {t.role}, <span className="text-[rgb(212,193,177)]">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
