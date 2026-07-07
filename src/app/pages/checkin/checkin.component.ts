import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TopHeaderComponent } from '../../shared/components/top-header/top-header.component';
import { GuestService } from '../../core/services/guest.service';
import { CheckinFormData } from '../../core/models/guest.model';

type ViewState = 'form' | 'loading' | 'success';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [CommonModule, FormsModule, TopHeaderComponent],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.scss'
})
export class CheckinComponent {
  private guestService = inject(GuestService);
  private router = inject(Router);

  stay = this.guestService.stay;
  state: ViewState = this.stay?.checkinStatus === 'completed' ? 'success' : 'form';

  form: CheckinFormData = {
    documentType: 'dni',
    documentNumber: '',
    phone: '',
    estimatedArrival: '15:30',
    specialRequests: ''
  };

  errorMessage = '';

  submit(): void {
    if (!this.form.documentNumber || !this.form.phone) {
      this.errorMessage = 'Completa tu documento y teléfono de contacto.';
      return;
    }
    this.errorMessage = '';
    this.state = 'loading';

    this.guestService.submitCheckin(this.form).subscribe(() => {
      this.state = 'success';
      this.stay = this.guestService.stay;
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
