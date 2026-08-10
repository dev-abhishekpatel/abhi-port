import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative overflow-hidden" id="education">
      <div class="container">
        <div class="text-center mb-5" appScrollReveal [revealClass]="'reveal reveal-fade'">
          <span class="text-uppercase text-gradient-primary fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">My Journey</span>
          <h2 class="display-5 fw-extrabold text-light mb-3">Education</h2>
          <div class="divider mx-auto mb-4"></div>
          <p class="text-muted font-body mx-auto" style="max-width: 600px;">
            Academic qualifications and professional certifications that have shaped my technical foundation.
          </p>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="education-timeline position-relative">
              
              <div *ngFor="let item of educationList; let i = index" 
                   class="edu-item position-relative mb-5 ps-5" 
                   appScrollReveal 
                   [revealClass]="'reveal reveal-left reveal-delay-' + (i + 1)">
                
                <!-- Timeline Dot -->
                <div class="timeline-dot position-absolute bg-primary rounded-circle border border-3 border-dark" 
                     style="left: 6px; top: 0; width: 16px; height: 16px; z-index: 2;"></div>
                
                <div class="glass-panel p-4 rounded-4 hover-lift">
                  <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
                    <h4 class="text-light fw-bold m-0">{{ item.degree }}</h4>
                    <span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 py-2 px-3 mt-2 mt-md-0">
                      {{ item.period }}
                    </span>
                  </div>
                  <h5 class="text-cyan fw-medium mb-3">{{ item.institution }}</h5>
                  <p class="text-muted font-body mb-0">{{ item.description }}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .education-timeline::before {
      content: '';
      position: absolute;
      left: 13px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, var(--color-primary) 0%, rgba(99, 102, 241, 0.1) 100%);
      z-index: 1;
    }
    
    .divider {
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      border-radius: 2px;
    }

    .hover-lift {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(99, 102, 241, 0.2);
    }
  `]
})
export class EducationComponent {
  educationList = [
    {
      degree: 'MERN Stack Development (6-Month Training)',
      institution: 'The Stepping Stone Institute, Indore',
      period: '2025',
      description: 'Intensive hands-on professional course focused on building full-stack web applications using MongoDB, Express.js, React.js, and Node.js.'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Makhanlal Chaturvedi National University, Bhopal',
      period: '2022 - 2025',
      description: 'Graduated with a score of 8.5 SGPA. Focused on computer applications, programming paradigms, and software development methodologies.'
    },
    {
      degree: 'Class XII (Higher Secondary)',
      institution: 'MP Board of Secondary Education',
      period: '2020 - 2022',
      description: 'Completed higher secondary education in Science & Mathematics with 63%.'
    },
    {
      degree: 'Class X (Secondary School)',
      institution: 'MP Board of Secondary Education',
      period: '2018 - 2020',
      description: 'Completed secondary school certification with 66%.'
    }
  ];
}
