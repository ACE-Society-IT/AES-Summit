'use client';

import React, { useState } from 'react';
import { Speaker, SpeakerDossierModal } from './SpeakerDossierModal';
import { ArrowUpRight, Filter, Sparkles } from 'lucide-react';

const SPEAKERS: Speaker[] = [
  {
    id: 'elena',
    name: 'Dr. Elena Vance',
    role: 'General Partner',
    organization: 'Apex Frontier Ventures',
    tag: 'DeepTech & HardTech',
    image: '/assets/speaker_elena.jpg',
    bio: 'Former Program Manager for Autonomous Systems at DARPA and Stanford AI Lab fellow. Elena leads early-stage investments across embodied intelligence, quantum architectures, and industrial robotics.',
    keynoteTopic: 'Embodied Autonomy: Beyond the LLM Frontier into Physical Hardware',
    previousExits: '3 Unicorn IPOs & 2 Defense Acquisitions',
    syndicateSize: '$450M Active Fund VI'
  },
  {
    id: 'marcus',
    name: 'Marcus Thorne',
    role: 'Founder & CEO',
    organization: 'Aether Systems ($4.2B)',
    tag: 'Frontier AI',
    image: '/assets/speaker_marcus.jpg',
    bio: 'Serial entrepreneur who built and scaled two hyperscale developer platforms before founding Aether Systems, an autonomous foundation model company power millions of robotic edge nodes.',
    keynoteTopic: 'From Zero to $100M ARR in 18 Months: The Architecture of Pure Execution',
    previousExits: 'Previous Exit to Google for $820M',
    syndicateSize: '$150M Angel Syndicate'
  },
  {
    id: 'clara',
    name: 'Clara Chen',
    role: 'Managing Director',
    organization: 'Horizon Fusion & CleanTech LP',
    tag: 'Clean Fusion',
    image: '/assets/speaker_clara.jpg',
    bio: 'Pioneering clean fusion financier with over 15 years funding high-density plasma reactors, solid-state grid storage, and direct-air mineral capture technologies.',
    keynoteTopic: 'The $10 Trillion Energy Transition: Deploying Sovereign Megawatt Infrastructure',
    previousExits: '4 CleanTech Public Listings',
    syndicateSize: '$1.8B Assets Under Management'
  },
  {
    id: 'david',
    name: 'David Zhao',
    role: 'Co-Founder & CTO',
    organization: 'Synapse Quantum Networks',
    tag: 'Fintech & Security',
    image: '/assets/speaker_david.jpg',
    bio: 'MIT cryptographer and lead author on post-quantum lattice encryption standards. David engineered the institutional transaction layer securing sovereign debt settlement across 12 central banks.',
    keynoteTopic: 'Quantum-Safe Settlement: The Next Decade of Global Financial Architecture',
    previousExits: 'Synapse Series C ($85M Raised)',
    syndicateSize: '$60M Co-Investment Facility'
  }
];

const CATEGORIES = ['All Verticals', 'Frontier AI', 'DeepTech & HardTech', 'Clean Fusion', 'Fintech & Security'];

export const SpeakersSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Verticals');
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);

  const filteredSpeakers = selectedCategory === 'All Verticals'
    ? SPEAKERS
    : SPEAKERS.filter(s => s.tag.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="speakers" className="relative w-full py-28 bg-[rgb(27,8,5)] border-t border-[rgba(255,255,255,0.08)] overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[rgba(64,43,40,0.15)] filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(64,43,40,0.2)] border border-[rgba(255,255,255,0.1)] font-mono text-[11px] uppercase tracking-[0.2em] text-[rgb(234,224,211)] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[rgb(74,222,128)]" />
              KEYNOTE FACULTY & MANAGING PARTNERS
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[rgb(248,244,237)] font-display">
              Learn From Founders Who Built Billions
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[rgb(234,224,211)] text-[rgb(27,8,5)] font-bold shadow-md'
                    : 'bg-[rgba(64,43,40,0.25)] border border-[rgba(255,255,255,0.08)] text-[rgb(212,193,177)] hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpeakers.map((speaker) => (
            <div
              key={speaker.id}
              onClick={() => setActiveSpeaker(speaker)}
              className="bezel-shell rounded-2xl group cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bezel-core p-5 bg-gradient-to-b from-[rgba(64,43,40,0.3)] to-[rgba(27,8,5,0.9)] flex flex-col justify-between h-full">
                {/* Photo & Badge */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-5 border border-[rgba(255,255,255,0.1)]">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[rgba(0,0,0,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.15)] font-sans text-[10px] uppercase font-semibold tracking-wider text-[rgb(234,224,211)]">
                    {speaker.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 p-2 rounded-full bg-[rgba(0,0,0,0.75)] border border-[rgba(255,255,255,0.15)] text-[rgb(248,244,237)] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Speaker Info */}
                <div>
                  <h3 className="font-sans font-bold text-lg text-[rgb(248,244,237)] group-hover:text-[rgb(234,224,211)] transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="font-sans text-xs text-[rgb(165,138,122)] mt-0.5 mb-2 font-medium">
                    {speaker.role} • {speaker.organization}
                  </p>
                  <p className="font-mono text-[11px] text-[rgba(248,244,237,0.7)] line-clamp-2">
                    "{speaker.keynoteTopic}"
                  </p>
                </div>

                {/* Footer bar */}
                <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between font-mono text-[10px] text-[rgb(74,222,128)]">
                  <span>VIEW FULL DOSSIER</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaker Dossier Modal */}
      <SpeakerDossierModal
        speaker={activeSpeaker}
        onClose={() => setActiveSpeaker(null)}
      />
    </section>
  );
};
