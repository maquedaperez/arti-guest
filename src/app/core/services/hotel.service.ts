import { Injectable } from '@angular/core';
import { HotelConfig } from '../models/hotel.model';

const DEMO_HOTEL: HotelConfig = {
  name: 'Hotel Almara',
  claim: 'Recepción digital, en tu bolsillo',
  logoInitials: 'HA',
  address: 'Paseo de la Alameda, 12',
  wifiNetwork: 'Almara_Guest',
  wifiPassword: 'almara2026',
  receptionPhone: '+34 900 123 456',
  schedules: [
    { id: 'breakfast', icon: 'free_breakfast', name: 'Desayuno', hours: '07:30 - 11:00', location: 'Restaurante Levante' },
    { id: 'pool', icon: 'pool', name: 'Piscina', hours: '09:00 - 20:00', location: 'Planta baja, terraza' },
    { id: 'spa', icon: 'spa', name: 'Spa', hours: '10:00 - 21:00', location: 'Planta -1' },
    { id: 'gym', icon: 'fitness_center', name: 'Gimnasio', hours: '06:00 - 22:00', location: 'Planta -1' },
    { id: 'restaurant', icon: 'restaurant', name: 'Restaurante', hours: '13:00 - 16:00 / 20:00 - 23:00', location: 'Planta baja' }
  ]
};

@Injectable({ providedIn: 'root' })
export class HotelService {
  get hotel(): HotelConfig {
    return DEMO_HOTEL;
  }
}
