'use client';

import React from 'react';
import { GradientBars } from './GradientBars';
import {
  MessageCircle,
  ArrowUpRight,
  Award,
  Globe,
  Radio,
  CheckCircle2,
  Sparkles,
  Zap,
  Camera
} from 'lucide-react';

export const CommunitySection: React.FC = () => {
  return (
    <section id="community" className="relative w-full py-28 bg-[rgb(27,8,5)] border-t border-[rgba(255,255,255,0.08)] overflow-hidden">
      {/* React Bits Pro Gradient Bars in the Background (Sharp, No Blur) */}
      <GradientBars
        columns={17}
        speed={0.8}
        opacity={0.85}
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.15] font-sans text-xs uppercase tracking-[0.2em] text-[rgb(234,224,211)] font-bold mb-4 shadow-xl">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            OFFICIAL DIGITAL CHANNELS & ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[rgb(248,244,237)] mb-4 font-sans leading-tight">
            Connect With The Summit
          </h2>
          <p className="text-base sm:text-lg text-[rgb(212,193,177)] font-normal font-sans leading-relaxed">
            Stay plugged into real-time summit telemetry, direct delegate announcements, and behind-the-scenes founder stories across our two primary official channels.
          </p>
        </div>

        {/* Featured Brand Ambassador Banner (Pure Transparent Glass with Film Grain) */}
        <div className="mb-12 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-2xl border border-white/[0.16] p-8 sm:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-300 scroll-reveal reveal-delay-1">
          {/* Frosted Film Grain Overlay */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay rounded-3xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
          {/* Specular Top Edge Light */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[rgba(216,178,142,0.14)] blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(250,204,21,0.12)] border border-[rgba(250,204,21,0.3)] text-[rgb(250,204,21)] font-sans text-xs uppercase tracking-widest font-extrabold mb-4 shadow-sm">
                <Award className="w-3.5 h-3.5" />
                OFFICIAL AMBASSADOR CORPS · 2026 COHORT
              </div>
              <h3 className="font-sans font-extrabold text-2xl sm:text-4xl text-white mb-3 leading-snug">
                Represent AES at Your University or Regional Hub
              </h3>
              <p className="font-sans text-sm sm:text-base text-[rgb(212,193,177)] leading-relaxed">
                Lead the next generation of founders in your campus or local ecosystem. Ambassadors receive VIP summit credentials, direct fireside mentorship with top venture partners, and executive letters of recommendation.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center w-full lg:w-auto gap-4">
              <a
                href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[rgb(234,224,211)] hover:bg-white text-[rgb(27,8,5)] font-sans font-bold text-sm tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 text-center"
              >
                <span>Apply as Brand Ambassador</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Redesigned Two-Pillar Official Social Showcase (Pure Transparent Glass with Film Grain) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Official WhatsApp Delegate Hub */}
          <div className="relative rounded-3xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/[0.16] hover:border-emerald-400/40 p-8 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_20px_50px_rgba(0,0,0,0.45)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between group overflow-hidden scroll-reveal-left reveal-delay-2">
            {/* Frosted Film Grain Overlay */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay rounded-3xl"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            {/* Specular Edge Highlight with Emerald Hint on Hover */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="pointer-events-none absolute -right-24 -top-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />

            <div className="relative z-10">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs uppercase tracking-wider font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  REAL-TIME UPDATES &amp; WIRE
                </div>
                <span className="font-mono text-xs text-[rgb(212,193,177)] font-semibold">
                  3,500+ Active Founders
                </span>
              </div>

              {/* Main Info */}
              <div className="flex items-start gap-5 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-[rgb(212,193,177)] block mb-1">
                    DELEGATE WIRE · DIRECT COMMUNICATION
                  </span>
                  <h4 className="font-sans font-black text-2xl sm:text-3xl text-white group-hover:text-emerald-200 transition-colors">
                    Official WhatsApp Hub
                  </h4>
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-[rgb(212,193,177)]/90 leading-relaxed mb-6 font-normal">
                Direct delegate communication channel for daily schedules, breakout rooms, stage announcements, and real-time alerts directly from the AES executive desk.
              </p>

              {/* Feature Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-sans text-white/90">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Instant Alerts</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-sans text-white/90">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Room Schedules</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-sans text-white/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Verified Delegates</span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="relative z-10 pt-5 border-t border-white/[0.12] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="font-mono text-xs text-[rgb(165,138,122)]">
                Direct Link: <strong className="text-white">AES Delegate Community</strong>
              </span>
              <a
                href="https://chat.whatsapp.com/CjfnlmGRHsBDE20lxXXr81?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#1B0805] font-sans font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-95"
              >
                <span>Join Official WhatsApp Hub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Official Instagram Media & Stories Desk */}
          <div className="relative rounded-3xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/[0.16] hover:border-rose-400/40 p-8 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_20px_50px_rgba(0,0,0,0.45)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between group overflow-hidden scroll-reveal-right reveal-delay-2">
            {/* Frosted Film Grain Overlay */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay rounded-3xl"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            {/* Specular Edge Highlight with Rose/Peach Hint on Hover */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="pointer-events-none absolute -right-24 -top-24 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl group-hover:bg-rose-500/20 transition-all duration-700" />

            <div className="relative z-10">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs uppercase tracking-wider font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  MEDIA DESK &amp; STORIES
                </div>
                <span className="font-mono text-xs text-[rgb(212,193,177)] font-semibold">
                  @aes_summit
                </span>
              </div>

              {/* Main Info */}
              <div className="flex items-start gap-5 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-400/30 flex items-center justify-center text-rose-400 shrink-0 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-inner">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-[rgb(212,193,177)] block mb-1">
                    BEHIND THE SCENES · VISUAL COVERAGE
                  </span>
                  <h4 className="font-sans font-black text-2xl sm:text-3xl text-white group-hover:text-rose-200 transition-colors">
                    Official Instagram
                  </h4>
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-[rgb(212,193,177)]/90 leading-relaxed mb-6 font-normal">
                Speaker fireside clips, founder interviews, backstage photo drops, and high-resolution stage recaps documenting every moment of the Alpha Entrepreneurship Summit.
              </p>

              {/* Feature Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-sans text-white/90">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Stage Highlights</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-sans text-white/90">
                  <Camera className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Photo Drops</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-sans text-white/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Founder Clips</span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="relative z-10 pt-5 border-t border-white/[0.12] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="font-mono text-xs text-[rgb(165,138,122)]">
                Handle: <strong className="text-white">@aes_summit</strong>
              </span>
              <a
                href="https://www.instagram.com/aes_summit?igsh=MTc4ZGtvN2h3b3c0Zg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[rgb(234,224,211)] hover:bg-white text-[rgb(27,8,5)] font-sans font-bold text-sm tracking-wide transition-all shadow-lg hover:scale-[1.02] active:scale-95"
              >
                <span>Follow @aes_summit</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Community Guidelines Bar (Pure Transparent Glass with Grain) */}
        <div className="mt-12 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg relative overflow-hidden scroll-reveal reveal-delay-3">
          <div 
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay rounded-2xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
          <div className="relative z-10 flex items-center gap-3">
            <Globe className="w-5 h-5 text-[rgb(250,204,21)] shrink-0" />
            <span className="font-sans text-xs font-medium text-[rgb(212,193,177)]">
              All official AES channels adhere to strict summit conduct rules. Zero tolerance for harassment or unsolicited solicitation.
            </span>
          </div>
          <span className="relative z-10 font-mono text-[11px] font-bold text-[rgb(165,138,122)] shrink-0">
            Encrypted &amp; Moderated
          </span>
        </div>

      </div>
    </section>
  );
};

export default CommunitySection;
