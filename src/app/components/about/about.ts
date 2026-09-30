import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CountUpDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section-padding bg-dark-slate position-relative overflow-hidden">
      <div class="container">
        <div class="row align-items-center justify-content-between">
          <!-- Bio details card -->
          <div class="col-lg-6 mb-5 mb-lg-0" appScrollReveal [revealClass]="'reveal reveal-left'">
            <span class="text-uppercase text-gradient-cyan fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">About Me</span>
            <h2 class="display-5 fw-extrabold text-light mb-4">Crafting Scalable Modern Web Ecosystems</h2>
            <p class="text-muted font-body mb-4">
              I am a passionate Full-Stack Software Engineer focused on architecting modular web applications and real-time backend integrations. I combine powerful modern frontend paradigms like <strong>Angular</strong> and <strong>React</strong> with robust backends like <strong>Firebase</strong> and <strong>MongoDB</strong> to build production-grade platforms including <strong>E-Commerce Storefronts</strong>, <strong>Family Management Hubs</strong>, and real-time communication tools.
            </p>
            <p class="text-muted font-body mb-4">
              Whether designing Tiptap rich-text CMS publishing pipelines, managing stateful NgRx Signal stores, or optimizing database indexing schemas, I write elegant, performant, and maintainable code.
            </p>
            
            <!-- Interactive Dev Focus Badge Pills -->
            <div class="d-flex flex-wrap gap-2 mb-4">
              <span class="focus-pill"><i class="bi bi-cpu text-cyan me-1"></i> Systems Architecture</span>
              <span class="focus-pill"><i class="bi bi-lightning-charge text-warning me-1"></i> Real-time Sync</span>
              <span class="focus-pill"><i class="bi bi-palette text-secondary me-1"></i> Premium Motion UI</span>
            </div>

            <!-- Technologies List -->
            <div class="tech-list mb-4">
              <h6 class="small text-muted mb-2">Technologies</h6>
              <div class="d-flex flex-wrap gap-2">
                <span class="tech-pill">Frontend: Angular, React.js, HTML5, CSS3, JavaScript, Bootstrap, Tailwind CSS</span>
                <span class="tech-pill">Backend: Node.js, Express.js, REST APIs</span>
                <span class="tech-pill">Database: MongoDB, MySQL, Firebase</span>
                <span class="tech-pill">Full Stack: MERN, MEAN</span>
                <span class="tech-pill">Platforms: Linux, Ubuntu</span>
                <span class="tech-pill">Mobile / Hybrid: Ionic</span>
              </div>
            </div>

            <div class="d-flex align-items-center gap-3 mt-4">
              <a href="#contact" class="btn btn-glow-primary py-3 px-4">
                Get In Touch <i class="bi bi-arrow-right ms-1"></i>
              </a>
              <a href="#projects" class="btn btn-glass py-3 px-4">
                Explore Projects <i class="bi bi-folder2-open ms-1"></i>
              </a>
            </div>
          </div>
          
          <!-- Statistics Dashboard grid & Interactive Bio Widget -->
          <div class="col-lg-5" appScrollReveal [revealClass]="'reveal reveal-right'">
            <div class="row g-4 mb-4">
              <div class="col-6" *ngFor="let stat of stats; let i = index" 
                   appScrollReveal 
                   [revealClass]="'reveal reveal-scale reveal-delay-' + (i + 1)">
                <div class="glass-panel glass-card-hover p-4 text-center stat-card">
                  <div class="stat-icon mb-3">
                    <i [class]="stat.icon"></i>
                  </div>
                  <h3 class="display-6 fw-extrabold text-light mb-1 stat-value"
                      appCountUp 
                      [endValue]="stat.endValue" 
                      [suffix]="stat.suffix">0</h3>
                  <p class="text-muted font-body small mb-0 fw-medium">{{ stat.label }}</p>
                </div>
              </div>
            </div>
            
            <!-- Quick Quote Card with Ambient Glow -->
            <div class="glass-panel quote-card p-4 mt-4" appScrollReveal [revealClass]="'reveal reveal-flip'" [threshold]="0.1">
              <div class="d-flex gap-3 align-items-start">
                <i class="bi bi-quote fs-1 text-cyan quote-mark"></i>
                <div>
                  <p class="fst-italic text-light opacity-90 font-body mb-2 small">
                    "Writing code is not just about making things work, it is about crafting digital solutions that feel completely intuitive and performant."
                  </p>
                  <span class="text-gradient-primary fw-bold font-heading small">— Abhishek Patel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .letter-spacing-1 {
      letter-spacing: 0.1em;
    }
    
    .stat-card {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .stat-card:hover .stat-icon i {
      transform: scale(1.2) rotate(8deg);
    }

    .stat-icon {
      font-size: 2.3rem;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      transition: transform 0.3s ease;
    }

    .stat-value {
      text-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    }

    .focus-pill {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-glass);
      color: var(--color-text-muted);
      border-radius: 50px;
      padding: 6px 14px;
      font-size: 0.8rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .tech-pill {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.04);
      color: var(--color-text-muted);
      border-radius: 12px;
      padding: 6px 12px;
      font-size: 0.78rem;
      font-weight: 500;
      transition: all 0.18s ease;
    }

    .tech-pill:hover {
      background: rgba(99, 102, 241, 0.08);
      border-color: var(--color-primary);
      color: #fff;
      transform: translateY(-3px);
    }

    .focus-pill:hover {
      background: rgba(99, 102, 241, 0.12);
      border-color: var(--color-primary);
      color: #ffffff;
      transform: translateY(-2px);
    }

    .quote-card {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(99, 102, 241, 0.1) 100%) !important;
      border: 1px solid rgba(99, 102, 241, 0.25);
    }

    .quote-mark {
      line-height: 1;
      opacity: 0.8;
      transition: transform 0.3s ease;
    }

    .quote-card:hover .quote-mark {
      transform: scale(1.15) rotate(-5deg);
      color: var(--color-secondary) !important;
    }
  `]
})
export class AboutComponent {
  stats = [
    { endValue: 5, suffix: '+', label: 'Projects Built', icon: 'bi-rocket-takeoff' },
    { endValue: 3, suffix: '+', label: 'MVPs Launched', icon: 'bi-trophy' },
    { endValue: 100, suffix: '%', label: 'Clean Code', icon: 'bi-shield-check' },
    { endValue: 24, suffix: '/7', label: 'Tech Learner', icon: 'bi-cpu' }
  ];
}

