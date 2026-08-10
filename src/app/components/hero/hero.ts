import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section d-flex align-items-center justify-content-center position-relative overflow-hidden">
      <!-- Background Ambient Grid & Radial Glow -->
      <div class="grid-overlay"></div>
      <div class="hero-radial-glow"></div>
      
      <!-- Floating Tech Stack Badges around Hero -->
      <div class="floating-tech-container d-none d-lg-block">
        <div class="floating-pill float-slow pill-1 glass-panel">
          <i class="bi bi-hexagon-fill text-cyan me-2"></i> Angular 21
        </div>
        <div class="floating-pill float-medium pill-2 glass-panel">
          <i class="bi bi-fire text-warning me-2"></i> Firebase Real-Time
        </div>
        <div class="floating-pill float-reverse pill-3 glass-panel">
          <i class="bi bi-filetype-ts text-primary me-2"></i> TypeScript
        </div>
        <div class="floating-pill float-slow pill-4 glass-panel">
          <i class="bi bi-cpu-fill text-secondary me-2"></i> Full-Stack Architecture
        </div>
      </div>

      <div class="container text-center position-relative z-2">
        <!-- 3D Holographic Avatar Card with Orbiting Ring Particles -->
        <div class="profile-container mb-4">
          <!-- Multi-Layer Glowing & Rotating Orbit Rings -->
          <div class="avatar-orbit-outer"></div>
          <div class="avatar-orbit-inner"></div>
          <div class="avatar-glow-ring"></div>
          <div class="pulse-ring"></div>
          <div class="pulse-ring ring-2"></div>
          
          <div class="profile-avatar glass-panel">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVNkDydmR-ep2CuQZl4cNxUaw3gzWTVFOylTrupdi2Xg&s=10" alt="Abhishek Patel Modern Developer Avatar" class="avatar-img" />
            <div class="avatar-glass-glare"></div>
          </div>

          <!-- Quick Floating Status Pill attached to Avatar -->
          <div class="avatar-status-badge">
            <span class="status-indicator-dot"></span>
            <span class="status-text">Available</span>
          </div>
        </div>

        <!-- Status Badge with Expanding Wave Pulse -->
        <div class="badge-container mb-3">
          <span class="status-badge glass-panel px-4 py-2 pulse-badge">
            <span class="pulse-dot"></span> Open to Roles & Collaborations
          </span>
        </div>

        <!-- Animated Heading -->
        <h1 class="display-3 fw-extrabold text-gradient-primary font-heading mb-3 hero-title">
          Hi, I'm Abhishek Patel
        </h1>
        
        <!-- Typewriter Subtitle -->
        <h2 class="h3 fw-medium font-body text-light opacity-90 mb-4">
          I build <span class="typing-text text-gradient-cyan">{{ currentText }}</span>
        </h2>
        
        <p class="lead text-muted mx-auto max-width-600 font-body mb-5">
          Full-Stack Developer specializing in robust web architectures, scalable server components, and responsive, interactive interfaces.
        </p>

        <!-- Interactive CTA Buttons -->
        <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-5">
          <a href="#projects" class="btn btn-glow-primary py-3 px-5 d-flex align-items-center">
            View My Work <i class="bi bi-arrow-right ms-2 fs-5 cta-icon"></i>
          </a>
          <a href="#contact" class="btn btn-glass py-3 px-5 d-flex align-items-center">
            Let's Talk <i class="bi bi-chat-dots ms-2 fs-5 cta-icon"></i>
          </a>
        </div>

        <!-- Micro Interactive Dev Terminal Pill -->
        <div class="dev-terminal-preview glass-panel mx-auto p-3 max-width-600 text-start">
          <div class="d-flex align-items-center justify-content-between border-bottom border-secondary-subtle pb-2 mb-2">
            <div class="d-flex gap-2">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="font-heading small text-muted">developer.config.ts</span>
          </div>
          <code class="font-body small text-cyan">
            <span class="text-purple">const</span> dev = &#123; name: <span class="text-emerald">'Abhishek Patel'</span>, leadProject: <span class="text-emerald">'E-Commerce & Family Hub 🚀'</span>, stack: <span class="text-emerald">'Angular 21 + Firebase'</span> &#125;;
          </code>
        </div>
      </div>
      
      <!-- Interactive Bottom Wave Transition -->
      <div class="wave-transition">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35C25.3,12.48,74.58,2,137.52,2,229.3,2,263.31,68.39,321.39,56.44Z" class="shape-fill"></path>
        </svg>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      padding-top: 140px;
      padding-bottom: 100px;
      background: radial-gradient(circle at 50% 30%, rgba(15, 23, 42, 0.4) 0%, var(--bg-deep-space) 95%);
    }

    .hero-radial-glow {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%);
      pointer-events: none;
      filter: blur(50px);
      z-index: 1;
    }

    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
      background-size: 55px 55px;
      pointer-events: none;
      z-index: 1;
    }

    /* Floating Tech Stack Badges */
    .floating-tech-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 2;
    }

    .floating-pill {
      position: absolute;
      padding: 11px 22px;
      border-radius: 50px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #ffffff;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-glass);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), var(--shadow-glow);
      pointer-events: auto;
      transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .floating-pill:hover {
      transform: scale(1.1) translateY(-6px) !important;
      border-color: var(--color-cyan);
      box-shadow: 0 15px 35px rgba(6, 182, 212, 0.3), var(--shadow-glow-cyan);
    }

    .pill-1 { top: 20%; left: 7%; }
    .pill-2 { top: 25%; right: 8%; }
    .pill-3 { bottom: 30%; left: 9%; }
    .pill-4 { bottom: 34%; right: 10%; }
    
    /* Modern 3D Avatar Profile Container */
    .profile-container {
      position: relative;
      width: 160px;
      height: 160px;
      margin: 0 auto;
    }

    .avatar-orbit-outer {
      position: absolute;
      inset: -16px;
      border-radius: 50%;
      border: 2px dashed rgba(6, 182, 212, 0.4);
      animation: orbitRotate 20s linear infinite;
    }

    .avatar-orbit-inner {
      position: absolute;
      inset: -10px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: var(--color-secondary);
      border-bottom-color: var(--color-cyan);
      animation: orbitRotateReverse 12s linear infinite;
    }

    .avatar-glow-ring {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-cyan), var(--color-primary), var(--color-secondary));
      filter: blur(16px);
      opacity: 0.8;
      animation: spinGlow 10s linear infinite;
    }
    
    .profile-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 3;
      border: 3px solid rgba(255, 255, 255, 0.25);
      background: linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95));
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), var(--shadow-glow);
      overflow: hidden;
    }

    .avatar-glass-glare {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2) 0%,
        transparent 40%,
        transparent 100%
      );
      pointer-events: none;
      z-index: 4;
    }
    
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .profile-avatar:hover .avatar-img {
      transform: scale(1.12) rotate(3deg);
    }

    /* Floating Status Pill on Avatar */
    .avatar-status-badge {
      position: absolute;
      bottom: -4px;
      right: 0;
      z-index: 5;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid var(--color-accent);
      backdrop-filter: blur(12px);
      border-radius: 50px;
      padding: 3px 10px;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
    }

    .status-indicator-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-accent);
      box-shadow: 0 0 10px var(--color-accent);
      animation: dotPulse 2s infinite ease-in-out;
    }

    .status-text {
      font-size: 0.72rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    .pulse-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid var(--color-primary);
      border-radius: 50%;
      opacity: 0.6;
      animation: pulseAnim 3.5s infinite ease-out;
      z-index: 1;
    }

    .ring-2 {
      animation-delay: 1.75s;
      border-color: var(--color-cyan);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      border-radius: 50px;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--color-text-light);
      border: 1px solid var(--border-glass);
      background: rgba(15, 23, 42, 0.7);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      transition: all 0.35s ease;
    }

    .status-badge:hover {
      color: #ffffff;
      border-color: var(--color-cyan);
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
    }

    .pulse-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--color-accent);
      box-shadow: 0 0 14px var(--color-accent);
      animation: dotPulse 2s infinite ease-in-out;
    }
    
    .max-width-600 {
      max-width: 600px;
    }

    .hero-title {
      letter-spacing: -0.03em;
      text-shadow: 0 10px 35px rgba(0, 0, 0, 0.6);
    }
    
    .typing-text {
      border-right: 2px solid var(--color-cyan);
      white-space: nowrap;
      animation: blinkCursor 0.75s step-end infinite;
      padding-right: 4px;
    }

    .cta-icon {
      transition: transform 0.3s ease;
    }

    .btn-glow-primary:hover .cta-icon,
    .btn-glass:hover .cta-icon {
      transform: translateX(5px);
    }

    /* Dev Terminal Box */
    .dev-terminal-preview {
      background: rgba(11, 15, 25, 0.88) !important;
      border: 1px solid var(--border-glass);
      border-radius: 14px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);
      transition: transform 0.35s ease, border-color 0.35s ease;
    }

    .dev-terminal-preview:hover {
      transform: translateY(-5px);
      border-color: var(--color-cyan);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), var(--shadow-glow-cyan);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }
    .dot.red { background: #ef4444; }
    .dot.yellow { background: #f59e0b; }
    .dot.green { background: #10b981; }

    .text-purple { color: var(--color-secondary); }
    .text-emerald { color: var(--color-accent); }
    .text-cyan { color: var(--color-cyan); }

    .wave-transition {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
      transform: rotate(180deg);
      z-index: 2;
    }

    .wave-transition svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 60px;
    }

    .wave-transition .shape-fill {
      fill: var(--bg-slate);
    }

    [data-theme="light"] .floating-pill {
      color: #0f172a;
      background: rgba(255, 255, 255, 0.92);
      border-color: rgba(203, 213, 225, 0.8);
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
    }

    [data-theme="light"] .dev-terminal-preview {
      background: rgba(255, 255, 255, 0.95) !important;
      border-color: rgba(203, 213, 225, 0.8);
      box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
    }

    [data-theme="light"] .profile-avatar {
      background: linear-gradient(145deg, #ffffff, #f1f5f9);
      border-color: rgba(203, 213, 225, 0.8);
      box-shadow: 0 15px 35px rgba(15, 23, 42, 0.1);
    }

    [data-theme="light"] .avatar-status-badge {
      background: rgba(255, 255, 255, 0.95);
    }

    [data-theme="light"] .status-text {
      color: #0f172a;
    }

    [data-theme="light"] .status-badge {
      background: rgba(255, 255, 255, 0.9);
      border-color: rgba(203, 213, 225, 0.8);
      color: #0f172a;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
    }

    /* Keyframe Animations */
    @keyframes orbitRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes orbitRotateReverse {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }

    @keyframes spinGlow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes pulseAnim {
      0% { transform: scale(0.95); opacity: 0.85; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    @keyframes dotPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.5; }
    }

    @keyframes blinkCursor {
      from, to { border-color: transparent }
      50% { border-color: var(--color-cyan); }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  phrases = [
    'E-Commerce & Retail Stores',
    'Family Management Platforms',
    'Angular 21 & Firebase Apps',
    'Real-Time Chat Applications'
  ];

  currentText = '';
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: any;

  ngOnInit() {
    this.tick();
  }

  tick() {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.currentText = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentText = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delta = 100 - Math.random() * 40;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      delta = 1800; // Stay static on completed phrase
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      delta = 500; // Pause before typing next phrase
    }

    this.timer = setTimeout(() => this.tick(), delta);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}


