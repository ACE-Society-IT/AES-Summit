'use client';

import React, { useEffect, useRef } from 'react';
import './FluxLines.css';

const MAX_COLORS = 8;
const INTRO_SECONDS = 1.2;
const FLOW: Record<string, [number, number]> = {
  up: [0, 1],
  down: [0, -1],
  left: [-1, 0],
  right: [1, 0]
};

const VERTEX = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FIELD = `
float hash(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float smin(float a, float b, float k) {
  float r = exp2(-a / k) + exp2(-b / k);
  return -k * log2(r);
}

float sinlerp(float a, float b, float w) {
  return mix(a, b, (sin(w * 3.14159265 - 3.14159265 / 2.0) + 1.0) / 2.0);
}

float vn(vec2 p, float s, float seed) {
  vec2 cellp = floor(p / s);
  vec2 relp = mod(p, s);
  float g1 = hash(vec3(cellp, seed));
  float g2 = hash(vec3(cellp.x + 1.0, cellp.y, seed));
  float g3 = hash(vec3(cellp.x + 1.0, cellp.y + 1.0, seed));
  float g4 = hash(vec3(cellp.x, cellp.y + 1.0, seed));
  float bx = sinlerp(g1, g2, relp.x / s);
  float tx = sinlerp(g4, g3, relp.x / s);
  return sinlerp(bx, tx, relp.y / s);
}

float dbn(vec2 p, float s, float seed) {
  float o = s / 2.0;
  float n0 = vn(p, s, seed);
  float n1 = vn(p + vec2(o, o), s, seed + 0.1);
  float n2 = vn(p + vec2(-o, o), s, seed + 0.2);
  float n3 = vn(p + vec2(o, -o), s, seed + 0.3);
  float n4 = vn(p + vec2(-o, -o), s, seed + 0.4);
  return (2.0 * n0 + 1.5 * n1 + 1.25 * n2 + 1.125 * n3 + n4) / 7.0;
}
`;

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uFlow;
uniform float uSpeed;
uniform float uScale;
uniform float uTurbulence;
uniform float uFluidity;
uniform float uRimWidth;
uniform float uSharpness;
uniform float uShimmer;
uniform float uGlow;
uniform float uLine;
uniform float uMaxHalf;
uniform vec3 uColors[${MAX_COLORS}];
uniform int uColorCount;
uniform vec4 uMagnet;
uniform vec4 uSwirl;
uniform float uReveal;
uniform float uLight;
uniform float uOpaque;
uniform vec3 uBackground;
uniform float uOpacity;
out vec4 outColor;
${FIELD}

vec3 palette(float h) {
  float x = clamp(h, 0.0, 1.0) * float(uColorCount - 1);
  int i = int(floor(x));
  int j = min(i + 1, uColorCount - 1);
  return mix(uColors[i], uColors[j], smoothstep(0.0, 1.0, x - float(i)));
}

