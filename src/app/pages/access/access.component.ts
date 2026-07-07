import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestService } from '../../core/services/guest.service';
import { HotelService } from '../../core/services/hotel.service';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './access.component.html',
  styleUrl: './access.component.scss'
})
export class AccessComponent {
  private guestService = inject(GuestService);
  private hotelService = inject(HotelService);
  private router = inject(Router);

  hotel = this.hotelService.hotel;
  roomNumber = '';
  lastName = '';
  loading = false;
  errorMessage = '';
  qrCells = this.buildQrPattern();

  private buildQrPattern(): boolean[] {
    const size = 8;
    const cells: boolean[] = [];
    let seed = 42;
    for (let i = 0; i < size * size; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      cells.push(seed / 233280 > 0.42);
    }
    return cells;
  }

  submit(): void {
    if (!this.roomNumber) {
      this.errorMessage = 'Introduce tu número de habitación.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    this.guestService.accessRoom(this.roomNumber, this.lastName).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/home']);
    });
  }
}
