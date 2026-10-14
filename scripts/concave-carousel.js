/**
 * CONCAVE CAROUSEL (3D Curved Gallery Wall)
 * A gallery wall that curves inward around the viewer
 * Implements cylindrical 3D trigonometry, inertial drag, and auto-drift
 */

class ConcaveCarousel {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.track = this.container.querySelector('.concave-cylinder-track');
    this.cards = Array.from(this.container.querySelectorAll('.concave-card-item'));
    if (!this.track || !this.cards.length) return;

    this.options = Object.assign({
      radius: 650,          // Distance from cylinder center
      cardWidth: 320,       // Base card width
      driftSpeed: 0.1,      // Continuous ambient rotation
      dragSensitivity: 0.35,// Drag response multiplier
      friction: 0.94        // Inertial deceleration
    }, options);

    this.count = this.cards.length;
    this.angleStep = 360 / this.count;
    this.currentRotation = 0;
    this.targetRotation = 0;
    this.velocity = 0;
    this.isDragging = false;
    this.startX = 0;
    this.previousX = 0;
    this.lastDelta = 0;

    this.init();
  }

  init() {
    // Arrange cards evenly around the cylinder
    this.cards.forEach((card, index) => {
      const angle = index * this.angleStep;
      // Concave cylinder: rotated around Y and pushed out by radius
      card.style.transform = `rotateY(${angle}deg) translateZ(${this.options.radius}px)`;
    });

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    const viewport = this.container.querySelector('.concave-stage-viewport');
    if (!viewport) return;

    // Pointer Drag handlers
    const startDrag = (clientX) => {
      this.isDragging = true;
      this.startX = clientX;
      this.previousX = clientX;
      this.velocity = 0;
    };

    const moveDrag = (clientX) => {
      if (!this.isDragging) return;
      const delta = clientX - this.previousX;
      this.previousX = clientX;
      this.lastDelta = delta;
      this.targetRotation += delta * this.options.dragSensitivity;
    };

    const endDrag = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.velocity = this.lastDelta * this.options.dragSensitivity * 0.8;
      this.lastDelta = 0;
    };

    viewport.addEventListener('mousedown', (e) => startDrag(e.clientX));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    window.addEventListener('mouseup', endDrag);

    // Touch support for mobile
    viewport.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchend', endDrag);

    // Controls
    const prevBtn = this.container.querySelector('.concave-prev-btn');
    const nextBtn = this.container.querySelector('.concave-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.targetRotation += this.angleStep;
        if (window.playHapticTone) window.playHapticTone(560, 'sine', 0.04, 0.02);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.targetRotation -= this.angleStep;
        if (window.playHapticTone) window.playHapticTone(640, 'sine', 0.04, 0.02);
      });
    }
  }

  render() {
    const loop = () => {
      // Natural drift when not interacting
      if (!this.isDragging) {
        if (Math.abs(this.velocity) > 0.01) {
          this.targetRotation += this.velocity;
          this.velocity *= this.options.friction;
        } else {
          this.targetRotation -= this.options.driftSpeed;
        }
      }

      // Smooth interpolation
      this.currentRotation += (this.targetRotation - this.currentRotation) * 0.1;

      // Apply 3D concave cylinder transform
      this.track.style.transform = `translateZ(-${this.options.radius * 0.85}px) rotateY(${this.currentRotation}deg)`;

      // Dynamic opacity & focus scaling based on angle relative to camera
      this.cards.forEach((card, index) => {
        const baseAngle = index * this.angleStep;
        const totalAngle = (baseAngle + this.currentRotation) % 360;
        const normalized = ((totalAngle + 540) % 360) - 180; // range -180 to 180

        // In front: near 0 degrees
        const distance = Math.abs(normalized);
        const visibility = Math.max(0.2, 1 - Math.pow(distance / 140, 1.5));
        card.style.opacity = Math.min(1, visibility + 0.15);
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}

window.ConcaveCarousel = ConcaveCarousel;
