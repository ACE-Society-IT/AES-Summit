'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavbarProps {
  onOpenRegister: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  soundEnabled,
  onToggleSound
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 - 100)
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / totalScroll) * 100)));
      }

      // Compact state threshold
      setScrolled(currentScrollY > 40);

      // Directional hide/show animation
      if (currentScrollY <= 60) {
        // Always visible near page top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 6 && currentScrollY > 120) {
        // Scrolling DOWN -> smoothly glide up out of view
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 6) {
        // Scrolling UP -> smoothly glide down into view
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    // Remove hash from address bar to keep URL clean and unchanged
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = '/';
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 flex justify-center z-50 px-4 sm:px-6 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0'
        }`}
      >
        <nav
          className={`pointer-events-auto relative flex items-center justify-between gap-6 sm:gap-8 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full overflow-hidden ${
            scrolled
              ? 'max-w-[1260px] py-2 px-6 sm:px-7 bg-[rgba(27,8,5,0.88)] backdrop-blur-2xl border border-[rgba(255,255,255,0.2)] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)]'
              : 'max-w-[1700px] py-3 sm:py-3.5 px-6 sm:px-8 bg-[rgba(0,0,0,0.55)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
          }`}
          aria-label="Main Navigation"
        >
          {/* Subtle Dynamic Scroll Progress Track on Bottom Edge */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[rgba(245,184,149,0.3)] via-[rgb(234,224,211)] to-[rgb(250,204,21)] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Logo brand */}
          <a
            href="/"
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-28 h-8 flex items-center">
              <Image
                src="/assets/aes-logo.png"
                alt="Alpha Entrepreneurship Summit Logo"
                fill
                className="object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-extrabold text-sm text-[rgb(248,244,237)] tracking-tight leading-none">
                AES 2026
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[rgb(165,138,122)]">
                Flagship Summit
              </span>
            </div>
          </a>

          {/* Nav links */}
          <ul className="hidden lg:flex items-center gap-7 list-none">
            <li>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'vision')}
                className="text-sm font-medium text-[rgb(212,193,177)] hover:text-[rgb(248,244,237)] transition-colors cursor-pointer"
              >
                Vision
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'modules')}
                className="text-sm font-medium text-[rgb(212,193,177)] hover:text-[rgb(248,244,237)] transition-colors cursor-pointer"
              >
                Modules
              </a>
            </li>
            <li>
              <a
                href="/why-aes"
                className="text-sm font-medium text-[rgb(212,193,177)] hover:text-[rgb(248,244,237)] transition-colors cursor-pointer"
              >
                Why AES
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'community')}
                className="text-sm font-medium text-[rgb(212,193,177)] hover:text-[rgb(248,244,237)] transition-colors cursor-pointer"
              >
                Community
              </a>
            </li>
            <li>
              <a
                href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[rgb(250,204,21)] hover:text-white transition-colors flex items-center gap-1 group"
              >
                <span>Ambassadors</span>
                <span className="text-[10px] opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => scrollToSection(e, 'faq')}
                className="text-sm font-medium text-[rgb(212,193,177)] hover:text-[rgb(248,244,237)] transition-colors cursor-pointer"
              >
                FAQ
              </a>
            </li>
          </ul>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">

            {/* Nested CTA Button */}
            <a
              href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-nested btn-primary"
            >
              <span>Claim Pass</span>
              <span className="btn-icon-circle" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-[rgb(234,224,211)] rounded-full hover:bg-white/10 transition-colors"
            >
              <span className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Mobile Menu with Smooth Blur & Dedicated Close Button */}
      <div
        className={`fixed inset-0 bg-[rgba(27,8,5,0.95)] backdrop-blur-3xl z-50 flex flex-col items-center justify-between p-8 transition-opacity duration-300 overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Header inside Mobile Menu */}
        <div className="w-full flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            <div className="relative w-24 h-7">
              <Image
                src="/assets/aes-logo.png"
                alt="AES Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
            className="w-11 h-11 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <ul className="text-center space-y-6">
          <li>
            <a
              href="/"
              onClick={scrollToTop}
              className="font-sans text-2xl font-bold text-[rgb(248,244,237)] hover:text-[rgb(234,224,211)] cursor-pointer"
            >
              Overview
            </a>
          </li>
          <li>
            <a
              href="/"
              onClick={(e) => scrollToSection(e, 'vision')}
              className="font-sans text-2xl font-bold text-[rgb(248,244,237)] hover:text-[rgb(234,224,211)] cursor-pointer"
            >
              Vision
            </a>
          </li>
          <li>
            <a
              href="/"
              onClick={(e) => scrollToSection(e, 'modules')}
              className="font-sans text-2xl font-bold text-[rgb(248,244,237)] hover:text-[rgb(234,224,211)] cursor-pointer"
            >
              Modules
            </a>
          </li>
          <li>
            <a
              href="/why-aes"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans text-2xl font-bold text-[rgb(248,244,237)] hover:text-[rgb(234,224,211)] cursor-pointer"
            >
              Why AES
            </a>
          </li>
          <li>
            <a
              href="/"
              onClick={(e) => scrollToSection(e, 'community')}
              className="font-sans text-2xl font-bold text-[rgb(248,244,237)] hover:text-[rgb(234,224,211)] cursor-pointer"
            >
              Community
            </a>
          </li>
          <li>
            <a
              href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans text-2xl font-bold text-[rgb(250,204,21)] hover:text-white cursor-pointer"
            >
              Ambassadors ↗
            </a>
          </li>
          <li>
            <a
              href="/"
              onClick={(e) => scrollToSection(e, 'faq')}
              className="font-sans text-2xl font-bold text-[rgb(248,244,237)] hover:text-[rgb(234,224,211)] cursor-pointer"
            >
              FAQ
            </a>
          </li>
        </ul>
        <a
          href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4We7WHOgJUSJuBHvzR0a_yoXsS5ZZMtOmVx09mfgyTNUNkZORUE4VVk5V01XUUxZOExGTVRCMkpDQy4u&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacOVFJs8r-eCwIws3mBUpSnEQFYNFjYA6vfuVQmng6m-tTPRAuiz99BPEUpJw_aem_HfgdX8egwteJB1MbOk84qg"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
          className="btn-nested btn-primary cursor-pointer"
        >
          <span>Claim Your Pass</span>
          <span className="btn-icon-circle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </a>
      </div>
    </>
  );
};