void main() {
  float ref = 700.0 / max(uScale, 0.05);
  vec2 frag = gl_FragCoord.xy;
  vec2 toMagnet = (frag - uMagnet.xy) / uResolution.y;
  float pull = uMagnet.z * exp(-dot(toMagnet, toMagnet) / (uMagnet.w * uMagnet.w));
  if (pull > 0.001) {
    float angle = pull * 0.55;
    float c = cos(angle);
    float s = sin(angle);
    frag = uMagnet.xy + mat2(c, s, -s, c) * (frag - uMagnet.xy);
  }
  if (uSwirl.w > 0.0) {
    vec2 d = frag - uSwirl.xy;
    float reach = uSwirl.z;
    float angle = uSwirl.w * exp(-dot(d, d) / (reach * reach));
    float c = cos(angle);
    float s = sin(angle);
    frag = uSwirl.xy + mat2(c, s, -s, c) * d;
  }
  vec2 p = frag / uResolution.y * ref;

  float spd = 85.0 * uSpeed;
  float t = uTime;
  vec2 dir = uFlow;
  vec2 perp = vec2(-dir.y, dir.x);
  float distort1 = vn(p + perp * (t * spd), 60.0, 10.0) * 50.0 * uTurbulence;
  float distort2 = vn(p - perp * (t * spd), 120.0, 15.0) * 100.0 * uTurbulence;
  float peaks = dbn(p + distort1 + dir * (t * spd * 0.5), 40.0, 1.0);
  float peaks2 = dbn(p + distort2 - dir * (t * spd * 0.5), 40.0, 0.0);
  float field = smin(peaks, peaks2, max(uFluidity, 0.001));

  // Exact geometric distance in screen pixels from contour line
  float slope = length(vec2(dFdx(field), dFdy(field)));
  float gap = abs(field - 0.4);
  float pixels = gap / max(slope, 1e-6);

  // Razor-sharp vector contour line with sub-pixel antialiasing
  float lineW = max(0.85, uLine);
  float lineAlpha = smoothstep(lineW + 0.75, max(0.0, lineW - 0.75), pixels);

  // Tight, delicate luminance edge that enhances clarity without blurry wash
  float tightGlow = exp(-pixels * 0.28) * min(uGlow * 0.3, 0.45);
  float energy = clamp(lineAlpha + tightGlow, 0.0, 1.0) * uReveal;

  float h = clamp(0.5 + (peaks - peaks2) * 0.8, 0.0, 1.0);
  vec3 tint = palette(h);

  if (uLight > 0.5) {
    float chroma = max(tint.r, max(tint.g, tint.b)) - min(tint.r, min(tint.g, tint.b));
    vec3 ink = mix(vec3(0.07, 0.07, 0.08), tint * 0.55, clamp(chroma * 1.6, 0.0, 1.0));
    float cover = energy * uOpacity;
    outColor = uOpaque > 0.5 ? vec4(mix(uBackground, ink, cover), 1.0) : vec4(ink * cover, cover);
    return;
  }

  vec3 light = tint * energy * uOpacity;
  outColor = uOpaque > 0.5 ? vec4(uBackground + light, 1.0) : vec4(light, max(light.r, max(light.g, light.b)));
}`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
};

const link = (gl: WebGL2RenderingContext) => {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.bindAttribLocation(program, 0, 'aPosition');
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) uniforms[info.name.replace('[0]', '')] = gl.getUniformLocation(program, info.name)!;
  }
  return { program, uniforms };
};

export interface FluxLinesProps {
  colors?: string[];
  speed?: number;
  scale?: number;
  turbulence?: number;
  fluidity?: number;
  rimWidth?: number;
  sharpness?: number;
  shimmer?: number;
  glow?: number;
  lineWidth?: number;
  flowDirection?: 'up' | 'down' | 'left' | 'right';
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  mouseDampening?: number;
  clickSwirl?: boolean;
  intro?: boolean;
  lightMode?: boolean;
  transparent?: boolean;
  backgroundColor?: string;
  className?: string;
  style?: React.CSSProperties;
  dpr?: number;
}

export const FluxLines: React.FC<FluxLinesProps> = ({
  colors = ['#ffffff', '#ffffff', '#ffffff'],
  speed = 0.15,
  scale = 1.6,
  turbulence = 1,
  fluidity = 0.1,
  rimWidth = 0.25,
  sharpness = 2.5,
  shimmer = 1.5,
  glow = 2.8,
  lineWidth = 1.2,
  flowDirection = 'down',
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 1,
  mouseRadius = 0.35,
  mouseDampening = 0.15,
  clickSwirl = true,
  intro = false,
  lightMode = false,
  transparent = true,
  backgroundColor,
  className = '',
  style,
  dpr
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  const settings = {
    colors: Array.isArray(colors) && colors.length ? colors.slice(0, MAX_COLORS) : ['#ffffff'],
    speed,
    scale: Math.max(0.05, scale),
    turbulence,
    fluidity: Math.max(0.001, fluidity),
    rimWidth: Math.max(0.001, rimWidth),
    sharpness: Math.max(0.1, sharpness),
    shimmer: Math.max(0, shimmer),
    glow: Math.max(0, glow),
    lineWidth: Math.max(0, lineWidth),
    flow: FLOW[flowDirection] ?? FLOW.down,
    opacity: clamp(opacity, 0, 1),
    mouseInteraction,
    mouseStrength: Math.max(0, mouseStrength),
    mouseRadius: Math.max(0.01, mouseRadius),
    mouseDampening: Math.max(0, mouseDampening),
    clickSwirl,
    intro,
    lightMode,
    transparent,
    backgroundColor,
    dpr
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    // Attempt WebGL2 with native hardware antialiasing enabled
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance'
    });

    if (gl) {
      const program = link(gl);
      if (program) {
        const u = program.uniforms;
        const buffer = gl.createBuffer();
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

        const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        const cache = new Map<string, [number, number, number]>();
        const parse = (value: string | undefined, fallback: [number, number, number]): [number, number, number] => {
          if (!value) return fallback;
          const key = String(value);
          if (cache.has(key)) return cache.get(key)!;
          let rgb = fallback;
          if (probe) {
            probe.clearRect(0, 0, 1, 1);
            probe.fillStyle = '#000000';
            probe.fillStyle = key;
            probe.fillRect(0, 0, 1, 1);
            const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
            rgb = [r / 255, g / 255, b / 255];
          }
          cache.set(key, rgb);
          return rgb;
        };
        const palette = new Float32Array(MAX_COLORS * 3);

        const pointer = { x: 0, y: 0, inside: false };
        const magnet = { x: 0, y: 0, active: 0 };
        const swirl = { x: 0, y: 0, age: 10 };
        let time = 0;
        let reveal = 1.0;
        let raf = 0;
        let last = 0;

        const render = () => {
          const s = settingsRef.current;
          s.colors.forEach((value, index) => {
            const rgb = parse(value, [1, 1, 1]);
            palette[index * 3] = rgb[0];
            palette[index * 3 + 1] = rgb[1];
            palette[index * 3 + 2] = rgb[2];
          });
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.useProgram(program.program);
          gl.bindVertexArray(vao);
          if (u.uResolution) gl.uniform2f(u.uResolution, canvas.width, canvas.height);
          if (u.uTime) gl.uniform1f(u.uTime, time);
          if (u.uFlow) gl.uniform2f(u.uFlow, s.flow[0], s.flow[1]);
          if (u.uSpeed) gl.uniform1f(u.uSpeed, s.speed);
          if (u.uScale) gl.uniform1f(u.uScale, s.scale);
          if (u.uTurbulence) gl.uniform1f(u.uTurbulence, s.turbulence);
          if (u.uFluidity) gl.uniform1f(u.uFluidity, s.fluidity);
          if (u.uRimWidth) gl.uniform1f(u.uRimWidth, s.rimWidth);
          if (u.uSharpness) gl.uniform1f(u.uSharpness, s.sharpness);
          if (u.uShimmer) gl.uniform1f(u.uShimmer, s.shimmer);
          if (u.uGlow) gl.uniform1f(u.uGlow, s.glow);
          if (u.uLine) gl.uniform1f(u.uLine, s.lineWidth * (canvas.width / Math.max(1, container.clientWidth)) * 0.5);
          if (u.uMaxHalf) gl.uniform1f(u.uMaxHalf, 28 * (canvas.width / Math.max(1, container.clientWidth)));
          if (u.uColors) gl.uniform3fv(u.uColors, palette);
          if (u.uColorCount) gl.uniform1i(u.uColorCount, s.colors.length);
          if (u.uMagnet) gl.uniform4f(u.uMagnet, magnet.x, magnet.y, magnet.active * s.mouseStrength, s.mouseRadius);

          const age = swirl.age;
          const twist = 1.9 * Math.min(1, age / 0.23) * Math.exp(-Math.max(0, age - 0.23) * 1.1);
          if (u.uSwirl) gl.uniform4f(u.uSwirl, swirl.x, swirl.y, canvas.height * 0.22 * (1 + age * 0.5), age < 6 ? twist : 0);

          if (u.uReveal) gl.uniform1f(u.uReveal, reveal);
          if (u.uLight) gl.uniform1f(u.uLight, s.lightMode ? 1 : 0);
          if (u.uOpaque) gl.uniform1f(u.uOpaque, s.transparent ? 0 : 1);
          const bg = parse(s.backgroundColor, s.lightMode ? [1, 1, 1] : [0.105, 0.031, 0.019]);
          if (u.uBackground) gl.uniform3fv(u.uBackground, bg);
          if (u.uOpacity) gl.uniform1f(u.uOpacity, s.opacity);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const frame = (now: number) => {
          if (document.hidden) return;
          const s = settingsRef.current;
          const dt = last ? clamp((now - last) / 1000, 0.0005, 0.05) : 1 / 60;
          last = now;
          time += dt * 1.25;
          swirl.age += dt;

          const engaged = s.mouseInteraction && pointer.inside;
          const follow = s.mouseDampening > 0 ? 1 - Math.exp(-dt / s.mouseDampening) : 1;
          if (engaged) {
            magnet.x += (pointer.x - magnet.x) * follow;
            magnet.y += (pointer.y - magnet.y) * follow;
          }
          const target = engaged ? 1 : 0;
          magnet.active += (target - magnet.active) * (1 - Math.exp(-dt / 0.3));
          if (Math.abs(target - magnet.active) < 0.001) magnet.active = target;

          render();
          raf = requestAnimationFrame(frame);
        };

        const wake = () => {
          if (!raf && !document.hidden) raf = requestAnimationFrame(frame);
        };

        const resize = () => {
          const width = Math.max(1, container.clientWidth || window.innerWidth);
          const height = Math.max(1, container.clientHeight || window.innerHeight);
          // Query real devicePixelRatio at runtime (dynamically updates when zooming or on high-DPI screens)
          const nativeDpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
          const userDpr = settingsRef.current.dpr;
          // Render at crisp native resolution (capped at 2.5 for 4K) so contour lines are razor-sharp and never pixelated
          const ratio = userDpr ? Math.max(0.75, Math.min(userDpr, 2.5)) : Math.max(1.0, Math.min(nativeDpr, 2.5));
          canvas.width = Math.max(1, Math.round(width * ratio));
          canvas.height = Math.max(1, Math.round(height * ratio));
          render();
          wake();
        };

        const locate = (event: PointerEvent) => {
          const rect = container.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const ratio = canvas.width / Math.max(1, rect.width);
          pointer.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
          pointer.x = x * ratio;
          pointer.y = (rect.height - y) * ratio;
        };

        const onPointerMove = (event: PointerEvent) => {
          locate(event);
          wake();
        };

        const onPointerDown = (event: PointerEvent) => {
          onPointerMove(event);
          if (!pointer.inside || !settingsRef.current.clickSwirl) return;
          swirl.x = pointer.x;
          swirl.y = pointer.y;
          swirl.age = 0;
          wake();
        };

        const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
        ro?.observe(container);

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerdown', onPointerDown, { passive: true });
        window.addEventListener('resize', resize);
        resize();
        wake();

        return () => {
          cancelAnimationFrame(raf);
          ro?.disconnect();
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerdown', onPointerDown);
          window.removeEventListener('resize', resize);
          gl.deleteProgram(program.program);
          gl.deleteBuffer(buffer);
          gl.deleteVertexArray(vao);
        };
      }
    }

    // High-performance 2D Canvas Fallback if WebGL2 is unavailable
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || window.innerHeight);
    let animId = 0;
    let step = 0;

    const resize2D = () => {
      width = canvas.width = container.clientWidth || window.innerWidth;
      height = canvas.height = container.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', resize2D);

    const draw2D = () => {
      step += 0.006;
      ctx.clearRect(0, 0, width, height);

      const lines = 9;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const yOffset = (height / lines) * i;
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= width; x += 30) {
          const y = yOffset + Math.sin(x * 0.003 + step + i * 0.4) * 45 + Math.cos(x * 0.001 - step * 0.5) * 20;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + (i % 3) * 0.08})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw2D);
    };

    draw2D();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize2D);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flux-lines-container ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="flux-lines-canvas" aria-hidden="true" />
    </div>
  );
};

export default FluxLines;
