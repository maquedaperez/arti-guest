import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav">
      <a
        *ngFor="let item of items"
        class="bottom-nav__item"
        [routerLink]="item.path"
        routerLinkActive="bottom-nav__item--active"
      >
        <span class="material-icons-round">{{ item.icon }}</span>
        <span class="bottom-nav__label">{{ item.label }}</span>
      </a>
    </nav>
  `,
  styles: [
    `
      .bottom-nav {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        background: var(--ink);
        padding: 10px 6px calc(10px + env(safe-area-inset-bottom));
        z-index: 20;
        box-shadow: 0 -4px 20px rgba(22, 38, 43, 0.2);
      }
      .bottom-nav__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        text-decoration: none;
        color: rgba(246, 243, 236, 0.55);
        padding: 4px 8px;
        border-radius: var(--radius-sm);
        transition: color var(--transition-fast);
        flex: 1;

        .material-icons-round {
          font-size: 22px;
        }
      }
      .bottom-nav__label {
        font-size: 0.62rem;
        font-weight: 500;
        letter-spacing: 0.01em;
      }
      .bottom-nav__item--active {
        color: var(--brass-light);
      }
    `
  ]
})
export class BottomNavComponent {
  items: NavItem[] = [
    { path: '/home', icon: 'home', label: 'Inicio' },
    { path: '/room-service', icon: 'room_service', label: 'Room Service' },
    { path: '/incidents', icon: 'build', label: 'Incidencias' },
    { path: '/spa-activities', icon: 'spa', label: 'Spa' },
    { path: '/chat', icon: 'forum', label: 'Asistente' }
  ];
}
