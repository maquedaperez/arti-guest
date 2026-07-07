import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'access', pathMatch: 'full' },
  {
    path: 'access',
    loadComponent: () => import('./pages/access/access.component').then((m) => m.AccessComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'checkin',
    loadComponent: () => import('./pages/checkin/checkin.component').then((m) => m.CheckinComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'room-service',
    loadComponent: () => import('./pages/room-service/room-service.component').then((m) => m.RoomServiceComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'incidents',
    loadComponent: () => import('./pages/incidents/incidents.component').then((m) => m.IncidentsComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'spa-activities',
    loadComponent: () =>
      import('./pages/spa-activities/spa-activities.component').then((m) => m.SpaActivitiesComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.component').then((m) => m.ChatComponent),
    canActivate: [guestGuard]
  },
  { path: '**', redirectTo: 'access' }
];
