'use client';

import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, RenderTarget } from 'ogl';

interface PatternWavesProps {
  color?: string;
  backgroundColor?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const passVertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fieldFragment = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uSize;
uniform float uDpr;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uBackground;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  float wave1 = sin(uv.x * 8.0 + uTime * 0.8) * 0.5 + 0.5;
  float wave2 = cos(uv.y * 6.0 - uTime * 0.5) * 0.5 + 0.5;
  float pattern = smoothstep(0.48, 0.52, sin((uv.x + uv.y + wave1 * 0.2) * 24.0));
  
  vec3 col = mix(uBackground, uColor, pattern * 0.35);
  fragColor = vec4(col, 0.85);
}`;

export const PatternWaves: React.FC<PatternWavesProps> = ({
  color = '#EAE0D3',
  backgroundColor = '#1B0805',
  opacity = 0.5,
  className = '',
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, depth: false });
    const gl = renderer.gl;
    if (!renderer.isWebgl2) return;

    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const parseHex = (hex: string) => {
      const n = parseInt(hex.replace('#', ''), 16);
      return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    };

    const program = new Program(gl, {
      vertex: passVertex,
      fragment: fieldFragment,
      uniforms: {
        uSize: { value: [container.clientWidth, container.clientHeight] },
        uDpr: { value: window.devicePixelRatio || 1 },
        uTime: { value: 0 },
        uColor: { value: parseHex(color) },
        uBackground: { value: parseHex(backgroundColor) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    let time = 0;
    let raf = 0;

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      program.uniforms.uSize.value = [container.clientWidth, container.clientHeight];
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      time += 0.02;
      program.uniforms.uTime.value = time;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, backgroundColor]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden opacity-[${opacity}] ${className}`} style={style} />
  );
};
