import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { CheckinFormData, Guest, Stay } from '../models/guest.model';

const STORAGE_KEY = 'arti_guest_session';

interface GuestSession {
  guest: Guest;
  stay: Stay;
}

function buildDemoSession(roomNumber: string, lastName: string): GuestSession {
  const today = new Date();
  const checkOut = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
  const formatDate = (date: Date) => date.toISOString().substring(0, 10);

  return {
    guest: {
      firstName: 'Abraham',
      lastName: lastName || 'García',
      email: 'abraham@example.com',
      roomNumber
    },
    stay: {
      roomNumber,
      roomType: 'Doble Superior Vista Mar',
      checkInDate: formatDate(today),
      checkOutDate: formatDate(checkOut),
      checkInTime: '15:00',
      checkOutTime: '12:00',
      guestsCount: 2,
      checkinStatus: 'pending',
      checkoutStatus: 'not_requested',
      nightsTotal: 3,
      balance: 428.5
    }
  };
}

@Injectable({ providedIn: 'root' })
export class GuestService {
  private sessionSubject = new BehaviorSubject<GuestSession | null>(this.readStored());
  session$ = this.sessionSubject.asObservable();

  get session(): GuestSession | null {
    return this.sessionSubject.value;
  }

  get guest(): Guest | null {
    return this.session?.guest ?? null;
  }

  get stay(): Stay | null {
    return this.session?.stay ?? null;
  }

  get hasActiveSession(): boolean {
    return !!this.session;
  }

  accessRoom(roomNumber: string, lastName: string): Observable<GuestSession> {
    const newSession = buildDemoSession(roomNumber, lastName);
    return of(newSession).pipe(
      delay(700),
      tap((s) => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
        this.sessionSubject.next(s);
      })
    );
  }

  submitCheckin(_form: CheckinFormData): Observable<Stay> {
    return of(null).pipe(
      delay(1100),
      tap(() => this.patchStay({ checkinStatus: 'completed' }))
    ) as unknown as Observable<Stay>;
  }

  requestCheckout(): Observable<Stay> {
    return of(null).pipe(
      delay(1100),
      tap(() => this.patchStay({ checkoutStatus: 'requested' }))
    ) as unknown as Observable<Stay>;
  }

  private patchStay(patch: Partial<Stay>): void {
    const current = this.session;
    if (!current) return;
    const updated: GuestSession = { ...current, stay: { ...current.stay, ...patch } };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    this.sessionSubject.next(updated);
  }

  logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    this.sessionSubject.next(null);
  }

  private readStored(): GuestSession | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as GuestSession;
    } catch {
      return null;
    }
  }
}
