import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component';
import { GuestService } from './core/services/guest.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BottomNavComponent, AsyncPipe, NgIf],
  template: `
    <main class="app-shell" [class.app-shell--with-nav]="session$ | async">
      <router-outlet></router-outlet>
    </main>
    <app-bottom-nav *ngIf="session$ | async"></app-bottom-nav>
  `,
  styles: [
    `
      .app-shell {
        min-height: 100vh;
      }
      .app-shell--with-nav {
        padding-bottom: 76px;
      }
    `
  ]
})
export class AppComponent {
  private guestService = inject(GuestService);
  session$ = this.guestService.session$;
}
