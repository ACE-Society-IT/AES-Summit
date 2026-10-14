'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { FluxLines } from './FluxLines';

interface CarouselItem {
  id: string;
  title: string;
  sub: string;
  image: string;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    id: 'keynotes',
    title: 'Insightful Keynotes',
    sub: 'Learn from the titans of industry and successful founders who have shaped the future.',
    image: '/assets/hero_stage.jpg'
  },
  {
    id: 'workshops',
    title: 'Hands-On Workshops',
    sub: 'Develop practical, real-world skills in finance, marketing, and product development.',
    image: '/assets/founders_networking.jpg'
  },
  {
    id: 'pitch',
    title: 'The Pitch Competition',
    sub: 'High-stakes battle testing strategy, innovation, and investor persuasion before real judges.',
    image: '/assets/pitch_stage.jpg'
  },
  {
    id: 'networking',
    title: 'Networking Hub',
    sub: 'Connect with a diverse network of mentors, investors, and talented peer founders.',
    image: '/assets/speaker_elena.jpg'
  },
  {
    id: 'investomania',
    title: 'Investomania Arena',
    sub: 'Step into the shoes of investors navigating volatile markets, insider leaks, and financial crises.',
    image: '/assets/speaker_marcus.jpg'
  },
  {
    id: 'monopoly',
    title: 'Market Monopoly',
    sub: 'Compete, trade, and build empires in a fast-paced twist on the classic board game.',
    image: '/assets/speaker_clara.jpg'
  },
  {
    id: 'planning-prism',
    title: 'Planning Prism Showcase',
    sub: 'Design bold solutions to global crises and pitch live before seasoned allocators.',
    image: '/assets/speaker_david.jpg'
  },
  {
    id: 'defend-empire',
    title: 'Defend the Empire Simulation',
    sub: 'HR & PR crisis management simulations testing leadership under pressure.',
    image: '/assets/pitch_stage.jpg'
  },
  {
    id: 'viral-velocity',
    title: 'Viral Velocity Studio',
    sub: 'Revive failed products and engineer viral market momentum in real time.',
    image: '/assets/founders_networking.jpg'
  },
  {
    id: 'founder-fireside',
    title: 'Founder Fireside Sessions',
    sub: 'Intimate, candid masterclasses on zero-to-one scaling and market moats.',
    image: '/assets/hero_stage.jpg'
  },
  {
    id: 'mentor-lounge',
    title: '1-on-1 Mentorship Suites',
    sub: 'Bilateral advisory office hours with vetted venture builders and operators.',
    image: '/assets/speaker_elena.jpg'
  },
  {
    id: 'gala-banquet',
    title: 'Closing Summit Banquet',
    sub: 'Honoring winning cohort pitches and celebrating the next generation of titans.',
    image: '/assets/speaker_marcus.jpg'
  }
];

