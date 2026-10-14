/**
 * FLUX LINES ENGINE (WebGL2 Native Adaptation from header backround.txt)
 * Dynamic fluid wave shader with magnetic mouse physics & click swirl
 * Strictly themed to AES Obsidian & Sand Cream Palette
 */

class FluxLinesEngine {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.container = this.canvas.parentElement;
    this.gl = this.canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false
    });

    if (!this.gl) {
      console.warn('WebGL2 not supported, fallback active.');
      return;
    }

    // Default configuration strictly using AES palette colors
    this.settings = Object.assign({
      colors: [
        [234/255, 224/255, 211/255], // Sand Cream rgb(234, 224, 211)
        [212/255, 193/255, 177/255], // Sand Clay rgb(212, 193, 177)
        [165/255, 138/255, 122/255], // Taupe rgb(165, 138, 122)
        [94/255, 66/255, 59/255]     // Rosewood rgb(94, 66, 59)
      ],
      backgroundColor: [27/255, 8/255, 5/255], // Noir Deep rgb(27, 8, 5)
      speed: 0.35,
      scale: 1.4,
      turbulence: 0.95,
      fluidity: 0.12,
      rimWidth: 0.22,
      sharpness: 2.4,
      shimmer: 1.4,
      glow: 1.8,
      lineWidth: 1.1,
      flow: [0, -1], // down
      opacity: 0.9,
      mouseStrength: 1.0,
      mouseRadius: 0.32,
      mouseDampening: 0.16,
      clickSwirl: true,
      intro: true,
      lightMode: false,
      transparent: true
    }, options);

    this.init();
  }

  init() {
    const gl = this.gl;

    const VERTEX_SRC = `#version 300 es
    in vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

    const FIELD_SRC = `
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

    const FRAGMENT_SRC = `#version 300 es
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
    uniform vec3 uColors[8];
    uniform int uColorCount;
    uniform vec4 uMagnet;
    uniform vec4 uSwirl;
    uniform float uReveal;
    uniform float uLight;
    uniform float uOpaque;
    uniform vec3 uBackground;
    uniform float uOpacity;
    out vec4 outColor;
    ${FIELD_SRC}

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

      float spd = 200.0 * uSpeed;
      float t = uTime;
      vec2 dir = uFlow;
      vec2 perp = vec2(-dir.y, dir.x);
      float distort1 = vn(p + perp * (t * spd), 60.0, 10.0) * 50.0 * uTurbulence;
      float distort2 = vn(p - perp * (t * spd), 120.0, 15.0) * 100.0 * uTurbulence;
      float peaks = dbn(p + distort1 + dir * (t * spd * 0.5), 40.0, 1.0);
      float peaks2 = dbn(p + distort2 - dir * (t * spd * 0.5), 40.0, 0.0);
      float field = smin(peaks, peaks2, max(uFluidity, 0.001));

      float slope = length(vec2(dFdx(field), dFdy(field)));
      float gap = abs(field - 0.4);
      float pixels = gap / max(slope, 1e-6);
      float halfBand = max(uRimWidth, 0.001) * 0.5;
      float across = max(gap / halfBand, pixels / uMaxHalf);
      float band = 5.0 * uRimWidth * (1.0 - across);
      float reveal = smoothstep(0.2, 0.85, pull);
      float shimmer = vn(p + dir * (t * spd * 0.5), 60.0, 12.0) * uShimmer * (1.0 - reveal * 0.75);
      float lit = clamp(band - shimmer, 0.0, 1.0);
      float glow = pow(lit, uSharpness) * uGlow * (1.0 + reveal * 0.25);
      float core = uLine > 0.0 ? smoothstep(uLine + 0.75, uLine - 0.75, pixels) * max(smoothstep(0.08, 0.6, glow), reveal) : 0.0;
      float shine = clamp(glow, 0.0, 1.0);
      float energy = max(shine * shine, core * 0.85) * uReveal;

      float h = clamp(0.5 + (peaks - peaks2) * 0.8, 0.0, 1.0);
      vec3 tint = palette(h);

      vec3 light = tint * energy * uOpacity;
      outColor = uOpaque > 0.5 ? vec4(uBackground + light, 1.0) : vec4(light, max(light.r, max(light.g, light.b)));
    }`;

    function compile(gl, type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, 'aPosition');
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    this.program = program;
    gl.useProgram(program);

    // Uniform locations lookup
    this.uniforms = {};
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) {
        this.uniforms[info.name.replace('[0]', '')] = gl.getUniformLocation(program, info.name);
      }
    }

    // Quad Buffer
    const buffer = gl.createBuffer();
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Dynamic state
    this.pointer = { x: 0, y: 0, inside: false };
    this.magnet = { x: 0, y: 0, active: 0 };
    this.swirl = { x: 0, y: 0, age: 10 };
    this.time = 0;
    this.reveal = this.settings.intro ? 0 : 1;
    this.last = 0;

    this.bindEvents();
    this.resize();
    this.startLoop();
  }

  bindEvents() {
    const locate = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ratio = this.canvas.width / Math.max(1, rect.width);
      this.pointer.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      this.pointer.x = x * ratio;
      this.pointer.y = (rect.height - y) * ratio;
    };

    window.addEventListener('pointermove', (e) => {
      const wasInside = this.pointer.inside;
      locate(e);
      if (this.pointer.inside && !wasInside && this.magnet.active < 0.05) {
        this.magnet.x = this.pointer.x;
        this.magnet.y = this.pointer.y;
      }
    }, { passive: true });

    window.addEventListener('pointerdown', (e) => {
      locate(e);
      if (!this.pointer.inside || !this.settings.clickSwirl) return;
      this.swirl.x = this.pointer.x;
      this.swirl.y = this.pointer.y;
      this.swirl.age = 0;
    }, { passive: true });

    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  resize() {
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  startLoop() {
    const gl = this.gl;
    const u = this.uniforms;
    const s = this.settings;

    const palette = new Float32Array(8 * 3);
    s.colors.forEach((col, idx) => {
      palette[idx * 3] = col[0];
      palette[idx * 3 + 1] = col[1];
      palette[idx * 3 + 2] = col[2];
    });

    const frame = (now) => {
      const dt = this.last ? Math.min((now - this.last) / 1000, 0.05) : 1 / 60;
      this.last = now;

      this.time += dt * 1.0;
      this.swirl.age += dt;

      if (this.reveal < 1) {
        this.reveal = Math.min(1, this.reveal + dt / 1.8);
      }

      const engaged = this.pointer.inside;
      const follow = s.mouseDampening > 0 ? 1 - Math.exp(-dt / s.mouseDampening) : 1;
      if (engaged) {
        this.magnet.x += (this.pointer.x - this.magnet.x) * follow;
        this.magnet.y += (this.pointer.y - this.magnet.y) * follow;
      }
      const target = engaged ? 1 : 0;
      this.magnet.active += (target - this.magnet.active) * (1 - Math.exp(-dt / 0.3));

      gl.useProgram(this.program);
      gl.bindVertexArray(this.vao);

      gl.uniform2f(u.uResolution, this.canvas.width, this.canvas.height);
      gl.uniform1f(u.uTime, this.time);
      gl.uniform2f(u.uFlow, s.flow[0], s.flow[1]);
      gl.uniform1f(u.uSpeed, s.speed);
      gl.uniform1f(u.uScale, s.scale);
      gl.uniform1f(u.uTurbulence, s.turbulence);
      gl.uniform1f(u.uFluidity, s.fluidity);
      gl.uniform1f(u.uRimWidth, s.rimWidth);
      gl.uniform1f(u.uSharpness, s.sharpness);
      gl.uniform1f(u.uShimmer, s.shimmer);
      gl.uniform1f(u.uGlow, s.glow);
      gl.uniform1f(u.uLine, s.lineWidth * (this.canvas.width / Math.max(1, this.container.clientWidth)) * 0.5);
      gl.uniform1f(u.uMaxHalf, 28 * (this.canvas.width / Math.max(1, this.container.clientWidth)));
      gl.uniform3fv(u.uColors, palette);
      gl.uniform1i(u.uColorCount, s.colors.length);
      gl.uniform4f(u.uMagnet, this.magnet.x, this.magnet.y, this.magnet.active * s.mouseStrength, s.mouseRadius);

      const age = this.swirl.age;
      const twist = 1.9 * Math.min(1, age / 0.23) * Math.exp(-Math.max(0, age - 0.23) * 1.1);
      gl.uniform4f(u.uSwirl, this.swirl.x, this.swirl.y, this.canvas.height * 0.22 * (1 + age * 0.5), age < 6 ? twist : 0);

      const intro = Math.min(1, this.reveal);
      gl.uniform1f(u.uReveal, intro * intro * (3 - 2 * intro));
      gl.uniform1f(u.uLight, 0);
      gl.uniform1f(u.uOpaque, s.transparent ? 0 : 1);
      gl.uniform3fv(u.uBackground, s.backgroundColor);
      gl.uniform1f(u.uOpacity, s.opacity);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }
}

window.FluxLinesEngine = FluxLinesEngine;
