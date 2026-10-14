'use client';

import React, { useEffect, useRef } from 'react';

export type WaveColorScheme = 'modules-theme' | 'vision-theme' | 'brown-peach-white' | 'modules-flame' | 'vision-aurora';

interface ColoredGradientWaveProps {
  className?: string;
  speed?: number;
  opacity?: number;
  height?: string;
  colorScheme?: WaveColorScheme | string;
}

export const ColoredGradientWave: React.FC<ColoredGradientWaveProps> = ({
  className = '',
  speed = 0.4,
  opacity = 0.65,
  colorScheme = 'brown-peach-white'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', resize);
    resize();

    // Define website-themed palettes: Brown, White, and Peach
    const getPalettes = () => {
      // 1. Modules Section: Rich Roasted Brown, Sunlit Peach, and Creamy White
      if (colorScheme === 'modules-theme' || colorScheme === 'modules-flame') {
        return [
          {
            stops: [
              { offset: 0.0, color: 'rgba(94, 66, 59, 0.48)' },   // Rich Mocha Brown (#5E423B)
              { offset: 0.35, color: 'rgba(232, 157, 119, 0.42)' }, // Warm Peach (#E89D77)
              { offset: 0.75, color: 'rgba(255, 223, 201, 0.35)' }, // Soft Peach Cream
              { offset: 1.0, color: 'rgba(255, 255, 255, 0.28)' }   // Pure White
            ],
            speedMult: 0.85,
            freq: 0.0019,
            amp: 76,
            baseOffset: 0.38
          },
          {
            stops: [
              { offset: 0.0, color: 'rgba(64, 43, 40, 0.44)' },   // Deep Espresso Brown (#402B28)
              { offset: 0.4, color: 'rgba(245, 184, 149, 0.38)' },  // Radiant Peach (#F5B895)
              { offset: 0.8, color: 'rgba(250, 245, 238, 0.32)' },  // Alabaster White (#FAF5EE)
              { offset: 1.0, color: 'rgba(216, 178, 142, 0.22)' }  // Warm Sand (#D8B28E)
            ],
            speedMult: 1.1,
            freq: 0.0028,
            amp: 62,
            baseOffset: 0.54
          },
          {
            stops: [
              { offset: 0.0, color: 'rgba(108, 52, 29, 0.38)' },   // Warm Mahogany (#6C341D)
              { offset: 0.45, color: 'rgba(250, 213, 184, 0.34)' }, // Peach Tint (#FAD5B8)
              { offset: 0.85, color: 'rgba(255, 255, 255, 0.28)' }, // Silk White
              { offset: 1.0, color: 'rgba(234, 224, 211, 0.18)' }  // Warm Beige (#EAE0D3)
            ],
            speedMult: 0.75,
            freq: 0.0015,
            amp: 84,
            baseOffset: 0.70
          },
          {
            stops: [
              { offset: 0.0, color: 'rgba(165, 138, 122, 0.35)' },  // Warm Taupe
              { offset: 0.5, color: 'rgba(255, 218, 185, 0.30)' },  // Peach Blush
              { offset: 1.0, color: 'rgba(255, 255, 255, 0.22)' }   // Pure White
            ],
            speedMult: 1.3,
            freq: 0.0036,
            amp: 46,
            baseOffset: 0.84
          }
        ];
      }

      // 2. Vision Section: Soft Peach Glow, Alabaster White, and Warm Caramel Brown
      return [
        {
          stops: [
            { offset: 0.0, color: 'rgba(245, 184, 149, 0.48)' },   // Radiant Warm Peach (#F5B895)
            { offset: 0.35, color: 'rgba(255, 255, 255, 0.42)' },  // Crisp Pure White
            { offset: 0.7, color: 'rgba(140, 90, 72, 0.36)' },     // Warm Chestnut Brown
            { offset: 1.0, color: 'rgba(255, 223, 201, 0.25)' }    // Light Peach Cream
          ],
          speedMult: 0.85,
          freq: 0.0018,
          amp: 78,
          baseOffset: 0.36
        },
        {
          stops: [
            { offset: 0.0, color: 'rgba(255, 255, 255, 0.45)' },   // Frosted White
            { offset: 0.4, color: 'rgba(232, 157, 119, 0.38)' },   // Soft Peach Amber
            { offset: 0.8, color: 'rgba(94, 66, 59, 0.32)' },      // Warm Mocha (#5E423B)
            { offset: 1.0, color: 'rgba(250, 245, 238, 0.22)' }   // Ivory Alabaster
          ],
          speedMult: 1.15,
          freq: 0.0027,
          amp: 60,
          baseOffset: 0.52
        },
        {
          stops: [
            { offset: 0.0, color: 'rgba(64, 43, 40, 0.38)' },     // Deep Roasted Brown (#402B28)
            { offset: 0.45, color: 'rgba(250, 213, 184, 0.34)' },  // Soft Peach Glow
            { offset: 0.85, color: 'rgba(255, 255, 255, 0.30)' },  // Radiant White
            { offset: 1.0, color: 'rgba(216, 178, 142, 0.18)' }   // Warm Sand
          ],
          speedMult: 0.7,
          freq: 0.0014,
          amp: 86,
          baseOffset: 0.69
        },
        {
          stops: [
            { offset: 0.0, color: 'rgba(255, 218, 185, 0.38)' },   // Peach Apricot
            { offset: 0.5, color: 'rgba(255, 255, 255, 0.30)' },   // Luminous White
            { offset: 1.0, color: 'rgba(108, 52, 29, 0.20)' }     // Warm Brown Accent
          ],
          speedMult: 1.35,
          freq: 0.0034,
          amp: 48,
          baseOffset: 0.84
        }
      ];
    };

    const waves = getPalettes();

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      time += 0.012 * speed;
      ctx.clearRect(0, 0, width, height);

      // Render each animated wave layer with Brown, White, and Peach gradients
      waves.forEach((w, waveIndex) => {
        ctx.save();

        const grad = ctx.createLinearGradient(0, 0, width, height * 0.85);
        w.stops.forEach((s) => {
          grad.addColorStop(s.offset, s.color);
        });

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, height);

        const currentPhase = time * w.speedMult + waveIndex * 1.6;
        const baseY = height * w.baseOffset;

        // Draw smooth sinusoidal curve across canvas width
        const step = 8;
        for (let x = 0; x <= width + step; x += step) {
          const y =
            baseY +
            Math.sin(x * w.freq + currentPhase) * w.amp +
            Math.cos(x * (w.freq * 1.7) - currentPhase * 0.6) * (w.amp * 0.38) +
            Math.sin(x * 0.0007 + currentPhase * 0.35) * (w.amp * 0.22);

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [speed, colorScheme]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-700 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

export default ColoredGradientWave;
