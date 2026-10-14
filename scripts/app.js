/**
 * ALPHA ENTREPRENEURSHIP SUMMIT (AES) — INTERACTIVE ENGINE
 * High-End Motion Choreography · Hardware Fluid Mechanics · Zero Jitter
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioHaptics();
  initCustomCursor();
  initScrollProgress();
  initNavbarBehavior();
  initHeroCanvas();
  initCountdownTimer();
  initScrollObserver();
  initPitchArena();
  initSpeakersFilterAndModal();
  initAgendaSwitcher();
  initTicketConfigurator();
  initFaqAccordion();
  initRegistrationModal();
  initNewsletter();
});

/* ==========================================================================
   1. LUXURY HAPTIC AUDIO ENGINE (Web Audio API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioHaptics() {
  const toggleBtn = document.getElementById('audio-toggle');
  const soundIcon = document.getElementById('sound-icon');

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  window.playHapticTone = function(freq = 440, type = 'sine', duration = 0.05, gainLevel = 0.03) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.85, ctx.currentTime + duration);

      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundIcon) {
        soundIcon.innerHTML = soundEnabled 
          ? `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`
          : `<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
      }
      playHapticTone(soundEnabled ? 680 : 320, 'sine', 0.08, 0.05);
      showToast(soundEnabled ? 'Tactile Audio: Enabled' : 'Tactile Audio: Muted');
    });
  }

  // Bind subtle tactile tone to interactive elements
  document.querySelectorAll('button, a, .pitch-track-card, .filter-tab, .day-tab-btn, .faq-question-btn').forEach(el => {
    el.addEventListener('mouseenter', () => playHapticTone(520, 'triangle', 0.02, 0.015));
    el.addEventListener('click', () => playHapticTone(740, 'sine', 0.04, 0.04));
  });
}

/* ==========================================================================
   2. MAGNETIC INTERACTIVE CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const follower = document.querySelector('.cursor-follower');
  if (!dot || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const hoverTargets = document.querySelectorAll('a, button, .bezel-shell, .pitch-track-card, .speaker-card, input, select');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });
}

/* ==========================================================================
   3. SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      bar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* ==========================================================================
   4. NAVBAR SCROLL ELEVATION & HAMBURGER MORPH
   ========================================================================== */
