import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TopHeaderComponent } from '../../shared/components/top-header/top-header.component';
import { GuestService } from '../../core/services/guest.service';

type ViewState = 'summary' | 'loading' | 'requested' | 'rated';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, TopHeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private guestService = inject(GuestService);
  private router = inject(Router);

  stay = this.guestService.stay;
  state: ViewState = this.stay?.checkoutStatus === 'requested' ? 'requested' : 'summary';

  rating = 0;
  comment = '';

  requestCheckout(): void {
    this.state = 'loading';
    this.guestService.requestCheckout().subscribe(() => {
      this.state = 'requested';
      this.stay = this.guestService.stay;
    });
  }

  setRating(value: number): void {
    this.rating = value;
  }

  submitFeedback(): void {
    this.state = 'rated';
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
