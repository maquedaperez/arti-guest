export interface Guest {
  firstName: string;
  lastName: string;
  email: string;
  roomNumber: string;
}

export type CheckinStatus = 'pending' | 'in_progress' | 'completed';
export type CheckoutStatus = 'not_requested' | 'requested' | 'completed';

export interface Stay {
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  guestsCount: number;
  checkinStatus: CheckinStatus;
  checkoutStatus: CheckoutStatus;
  nightsTotal: number;
  balance: number;
}

export interface CheckinFormData {
  documentType: 'dni' | 'pasaporte' | 'nie';
  documentNumber: string;
  phone: string;
  estimatedArrival: string;
  specialRequests: string;
}

export interface CheckoutFeedback {
  rating: number;
  comment: string;
}
