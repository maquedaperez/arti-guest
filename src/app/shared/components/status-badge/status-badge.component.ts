import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatusTone = 'neutral' | 'warning' | 'success' | 'brass';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status-badge" [class]="'status-badge--' + tone">
      <span class="status-badge__dot"></span>
      {{ label }}
    </span>
  `,
  styles: [
    `
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 12px;
        border-radius: var(--radius-pill);
        font-size: 0.74rem;
        font-weight: 600;
        letter-spacing: 0.01em;
      }
      .status-badge__dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
      }
      .status-badge--neutral {
        background: var(--border);
        color: var(--text-muted);
      }
      .status-badge--warning {
        background: rgba(184, 130, 58, 0.14);
        color: var(--warning);
      }
      .status-badge--success {
        background: rgba(63, 122, 95, 0.14);
        color: var(--success);
      }
      .status-badge--brass {
        background: rgba(169, 130, 76, 0.14);
        color: var(--brass);
      }
    `
  ]
})
export class StatusBadgeComponent {
  @Input() label = '';
  @Input() tone: StatusTone = 'neutral';
}
