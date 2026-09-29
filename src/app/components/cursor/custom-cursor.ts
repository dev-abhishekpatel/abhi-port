import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cursor-container d-none d-lg-block">
      <!-- Main glowing fluid ring -->
      <div #cursorRing class="custom-cursor-ring"></div>
      <!-- Inner dot -->
      <div #cursorDot class="custom-cursor-dot"></div>
    </div>
  `,
  styles: [`
    .cursor-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }

    .custom-cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      margin-top: -18px;
      margin-left: -18px;
      border-radius: 50%;
      border: 1.5px solid var(--color-cyan, #06b6d4);
      background: rgba(6, 182, 212, 0.04);
      box-shadow: 0 0 15px rgba(6, 182, 212, 0.25);
      pointer-events: none;
      will-change: transform;
      transition: width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
                  height 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
                  margin 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
                  border-color 0.3s ease,
                  background 0.3s ease,
                  box-shadow 0.3s ease;
    }

    .custom-cursor-ring.is-hovering {
      width: 60px;
      height: 60px;
      margin-top: -30px;
      margin-left: -30px;
      border-color: var(--color-secondary, #d946ef);
      background: rgba(217, 70, 239, 0.08);
      box-shadow: 0 0 25px rgba(217, 70, 239, 0.4);
    }

    .custom-cursor-ring.is-clicking {
      transform: scale(0.75) !important;
      border-color: var(--color-primary, #6366f1);
      box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
    }

    .custom-cursor-dot {
      position: fixed;
      top: 0;
      left: 0;
      width: 8px;
      height: 8px;
      margin-top: -4px;
      margin-left: -4px;
      border-radius: 50%;
      background: var(--color-cyan, #06b6d4);
      box-shadow: 0 0 10px var(--color-cyan, #06b6d4);
      pointer-events: none;
      will-change: transform;
      transition: background 0.3s ease, transform 0.15s ease;
    }

    .custom-cursor-dot.is-hovering {
      background: var(--color-secondary, #d946ef);
      box-shadow: 0 0 15px var(--color-secondary, #d946ef);
    }

    @media (pointer: coarse) {
      .cursor-container {
        display: none !important;
      }
    }
  `]
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  @ViewChild('cursorRing', { static: true }) ringRef!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorDot', { static: true }) dotRef!: ElementRef<HTMLDivElement>;

  private isHovered = false;
  private isClicked = false;

  private mouseX = -100;
  private mouseY = -100;
  private ringX = -100;
  private ringY = -100;
  private animFrameId: number | null = null;
  private destroyListeners?: () => void;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.ngZone.runOutsideAngular(() => {
        const onMouseMove = (e: MouseEvent) => {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;

          if (this.dotRef?.nativeElement) {
            this.dotRef.nativeElement.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;
          }

          const target = e.target as HTMLElement | null;
          if (target) {
            const isInteractive = !!target.closest('a, button, input, textarea, .btn, .glass-panel, .social-btn, [role="button"]');
            if (this.isHovered !== isInteractive) {
              this.isHovered = isInteractive;
              this.updateClasses();
            }
          }
        };

        const onMouseDown = () => {
          this.isClicked = true;
          this.updateClasses();
        };

        const onMouseUp = () => {
          this.isClicked = false;
          this.updateClasses();
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mousedown', onMouseDown, { passive: true });
        window.addEventListener('mouseup', onMouseUp, { passive: true });

        this.destroyListeners = () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mousedown', onMouseDown);
          window.removeEventListener('mouseup', onMouseUp);
        };

        this.render();
      });
    }
  }

  private updateClasses() {
    if (this.ringRef?.nativeElement && this.dotRef?.nativeElement) {
      this.ringRef.nativeElement.classList.toggle('is-hovering', this.isHovered);
      this.ringRef.nativeElement.classList.toggle('is-clicking', this.isClicked);
      this.dotRef.nativeElement.classList.toggle('is-hovering', this.isHovered);
      this.dotRef.nativeElement.classList.toggle('is-clicking', this.isClicked);
    }
  }

  private render() {
    // Lerp smooth follow for ring
    const ease = 0.18;
    this.ringX += (this.mouseX - this.ringX) * ease;
    this.ringY += (this.mouseY - this.ringY) * ease;

    if (this.ringRef?.nativeElement) {
      this.ringRef.nativeElement.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
    }

    this.animFrameId = requestAnimationFrame(() => this.render());
  }

  ngOnDestroy() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.destroyListeners) {
      this.destroyListeners();
    }
  }
}
