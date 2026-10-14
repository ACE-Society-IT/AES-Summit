'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Briefcase, 
  Target, 
  Users, 
  Award, 
  Trophy, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronRight,
  Flame
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ScrollRevealObserver } from '../../components/ScrollRevealObserver';
import { ColoredGradientWave } from '../../components/ColoredGradientWave';

const OFFICIAL_REGISTRATION_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg';

const AMBASSADOR_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg';

interface ReasonItem {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  bullet: string;
  icon: React.ReactNode;
  image?: string;
}

const REASONS: ReasonItem[] = [
  {
    id: 'real-world',
    num: '01',
    title: 'Real-World Business Experience',
    category: 'Entrepreneurial Immersion',
    description: 'Get a taste of what it’s like to be an entrepreneur — from pitching ideas to solving real business challenges.',
    tags: ['Business meeting', 'Team collaborating', 'Startup Simulation'],
    bullet: 'Execute realistic market maneuvers, stress-test your financial model, and pitch in front of veteran judges.',
    icon: <Briefcase className="w-6 h-6 transition-colors duration-300" />,
    image: '/assets/pitch_stage.jpg'
  },
  {
    id: 'skill-dev',
    num: '02',
    title: 'Skill Development',
    category: 'Core Competencies',
    description: 'Sharpen your leadership, teamwork, communication, and problem-solving skills through interactive modules and competitions.',
    tags: ['Strategic Leadership', 'Critical Thinking', 'Public Speaking'],
    bullet: 'Develop high-impact analytical instincts and agile communication strategies that transcend textbook theory.',
    icon: <Target className="w-6 h-6 transition-colors duration-300" />,
    image: '/assets/speaker_marcus.jpg'
  },
  {
    id: 'networking',
    num: '03',
    title: 'Networking Opportunities',
    category: 'Ecosystem Convergence',
    description: 'Connect with like-minded students, mentors, and professionals who share your passion for entrepreneurship and innovation.',
    tags: ['Networking event', 'Portfolio document', 'Mentor Circles'],
    bullet: 'Build authentic relationships with future co-founders, alumni trailblazers, and corporate decision-makers.',
    icon: <Users className="w-6 h-6 transition-colors duration-300" />,
    image: '/assets/founders_networking.jpg'
  },
  {
    id: 'portfolio',
    num: '04',
    title: 'Boost Your Portfolio',
    category: 'Academic & Career Edge',
    description: 'Participation in AES stands out on your college applications and resumes, showing initiative, creativity, and teamwork.',
    tags: ['College Applications', 'Resume Milestone', 'Initiative & Drive'],
    bullet: 'Provide concrete proof of entrepreneurial leadership, strategic execution, and extracurricular initiative.',
    icon: <Award className="w-6 h-6 transition-colors duration-300" />,
    image: '/assets/speaker_elena.jpg'
  },
  {
    id: 'prizes',
    num: '05',
    title: 'Win Prizes & Recognition',
    category: 'Championship Accolades',
    description: 'Compete to earn exciting prizes, certificates, and recognition for your talent and hard work.',
    tags: ['Trophy', 'Conference event', 'Merit Honors'],
    bullet: 'Earn recognized credentials, hardware trophies, and platform accolades that honor top-tier cohort excellence.',
    icon: <Trophy className="w-6 h-6 transition-colors duration-300" />,
    image: '/assets/speaker_clara.jpg'
  },
  {
    id: 'prestigious',
    num: '06',
    title: 'A Prestigious Event',
    category: 'Alpha College Legacy',
    description: 'Be part of one of Alpha College’s most anticipated and respected events, organized by the ACE Society — a chance to make your mark!',
    tags: ['ACE Society', 'Alpha College', 'Flagship Summit'],
    bullet: 'Organized under the esteemed banner of Alpha College’s ACE Society, setting the benchmark for student innovation.',
    icon: <ShieldCheck className="w-6 h-6 transition-colors duration-300" />,
    image: '/assets/hero_stage.jpg'
  },
  {
    id: 'fun-learning',
    num: '07',
    title: 'Have Fun While Learning!',
    category: 'Vibrant Atmosphere',
    description: 'Enjoy an exciting environment filled with creativity, competition, and teamwork — where learning feels fun and rewarding.',
    tags: ['Students having fun', 'Creative Teamwork', 'Social Bonding'],
    bullet: 'Experience an electrifying atmosphere full of camaraderie, social events, dynamic debates, and memorable summit memories.',
    icon: <Sparkles className="w-6 h-6 transition-colors duration-300" />,
    image: '/assets/speaker_david.jpg'
  }
];

