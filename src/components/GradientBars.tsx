'use client';

import React, { useEffect, useRef } from 'react';

export interface GradientBarsProps {
  columns?: number;
  speed?: number;
  blurAmount?: string;
  opacity?: number;
  className?: string;
}

export const GradientBars: React.FC<GradientBarsProps> = ({
  columns = 17,
  speed = 0.8,
  blurAmount,
  opacity = 0.85,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || window.innerHeight);

    let animId = 0;
    let time = 0;
    let mouse = { x: width / 2, active: false };

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth || window.innerWidth;
      height = canvas.height = container.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouse.x = e.clientX - rect.left;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const numCols = columns;

    const draw = () => {
      time += 0.018 * speed;
      ctx.clearRect(0, 0, width, height);

      // Width of each individual bar
      const colWidth = width / numCols;

      // Wave center moves smoothly back and forth in a continuous sine wave
      let targetCenter = (numCols - 1) / 2 + ((numCols - 1) / 2) * Math.sin(time * 0.75);
      if (mouse.active) {
        const mouseCol = mouse.x / colWidth;
        targetCenter = targetCenter * 0.35 + mouseCol * 0.65;
      }

      for (let i = 0; i < numCols; i++) {
        const x = i * colWidth;
        const distFromCenter = Math.abs(i - targetCenter);

        // Gaussian intensity falloff matching reference image
        const intensity = Math.exp(-(distFromCenter * distFromCenter) / 4.4);

        // Vertical gradient hotspot shifting with wave
        const hotspotY = (0.35 + 0.12 * Math.sin(time * 0.85 + i * 0.25)) * height;
        const hotspotHeight = height * 0.55;

        // Base and peak alphas
        const baseAlpha = 0.08 + intensity * 0.88;
        const peakAlpha = Math.min(1.0, 0.15 + intensity * 0.95);

        const grad = ctx.createLinearGradient(0, 0, 0, height);

        // Silver-white gradient matching reference image
        grad.addColorStop(0, `rgba(22, 22, 24, ${baseAlpha * 0.7})`);
        grad.addColorStop(Math.max(0, (hotspotY - hotspotHeight * 0.45) / height), `rgba(160, 150, 145, ${intensity * 0.55})`);
        grad.addColorStop(Math.min(1, hotspotY / height), `rgba(255, 255, 255, ${peakAlpha})`);
        grad.addColorStop(Math.min(1, (hotspotY + hotspotHeight * 0.5) / height), `rgba(175, 155, 145, ${intensity * 0.65})`);
        grad.addColorStop(1, `rgba(18, 12, 10, ${baseAlpha * 0.5})`);

        ctx.fillStyle = grad;
        ctx.fillRect(x, 0, colWidth + 0.5, height);

        // Clean column border line
        ctx.strokeStyle = `rgba(0, 0, 0, 0.45)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, 0, colWidth, height);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [columns, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      style={{
        opacity,
        filter: blurAmount ? `blur(${blurAmount})` : undefined
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};

export default GradientBars;
