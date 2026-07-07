import { Injectable, inject } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { HotelService } from './hotel.service';

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hotelService = inject(HotelService);

  private knowledgeBase: KnowledgeEntry[] = [
    {
      keywords: ['spa', 'masaje', 'circuito'],
      answer: 'El spa abre de 10:00 a 21:00 en la planta -1. Puedes reservar circuito termal o masajes desde la sección "Spa y actividades".'
    },
    {
      keywords: ['piscina'],
      answer: 'La piscina está abierta de 09:00 a 20:00, en la terraza de planta baja. Las toallas están disponibles en la propia zona de piscina.'
    },
    {
      keywords: ['desayuno', 'breakfast'],
      answer: 'El desayuno se sirve de 07:30 a 11:00 en el Restaurante Levante, en planta baja. Está incluido en tu reserva.'
    },
    {
      keywords: ['aparcar', 'parking', 'coche', 'garaje'],
      answer: 'Tenemos parking privado en el sótano del hotel, con acceso desde la calle lateral. El coste es de 15 €/noche.'
    },
    {
      keywords: ['restaurante', 'italiano', 'comer', 'cenar'],
      answer: 'Cerca del hotel te recomiendo Trattoria Bellini (5 min andando) para cocina italiana, y La Marisquería para pescado fresco.'
    },
    {
      keywords: ['checkout', 'check-out', 'salida'],
      answer: 'El check-out es hasta las 12:00. Puedes solicitarlo y valorar tu estancia directamente desde la sección "Check-out".'
    },
    {
      keywords: ['checkin', 'check-in', 'llegada'],
      answer: 'Puedes completar tu check-in online desde la sección "Check-in" para agilizar tu llegada, sin pasar por recepción.'
    },
    {
      keywords: ['wifi', 'contraseña', 'internet'],
      answer: 'La red wifi del hotel es la que aparece en la sección de información del hotel, con la contraseña incluida.'
    },
    {
      keywords: ['visitar', 'museo', 'playa', 'excursión', 'excursion'],
      answer: 'A 10 minutos tienes el Museo de Bellas Artes y el paseo marítimo. Si prefieres playa, la Playa de la Concha está a 15 min en coche.'
    },
    {
      keywords: ['gimnasio', 'gym'],
      answer: 'El gimnasio está abierto de 06:00 a 22:00, en la planta -1, junto al spa.'
    }
  ];

  private fallback =
    'Buena pregunta. Recepción puede ayudarte con eso al detalle — ¿quieres que te ponga en contacto con ellos?';

  ask(question: string): Observable<string> {
    const normalized = question.toLowerCase();
    const match = this.knowledgeBase.find((entry) => entry.keywords.some((k) => normalized.includes(k)));
    const answer = match?.answer ?? this.fallback;
    return of(answer).pipe(delay(900 + Math.random() * 500));
  }
}