function initNavbarBehavior() {
  const islandWrap = document.querySelector('.nav-island-wrapper');
  const hamburger = document.getElementById('hamburger-toggle');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      islandWrap?.classList.add('nav-scrolled');
    } else {
      islandWrap?.classList.remove('nav-scrolled');
    }
  }, { passive: true });

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('hamburger-active');
      mobileOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('hamburger-active');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   5. HERO ARCHITECTURAL PARTICLES & CONSTELLATION CANVAS
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, active: false };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  // Nodes pool
  const nodeCount = Math.min(Math.floor(width / 24), 65);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.3
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse gentle repulsion
      if (mouse.active) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          n.x += Math.cos(angle) * 1.5;
          n.y += Math.sin(angle) * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(234, 224, 211, ${n.alpha})`;
      ctx.fill();

      // Connect proximal nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dX = n.x - n2.x;
        const dY = n.y - n2.y;
        const distance = Math.sqrt(dX * dX + dY * dY);

        if (distance < 110) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          const lineAlpha = (1 - distance / 110) * 0.18;
          ctx.strokeStyle = `rgba(165, 138, 122, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

/* ==========================================================================
   6. LIVE SUMMIT COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const countDays = document.getElementById('count-days');
  const countHours = document.getElementById('count-hours');
  const countMins = document.getElementById('count-mins');
  const countSecs = document.getElementById('count-secs');

  // Target: November 12, 2026 09:00:00 PST
  const summitDate = new Date('2026-11-12T09:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const diff = summitDate - now;

    if (diff <= 0) {
      if (countDays) countDays.textContent = '00';
      if (countHours) countHours.textContent = '00';
      if (countMins) countMins.textContent = '00';
      if (countSecs) countSecs.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (countDays) countDays.textContent = String(days).padStart(2, '0');
    if (countHours) countHours.textContent = String(hours).padStart(2, '0');
    if (countMins) countMins.textContent = String(mins).padStart(2, '0');
    if (countSecs) countSecs.textContent = String(secs).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   7. STAGGERED SCROLL REVEALS (IntersectionObserver)
   ========================================================================== */
function initScrollObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.08}s`;
    observer.observe(el);
  });
}

/* ==========================================================================
   8. INTERACTIVE PITCH ARENA SIMULATOR
   ========================================================================== */
const arenaTrackData = [
  {
    name: 'Autonomous AI & Spatial Agents',
    tag: 'Seed Track A',
    venture: 'SynapseScale',
    founder: 'Elena Rostova · Ex-OpenAI Robotics',
    valuation: '$48M',
    target: '$6.0M',
    metric1: '+380%',
    metric1Desc: 'MoM Inference Volume',
    metric2: '42ms',
    metric2Desc: 'Edge Reaction Latency',
    syndicatePercent: 88,
    syndicateRaised: '$5.28M / $6.0M',
    summary: 'Decentralized spatial memory and multi-agent coordination architecture for next-gen manufacturing and embodied robots.'
  },
  {
    name: 'Modular Clean Fusion & Deep Energy',
    tag: 'HardTech Track B',
    venture: 'Helios Kinetics',
    founder: 'Dr. Clara Vance · MIT Plasma Lab',
    valuation: '$95M',
    target: '$14.0M',
    metric1: '14.2x',
    metric1Desc: 'Net Energy Density Gain',
    metric2: '$0.02',
    metric2Desc: 'Est. LCOE per kWh',
    syndicatePercent: 74,
    syndicateRaised: '$10.36M / $14.0M',
    summary: 'Magnetic confinement micro-reactors delivering zero-emission dispatchable baseload power for planetary compute datacenters.'
  },
  {
    name: 'Quantum-Resistant DeFi Infrastructure',
    tag: 'Fintech Track C',
    venture: 'CipherVault Protocol',
    founder: 'David Lindqvist · Stockholm Unicorn Founder',
    valuation: '$35M',
    target: '$4.5M',
    metric1: '280,000',
    metric1Desc: 'Transactions Per Second',
    metric2: 'Zero-Knowledge',
    metric2Desc: 'Lattice Cryptography',
    syndicatePercent: 92,
    syndicateRaised: '$4.14M / $4.5M',
    summary: 'Sub-millisecond institutional settlement network impervious to Shor’s algorithm and state-level cryptographic cryptanalysis.'
  },
  {
    name: 'Synthetic Biology & Cellular Longevity',
    tag: 'BioTech Track D',
    venture: 'Telomere Bioworks',
    founder: 'Marcus Chen · Stanford Bio-X Fellow',
    valuation: '$70M',
    target: '$9.0M',
    metric1: 'Phase IIa',
    metric1Desc: 'In-Vivo Human Clinicals',
    metric2: '89.4%',
    metric2Desc: 'Mitochondrial Rejuvenation',
    syndicatePercent: 65,
    syndicateRaised: '$5.85M / $9.0M',
    summary: 'Epigenetic reprogramming therapeutics targeting senescent stem cell renewal and systemic age-reversal biological pathways.'
  }
];

function initPitchArena() {
  const trackCards = document.querySelectorAll('.pitch-track-card');
  const ventureTitle = document.getElementById('arena-venture-title');
  const ventureFounder = document.getElementById('arena-venture-founder');
  const metric1Digit = document.getElementById('arena-metric1-digit');
  const metric1Desc = document.getElementById('arena-metric1-desc');
  const metric2Digit = document.getElementById('arena-metric2-digit');
  const metric2Desc = document.getElementById('arena-metric2-desc');
  const metricValuation = document.getElementById('arena-metric-val');
  const syndicateBar = document.getElementById('arena-syndicate-bar');
  const syndicateLabel = document.getElementById('arena-syndicate-raised');
  const syndicatePercentText = document.getElementById('arena-syndicate-percent');
  const summaryText = document.getElementById('arena-summary');

  function renderTrack(index) {
    const data = arenaTrackData[index];
    if (!data) return;

    trackCards.forEach((c, idx) => c.classList.toggle('active', idx === index));

    if (ventureTitle) ventureTitle.textContent = data.venture;
    if (ventureFounder) ventureFounder.textContent = data.founder;
    if (metric1Digit) metric1Digit.textContent = data.metric1;
    if (metric1Desc) metric1Desc.textContent = data.metric1Desc;
    if (metric2Digit) metric2Digit.textContent = data.metric2;
    if (metric2Desc) metric2Desc.textContent = data.metric2Desc;
    if (metricValuation) metricValuation.textContent = data.valuation;
    if (summaryText) summaryText.textContent = data.summary;

    if (syndicateBar) syndicateBar.style.width = `${data.syndicatePercent}%`;
    if (syndicateLabel) syndicateLabel.textContent = data.syndicateRaised;
    if (syndicatePercentText) syndicatePercentText.textContent = `${data.syndicatePercent}% Committed`;

    if (window.playHapticTone) window.playHapticTone(600 + index * 40, 'triangle', 0.05, 0.03);
  }

  trackCards.forEach((card, i) => {
    card.addEventListener('click', () => renderTrack(i));
  });

  // Interactive Syndicate Slider
  const slider = document.getElementById('syndicate-slider');
  const sliderVal = document.getElementById('slider-allocation-value');
  const equityVal = document.getElementById('slider-equity-value');

  if (slider && sliderVal && equityVal) {
    slider.addEventListener('input', (e) => {
      const amount = parseInt(e.target.value, 10);
      sliderVal.textContent = `$${amount.toLocaleString()}`;
      const activeIdx = Array.from(trackCards).findIndex(c => c.classList.contains('active'));
      const rawValuation = parseFloat(arenaTrackData[activeIdx || 0].valuation.replace(/[^0-9.]/g, '')) * 1000000;
      const equity = ((amount / rawValuation) * 100).toFixed(2);
      equityVal.textContent = `~${equity}% Equity / SAFE Allocation`;
    });
  }
}

/* ==========================================================================
   9. SPEAKERS FILTER & INTERACTIVE DOSSIER MODAL
   ========================================================================== */
const speakersData = [
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'General Partner · Apex Horizon Capital',
    track: 'vc',
    topic: 'Frontier AI Moats: What We Are Funding in 2027',
    image: 'assets/speaker_elena.jpg',
    bio: 'Elena has deployed over $650M into deeptech and robotics startups across Silicon Valley and Europe. Former head of autonomous systems at DeepMind, her investments include 6 decacorns.',
    keynoteTime: 'Day 1 · 10:15 AM · Grand Auditorium A'
  },
  {
    id: 'marcus',
    name: 'Marcus Chen',
    role: 'Founder & CEO · Omnispatial AI',
    track: 'founder',
    topic: 'Zero to $100M ARR in 18 Months: The Agentic Playbook',
    image: 'assets/speaker_marcus.jpg',
    bio: 'Marcus scaled Omnispatial from a dorm prototype into the industry standard neural agent backbone powering enterprise Fortune 500 workflows. Forbes 30 Under 30 Hall of Fame.',
    keynoteTime: 'Day 2 · 09:30 AM · Stage Apex'
  },
  {
    id: 'clara',
    name: 'Dr. Clara Vance',
    role: 'Chief Scientist · NeuroKinetics',
    track: 'ai',
    topic: 'Biomimetic Systems & Embodied Physical Intelligence',
    image: 'assets/speaker_clara.jpg',
    bio: 'Pioneer of high-degree-of-freedom synthetic neuromuscular actuators. Recipient of the IEEE Pioneer Award and advisor to national advanced computing councils.',
    keynoteTime: 'Day 1 · 02:00 PM · DeepTech Hall 1'
  },
  {
    id: 'david',
    name: 'David Lindqvist',
    role: 'Co-Founder & Executive Chair · VaultScale',
    track: 'keynote',
    topic: 'The Sovereign Balance Sheet: Navigating Global Liquidity',
    image: 'assets/speaker_david.jpg',
    bio: 'Serial Scandinavian fintech architect behind three tier-one financial primitives. Angel investor in over 40 fintech and DeFi infrastructure networks globally.',
    keynoteTime: 'Day 3 · 11:00 AM · Grand Auditorium A'
  }
];

function initSpeakersFilterAndModal() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.speaker-card');

  // Filter tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter || (filter === 'keynote' && card.dataset.keynote === 'true')) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Dossier Trigger
  const modal = document.getElementById('speaker-modal');
  const modalName = document.getElementById('modal-speaker-name');
  const modalRole = document.getElementById('modal-speaker-role');
  const modalTopic = document.getElementById('modal-speaker-topic');
  const modalBio = document.getElementById('modal-speaker-bio');
  const modalTime = document.getElementById('modal-speaker-time');
  const modalImg = document.getElementById('modal-speaker-img');
  const closeBtn = document.getElementById('close-speaker-modal');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-speaker-id');
      const speaker = speakersData.find(s => s.id === id);
      if (!speaker || !modal) return;

      modalName.textContent = speaker.name;
      modalRole.textContent = speaker.role;
      modalTopic.textContent = speaker.topic;
      modalBio.textContent = speaker.bio;
      modalTime.textContent = speaker.keynoteTime;
      modalImg.src = speaker.image;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (window.playHapticTone) window.playHapticTone(720, 'sine', 0.06, 0.04);
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   10. INTERACTIVE 3-DAY AGENDA ACCORDION
   ========================================================================== */
function initAgendaSwitcher() {
  const dayTabs = document.querySelectorAll('.day-tab-btn');
  const dayContainers = document.querySelectorAll('.agenda-day-content');
  const sessionItems = document.querySelectorAll('.session-item');

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetDay = tab.getAttribute('data-day');
      dayContainers.forEach(container => {
        container.style.display = (container.getAttribute('data-day') === targetDay) ? 'block' : 'none';
      });

      if (window.playHapticTone) window.playHapticTone(580, 'sine', 0.04, 0.02);
    });
  });

  // Accordion drawer expansion
  sessionItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.bookmark-btn')) return; // ignore bookmark button clicks
      item.classList.toggle('expanded');
    });

    const bookmarkBtn = item.querySelector('.bookmark-btn');
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isBookmarked = bookmarkBtn.classList.toggle('bookmarked');
        bookmarkBtn.textContent = isBookmarked ? '★ Saved' : '+ Save';
        bookmarkBtn.style.color = isBookmarked ? 'var(--c-accent-gold)' : '';
        showToast(isBookmarked ? 'Session bookmarked to your itinerary' : 'Removed from itinerary');
      });
    }
  });
}

/* ==========================================================================
   11. PASS CONFIGURATOR & REAL-TIME TICKET CALCULATOR
   ========================================================================== */
function initTicketConfigurator() {
  let basePrice = 499;
  const passButtons = document.querySelectorAll('.select-tier-btn');
  const addOnCheckboxes = document.querySelectorAll('.addon-checkbox');
  const totalDisplay = document.getElementById('ticket-total-calc');
  const regModal = document.getElementById('registration-modal');
  const regTierSelect = document.getElementById('reg-tier-select');

  function calculateTotal() {
    let addOns = 0;
    addOnCheckboxes.forEach(cb => {
      if (cb.checked) {
        addOns += parseInt(cb.getAttribute('data-price') || '0', 10);
      }
    });
    const finalTotal = basePrice + addOns;
    if (totalDisplay) {
      totalDisplay.textContent = `$${finalTotal.toLocaleString()}`;
    }
  }

  passButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tier = btn.getAttribute('data-tier') || 'Founder Pass';
      basePrice = parseInt(btn.getAttribute('data-price') || '499', 10);
      calculateTotal();

      if (regModal && regTierSelect) {
        regTierSelect.value = tier;
        regModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  addOnCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateTotal);
  });
}

/* ==========================================================================
   12. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
}

/* ==========================================================================
   13. REGISTRATION MODAL & APPLICATION WORKFLOW
   ========================================================================== */
function initRegistrationModal() {
  const modal = document.getElementById('registration-modal');
  const closeBtn = document.getElementById('close-reg-modal');
  const openButtons = document.querySelectorAll('.open-register-trigger');
  const form = document.getElementById('summit-registration-form');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.playHapticTone) window.playHapticTone(700, 'sine', 0.05, 0.04);
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Keyboard escape handler
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      modal.classList.remove('open');
      document.body.style.overflow = '';
      showToast('🎉 Application Received! Check your inbox for pass confirmation.');
      if (window.playHapticTone) window.playHapticTone(880, 'sine', 0.15, 0.06);
      form.reset();
    });
  }
}

/* ==========================================================================
   14. NEWSLETTER & TOAST NOTIFICATION UTILITIES
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        showToast('✓ Subscribed to Alpha Summit Intel briefings');
        input.value = '';
        if (window.playHapticTone) window.playHapticTone(750, 'sine', 0.08, 0.04);
      }
    });
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color:var(--c-accent-emerald);font-size:1.1rem;">●</span> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}
