export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

export type OrderStatus = 'received' | 'preparing' | 'on_the_way' | 'delivered';

export interface RoomServiceOrder {
  id: string;
  roomNumber: string;
  lines: { name: string; quantity: number; price: number }[];
  total: number;
  notes: string;
  status: OrderStatus;
  createdAt: string;
}
