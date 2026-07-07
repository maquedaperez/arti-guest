import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { MenuCategory, MenuItem, RoomServiceOrder } from '../models/room-service.model';

const CATEGORIES: MenuCategory[] = [
  { id: 'breakfast', name: 'Desayuno', icon: 'free_breakfast' },
  { id: 'main', name: 'Platos principales', icon: 'lunch_dining' },
  { id: 'light', name: 'Ligero y saludable', icon: 'eco' },
  { id: 'drinks', name: 'Bebidas', icon: 'local_bar' },
  { id: 'dessert', name: 'Postres', icon: 'icecream' }
];

const MENU: MenuItem[] = [
  { id: 'm1', categoryId: 'breakfast', name: 'Tabla continental', description: 'Bollería, embutido, quesos y mermeladas', price: 14.5, icon: 'bakery_dining' },
  { id: 'm2', categoryId: 'breakfast', name: 'Tostada de aguacate', description: 'Aguacate, huevo poché y semillas', price: 11, icon: 'egg' },
  { id: 'm3', categoryId: 'main', name: 'Hamburguesa Almara', description: 'Ternera, queso curado y trufa', price: 19, icon: 'lunch_dining' },
  { id: 'm4', categoryId: 'main', name: 'Arroz de marisco', description: 'Arroz meloso con marisco de lonja', price: 24, icon: 'ramen_dining' },
  { id: 'm5', categoryId: 'light', name: 'Ensalada César', description: 'Pollo, parmesano y crutones', price: 13, icon: 'eco' },
  { id: 'm6', categoryId: 'light', name: 'Bowl poke de atún', description: 'Atún rojo, edamame y arroz sushi', price: 16.5, icon: 'rice_bowl' },
  { id: 'm7', categoryId: 'drinks', name: 'Copa de vino Albariño', description: 'D.O. Rías Baixas', price: 8, icon: 'wine_bar' },
  { id: 'm8', categoryId: 'drinks', name: 'Zumo natural', description: 'Naranja, pomelo o piña', price: 5.5, icon: 'local_bar' },
  { id: 'm9', categoryId: 'dessert', name: 'Coulant de chocolate', description: 'Con helado de vainilla', price: 8.5, icon: 'icecream' },
  { id: 'm10', categoryId: 'dessert', name: 'Tarta de queso', description: 'Al horno, estilo vasco', price: 7.5, icon: 'cake' }
];

@Injectable({ providedIn: 'root' })
export class RoomServiceMenuService {
  private ordersSubject = new BehaviorSubject<RoomServiceOrder[]>([]);
  orders$ = this.ordersSubject.asObservable();

  getCategories(): Observable<MenuCategory[]> {
    return of(CATEGORIES).pipe(delay(400));
  }

  getMenu(): Observable<MenuItem[]> {
    return of(MENU).pipe(delay(500));
  }

  placeOrder(roomNumber: string, lines: { name: string; quantity: number; price: number }[], notes: string): Observable<RoomServiceOrder> {
    const order: RoomServiceOrder = {
      id: `RS-${Math.floor(1000 + Math.random() * 9000)}`,
      roomNumber,
      lines,
      total: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
      notes,
      status: 'received',
      createdAt: new Date().toISOString()
    };

    return of(order).pipe(
      delay(1200),
      tap((o) => {
        this.ordersSubject.next([o, ...this.ordersSubject.value]);
        this.simulateProgress(o.id);
      })
    );
  }

  private simulateProgress(orderId: string): void {
    const steps: RoomServiceOrder['status'][] = ['preparing', 'on_the_way', 'delivered'];
    steps.forEach((status, index) => {
      setTimeout(() => {
        const orders = this.ordersSubject.value.map((o) => (o.id === orderId ? { ...o, status } : o));
        this.ordersSubject.next(orders);
      }, (index + 1) * 6000);
    });
  }
}
