'use client';

import React, { useState } from 'react';
import { ArrowUp, Send, Check, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = '/';
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      try {
        sessionStorage.setItem('scroll_target', sectionId);
      } catch {}
      window.location.href = '/';
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <footer
      className="relative w-full border-t border-[rgba(255,255,255,0.12)] pt-20 pb-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1B0805 0%, #2A1410 30%, #402B28 65%, #1B0805 100%)'
      }}
    >
      {/* Ambient Gradient Mesh Orbs */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[450px] pointer-events-none opacity-40 blur-[130px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245,184,149,0.35), rgba(94,66,59,0.3) 45%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none opacity-30 blur-[120px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(232,157,119,0.3), rgba(64,43,40,0.2) 60%, transparent 80%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[350px] pointer-events-none opacity-25 blur-[120px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(165,138,122,0.25), transparent 70%)'
        }}
      />

      {/* Subtle Micro-Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(rgba(245, 184, 149, 0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgba(255,255,255,0.08)] scroll-reveal">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aes-logo.png"
                alt="Alpha Entrepreneurship Summit Logo"
                className="w-10 h-10 object-contain rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(0,0,0,0.5)] p-1"
              />
              <span className="font-sans font-extrabold text-xl tracking-tight text-[rgb(248,244,237)]">
                Alpha Entrepreneurship Summit
              </span>
            </div>

            <p className="text-sm text-[rgb(212,193,177)] leading-relaxed max-w-sm font-sans">
              Join the next generation of founders at our flagship event. Engage with industry leaders, develop your skills, and launch your innovative ideas.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[rgb(74,222,128)]">
              <span className="w-2 h-2 rounded-full bg-[rgb(74,222,128)] animate-pulse" />
              <span>CONVENTION CENTER // NOV 07–09, 2026</span>
            </div>

            {/* Social Links from old aes portal */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/aes_summit?igsh=MTc4ZGtvN2h3b3c0Zg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-[rgb(234,224,211)] hover:bg-rose-500 hover:text-white transition-all shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://chat.whatsapp.com/CjfnlmGRHsBDE20lxXXr81?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Community"
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-[rgb(234,224,211)] hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-sans text-xs">
            <div className="font-mono text-xs uppercase tracking-widest text-[rgb(165,138,122)] font-semibold mb-4">
              SUMMIT NAVIGATION
            </div>
            <div>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'vision')}
                className="text-[rgb(212,193,177)] hover:text-[rgb(234,224,211)] transition-colors cursor-pointer"
              >
                Vision
              </a>
            </div>
            <div>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'gallery')}
                className="text-[rgb(212,193,177)] hover:text-[rgb(234,224,211)] transition-colors cursor-pointer"
              >
                Gallery
              </a>
            </div>
            <div>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'modules')}
                className="text-[rgb(212,193,177)] hover:text-[rgb(234,224,211)] transition-colors cursor-pointer"
              >
                Modules
              </a>
            </div>
            <div>
              <a
                href="/why-aes"
                className="text-[rgb(245,184,149)] hover:underline font-semibold"
              >
                Why AES?
              </a>
            </div>
            <div>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'pills')}
                className="text-[rgb(212,193,177)] hover:text-[rgb(234,224,211)] transition-colors cursor-pointer"
              >
                Themes
              </a>
            </div>
            <div>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'community')}
                className="text-[rgb(212,193,177)] hover:text-[rgb(234,224,211)] transition-colors cursor-pointer"
              >
                Community
              </a>
            </div>
            <div>
              <a
                href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgb(250,204,21)] hover:underline font-semibold"
              >
                Ambassadors ↗
              </a>
            </div>
            <div>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'faq')}
                className="text-[rgb(212,193,177)] hover:text-[rgb(234,224,211)] transition-colors cursor-pointer"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Executive Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[rgb(165,138,122)] font-semibold">
              EXECUTIVE DISPATCH
            </div>
            <p className="text-xs text-[rgb(212,193,177)] leading-relaxed font-sans">
              Receive confidential briefing memos, simulation updates, and mentor announcements directly to your inbox.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="delegate@founder.org"
                  className="flex-1 px-4 py-3 rounded-xl bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.15)] text-[rgb(248,244,237)] text-base sm:text-xs placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[rgb(234,224,211)] font-sans"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-5 py-3 rounded-xl bg-[rgb(234,224,211)] text-[rgb(27,8,5)] font-sans font-bold text-xs hover:bg-[rgb(248,244,237)] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-[rgba(74,222,128,0.1)] border border-[rgb(74,222,128)] text-[rgb(74,222,128)] font-mono text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Executive memo subscription active.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[rgb(165,138,122)]">
          <div>
            &copy; 2026 Alpha Entrepreneurship Summit (AES). All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg" target="_blank" rel="noopener noreferrer" className="hover:text-[rgb(234,224,211)]">
              Brand Ambassador
            </a>
            <span className="hover:text-[rgb(234,224,211)] cursor-pointer">Privacy & Integrity</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-lg bg-[rgba(64,43,40,0.3)] border border-[rgba(255,255,255,0.1)] text-[rgb(234,224,211)] hover:bg-[rgb(64,43,40)] transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
