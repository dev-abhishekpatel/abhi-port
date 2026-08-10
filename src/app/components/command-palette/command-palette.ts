import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService, AppTheme, AppFontSize } from '../../services/theme.service';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Theme' | 'Typography';
  icon: string;
  shortcut?: string;
  action: () => void;
}

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <dialog #paletteDialog 
            class="glass-dialog command-palette-dialog" 
            (click)="onDialogClick($event)"
            (cancel)="close()">
      <div class="palette-header p-3 border-bottom border-secondary-subtle d-flex align-items-center gap-3">
        <i class="bi bi-search text-cyan fs-5 ms-2"></i>
        <input #searchInput
               type="text" 
               class="form-control bg-transparent border-0 text-light font-body shadow-none palette-input" 
               placeholder="Type a command or search section (e.g. Projects, Theme, Font Size)..."
               [(ngModel)]="searchQuery"
               (input)="onSearchInput()"
               (keydown)="onKeydown($event)">
        <span class="badge palette-kbd me-2">ESC</span>
      </div>

      <div class="palette-body p-2 overflow-y-auto" style="max-height: 380px;">
        <div *ngIf="filteredCommands.length === 0" class="p-4 text-center text-muted font-body">
          <i class="bi bi-emoji-frown fs-4 d-block mb-2 text-cyan opacity-75"></i>
          No commands found matching "{{ searchQuery }}"
        </div>

        <div *ngFor="let cat of categories">
          <div *ngIf="getCommandsByCategory(cat).length > 0" class="palette-category-title px-3 pt-3 pb-1 text-uppercase font-heading text-cyan small fw-bold letter-spacing-1">
            {{ cat }}
          </div>
          
          <div *ngFor="let item of getCommandsByCategory(cat); let i = index" 
               class="command-row px-3 py-2.5 rounded-3 d-flex align-items-center justify-content-between mb-1"
               [ngClass]="{'selected': isSelected(item)}"
               (click)="executeCommand(item)"
               (mouseenter)="selectedIndex = getFlatIndex(item)">
            
            <div class="d-flex align-items-center gap-3">
              <div class="command-icon-box rounded-2 d-flex align-items-center justify-content-center">
                <i [class]="item.icon"></i>
              </div>
              <span class="font-body text-light fw-medium text-truncate" style="max-width: 340px;">{{ item.title }}</span>
            </div>

            <div class="d-flex align-items-center gap-2">
              <span *ngIf="item.shortcut" class="badge palette-kbd font-heading small px-2 py-1">
                {{ item.shortcut }}
              </span>
              <i class="bi bi-arrow-return-left text-muted opacity-50 small ms-1"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="palette-footer p-3 border-top border-secondary-subtle d-flex justify-content-between align-items-center text-muted font-body small">
        <div class="d-flex align-items-center gap-3">
          <span><kbd class="palette-kbd">↑</kbd> <kbd class="palette-kbd">↓</kbd> Navigate</span>
          <span><kbd class="palette-kbd">↵</kbd> Select</span>
        </div>
        <span class="text-gradient-cyan fw-bold font-heading">Spotlight Cmd Palette</span>
      </div>
    </dialog>
  `,
  styles: [`
    .command-palette-dialog {
      width: 90%;
      max-width: 650px;
      padding: 0;
      overflow: hidden;
      border: 1px solid var(--border-glass) !important;
      box-shadow: var(--shadow-glass), 0 0 40px rgba(6, 182, 212, 0.25) !important;
    }

    .palette-input {
      font-size: 1.05rem;
    }

    .palette-input::placeholder {
      color: var(--color-text-muted);
      opacity: 0.65;
    }

    .command-row {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .command-row.selected {
      background: rgba(99, 102, 241, 0.18) !important;
      border-left: 3px solid var(--color-cyan);
    }

    [data-theme="light"] .command-row.selected {
      background: rgba(79, 70, 229, 0.1) !important;
      border-left: 3px solid var(--color-primary);
    }

    .command-icon-box {
      width: 34px;
      height: 34px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      color: var(--color-cyan);
    }

    [data-theme="light"] .command-icon-box {
      background: rgba(15, 23, 42, 0.05);
      color: var(--color-primary);
    }

    .command-row.selected .command-icon-box {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: #ffffff;
      border-color: transparent;
    }

    .palette-kbd {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border-glass);
      color: var(--color-text-light);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.75rem;
      font-family: var(--font-heading);
    }

    [data-theme="light"] .palette-kbd {
      background: rgba(15, 23, 42, 0.08);
      border-color: rgba(15, 23, 42, 0.15);
      color: var(--color-text-light);
    }
  `]
})
export class CommandPaletteComponent implements OnInit {
  @ViewChild('paletteDialog', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;

  isOpen = false;
  searchQuery = '';
  selectedIndex = 0;
  categories: Array<'Navigation' | 'Actions' | 'Theme' | 'Typography'> = [
    'Navigation',
    'Actions',
    'Theme',
    'Typography'
  ];

  commands: CommandItem[] = [];
  filteredCommands: CommandItem[] = [];

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.buildCommandsList();
  }

  private buildCommandsList() {
    this.commands = [
      { id: 'nav-home', title: 'Go to Home / Hero Section', category: 'Navigation', icon: 'bi bi-house-door-fill', shortcut: '#hero', action: () => this.scrollTo('#hero') },
      { id: 'nav-about', title: 'Go to About Me', category: 'Navigation', icon: 'bi bi-person-badge-fill', shortcut: '#about', action: () => this.scrollTo('#about') },
      { id: 'nav-skills', title: 'Go to Skills & Capabilities', category: 'Navigation', icon: 'bi bi-cpu-fill', shortcut: '#skills', action: () => this.scrollTo('#skills') },
      { id: 'nav-projects', title: 'Go to Featured Projects', category: 'Navigation', icon: 'bi bi-folder-fill', shortcut: '#projects', action: () => this.scrollTo('#projects') },
      { id: 'nav-experience', title: 'Go to Experience Timeline', category: 'Navigation', icon: 'bi bi-briefcase-fill', shortcut: '#experience', action: () => this.scrollTo('#experience') },
      { id: 'nav-education', title: 'Go to Education Journey', category: 'Navigation', icon: 'bi bi-mortarboard-fill', shortcut: '#education', action: () => this.scrollTo('#education') },
      { id: 'nav-services', title: 'Go to My Services', category: 'Navigation', icon: 'bi bi-window-sidebar', shortcut: '#services', action: () => this.scrollTo('#services') },
      { id: 'nav-contact', title: 'Go to Connect / Contact Form', category: 'Navigation', icon: 'bi bi-send-fill', shortcut: '#contact', action: () => this.scrollTo('#contact') },

      { id: 'act-email', title: 'Copy Email Address to Clipboard', category: 'Actions', icon: 'bi bi-clipboard-check-fill', action: () => this.copyEmail() },
      { id: 'act-github', title: 'Open GitHub Profile', category: 'Actions', icon: 'bi bi-github', action: () => window.open('https://github.com/dev-abhishekpatel', '_blank') },

      { id: 'theme-cyber', title: 'Switch Theme: Cyber Midnight (Default Dark)', category: 'Theme', icon: 'bi bi-moon-stars-fill', action: () => this.themeService.setTheme('cyber') },
      { id: 'theme-light', title: 'Switch Theme: Light Elegant (Light Mode)', category: 'Theme', icon: 'bi bi-sun-fill', action: () => this.themeService.setTheme('light') },
      { id: 'theme-neon', title: 'Switch Theme: Neon Synthwave', category: 'Theme', icon: 'bi bi-palette-fill', action: () => this.themeService.setTheme('neon') },
      { id: 'theme-emerald', title: 'Switch Theme: Emerald Matrix', category: 'Theme', icon: 'bi bi-terminal-fill', action: () => this.themeService.setTheme('emerald') },

      { id: 'font-sm', title: 'Font Size: Small (14px)', category: 'Typography', icon: 'bi bi-type-size', shortcut: '14px', action: () => this.themeService.setFontSize('sm') },
      { id: 'font-md', title: 'Font Size: Normal (16px - Default)', category: 'Typography', icon: 'bi bi-type', shortcut: '16px', action: () => this.themeService.setFontSize('md') },
      { id: 'font-lg', title: 'Font Size: Large (18px)', category: 'Typography', icon: 'bi bi-zoom-in', shortcut: '18px', action: () => this.themeService.setFontSize('lg') },
      { id: 'font-xl', title: 'Font Size: Extra Large (20px)', category: 'Typography', icon: 'bi bi-type-h1', shortcut: '20px', action: () => this.themeService.setFontSize('xl') },
      { id: 'font-inc', title: 'Increase Font Scale', category: 'Typography', icon: 'bi bi-plus-circle-fill', shortcut: 'A+', action: () => this.themeService.increaseFontSize() },
      { id: 'font-dec', title: 'Decrease Font Scale', category: 'Typography', icon: 'bi bi-dash-circle-fill', shortcut: 'A-', action: () => this.themeService.decreaseFontSize() }
    ];

    this.filteredCommands = [...this.commands];
  }

  @HostListener('window:keydown', ['$event'])
  onGlobalKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.toggle();
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.searchQuery = '';
    this.onSearchInput();
    this.dialogRef.nativeElement.showModal();
    setTimeout(() => {
      this.searchInputRef?.nativeElement?.focus();
    }, 50);
  }

  close() {
    this.isOpen = false;
    this.dialogRef.nativeElement.close();
  }

  onSearchInput() {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredCommands = [...this.commands];
    } else {
      this.filteredCommands = this.commands.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        (c.shortcut && c.shortcut.toLowerCase().includes(query))
      );
    }
    this.selectedIndex = 0;
  }

  getCommandsByCategory(cat: 'Navigation' | 'Actions' | 'Theme' | 'Typography'): CommandItem[] {
    return this.filteredCommands.filter(c => c.category === cat);
  }

  isSelected(item: CommandItem): boolean {
    return this.filteredCommands[this.selectedIndex]?.id === item.id;
  }

  getFlatIndex(item: CommandItem): number {
    return this.filteredCommands.findIndex(c => c.id === item.id);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.filteredCommands.length > 0) {
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredCommands.length;
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.filteredCommands.length > 0) {
        this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const selected = this.filteredCommands[this.selectedIndex];
      if (selected) {
        this.executeCommand(selected);
      }
    }
  }

  executeCommand(item: CommandItem) {
    this.close();
    item.action();
  }

  private scrollTo(id: string) {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private copyEmail() {
    navigator.clipboard.writeText('abhishekpatel71773@gmail.com');
    alert('Email abhishekpatel71773@gmail.com copied to clipboard!');
  }

  onDialogClick(event: MouseEvent) {
    const rect = this.dialogRef.nativeElement.getBoundingClientRect();
    const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      this.close();
    }
  }
}
