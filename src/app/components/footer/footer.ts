import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer py-5 position-relative border-top border-secondary-subtle">
      <div class="container">
        <div class="row align-items-center justify-content-between flex-column flex-md-row gap-4">
          <!-- Copyright Info -->
          <div class="col-auto text-center text-md-start font-body small text-muted">
            <p class="m-0">&copy; {{ currentYear }} Abhishek Patel. All Rights Reserved.</p>
            <p class="m-0 small mt-1 opacity-75">Built with Angular & Firebase</p>
          </div>
          
          <!-- Social Icons -->
          <div class="col-auto text-center">
            <div class="d-flex align-items-center gap-3">
              <a href="https://github.com/dev-abhishekpatel" 
                 target="_blank" 
                 class="social-btn" 
                 aria-label="GitHub Profile">
                <i class="bi bi-github"></i>
              </a>
              <a href="https://linkedin.com" 
                 target="_blank" 
                 class="social-btn" 
                 aria-label="LinkedIn Profile">
                <i class="bi bi-linkedin"></i>
              </a>
              <a href="https://twitter.com" 
                 target="_blank" 
                 class="social-btn" 
                 aria-label="Twitter Profile">
                <i class="bi bi-twitter-x"></i>
              </a>
              <a href="mailto:abhishekpatel71773@gmail.com" 
                 class="social-btn" 
                 aria-label="Send Email">
                <i class="bi bi-envelope"></i>
              </a>
              <a href="#hero" 
                 class="social-btn back-to-top" 
                 aria-label="Scroll to Top">
                <i class="bi bi-arrow-up-short fs-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--bg-deep-space);
      background-image: linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px);
      z-index: 10;
    }
    
    .social-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-glass);
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      text-decoration: none;
    }
    
    .social-btn:hover {
      background: rgba(99, 102, 241, 0.1);
      border-color: var(--color-primary);
      color: var(--color-cyan);
      transform: translateY(-3px);
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
    }
    
    .back-to-top {
      background: rgba(99, 102, 241, 0.08);
      color: var(--color-cyan);
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
