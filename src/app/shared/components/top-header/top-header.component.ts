import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="top-header">
      <button class="top-header__back" *ngIf="showBack" (click)="onBack()">
        <span class="material-icons-round">arrow_back</span>
      </button>
      <div class="top-header__titles">
        <span class="top-header__eyebrow" *ngIf="eyebrow">{{ eyebrow }}</span>
        <h1 class="top-header__title">{{ title }}</h1>
      </div>
      <div class="top-header__spacer" *ngIf="showBack"></div>
    </header>
  `,
  styles: [
    `
      .top-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px 20px 16px;
      }
      .top-header__back {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: none;
        background: var(--surface);
        box-shadow: var(--shadow-sm);
        color: var(--text);
        cursor: pointer;
        flex-shrink: 0;
      }
      .top-header__titles {
        flex: 1;
      }
      .top-header__eyebrow {
        display: block;
        font-family: var(--font-mono);
        font-size: 0.68rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--brass);
        margin-bottom: 2px;
      }
      .top-header__title {
        font-family: var(--font-display);
        font-size: 1.3rem;
        color: var(--text);
      }
      .top-header__spacer {
        width: 38px;
        flex-shrink: 0;
      }
    `
  ]
})
export class TopHeaderComponent {
  @Input() title = '';
  @Input() eyebrow = '';
  @Input() showBack = false;
  @Output() back = new EventEmitter<void>();

  constructor(private location: Location) {}

  onBack(): void {
    this.back.emit();
    this.location.back();
  }
}