export const WhyAesClient: React.FC = () => {
  const [, setActiveReason] = useState<string>('real-world');

  return (
    <main className="relative min-h-screen bg-[#F8F4ED] text-[#402B28] overflow-x-hidden selection:bg-[#402B28] selection:text-white">
      {/* Scroll Reveal Observer */}
      <ScrollRevealObserver />

      {/* Animated Colored Gradient Wave Background */}
      <ColoredGradientWave
        speed={0.35}
        opacity={0.7}
        colorScheme="vision-aurora"
      />

      {/* Subtle Micro-Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(64, 43, 40, 0.14) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating Island Navbar */}
      <Navbar
        onOpenRegister={() => window.open(OFFICIAL_REGISTRATION_URL, '_blank', 'noopener,noreferrer')}
        soundEnabled={false}
        onToggleSound={() => {}}
      />

      {/* Hero Section */}
      <section className="relative z-10 pt-36 sm:pt-44 pb-20 px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1700px] mx-auto text-center flex flex-col items-center">
        {/* Breadcrumb back link */}
        <div className="mb-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5E423B] hover:text-[#402B28] transition-colors py-2 px-4 rounded-full bg-white/85 border border-black/10 hover:border-black/20 shadow-sm backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Summit Portal</span>
          </Link>
        </div>

        {/* Edition Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-black/10 font-sans text-xs uppercase tracking-[0.2em] text-[#5E423B] mb-6 shadow-sm font-semibold mx-auto">
          <span className="w-2 h-2 rounded-full bg-[rgb(74,222,128)] animate-pulse" />
          Alpha College ACE Society · Flagship Summit 2026
        </div>

        {/* Main Page Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#402B28] leading-[1.08] mb-6 font-sans max-w-5xl mx-auto text-center">
          WHY JOIN AES? <br />
          <span className="text-shimmer-terracotta font-black drop-shadow-[0_4px_16px_rgba(196,104,60,0.2)]">
            THE CATALYST FOR FUTURE FOUNDERS
          </span>
        </h1>

        {/* Lead Subtitle directly from why.txt */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mb-10 font-normal font-sans mx-auto text-center">
          Discover the key benefits of participating in the Alpha Entrepreneurship Summit, designed by the ACE Society at Alpha College to shape the next generation of founders.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 mx-auto">
          <a
            href={OFFICIAL_REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nested btn-primary"
          >
            <span>Claim Your Summit Pass</span>
            <span className="btn-icon-circle" aria-hidden="true">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href="#pillars"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 border border-black/10 text-[#402B28] hover:text-black hover:bg-white text-sm font-semibold transition-all shadow-sm backdrop-blur-xl"
          >
            <span>Explore 7 Core Benefits</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href={AMBASSADOR_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-[#8C452A] hover:text-[#5E423B] bg-white/80 border border-[#D89065]/50 hover:bg-white transition-all shadow-sm"
          >
            <span>Become Brand Ambassador</span>
            <span className="text-xs">↗</span>
          </a>
        </div>

        {/* Quick Highlights Strip in White Glassmorphism */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-black/8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center">
          <div className="p-4 border-r border-black/5 last:border-none">
            <p className="text-3xl sm:text-4xl font-black text-[#402B28] font-sans">07</p>
            <p className="text-xs uppercase tracking-widest text-[#5E423B] font-mono mt-1 font-semibold">Core Benefits</p>
            <p className="text-xs text-gray-600 mt-1 hidden sm:block">From real experience to honors</p>
          </div>
          <div className="p-4 border-r border-black/5 last:border-none">
            <p className="text-3xl sm:text-4xl font-black text-[#402B28] font-sans">3 Days</p>
            <p className="text-xs uppercase tracking-widest text-[#5E423B] font-mono mt-1 font-semibold">Immersive Action</p>
            <p className="text-xs text-gray-600 mt-1 hidden sm:block">Nov 07 - 09, 2026</p>
          </div>
          <div className="p-4 border-r border-black/5 last:border-none">
            <p className="text-3xl sm:text-4xl font-black text-[#402B28] font-sans">5 Modules</p>
            <p className="text-xs uppercase tracking-widest text-[#5E423B] font-mono mt-1 font-semibold">Simulations</p>
            <p className="text-xs text-gray-600 mt-1 hidden sm:block">From pitch to crisis handling</p>
          </div>
          <div className="p-4">
            <p className="text-3xl sm:text-4xl font-black text-[#8C452A] font-sans">100%</p>
            <p className="text-xs uppercase tracking-widest text-[#5E423B] font-mono mt-1 font-semibold">Action-Oriented</p>
            <p className="text-xs text-gray-600 mt-1 hidden sm:block">Organized by ACE Society</p>
          </div>
        </div>
      </section>

      {/* 7 Core Benefits Grid Section in Crisp White Glassmorphic Cards */}
      <section id="pillars" className="relative z-10 py-20 px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1700px] mx-auto">
        <div className="mb-14 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-black/10 font-sans text-xs uppercase tracking-[0.2em] text-[#5E423B] mb-4 font-semibold shadow-sm">
            <Flame className="w-3.5 h-3.5 text-[#8C452A]" />
            7 REASONS TO PARTICIPATE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#402B28] font-sans leading-tight">
            Everything You Gain at AES 2026
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl font-sans">
            Designed to bridge the gap between academic education and modern high-speed business execution.
          </p>
        </div>

        {/* Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REASONS.map((item, index) => {
            const isFeatured = index === 0 || index === 5;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveReason(item.id)}
                className={`group relative rounded-3xl p-6 sm:p-8 transition-all duration-500 overflow-hidden flex flex-col justify-between scroll-reveal ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                } bg-[rgb(27,8,5)] text-[rgb(248,244,237)] border border-[rgba(255,255,255,0.12)] hover:border-[rgba(245,184,149,0.5)] shadow-[0_20px_50px_rgba(27,8,5,0.22)] hover:shadow-[0_25px_60px_rgba(245,184,149,0.2)] hover:-translate-y-1.5`}
              >
                {/* Ambient Card Glow on Hover */}
                <div 
                  className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(245,184,149,0.25), transparent 70%)'
                  }}
                />

                {/* Visible Real Summit Photo Header */}
                <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 bg-[rgb(20,6,4)] border border-white/10 group-hover:border-[rgba(245,184,149,0.4)] transition-all">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,8,5,0.92)] via-[rgba(27,8,5,0.25)] to-transparent" />
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[rgba(0,0,0,0.7)] backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-[rgb(245,184,149)] flex items-center gap-1.5 shadow-lg">
                    <span>{item.num}</span>
                    <span className="opacity-50">·</span>
                    <span>{item.category}</span>
                  </div>

                  {/* Icon Box */}
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-[rgba(0,0,0,0.65)] backdrop-blur-md border border-white/20 flex items-center justify-center text-[rgb(245,184,149)] shadow-lg group-hover:scale-110 group-hover:bg-[rgba(245,184,149,0.2)] transition-all">
                    {item.icon}
                  </div>
                </div>

                {/* Card Body: Title + Direct why.txt text */}
                <div className="relative z-10 mb-6 flex-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[rgb(248,244,237)] group-hover:text-[rgb(245,184,149)] transition-colors font-sans mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-[rgb(212,193,177)] leading-relaxed font-sans mb-4">
                    {item.description}
                  </p>
                  <p className="text-xs sm:text-sm text-[rgb(165,138,122)] font-sans italic border-l-2 border-[rgb(245,184,149)] pl-3">
                    {item.bullet}
                  </p>
                </div>

                {/* Card Bottom: Tags matching why.txt */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-sans font-medium text-[rgb(234,224,211)] px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-[rgba(245,184,149,0.3)] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison: Why AES vs Traditional Programs */}
      <section className="relative z-10 py-20 px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1700px] mx-auto">
        <div className="rounded-3xl p-8 sm:p-14 bg-white/90 backdrop-blur-2xl border border-[rgba(0,0,0,0.08)] shadow-[0_20px_50px_rgba(0,0,0,0.06)] scroll-reveal">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8C452A] font-bold">
              SUMMIT ADVANTAGE MATRIX
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#402B28] font-sans mt-3">
              What Sets AES Apart
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mt-3">
              AES is not a conventional lecture hall — it is a high-octane venture simulation arena.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF5EE]/90 border border-black/6">
              <h4 className="font-mono text-sm uppercase tracking-wider text-[#5E423B] mb-4 font-bold">
                Conventional Academic Contests
              </h4>
              <ul className="space-y-3.5 text-sm text-gray-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Passive rote-learning and theoretical exam drills</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Hypothetical case studies with no actual execution pressure</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Isolated competitions without broader networking avenues</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Generic participation sheets without verifiable founder credentials</span>
                </li>
              </ul>
            </div>

            {/* AES Summit */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-white border border-[#D89065]/40 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-mono text-sm uppercase tracking-wider text-[#8C452A] font-bold">
                  The AES 2026 Experience
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-[rgba(74,222,128,0.2)] text-emerald-800 text-[10px] font-mono font-bold">
                  ACTION-DRIVEN
                </span>
              </div>
              <ul className="space-y-3.5 text-sm text-[#402B28] font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Real-world business simulations and high-stakes venture pitches</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Interactive module tracks designed by Alpha College’s ACE Society</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct interaction with leading founders, mentors, and investors</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Prestigious trophies, prize recognition, and resume-transforming distinction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="relative z-10 py-20 px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1700px] mx-auto text-center">
        <div 
          className="relative rounded-3xl p-10 sm:p-16 overflow-hidden border border-[rgba(255,255,255,0.15)] shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(64,43,40,0.96) 0%, rgba(27,8,5,0.98) 50%, rgba(94,66,59,0.92) 100%)'
          }}
        >
          {/* Subtle Ambient Orb */}
          <div 
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none opacity-40 blur-[100px]"
            style={{
              background: 'radial-gradient(circle at center, rgba(245,184,149,0.5), transparent 70%)'
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-white">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[rgb(245,184,149)] font-bold">
              REGISTRATION ACTIVE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[rgb(248,244,237)] font-sans mt-4 mb-6 leading-tight">
              Ready to Make Your Mark at AES 2026?
            </h2>
            <p className="text-base sm:text-xl text-[rgb(212,193,177)] mb-10 font-normal">
              Join visionary student founders, pitch to industry leaders, and experience 3 unforgettable days of entrepreneurial excellence.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={OFFICIAL_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nested btn-primary"
              >
                <span>Register for AES 2026</span>
                <span className="btn-icon-circle" aria-hidden="true">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>

              <a
                href={AMBASSADOR_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-all backdrop-blur-xl"
              >
                <span>Apply as Brand Ambassador</span>
                <span className="text-xs">↗</span>
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-[rgb(212,193,177)] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Explore Full Summit</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Master Footer */}
      <Footer />
    </main>
  );
};
