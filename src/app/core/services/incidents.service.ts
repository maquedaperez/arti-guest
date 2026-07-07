import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { Incident, IncidentCategory } from '../models/incident.model';

const CATEGORIES: IncidentCategory[] = [
  { id: 'ac', name: 'Aire acondicionado', icon: 'ac_unit' },
  { id: 'tv', name: 'Televisión', icon: 'tv' },
  { id: 'shower', name: 'Ducha / baño', icon: 'shower' },
  { id: 'wifi', name: 'Wifi', icon: 'wifi' },
  { id: 'cleaning', name: 'Limpieza', icon: 'cleaning_services' },
  { id: 'other', name: 'Otro', icon: 'report_problem' }
];

@Injectable({ providedIn: 'root' })
export class IncidentsService {
  private incidentsSubject = new BehaviorSubject<Incident[]>([]);
  incidents$ = this.incidentsSubject.asObservable();

  getCategories(): Observable<IncidentCategory[]> {
    return of(CATEGORIES).pipe(delay(300));
  }

  create(roomNumber: string, categoryId: string, description: string, hasPhoto: boolean): Observable<Incident> {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    const incident: Incident = {
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      categoryId,
      categoryName: category?.name ?? 'Otro',
      description,
      hasPhoto,
      status: 'open',
      createdAt: new Date().toISOString(),
      roomNumber
    };

    return of(incident).pipe(
      delay(1100),
      tap((i) => {
        this.incidentsSubject.next([i, ...this.incidentsSubject.value]);
        this.simulateProgress(i.id);
      })
    );
  }

  private simulateProgress(incidentId: string): void {
    const steps: Incident['status'][] = ['assigned', 'resolved'];
    steps.forEach((status, index) => {
      setTimeout(() => {
        const incidents = this.incidentsSubject.value.map((i) => (i.id === incidentId ? { ...i, status } : i));
        this.incidentsSubject.next(incidents);
      }, (index + 1) * 7000);
    });
  }
}
