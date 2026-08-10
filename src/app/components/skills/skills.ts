import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Skill {
  name: string;
  level: number; // percentage
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative">
      <div class="container">
        <!-- Section Header -->
        <div class="row mb-5">
          <div class="col-12 text-center" appScrollReveal [revealClass]="'reveal reveal-scale'">
            <span class="text-uppercase text-gradient-cyan fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">Expertise</span>
            <h2 class="display-5 fw-extrabold text-light mb-3">Skills & Capabilities</h2>
            <div class="divider mx-auto"></div>
          </div>
        </div>

        <!-- Skills Grid Dashboard -->
        <div class="row g-4">
          <div class="col-lg-4" *ngFor="let category of skillCategories; let i = index" 
               appScrollReveal 
               [revealClass]="i === 0 ? 'reveal reveal-left' : (i === 2 ? 'reveal reveal-right' : 'reveal reveal-scale')">
            <div class="glass-panel skill-category-card p-4 h-100">
              <h3 class="h4 font-heading text-light border-bottom border-secondary-subtle pb-3 mb-4 d-flex align-items-center">
                <span class="category-indicator me-2"></span>
                {{ category.title }}
              </h3>
              
              <div class="skills-list d-flex flex-column gap-4">
                <div class="skill-item" *ngFor="let skill of category.skills; let sIdx = index" 
                     appScrollReveal 
                     [revealClass]="'reveal-item'"
                     [threshold]="0.05">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="font-body text-light d-flex align-items-center skill-name">
                      <i [class]="skill.icon + ' me-2 text-cyan skill-icon'"></i>
                      {{ skill.name }}
                    </span>
                    <span class="font-heading text-cyan small fw-bold skill-percentage">{{ skill.level }}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill" [style.--progress]="skill.level + '%'"></div>
                  </div>
                </div>
              </div>
            </div>
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
    
    .skill-category-card {
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .skill-category-card:hover {
      transform: translateY(-8px);
      border-color: rgba(6, 182, 212, 0.35);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.15);
    }

    .category-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--color-cyan);
      box-shadow: 0 0 10px var(--color-cyan);
      display: inline-block;
      animation: pulseDot 2s infinite alternate ease-in-out;
    }

    @keyframes pulseDot {
      0% { transform: scale(1); opacity: 0.7; }
      100% { transform: scale(1.3); opacity: 1; }
    }
    
    .text-cyan {
      color: var(--color-cyan);
    }

    .skill-item {
      transition: transform 0.25s ease;
    }

    .skill-item:hover {
      transform: translateX(4px);
    }

    .skill-icon {
      transition: transform 0.3s ease;
    }

    .skill-item:hover .skill-icon {
      transform: scale(1.25) rotate(10deg);
      color: var(--color-secondary) !important;
    }

    .skill-name {
      font-size: 0.95rem;
      font-weight: 500;
    }
    
    .progress-track {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    
    .progress-fill {
      width: 0;
      height: 100%;
      background: linear-gradient(90deg, var(--color-primary), var(--color-cyan), var(--color-secondary));
      background-size: 200% 100%;
      border-radius: 4px;
      position: relative;
      transition: width 1.6s cubic-bezier(0.1, 1, 0.1, 1);
    }

    /* Glowing tip at the edge of progress bar */
    .progress-fill::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 12px;
      background: #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 10px #ffffff, 0 0 15px var(--color-cyan);
      opacity: 0.9;
    }
    
    /* Reveal item trigger from ScrollReveal directive context */
    :host ::ng-deep .active .progress-fill {
      width: var(--progress);
    }

    .skills-list {
      perspective: 1000px;
    }
  `]
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'Angular Framework', level: 95, icon: 'bi-hexagon' },
        { name: 'React.js & Redux', level: 90, icon: 'bi-bezier2' },
        { name: 'TypeScript', level: 90, icon: 'bi-filetype-ts' },
        { name: 'JavaScript / ESNext', level: 92, icon: 'bi-filetype-js' },
        { name: 'HTML5 & CSS3', level: 90, icon: 'bi-code-slash' },
        { name: 'Bootstrap & Tailwind', level: 95, icon: 'bi-grid-fill' }
      ]
    },
    {
      title: 'Backend & Databases',
      skills: [
        { name: 'Firebase Firestore', level: 90, icon: 'bi-database-fill-gear' },
        { name: 'Firebase Auth & Hosting', level: 95, icon: 'bi-shield-lock-fill' },
        { name: 'Node.js & Express', level: 88, icon: 'bi-box-seam-fill' },
        { name: 'MongoDB', level: 90, icon: 'bi-database-check' },
        { name: 'PostgreSQL / SQL', level: 80, icon: 'bi-database' },
        { name: 'Laravel (PHP)', level: 75, icon: 'bi-diagram-3-fill' }
      ]
    },
    {
      title: 'Languages & Workflow',
      skills: [
        { name: 'C++ Programming', level: 85, icon: 'bi-file-code-fill' },
        { name: 'Git & Version Control', level: 90, icon: 'bi-git' },
        { name: 'Firebase CLI', level: 90, icon: 'bi-terminal-fill' },
        { name: 'Linting & Formatting', level: 85, icon: 'bi-check-all' }
      ]
    }
  ];
}

