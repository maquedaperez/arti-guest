import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GuestService } from '../services/guest.service';

export const guestGuard: CanActivateFn = () => {
  const guestService = inject(GuestService);
  const router = inject(Router);
  if (guestService.hasActiveSession) {
    return true;
  }
  router.navigate(['/access']);
  return false;
};
