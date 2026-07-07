import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { Experience, ExperienceBooking } from '../models/spa.model';

const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    kind: 'spa',
    name: 'Circuito termal',
    description: 'Acceso a piscina termal, sauna y jacuzzi',
    duration: '90 min',
    price: 35,
    icon: 'hot_tub',
    slots: ['10:00', '12:00', '16:00', '18:00']
  },
  {
    id: 'e2',
    kind: 'spa',
    name: 'Masaje relajante',
    description: 'Masaje corporal completo con aceites esenciales',
    duration: '60 min',
    price: 65,
    icon: 'spa',
    slots: ['11:00', '13:00', '17:00', '19:00']
  },
  {
    id: 'e3',
    kind: 'activity',
    name: 'Yoga al amanecer',
    description: 'Sesión guiada en la terraza frente al mar',
    duration: '45 min',
    price: 0,
    icon: 'self_improvement',
    slots: ['08:00']
  },
  {
    id: 'e4',
    kind: 'activity',
    name: 'Ruta en bicicleta',
    description: 'Recorrido guiado por la costa, bici incluida',
    duration: '2 h',
    price: 20,
    icon: 'directions_bike',
    slots: ['09:30', '17:00']
  },
  {
    id: 'e5',
    kind: 'activity',
    name: 'Cata de vinos locales',
    description: 'Selección de 5 vinos de la D.O. de la región',
    duration: '75 min',
    price: 28,
    icon: 'wine_bar',
    slots: ['19:30']
  }
];

@Injectable({ providedIn: 'root' })
export class SpaActivitiesService {
  private bookingsSubject = new BehaviorSubject<ExperienceBooking[]>([]);
  bookings$ = this.bookingsSubject.asObservable();

  getExperiences(): Observable<Experience[]> {
    return of(EXPERIENCES).pipe(delay(500));
  }

  book(experience: Experience, date: string, time: string): Observable<ExperienceBooking> {
    const booking: ExperienceBooking = {
      id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
      experienceName: experience.name,
      kind: experience.kind,
      date,
      time,
      createdAt: new Date().toISOString()
    };

    return of(booking).pipe(
      delay(1000),
      tap((b) => this.bookingsSubject.next([b, ...this.bookingsSubject.value]))
    );
  }
}
