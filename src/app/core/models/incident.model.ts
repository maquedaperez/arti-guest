export interface IncidentCategory {
  id: string;
  name: string;
  icon: string;
}

export type IncidentStatus = 'open' | 'assigned' | 'resolved';

export interface Incident {
  id: string;
  categoryId: string;
  categoryName: string;
  description: string;
  hasPhoto: boolean;
  status: IncidentStatus;
  createdAt: string;
  roomNumber: string;
}
