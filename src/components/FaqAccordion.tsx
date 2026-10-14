'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    question: "What is the Alpha Entrepreneurship Summit (AES)?",
    answer: "AES is our flagship summit dedicated to fostering future founders. Over three high-energy days (November 07–09), young innovators, aspiring founders, and students engage with industry leaders, participate in real-world business simulations, and launch their ideas."
  },
  {
    question: "What are the 5 flagship simulation modules?",
    answer: "Our 5 core simulations include: Investomania (Finance & Trading), Market Monopoly (Business Acumen & Negotiation), Planning Prism (Global Crisis Solutions & Pitching), Defend the Empire (HR & Crisis PR Recovery), and Viral Velocity (Rapid Marketing & Brand Scandals)."
  },
  {
    question: "Can I register as an individual delegate or as a team?",
    answer: "Both individual delegates and startup teams of up to 4 participants are welcome. Individual delegate passes provide access to keynotes, networking, and select modules, while Team Passes grant full entry to all 5 simulation arenas."
  },
  {
    question: "What dates and venue are scheduled for AES 2026?",
    answer: "The summit commences on Friday, November 07, and concludes on Sunday, November 09. All sessions, keynote auditoriums, and simulation arenas are hosted at the Convention Center."
  },
  {
    question: "How can I apply to become an AES Brand Ambassador?",
    answer: "Students and young leaders can apply via our official Brand Ambassador form. Ambassadors represent AES at their institutions, receive leadership training, leadership certificates, and complimentary VIP summit credentials."
  }
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative w-full py-28 bg-[#F8F4ED] border-t border-[rgba(0,0,0,0.06)] overflow-hidden">
      {/* Subtle background dots */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(64, 43, 40, 0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-[rgba(0,0,0,0.08)] font-sans text-xs uppercase tracking-[0.2em] text-[#5E423B] mb-4 shadow-sm font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-[#5E423B]" />
            FREQUENTLY ASKED INQUIRIES
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#402B28] mb-4 font-sans">
            Summit Operations & FAQs
          </h2>
          <p className="text-base text-gray-600 font-sans">
            Everything you need to know regarding participation, simulation modules, and credential registration.
          </p>
        </div>

        {/* Accordion List in Clean White Glassmorphism Cards */}
        <div className="space-y-4 scroll-reveal">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white backdrop-blur-xl border-2 border-[#402B28]/30 shadow-[0_12px_32px_rgba(64,43,40,0.1)]'
                    : 'bg-white/90 backdrop-blur-lg border border-[rgba(0,0,0,0.08)] shadow-sm hover:border-[#5E423B]/30 hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-bold text-base sm:text-lg text-[#402B28] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-[#402B28] text-white shadow-sm'
                        : 'bg-[#F8F4ED] text-[#5E423B] border border-[rgba(64,43,40,0.12)]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Buttery Smooth Animated Accordion Body */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed font-sans border-t border-[rgba(64,43,40,0.08)]">
                      {faq.answer}
                    </div>
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
