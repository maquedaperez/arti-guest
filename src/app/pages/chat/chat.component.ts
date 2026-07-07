import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopHeaderComponent } from '../../shared/components/top-header/top-header.component';
import { ChatService } from '../../core/services/chat.service';
import { ChatMessage } from '../../core/models/chat.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, TopHeaderComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  private chatService = inject(ChatService);

  @ViewChild('scrollAnchor') scrollAnchor?: ElementRef<HTMLDivElement>;

  messages: ChatMessage[] = [];
  draft = '';
  thinking = false;

  suggestions = ['¿Hasta qué hora abre el spa?', '¿Dónde puedo aparcar?', '¿Cómo hago el check-out?'];

  ngOnInit(): void {
    this.messages.push({
      id: 'welcome',
      role: 'assistant',
      text: 'Hola, soy el asistente de Hotel Almara. Pregúntame lo que necesites sobre tu estancia.',
      timestamp: this.now()
    });
  }

  send(text?: string): void {
    const content = (text ?? this.draft).trim();
    if (!content) return;

    this.messages.push({ id: this.newId(), role: 'user', text: content, timestamp: this.now() });
    this.draft = '';
    this.thinking = true;
    this.scrollToEnd();

    this.chatService.ask(content).subscribe((answer) => {
      this.messages.push({ id: this.newId(), role: 'assistant', text: answer, timestamp: this.now() });
      this.thinking = false;
      this.scrollToEnd();
    });
  }

  private scrollToEnd(): void {
    setTimeout(() => {
      this.scrollAnchor?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  private now(): string {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  private newId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
