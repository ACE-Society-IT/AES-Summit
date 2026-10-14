'use client';

import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  price: number;
  badge?: string;
  popular?: boolean;
  description: string;
  features: string[];
}

const TIERS: Tier[] = [
  {
    id: 'delegate',
    name: 'Individual Delegate Pass',
    price: 350,
    description: 'Full individual access to all 3 days, keynotes, exhibition arena, and module simulations.',
    features: [
      'Full 3-Day Summit Access (Nov 07 - 09)',
      'Participation in 2 Flagship Modules',
      'Keynote Sessions & Speaker Firesides',
      'Networking Hub & Lounge Access',
      'Official AES Certificate of Participation'
    ]
  },
  {
    id: 'team',
    name: 'Team & Founder Pass',
    price: 850,
    badge: 'MOST POPULAR',
    popular: true,
    description: 'Designed for startup teams of up to 4 members competing across high-stakes simulations.',
    features: [
      'Full 3-Day Entry for Team of 4',
      'Guaranteed Entry in All 5 Flagship Modules',
      'Live Pitch Competition Eligibility',
      'Exclusive Mentorship Session Booking',
      'Founders Networking Dinner Admission',
      'Post-Summit Resource & Recording Pack'
    ]
  },
  {
    id: 'vip',
    name: 'Executive VIP Pass',
    price: 1650,
    badge: 'ALL-ACCESS',
    description: 'For angel investors, mentors, corporate leaders, and founders seeking premium bilateral access.',
    features: [
      'All Team & Founder Pass Privileges',
      'Front-Row Reserved Keynote Seating',
      'VIP Speaker & Partner Lounge Entry',
      'Private 1-on-1 Investor Office Hours',
      'Direct Dealflow Dossiers & Startup Briefings',
      'Dedicated Executive Concierge Support'
    ]
  }
];

interface AddOn {
  id: string;
  name: string;
  price: number;
}

const ADD_ONS: AddOn[] = [
  { id: 'mentor', name: 'Private 30-Min Unicorn Founder Strategy Deep-Dive', price: 150 },
  { id: 'video', name: 'Dedicated 4K Pitch Stage Video & Syndication Pack', price: 200 },
  { id: 'dinner', name: 'VIP Speaker & Managing Partner Gala Dinner Seat', price: 120 }
];

interface TicketConfiguratorProps {
  onSelectTier?: (tierName: string, price: number) => void;
}

export const TicketConfigurator: React.FC<TicketConfiguratorProps> = ({ onSelectTier }) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('team');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['mentor']);

  const currentTier = TIERS.find(t => t.id === selectedTierId) || TIERS[1];
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const addon = ADD_ONS.find(a => a.id === id);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = currentTier.price + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <section id="passes" className="relative w-full py-28 bg-white overflow-hidden">
      {/* Subtle radial ambient dots */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(64, 43, 40, 0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F4ED] border border-[rgba(0,0,0,0.08)] font-sans text-xs uppercase tracking-[0.2em] text-[#5E423B] mb-4 font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#5E423B]" />
              PASSES & REGISTRATION
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#402B28] font-sans">
              Claim Your Summit Credentials
            </h2>
          </div>
          <p className="text-base text-gray-600 max-w-md font-sans">
            Early registration ensures guaranteed placement across your chosen flagship simulations and access to private bilateral sessions.
          </p>
        </div>

        {/* Tiers Grid in White Glassmorphism Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {TIERS.map((tier) => {
            const isSelected = selectedTierId === tier.id;

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`relative rounded-3xl p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/95 backdrop-blur-2xl border-2 border-[#402B28] shadow-[0_24px_60px_rgba(64,43,40,0.14)] -translate-y-2'
                    : 'bg-white/80 backdrop-blur-xl border border-[rgba(0,0,0,0.08)] shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:-translate-y-1'
                }`}
              >
                {/* Popular Pill */}
                {tier.badge && (
                  <div className="absolute -top-3.5 right-8 px-4 py-1 rounded-full bg-[#402B28] text-white font-sans text-[11px] font-bold uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <h3 className="font-sans font-bold text-2xl text-[#402B28] mb-2">
                    {tier.name}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-[rgba(0,0,0,0.08)]">
                    <span className="font-sans font-extrabold text-4xl sm:text-5xl text-[#402B28]">
                      ${tier.price}
                    </span>
                    <span className="font-sans text-sm text-gray-500 font-medium">
                      / delegate credential
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 font-sans text-sm text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-[#F8F4ED] border border-[#5E423B]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#5E423B]">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTierId(tier.id);
                    onSelectTier?.(tier.name, tier.price);
                  }}
                  className={`w-full py-4 rounded-full font-sans font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isSelected
                      ? 'bg-[#402B28] text-white hover:bg-[#5E423B]'
                      : 'bg-[#F8F4ED] text-[#402B28] border border-[rgba(0,0,0,0.08)] hover:bg-[#EAE0D3]'
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add-ons & Total Bar in White Glassmorphism Card */}
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-[rgba(0,0,0,0.08)] shadow-[0_16px_40px_rgba(0,0,0,0.05)] p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-2/3">
            <h4 className="font-sans font-bold text-xl text-[#402B28] mb-2 flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#5E423B]" />
              Optional Summit Add-Ons & Masterclasses
            </h4>
            <p className="font-sans text-sm text-gray-600 mb-6">
              Tailor your summit experience with private executive access and direct partner masterclasses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ADD_ONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isChecked
                        ? 'bg-[#F8F4ED] border-[#402B28] shadow-sm'
                        : 'bg-white border-[rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.15)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-sans text-xs font-semibold text-[#402B28] leading-tight">
                        {addon.name}
                      </span>
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#402B28] border-[#402B28] text-white' : 'border-gray-300'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#5E423B]">
                      +${addon.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total & Checkout */}
          <div className="w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col items-center sm:justify-between lg:items-end gap-5 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[rgba(0,0,0,0.08)] lg:pl-8">
            <div className="text-center sm:text-left lg:text-right">
              <span className="font-sans text-xs uppercase tracking-wider text-gray-500 font-semibold block">
                Total Configured Price
              </span>
              <span className="font-sans font-extrabold text-4xl text-[#402B28]">
                ${totalPrice}
              </span>
              <span className="font-sans text-xs text-gray-500 block mt-1">
                Includes all taxes & summit credentials
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSelectTier?.(currentTier.name, totalPrice)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#402B28] hover:bg-[#5E423B] text-white font-sans font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
