import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section-padding bg-dark-slate position-relative overflow-hidden" id="services">
      <div class="container">
        <div class="text-center mb-5" appScrollReveal [revealClass]="'reveal reveal-fade'">
          <span class="text-uppercase text-gradient-secondary fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">What I Do</span>
          <h2 class="display-5 fw-extrabold text-light mb-3">My Services</h2>
          <div class="divider mx-auto mb-4"></div>
          <p class="text-muted font-body mx-auto" style="max-width: 600px;">
            Leveraging modern web technologies to deliver performant, scalable, and visually stunning digital solutions.
          </p>
        </div>

        <div class="row g-4 justify-content-center">
          <div *ngFor="let service of services; let i = index" 
               class="col-md-6 col-lg-4" 
               appScrollReveal 
               [revealClass]="'reveal reveal-up reveal-delay-' + (i % 3 + 1)">
            <div class="glass-panel p-5 text-center h-100 service-card">
              <div class="service-icon-wrapper mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi fs-1 text-light service-icon" [ngClass]="service.icon"></i>
              </div>
              <h4 class="text-light fw-bold mb-3">{{ service.title }}</h4>
              <p class="text-muted font-body mb-0">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .divider {
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
      border-radius: 2px;
    }
    
    .service-icon-wrapper {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2));
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.4s ease;
    }
    
    .service-card {
      transition: all 0.4s ease;
    }
    
    .service-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), 0 0 20px rgba(236, 72, 153, 0.15);
    }
    
    .service-card:hover .service-icon-wrapper {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      transform: scale(1.1) rotate(5deg);
    }
    
    .service-icon {
      transition: all 0.3s ease;
    }
  `]
})
export class ServicesComponent {
  services = [
    {
      title: 'Frontend Development',
      icon: 'bi-window-sidebar',
      description: 'Building responsive, accessible, and high-performance user interfaces using Angular and modern CSS.'
    },
    {
      title: 'Backend & Firebase',
      icon: 'bi-cloud-check',
      description: 'Designing scalable NoSQL databases, writing secure Cloud Functions, and managing serverless infrastructure.'
    },
    {
      title: 'UI/UX Implementation',
      icon: 'bi-palette',
      description: 'Translating Figma designs into pixel-perfect, interactive web applications with smooth micro-animations.'
    }
  ];
}
