import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService, ContactMessage } from '../../services/firebase.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative">
      <div class="container">
        <!-- Title -->
        <div class="row mb-5">
          <div class="col-12 text-center" appScrollReveal [revealClass]="'reveal reveal-scale'">
            <span class="text-uppercase text-gradient-primary fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">Get In Touch</span>
            <h2 class="display-5 fw-extrabold text-light mb-3">Connect With Me</h2>
            <div class="divider mx-auto"></div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="glass-panel p-0 overflow-hidden contact-panel" appScrollReveal [revealClass]="'reveal reveal-scale'" [threshold]="0.08">
              <div class="row g-0">
                <!-- Info Side -->
                <div class="col-lg-5 info-panel p-5 d-flex flex-column justify-content-between">
                  <div>
                    <h3 class="h4 font-heading text-light mb-4 d-flex align-items-center">
                      <i class="bi bi-chat-square-text text-cyan me-2"></i> Contact Information
                    </h3>
                    <p class="text-muted font-body small mb-5">
                      Have an exciting project, a role opportunity, or just want to chat about web technologies? Drop me a message!
                    </p>
                    
                    <div class="contact-methods d-flex flex-column gap-4">
                      <div class="d-flex align-items-center gap-3 contact-method-item">
                        <div class="contact-icon">
                          <i class="bi bi-envelope-at-fill"></i>
                        </div>
                        <div>
                          <h6 class="font-heading text-light mb-0 small">Email</h6>
                          <a href="mailto:abhishekpatel71773@gmail.com" class="text-muted font-body small text-decoration-none contact-link">
                            abhishekpatel71773&#64;gmail.com
                          </a>
                        </div>
                      </div>

                      <div class="d-flex align-items-center gap-3 contact-method-item">
                        <div class="contact-icon">
                          <i class="bi bi-geo-alt-fill"></i>
                        </div>
                        <div>
                          <h6 class="font-heading text-light mb-0 small">Location</h6>
                          <span class="text-muted font-body small">Indore, Madhya Pradesh, India</span>
                        </div>
                      </div>
                      
                      <div class="d-flex align-items-center gap-3 contact-method-item">
                        <div class="contact-icon">
                          <i class="bi bi-github"></i>
                        </div>
                        <div>
                          <h6 class="font-heading text-light mb-0 small">GitHub</h6>
                          <a href="https://github.com/dev-abhishekpatel" target="_blank" class="text-muted font-body small text-decoration-none contact-link">
                            github.com/dev-abhishekpatel
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-5">
                    <h5 class="h6 font-heading text-light mb-3 text-uppercase small letter-spacing-1">Professional Focus</h5>
                    <div class="d-flex flex-wrap gap-2">
                      <span class="badge-focus">MERN Stack</span>
                      <span class="badge-focus">Angular & Firebase</span>
                      <span class="badge-focus">TypeScript</span>
                      <span class="badge-focus">Full-Stack</span>
                    </div>
                  </div>
                </div>

                <!-- Form Side -->
                <div class="col-lg-7 p-5 form-panel">
                  <h3 class="h4 font-heading text-light mb-4 d-flex align-items-center">
                    <i class="bi bi-send-fill text-gradient-primary me-2"></i> Send Message
                  </h3>
                  
                  <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="d-flex flex-column gap-4">
                    <!-- Name Input -->
                    <div class="form-group-custom">
                      <label class="form-label-custom" [ngClass]="{'active': contactForm.get('name')?.value}">Full Name</label>
                      <input type="text" 
                             formControlName="name" 
                             class="form-input-custom" 
                             placeholder="e.g. Rahul Sharma"
                             [ngClass]="{'input-error': isFieldInvalid('name')}">
                      <div class="error-msg" *ngIf="isFieldInvalid('name')">
                        <i class="bi bi-exclamation-circle me-1"></i> Name is required.
                      </div>
                    </div>

                    <!-- Email Input -->
                    <div class="form-group-custom">
                      <label class="form-label-custom" [ngClass]="{'active': contactForm.get('email')?.value}">Email Address</label>
                      <input type="email" 
                             formControlName="email" 
                             class="form-input-custom" 
                             placeholder="e.g. rahul@example.com"
                             [ngClass]="{'input-error': isFieldInvalid('email')}">
                      <div class="error-msg" *ngIf="isFieldInvalid('email')">
                        <i class="bi bi-exclamation-circle me-1"></i>
                        {{ contactForm.get('email')?.hasError('required') ? 'Email is required.' : 'Enter a valid email address.' }}
                      </div>
                    </div>

                    <!-- Subject Input -->
                    <div class="form-group-custom">
                      <label class="form-label-custom" [ngClass]="{'active': contactForm.get('subject')?.value}">Subject</label>
                      <input type="text" 
                             formControlName="subject" 
                             class="form-input-custom" 
                             placeholder="Project Opportunity"
                             [ngClass]="{'input-error': isFieldInvalid('subject')}">
                      <div class="error-msg" *ngIf="isFieldInvalid('subject')">
                        <i class="bi bi-exclamation-circle me-1"></i> Subject is required.
                      </div>
                    </div>

                    <!-- Message Input -->
                    <div class="form-group-custom">
                      <label class="form-label-custom" [ngClass]="{'active': contactForm.get('message')?.value}">Message</label>
                      <textarea formControlName="message" 
                                class="form-input-custom textarea-custom" 
                                rows="4" 
                                placeholder="Details about your inquiry..."
                                [ngClass]="{'input-error': isFieldInvalid('message')}"></textarea>
                      <div class="error-msg" *ngIf="isFieldInvalid('message')">
                        <i class="bi bi-exclamation-circle me-1"></i> Message must be at least 10 characters long.
                      </div>
                    </div>

                    <!-- Alert message boxes -->
                    <div class="alert-box" *ngIf="submitStatus" [ngClass]="submitStatus">
                      <div class="d-flex align-items-center gap-2">
                        <i class="bi fs-5" [ngClass]="submitStatus === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'"></i>
                        <span class="small font-body fw-medium">{{ statusMessage }}</span>
                      </div>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" 
                            [disabled]="contactForm.invalid || isSubmitting" 
                            class="btn btn-glow-primary py-3 d-flex justify-content-center align-items-center w-100 mt-2 submit-btn">
                      <span *ngIf="!isSubmitting" class="d-flex align-items-center">
                        Send Message <i class="bi bi-send ms-2 send-icon"></i>
                      </span>
                      <span *ngIf="isSubmitting" class="d-flex align-items-center">
                        Sending... <div class="spinner-border spinner-border-sm ms-2" role="status"></div>
                      </span>
                    </button>
                  </form>
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

    .contact-panel {
      border: 1px solid var(--border-glass);
      box-shadow: var(--shadow-glass), 0 0 30px rgba(99, 102, 241, 0.1);
    }

    .info-panel {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(7, 9, 19, 0.95) 100%);
      border-right: 1px solid var(--border-glass);
    }

    [data-theme="light"] .info-panel {
      background: linear-gradient(135deg, rgba(241, 245, 249, 0.95) 0%, rgba(226, 232, 240, 0.9) 100%);
      border-right: 1px solid rgba(203, 213, 225, 0.8);
    }

    .contact-method-item {
      transition: transform 0.25s ease;
    }

    .contact-method-item:hover {
      transform: translateX(5px);
    }

    .contact-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      color: var(--color-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: all 0.3s ease;
    }

    .contact-method-item:hover .contact-icon {
      background: rgba(6, 182, 212, 0.18);
      border-color: var(--color-cyan);
      color: #ffffff;
      transform: scale(1.1) rotate(6deg);
      box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
    }

    .contact-link {
      transition: color 0.2s ease;
    }

    .contact-link:hover {
      color: var(--color-cyan) !important;
    }

    .badge-focus {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-glass);
      color: var(--color-cyan);
      font-size: 0.78rem;
      font-family: var(--font-heading);
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 50px;
      transition: all 0.25s ease;
    }

    .badge-focus:hover {
      background: rgba(99, 102, 241, 0.12);
      border-color: var(--color-primary);
      color: #ffffff;
      transform: translateY(-2px);
    }

    /* Form Custom inputs (Float style) */
    .form-group-custom {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .form-label-custom {
      position: absolute;
      left: 14px;
      top: 15px;
      font-size: 0.9rem;
      color: var(--color-text-muted);
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
      transform-origin: left top;
    }

    .form-label-custom.active,
    .form-input-custom:focus + .form-label-custom {
      transform: translateY(-26px) scale(0.85);
      color: var(--color-cyan);
    }

    .form-input-custom::placeholder {
      color: transparent;
      transition: color 0.2s ease;
    }

    .form-input-custom:focus::placeholder {
      color: rgba(148, 163, 184, 0.5);
    }

    .form-input-custom {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-glass);
      color: #ffffff;
      padding: 14px 16px;
      border-radius: 10px;
      font-family: var(--font-body);
      font-size: 0.95rem;
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      margin-top: 5px;
    }

    [data-theme="light"] .form-input-custom {
      background: #ffffff;
      border-color: rgba(203, 213, 225, 0.8);
      color: #0f172a;
    }

    .form-input-custom:focus {
      outline: none;
      border-color: var(--color-primary);
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
    }

    .textarea-custom {
      resize: none;
    }

    .input-error {
      border-color: rgba(239, 68, 68, 0.6) !important;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.2) !important;
    }

    .error-msg {
      color: #f87171;
      font-size: 0.78rem;
      margin-top: 5px;
      font-family: var(--font-body);
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Alert Boxes CSS with animation behavior */
    .alert-box {
      border-radius: 10px;
      padding: 14px 18px;
      transition: all 0.35s ease;
      animation: alertPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes alertPop {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }

    .alert-box.success {
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #34d399;
      box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);
    }

    .alert-box.error {
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #f87171;
      box-shadow: 0 0 15px rgba(239, 68, 68, 0.15);
    }

    .submit-btn .send-icon {
      transition: transform 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) .send-icon {
      transform: translateX(4px) translateY(-2px);
    }

    @media (max-width: 991px) {
      .info-panel {
        border-right: none;
        border-bottom: 1px solid var(--border-glass);
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitStatus: 'success' | 'error' | null = null;
  statusMessage = '';

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to show errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = null;
    this.statusMessage = '';

    const message: ContactMessage = this.contactForm.value;

    try {
      await this.firebaseService.submitContactForm(message);
      this.submitStatus = 'success';
      this.statusMessage = 'Your message has been sent successfully! Thank you for reaching out.';
      this.contactForm.reset();
    } catch (err) {
      this.submitStatus = 'error';
      this.statusMessage = 'Something went wrong. Please check your network and try again.';
      console.error('Contact submit error:', err);
    } finally {
      this.isSubmitting = false;
    }
  }
}

