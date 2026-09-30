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
      box-shadow: 0 0 10px rgba(6, 182, 212, 0.18);
      pointer-events: none;
      will-change: transform;
      transition: width 0.18s cubic-bezier(0.165, 0.84, 0.44, 1),
                  height 0.18s cubic-bezier(0.165, 0.84, 0.44, 1),
                  margin 0.18s cubic-bezier(0.165, 0.84, 0.44, 1),
                  border-color 0.18s ease,
                  background 0.18s ease,
                  box-shadow 0.18s ease;
    }

    .custom-cursor-ring.is-hovering {
      width: 60px;
      height: 60px;
      margin-top: -30px;
      margin-left: -30px;
      border-color: var(--color-secondary, #d946ef);
      background: rgba(217, 70, 239, 0.08);
      box-shadow: 0 0 16px rgba(217, 70, 239, 0.28);
    }

    .custom-cursor-ring.is-clicking {
      transform: scale(0.75) !important;
      border-color: var(--color-primary, #6366f1);
      box-shadow: 0 0 18px rgba(99, 102, 241, 0.45);
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
      box-shadow: 0 0 6px var(--color-cyan, #06b6d4);
      pointer-events: none;
      will-change: transform;
      /* remove transform transition so dot follows instantly */
      transition: background 0.18s ease;
    }

    .custom-cursor-dot.is-hovering {
      background: var(--color-secondary, #d946ef);
      box-shadow: 0 0 10px var(--color-secondary, #d946ef);
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
        // Lightweight mousemove: only update coordinates here.
        const onMouseMove = (e: MouseEvent) => {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
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

        // Cache element refs for faster writes
        const ringEl = this.ringRef.nativeElement;
        const dotEl = this.dotRef.nativeElement;

        this.render(ringEl, dotEl);
      });
    }
  }

  private updateClasses() {
    this.ringRef.nativeElement.classList.toggle('is-hovering', this.isHovered);
    this.ringRef.nativeElement.classList.toggle('is-clicking', this.isClicked);
    this.dotRef.nativeElement.classList.toggle('is-hovering', this.isHovered);
    this.dotRef.nativeElement.classList.toggle('is-clicking', this.isClicked);
  }

  // Now accept cached elements to avoid repeated nativeElement lookups
  private render(ringEl?: HTMLDivElement, dotEl?: HTMLDivElement) {
    const ease = 0.28; // faster follow for snappier feel

    // Ensure elements are available
    const ring = ringEl ?? this.ringRef.nativeElement;
    const dot = dotEl ?? this.dotRef.nativeElement;

    // Lerp smooth follow for ring
    this.ringX += (this.mouseX - this.ringX) * ease;
    this.ringY += (this.mouseY - this.ringY) * ease;

    // Update transforms for dot (immediate) and ring (smoothed)
    if (dot) {
      dot.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;
    }
    if (ring) {
      ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
    }

    // Hover detection moved to render to keep work off the mousemove handler
    let isInteractive = false;
    if (this.mouseX >= 0 && this.mouseY >= 0 && document.elementFromPoint) {
      const el = document.elementFromPoint(this.mouseX, this.mouseY) as HTMLElement | null;
      if (el) {
        isInteractive = !!el.closest('a, button, input, textarea, .btn, .glass-panel, .social-btn, [role="button"]');
      }
    }

    if (this.isHovered !== isInteractive) {
      this.isHovered = isInteractive;
      this.updateClasses();
    }

    this.animFrameId = requestAnimationFrame(() => this.render(ring, dot));
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