export const ConcaveCarousel: React.FC<{ items?: CarouselItem[] }> = ({
  items = DEFAULT_ITEMS
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive, wide panoramic orbit radius so cards spread out gracefully to the left and right
  const [radius, setRadius] = useState(1200);
  const count = items.length;
  const angleStep = 360 / count;

  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const previousXRef = useRef(0);
  const velocityRef = useRef(0);

  // Dynamic radius update based on viewport width to maximize wide horizontal spread
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setRadius(480);
      } else if (w < 640) {
        setRadius(640);
      } else if (w < 1024) {
        setRadius(900);
      } else if (w < 1536) {
        setRadius(1180);
      } else {
        // High-res / ultrawide / 2400px displays: spread broadly across the screen
        setRadius(1400);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    let raf = 0;

    const onPointerDown = (clientX: number) => {
      isDraggingRef.current = true;
      previousXRef.current = clientX;
      velocityRef.current = 0;
    };

    const onPointerMove = (clientX: number, isTouch = false) => {
      if (!isDraggingRef.current) return;
      const delta = clientX - previousXRef.current;
      previousXRef.current = clientX;
      targetRotationRef.current += delta * (isTouch ? 0.35 : 0.22);
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const viewport = containerRef.current;
    if (!viewport) return;

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, false);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => onPointerDown(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => onPointerMove(e.touches[0].clientX, true);
    const handleTouchEnd = () => onPointerUp();

    viewport.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const animate = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.01) {
          targetRotationRef.current += velocityRef.current;
          velocityRef.current *= 0.94;
        } else {
          targetRotationRef.current -= 0.04; // Gentle ambient rotation
        }
      }

      rotationRef.current += (targetRotationRef.current - rotationRef.current) * 0.08;
      setRotation(rotationRef.current);

      if (trackRef.current) {
        trackRef.current.style.transform = `translateZ(-${radius * 0.76}px) rotateY(${rotationRef.current}deg)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      viewport.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      viewport.removeEventListener('touchend', handleTouchEnd);
    };
  }, [radius]);

  const handlePrev = () => {
    targetRotationRef.current += angleStep;
  };

  const handleNext = () => {
    targetRotationRef.current -= angleStep;
  };

  return (
    <section className="relative w-full py-20 md:py-24 overflow-hidden bg-[rgb(27,8,5)] select-none border-t border-[rgba(255,255,255,0.08)]">
      {/* Background Layer 1: Blurred Animated Conic Gradient matching Header */}
      <div
        className="animate-rotate-conic absolute top-1/2 left-1/2 w-[140vw] h-[140vw] max-w-[1500px] max-h-[1500px] rounded-full opacity-25 filter blur-[90px] saturate-150 pointer-events-none select-none z-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #5E423B, #A58A7A, #B2A298, #D8B28E, #917A6D, #6F5A50, #402B28, #5E423B)'
        }}
      />

      {/* Background Layer 2: FluxLines Fluid Waves matching Header Background (Strictly Unclickable, Pointer-Events None) */}
      <div className="absolute inset-0 z-0 opacity-75 pointer-events-none select-none overflow-hidden">
        <FluxLines
          className="pointer-events-none w-full h-full"
          colors={['#ffffff', '#FAF5EE', '#EAE0D3']}
          glow={2.8}
          lineWidth={1.5}
          rimWidth={0.25}
          flowDirection="down"
          speed={0.3}
          scale={1.6}
          turbulence={0.8}
          fluidity={0.1}
          sharpness={2.5}
          shimmer={1.5}
          mouseStrength={0}
          mouseRadius={0}
          intro={false}
          clickSwirl={false}
          mouseInteraction={false}
        />
      </div>

      {/* Background Layer 3: Ambient Warm Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full opacity-25 filter blur-[120px] pointer-events-none select-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(216,178,142,0.4), rgba(94,66,59,0.2) 50%, transparent 80%)'
        }}
      />

      {/* Header */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 mb-10 text-center scroll-reveal">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(0,0,0,0.6)] backdrop-blur-xl border border-[rgba(255,255,255,0.15)] font-sans text-xs uppercase tracking-[0.2em] text-[rgb(234,224,211)] mb-4 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-[rgb(250,204,21)]" />
          SUMMIT GALLERY · AES 2026
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[rgb(248,244,237)] mb-3 font-sans">
          Gallery
        </h2>
        <p className="text-base md:text-lg text-[rgb(212,193,177)] max-w-2xl mx-auto font-normal font-sans">
          Glide through flagship moments, simulation stages, and keynote firesides curved dynamically around your viewport.
        </p>
      </div>

      {/* 3D Concave Stage Viewport - Wide panoramic orbit spreading across left and right */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-[540px] md:h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible pointer-events-auto"
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        {/* Subtle Edge Ambient Fades - gentle peripheral falloff */}
        <div
          className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 md:w-36 pointer-events-none z-20"
          style={{ background: 'linear-gradient(90deg, rgb(27,8,5) 0%, rgba(27,8,5,0.5) 40%, transparent 100%)' }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 md:w-36 pointer-events-none z-20"
          style={{ background: 'linear-gradient(-90deg, rgb(27,8,5) 0%, rgba(27,8,5,0.5) 40%, transparent 100%)' }}
        />

        {/* Ambient Floor Glow */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[rgba(64,43,40,0.25)] blur-3xl pointer-events-none z-0" />

        {/* 3D Cylindrical Track */}
        <div
          ref={trackRef}
          className="relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[380px] h-[370px] sm:h-[430px] md:h-[460px] lg:h-[480px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, index) => {
            const angle = index * angleStep;
            const totalAngle = (angle + rotation) % 360;
            const normalized = ((totalAngle + 540) % 360) - 180;
            const distance = Math.abs(normalized);

            // Cards in back are visible, showing the full 3D cylinder
            const isFacingFront = distance < 95;
            const opacity = isFacingFront
              ? 1.0 - (distance / 95) * 0.18 // Front cards: 0.82 to 1.0
              : 0.45 + (1 - (distance - 95) / 85) * 0.3; // Back cards: 0.45 to 0.75

            return (
              <div
                key={item.id}
                className="absolute top-0 left-0 w-full h-full rounded-3xl p-2 bg-[rgba(0,0,0,0.65)] backdrop-blur-xl border border-[rgba(255,255,255,0.14)] shadow-[0_24px_50px_rgba(0,0,0,0.8)] transition-all duration-300"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                  opacity
                }}
              >
                {/* Front Face of the Card */}
                <div 
                  className="relative w-full h-full rounded-2xl overflow-hidden bg-[rgb(27,8,5)] border border-[rgba(255,255,255,0.15)] group z-10"
                  style={{ backfaceVisibility: 'visible' }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover brightness-100 group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.92)] via-[rgba(0,0,0,0.35)] to-transparent flex flex-col justify-end p-6 z-10 pointer-events-none">
                    <h3 className="font-sans font-bold text-lg md:text-xl text-[rgb(248,244,237)] leading-snug mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[rgb(212,193,177)] leading-relaxed line-clamp-2 font-sans font-normal">
                      {item.sub}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Drag & Navigation Controls in Navbar Glassmorphic Style */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          aria-label="Previous gallery panel"
          className="w-12 h-12 rounded-full bg-[rgba(0,0,0,0.65)] backdrop-blur-xl border border-[rgba(255,255,255,0.18)] text-[rgb(234,224,211)] flex items-center justify-center hover:bg-[rgb(234,224,211)] hover:text-[rgb(27,8,5)] transition-all active:scale-95 cursor-pointer shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <span className="font-sans text-xs uppercase tracking-widest text-[rgb(165,138,122)] font-semibold">
          Drag to Orbit · 360° Gallery
        </span>

        <button
          onClick={handleNext}
          aria-label="Next gallery panel"
          className="w-12 h-12 rounded-full bg-[rgba(0,0,0,0.65)] backdrop-blur-xl border border-[rgba(255,255,255,0.18)] text-[rgb(234,224,211)] flex items-center justify-center hover:bg-[rgb(234,224,211)] hover:text-[rgb(27,8,5)] transition-all active:scale-95 cursor-pointer shadow-xl"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
