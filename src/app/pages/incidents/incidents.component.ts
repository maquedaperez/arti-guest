import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopHeaderComponent } from '../../shared/components/top-header/top-header.component';
import { StatusBadgeComponent, StatusTone } from '../../shared/components/status-badge/status-badge.component';
import { IncidentsService } from '../../core/services/incidents.service';
import { GuestService } from '../../core/services/guest.service';
import { Incident, IncidentCategory, IncidentStatus } from '../../core/models/incident.model';

type ViewMode = 'list' | 'new' | 'sending' | 'sent';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule, FormsModule, TopHeaderComponent, StatusBadgeComponent],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss'
})
export class IncidentsComponent implements OnInit {
  private incidentsService = inject(IncidentsService);
  private guestService = inject(GuestService);

  categories: IncidentCategory[] = [];
  incidents: Incident[] = [];
  mode: ViewMode = 'list';

  selectedCategoryId = '';
  description = '';
  photoAttached = false;
  lastIncident: Incident | null = null;

  ngOnInit(): void {
    this.incidentsService.getCategories().subscribe((categories) => (this.categories = categories));
    this.incidentsService.incidents$.subscribe((incidents) => {
      this.incidents = incidents.filter((i) => i.roomNumber === this.guestService.stay?.roomNumber);
    });
  }

  startNew(): void {
    this.mode = 'new';
    this.selectedCategoryId = '';
    this.description = '';
    this.photoAttached = false;
  }

  cancelNew(): void {
    this.mode = 'list';
  }

  attachPhoto(): void {
    this.photoAttached = true;
  }

  submit(): void {
    if (!this.selectedCategoryId || !this.description) return;

    this.mode = 'sending';
    const roomNumber = this.guestService.stay?.roomNumber ?? '';

    this.incidentsService.create(roomNumber, this.selectedCategoryId, this.description, this.photoAttached).subscribe((incident) => {
      this.lastIncident = incident;
      this.mode = 'sent';
    });
  }

  backToList(): void {
    this.mode = 'list';
  }

  statusLabel(status: IncidentStatus): string {
    const labels: Record<IncidentStatus, string> = {
      open: 'Recibida',
      assigned: 'Técnico asignado',
      resolved: 'Resuelta'
    };
    return labels[status];
  }

  statusTone(status: IncidentStatus): StatusTone {
    const tones: Record<IncidentStatus, StatusTone> = {
      open: 'neutral',
      assigned: 'warning',
      resolved: 'success'
    };
    return tones[status];
  }
}
