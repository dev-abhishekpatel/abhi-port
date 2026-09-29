import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative">
      <div class="container">
        <!-- Title -->
        <div class="row mb-5">
          <div class="col-12 text-center" appScrollReveal [revealClass]="'reveal reveal-scale'">
            <span class="text-uppercase text-gradient-cyan fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">Milestones</span>
            <h2 class="display-5 fw-extrabold text-light mb-3">Developer Journey</h2>
            <div class="divider mx-auto"></div>
          </div>
        </div>

        <!-- Vertical Timeline Container -->
        <div class="timeline-container py-4">
          <div class="timeline-line"></div>
          
          <div class="row g-0 timeline-row align-items-center mb-5" 
               *ngFor="let item of timelineEvents; let idx = index; let isOdd = odd; let isEven = even"
               appScrollReveal
               [revealClass]="isEven ? 'reveal reveal-left' : 'reveal reveal-right'"
               [threshold]="0.1">
            
            <!-- Left Side / Right Side placement based on index -->
            <div class="col-lg-5" [ngClass]="isOdd ? 'order-lg-3' : 'order-lg-1 text-lg-end'">
              <div class="glass-panel p-4 timeline-card border-glow">
                <span class="badge bg-primary-gradient mb-2 font-heading year-badge">{{ item.year }}</span>
                <h3 class="h5 font-heading text-light mb-1">{{ item.title }}</h3>
                <h6 class="text-cyan font-heading small mb-3 fw-semibold">{{ item.company }}</h6>
                <p class="text-muted font-body small mb-4 opacity-90">{{ item.description }}</p>
                
                <div class="d-flex flex-wrap gap-2 justify-content-start" [ngClass]="{'justify-content-lg-end': isEven}">
                  <span class="timeline-tag" *ngFor="let s of item.skills">{{ s }}</span>
                </div>
              </div>
            </div>
            
            <!-- Center Circle Node -->
            <div class="col-lg-2 order-lg-2 d-none d-lg-flex justify-content-center">
              <div class="timeline-node">
                <i [class]="item.icon"></i>
              </div>
            </div>
            
            <!-- Placeholder to balance the row layout -->
            <div class="col-lg-5 order-lg-3" *ngIf="isEven"></div>
            <div class="col-lg-5 order-lg-1" *ngIf="isOdd"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .divider {
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      border-radius: 2px;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
    }

    .timeline-container {
      position: relative;
      max-width: 920px;
      margin: 0 auto;
    }

    .timeline-line {
      position: absolute;
      width: 3px;
      background: linear-gradient(180deg, var(--color-primary), var(--color-cyan), var(--color-secondary), transparent);
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0.45;
      box-shadow: 0 0 12px var(--color-primary);
    }

    .timeline-node {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bg-card);
      backdrop-filter: blur(8px);
      border: 3px solid var(--color-primary);
      color: var(--color-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      z-index: 10;
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
    }

    .timeline-node i {
      transition: transform 0.3s ease;
    }

    .timeline-row:hover .timeline-node {
      border-color: var(--color-secondary);
      color: var(--color-secondary);
      box-shadow: 0 0 25px rgba(217, 70, 239, 0.7);
      transform: scale(1.15) translateY(-5px);
    }

    .timeline-card {
      position: relative;
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s ease;
    }

    .timeline-card:hover {
      border-color: var(--color-primary);
      box-shadow: var(--shadow-glow), 0 10px 30px rgba(0, 0, 0, 0.4);
      transform: translateY(-5px);
    }

    .year-badge {
      transition: transform 0.25s ease;
      display: inline-block;
    }

    .timeline-card:hover .year-badge {
      transform: scale(1.05);
    }

    .bg-primary-gradient {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      font-weight: 600;
      border: none;
      font-size: 0.8rem;
      padding: 6px 12px;
      border-radius: 50px;
    }

    .timeline-tag {
      background: rgba(15, 23, 42, 0.2);
      border: 1px solid var(--border-glass);
      color: var(--color-text-muted);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.78rem;
      font-family: var(--font-heading);
      transition: all 0.25s ease;
    }

    .timeline-tag:hover {
      background: rgba(6, 182, 212, 0.12);
      border-color: var(--color-cyan);
      color: var(--color-text-light);
      transform: translateY(-2px);
    }

    .text-cyan {
      color: var(--color-cyan);
    }

    @media (max-width: 991px) {
      .timeline-line {
        left: 20px;
        transform: none;
      }

      .timeline-node {
        display: none;
      }
      
      .timeline-row {
        margin-left: 40px;
      }
      
      .timeline-row .col-lg-5 {
        width: 100%;
        text-align: left !important;
      }
      
      .justify-content-lg-end {
        justify-content: flex-start !important;
      }
    }
  `]
})
export class ExperienceComponent {
  timelineEvents: TimelineEvent[] = [
    {
      year: '2026 - Present',
      title: 'Full-Stack Software Engineer',
      company: 'Client & Enterprise Web Apps',
      description: 'Engineering enterprise-level web applications, e-commerce storefronts, and modular dashboard interfaces. Restructuring forms to Angular FormBuilder configurations, compiling custom templates, and implementing secure database collection rules.',
      icon: 'bi-briefcase-fill',
      skills: ['Angular 21', 'TypeScript', 'FormBuilder', 'Firebase Rules', 'E-Commerce', 'Family Hub']
    },
    {
      year: '2025',
      title: 'Full-Stack Angular Projects',
      company: 'Self-Directed / GitHub Open Source',
      description: 'Built Mini-whatsapp, a direct real-time chat application clone using Angular standalone architectures and Firebase. Handled media attachment uploads, session caching, and live messaging streams.',
      icon: 'bi-code-square',
      skills: ['Angular', 'Cloud Firestore', 'Firebase Auth', 'RxJS', 'Base64 Encoding']
    },
    {
      year: '2024',
      title: 'Core Programming & Algorithmic Games',
      company: 'Academic & Personal Projects',
      description: 'Dived into C++ development, object-oriented concepts, and computational graphics. Built an interactive Brick Breaker game using OpenGL rendering pipes.',
      icon: 'bi-cpu-fill',
      skills: ['C++', 'OpenGL', 'Data Structures', 'Git', 'Software Engineering Core']
    }
  ];
}

