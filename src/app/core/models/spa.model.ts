export type ExperienceKind = 'spa' | 'activity';

export interface Experience {
  id: string;
  kind: ExperienceKind;
  name: string;
  description: string;
  duration: string;
  price: number;
  icon: string;
  slots: string[];
}

export interface ExperienceBooking {
  id: string;
  experienceName: string;
  kind: ExperienceKind;
  date: string;
  time: string;
  createdAt: string;
}
