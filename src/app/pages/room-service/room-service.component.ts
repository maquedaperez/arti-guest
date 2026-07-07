import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopHeaderComponent } from '../../shared/components/top-header/top-header.component';
import { StatusBadgeComponent, StatusTone } from '../../shared/components/status-badge/status-badge.component';
import { RoomServiceMenuService } from '../../core/services/room-service-menu.service';
import { GuestService } from '../../core/services/guest.service';
import { CartLine, MenuCategory, MenuItem, OrderStatus, RoomServiceOrder } from '../../core/models/room-service.model';

type ViewMode = 'menu' | 'cart' | 'placing' | 'placed';

@Component({
  selector: 'app-room-service',
  standalone: true,
  imports: [CommonModule, FormsModule, TopHeaderComponent, StatusBadgeComponent],
  templateUrl: './room-service.component.html',
  styleUrl: './room-service.component.scss'
})
export class RoomServiceComponent implements OnInit {
  private menuService = inject(RoomServiceMenuService);
  private guestService = inject(GuestService);

  categories: MenuCategory[] = [];
  items: MenuItem[] = [];
  activeCategoryId = '';
  loading = true;

  cart: CartLine[] = [];
  notes = '';
  mode: ViewMode = 'menu';
  lastOrder: RoomServiceOrder | null = null;
  orders: RoomServiceOrder[] = [];

  ngOnInit(): void {
    this.menuService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.activeCategoryId = categories[0]?.id ?? '';
    });
    this.menuService.getMenu().subscribe((items) => {
      this.items = items;
      this.loading = false;
    });
    this.menuService.orders$.subscribe((orders) => {
      this.orders = orders.filter((o) => o.roomNumber === this.guestService.stay?.roomNumber);
    });
  }

  get visibleItems(): MenuItem[] {
    return this.items.filter((item) => item.categoryId === this.activeCategoryId);
  }

  get cartCount(): number {
    return this.cart.reduce((sum, line) => sum + line.quantity, 0);
  }

  get cartTotal(): number {
    return this.cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  }

  quantityFor(item: MenuItem): number {
    return this.cart.find((line) => line.item.id === item.id)?.quantity ?? 0;
  }

  add(item: MenuItem): void {
    const existing = this.cart.find((line) => line.item.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ item, quantity: 1 });
    }
  }

  remove(item: MenuItem): void {
    const existing = this.cart.find((line) => line.item.id === item.id);
    if (!existing) return;
    existing.quantity--;
    if (existing.quantity <= 0) {
      this.cart = this.cart.filter((line) => line.item.id !== item.id);
    }
  }

  openCart(): void {
    this.mode = 'cart';
  }

  backToMenu(): void {
    this.mode = 'menu';
  }

  placeOrder(): void {
    const roomNumber = this.guestService.stay?.roomNumber ?? '';
    const lines = this.cart.map((line) => ({ name: line.item.name, quantity: line.quantity, price: line.item.price }));

    this.mode = 'placing';
    this.menuService.placeOrder(roomNumber, lines, this.notes).subscribe((order) => {
      this.lastOrder = order;
      this.cart = [];
      this.notes = '';
      this.mode = 'placed';
    });
  }

  statusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      received: 'Recibido',
      preparing: 'En cocina',
      on_the_way: 'En camino',
      delivered: 'Entregado'
    };
    return labels[status];
  }

  statusTone(status: OrderStatus): StatusTone {
    const tones: Record<OrderStatus, StatusTone> = {
      received: 'neutral',
      preparing: 'warning',
      on_the_way: 'brass',
      delivered: 'success'
    };
    return tones[status];
  }
}
