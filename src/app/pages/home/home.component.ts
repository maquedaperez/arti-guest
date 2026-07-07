import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GuestService } from '../../core/services/guest.service';
import { HotelService } from '../../core/services/hotel.service';

interface QuickAction {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private guestService = inject(GuestService);
  private hotelService = inject(HotelService);
  private router = inject(Router);

  hotel = this.hotelService.hotel;
  guest = this.guestService.guest;
  stay = this.guestService.stay;

  quickActions: QuickAction[] = [
    { path: '/checkin', icon: 'how_to_reg', label: 'Check-in online' },
    { path: '/room-service', icon: 'room_service', label: 'Room Service' },
    { path: '/incidents', icon: 'build', label: 'Reportar avería' },
    { path: '/spa-activities', icon: 'spa', label: 'Spa y actividades' },
    { path: '/chat', icon: 'forum', label: 'Asistente IA' },
    { path: '/checkout', icon: 'logout', label: 'Check-out' }
  ];

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
