import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Project {
  category?: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  tags: string[];
  features: string[];
  icon: string;
  color: string;
  githubUrl: string;
  liveUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative">
      <div class="container">
        <!-- Header -->
        <div class="row mb-5">
          <div class="col-12 text-center" appScrollReveal [revealClass]="'reveal reveal-scale'">
            <span class="text-uppercase text-gradient-primary fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">Portfolio</span>
            <h2 class="display-5 fw-extrabold text-light mb-3">Featured Projects</h2>
            <div class="divider mx-auto"></div>
          </div>
        </div>

        <!-- Interactive Filter & Search Bar -->
        <div class="row mb-5 justify-content-center">
          <div class="col-lg-10">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 glass-panel p-3 rounded-4">
              <!-- Filter Pills -->
              <div class="d-flex flex-wrap gap-2 justify-content-center">
                <button *ngFor="let cat of categories" 
                        class="btn btn-sm px-3 py-2 rounded-pill transition-all font-heading fw-medium"
                        [ngClass]="selectedCategory === cat ? 'btn-glow-primary' : 'btn-glass text-muted'"
                        (click)="selectedCategory = cat">
                  {{ cat }}
                </button>
              </div>

              <!-- Search Box -->
              <div class="position-relative w-100 w-md-auto" style="min-width: 240px;">
                <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-cyan"></i>
                <input type="text" 
                       class="form-control bg-transparent border-secondary-subtle text-light font-body ps-5 rounded-pill shadow-none" 
                       placeholder="Search projects by tech..." 
                       [(ngModel)]="searchQuery">
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="row g-4">
          <div *ngIf="filteredProjects.length === 0" class="col-12 text-center py-5">
            <i class="bi bi-folder-x fs-1 text-cyan opacity-50 d-block mb-3"></i>
            <h4 class="text-light font-heading">No projects match your filter</h4>
            <p class="text-muted font-body">Try clearing your search or selecting a different category.</p>
          </div>

          <div class="col-lg-4 col-md-6" *ngFor="let project of filteredProjects; let idx = index"
               appScrollReveal 
               [revealClass]="'reveal reveal-scale reveal-delay-' + (idx % 3 + 1)">
            <div class="glass-panel glass-card-hover project-card p-4 h-100 d-flex flex-column justify-content-between relative">
              <div>
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="project-icon flex-shrink-0" [style.background-color]="project.color + '12'" [style.color]="project.color">
                    <i [class]="project.icon"></i>
                  </div>
                  <div>
                    <h3 class="h5 font-heading text-light mb-1 project-title">{{ project.title }}</h3>
                    <h6 class="text-cyan font-heading mb-0 small">{{ project.subtitle }}</h6>
                  </div>
                </div>
                <p class="text-muted font-body mb-4 small opacity-90">{{ project.summary }}</p>
              </div>

              <div>
                <div class="tags-container d-flex flex-wrap gap-2 mb-4">
                  <span class="tag-badge small" *ngFor="let tag of project.tags">{{ tag }}</span>
                </div>
                
                <div class="d-flex gap-2">
                  <button class="btn btn-glass flex-grow-1 py-2 d-flex align-items-center justify-content-center view-btn"
                          (click)="openDialog(project, detailDialog)">
                    Details <i class="bi bi-info-circle ms-1.5 small"></i>
                  </button>
                  <a [href]="project.githubUrl" target="_blank" class="btn btn-glass px-3 py-2 d-flex align-items-center justify-content-center social-btn card-link-btn" title="GitHub Repository">
                    <i class="bi bi-github"></i>
                  </a>
                  <a [href]="project.liveUrl" target="_blank" class="btn btn-glow-primary px-3 py-2 d-flex align-items-center justify-content-center social-btn card-link-btn" title="Live Demo">
                    <i class="bi bi-box-arrow-up-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Native HTML5 Glassmorphic Dialog with Animated Features -->
      <dialog #detailDialog class="glass-dialog"
              (click)="onDialogClick($event, detailDialog)"
              (cancel)="onDialogCancel($event, detailDialog)">
        <div class="dialog-header p-4 d-flex justify-content-between align-items-center" *ngIf="selectedProject">
          <h3 class="h4 font-heading text-light m-0 d-flex align-items-center">
            <i [class]="selectedProject.icon + ' me-2 icon-pop'" [style.color]="selectedProject.color"></i>
            {{ selectedProject.title }}
          </h3>
          <button class="close-btn" (click)="closeDialog(detailDialog)">
            <i class="bi bi-x-lg fs-5"></i>
          </button>
        </div>
        
        <div class="dialog-body p-4 overflow-y-auto" *ngIf="selectedProject">
          <p class="font-body text-light opacity-90 mb-4 lead fs-6">{{ selectedProject.description }}</p>
          
          <h4 class="h6 text-cyan font-heading text-uppercase mb-3 letter-spacing-1">Key Technical Implementations</h4>
          <ul class="features-list d-flex flex-column gap-2 mb-4 font-body small text-muted">
            <li class="d-flex align-items-start feature-item" *ngFor="let feature of selectedProject.features">
              <i class="bi bi-check-circle-fill text-cyan me-2 mt-0.5 check-icon"></i>
              <span class="text-light opacity-90">{{ feature }}</span>
            </li>
          </ul>

          <div class="d-flex flex-wrap gap-2 mb-2">
            <span class="tag-badge modal-tag" *ngFor="let tag of selectedProject.tags">{{ tag }}</span>
          </div>
        </div>

        <div class="dialog-footer p-4 d-flex gap-3 justify-content-end border-top border-secondary-subtle" *ngIf="selectedProject">
          <button class="btn btn-glass py-2 px-4" (click)="closeDialog(detailDialog)">Close</button>
          <a [href]="selectedProject.githubUrl" target="_blank" class="btn btn-glass py-2 px-4 d-flex align-items-center">
            GitHub Repo <i class="bi bi-github ms-2"></i>
          </a>
          <a [href]="selectedProject.liveUrl" target="_blank" class="btn btn-glow-primary py-2 px-4 d-flex align-items-center">
            Live Demo <i class="bi bi-box-arrow-up-right ms-2"></i>
          </a>
        </div>
      </dialog>
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

    .project-card {
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    
    .project-icon-wrapper {
      perspective: 500px;
    }

    .project-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .project-card:hover .project-icon {
      transform: scale(1.15) rotate(6deg);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    
    .tag-badge {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-glass);
      color: var(--color-text-muted);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.78rem;
      font-weight: 500;
      transition: all 0.25s ease;
    }

    .tag-badge:hover {
      background: rgba(99, 102, 241, 0.1);
      border-color: var(--color-primary);
      color: #ffffff;
      transform: translateY(-2px);
    }

    .modal-tag {
      background: rgba(6, 182, 212, 0.1);
      border-color: rgba(6, 182, 212, 0.3);
      color: var(--color-cyan);
    }
    
    .view-btn .view-icon {
      transition: transform 0.3s ease;
    }

    .view-btn:hover .view-icon {
      transform: translate(2px, -2px) scale(1.15);
      color: var(--color-cyan);
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-muted);
      transition: all 0.25s ease;
      cursor: pointer;
    }
    
    .close-btn:hover {
      color: #ffffff;
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.4);
      transform: rotate(90deg);
    }
    
    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .feature-item {
      padding: 6px 10px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.02);
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .feature-item:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(4px);
    }

    .check-icon {
      font-size: 1.1rem;
    }
    
    .text-cyan {
      color: var(--color-cyan);
    }
    
    dialog.glass-dialog {
      max-height: 85vh;
    }
  `]
})
export class ProjectsComponent {
  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      category: 'E-Commerce',
      title: 'E-Commerce Storefront & Order Hub',
      subtitle: 'Full-Stack Digital Retail Platform',
      summary: 'Modern online store featuring product catalog browsing, cart management, search filtering, and seamless checkout integrations.',
      description: 'A full-stack e-commerce web application featuring real-time product inventory tracking, category filtering, cart state management, user wishlist handling, and secure checkout simulation.',
      tags: ['Angular', 'TypeScript', 'Firebase', 'RxJS', 'Bootstrap 5', 'REST API'],
      features: [
        'Dynamic product filtering by price, category, rating, and availability.',
        'Stateful shopping cart with local persistence and real-time total recalculation.',
        'User authentication and order history management powered by Firebase.',
        'Responsive glassmorphic UI layout with smooth micro-interactions.'
      ],
      icon: 'bi-bag-check-fill',
      color: '#6366f1',
      githubUrl: 'https://github.com/dev-abhishekpatel/ecommerce-store',
      liveUrl: 'https://github.com/dev-abhishekpatel/ecommerce-store'
    },
    {
      category: 'Web Apps',
      title: 'Family Management & Household Hub',
      subtitle: 'Collaborative Household & Budget Workspace',
      summary: 'A centralized portal for managing family tasks, chore assignments, shared household budgets, and shared calendars.',
      description: 'An interactive family organizational application designed to streamline daily household operations. Features shared task boards, expense categorization, budget tracking, and real-time sync across devices.',
      tags: ['Angular', 'Cloud Firestore', 'NgRx Signals', 'Firebase Auth', 'Chart.js'],
      features: [
        'Shared family chore board with status tracking and completion streaks.',
        'Expense tracker with visual budget breakdown charts and monthly reports.',
        'Shared calendar and event notification system for family milestones.',
        'Multi-user role access allowing parent admin controls and kid task views.'
      ],
      icon: 'bi-house-heart-fill',
      color: '#10b981',
      githubUrl: 'https://github.com/dev-abhishekpatel/family-management',
      liveUrl: 'https://github.com/dev-abhishekpatel/family-management'
    },
    {
      category: 'Real-Time Chat',
      title: 'Mini-WhatsApp Real-Time Chat',
      subtitle: 'Instant Messaging & Media Sharing App',
      summary: 'A feature-complete messaging app clone supporting real-time chat, media attachment uploads, and live user status streams.',
      description: 'A direct real-time chat application clone built with Angular standalone components and Cloud Firestore. Implements active presence status, instant message delivery, session caching, and attachment handling.',
      tags: ['Angular', 'Cloud Firestore', 'Firebase Auth', 'RxJS', 'WebSockets'],
      features: [
        'Instant real-time 1-on-1 messaging with live Firestore snapshots.',
        'Media file attachments with image preview and storage pipelines.',
        'User online/offline status detection and active conversation search.',
        'Encrypted session state and local data caching.'
      ],
      icon: 'bi-chat-dots-fill',
      color: '#06b6d4',
      githubUrl: 'https://github.com/dev-abhishekpatel/mini-whatsapp',
      liveUrl: 'https://github.com/dev-abhishekpatel/mini-whatsapp'
    },
    {
      category: 'Gaming & C++',
      title: 'Brick Breaker Algorithmic Game',
      subtitle: '2D OpenGL Arcade Engine',
      summary: 'Interactive 2D arcade game built with C++ and OpenGL featuring custom physics calculations, collision detection, and score pipelines.',
      description: 'An algorithmic 2D arcade game built from scratch using C++ and OpenGL graphics libraries. Implements bounding-box collision detection, paddle deflection physics, power-up logic, and high score tracking.',
      tags: ['C++', 'OpenGL', 'Data Structures', 'OOP', 'Graphics Engine'],
      features: [
        'Custom axis-aligned bounding box (AABB) collision detection algorithms.',
        'Dynamic ball deflection physics based on paddle impact angle.',
        'Multi-level progression with varying brick durability and power-up drops.',
        'Optimized rendering pipeline achieving smooth 60 FPS performance.'
      ],
      icon: 'bi-controller',
      color: '#d946ef',
      githubUrl: 'https://github.com/dev-abhishekpatel/brick-breaker-game',
      liveUrl: 'https://github.com/dev-abhishekpatel/brick-breaker-game'
    },
    {
      category: 'Web Apps',
      title: 'Glassmorphic Developer Portfolio',
      subtitle: 'Angular 21 Interactive Showcase',
      summary: 'A high-performance portfolio application featuring dark/light theme switching, glassmorphism UI, and scroll reveal animations.',
      description: 'A state-of-the-art developer portfolio built using Angular 21, Bootstrap 5, custom CSS Glassmorphism, and Firebase Hosting. Showcases modern animations, light/dark mode toggling, and interactive project dialogs.',
      tags: ['Angular 21', 'TypeScript', 'Firebase Hosting', 'CSS3 Glassmorphism', 'RxJS'],
      features: [
        'Full light/dark theme system with instant CSS custom property switching.',
        'Custom Scroll reveal directives and count-up animation components.',
        'Interactive glass dialog overlays with details and GitHub repository links.',
        '100% mobile-responsive layout deployed on Firebase Hosting.'
      ],
      icon: 'bi-window-stack',
      color: '#f59e0b',
      githubUrl: 'https://github.com/dev-abhishekpatel/abhi-port',
      liveUrl: 'https://new-da04f.web.app/'
    }
  ];

  categories = ['All', 'E-Commerce', 'Web Apps', 'Real-Time Chat', 'Gaming & C++'];
  selectedCategory = 'All';
  searchQuery = '';

  get filteredProjects(): Project[] {
    return this.projects.filter(p => {
      const matchesCat = this.selectedCategory === 'All' || p.category === this.selectedCategory;

      const q = this.searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }

  openDialog(project: Project, dialogEl: HTMLDialogElement) {
    this.selectedProject = project;
    dialogEl.showModal();
  }

  closeDialog(dialogEl: HTMLDialogElement) {
    dialogEl.classList.add('dialog-closing');
    setTimeout(() => {
      dialogEl.close();
      dialogEl.classList.remove('dialog-closing');
      this.selectedProject = null;
    }, 350); // Matches the 0.35s CSS transition
  }

  onDialogClick(event: MouseEvent, dialogEl: HTMLDialogElement) {
    const rect = dialogEl.getBoundingClientRect();
    const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      this.closeDialog(dialogEl);
    }
  }

  onDialogCancel(event: Event, dialogEl: HTMLDialogElement) {
    event.preventDefault();
    this.closeDialog(dialogEl);
  }
}

