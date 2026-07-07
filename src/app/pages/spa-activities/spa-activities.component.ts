import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopHeaderComponent } from '../../shared/components/top-header/top-header.component';
import { SpaActivitiesService } from '../../core/services/spa-activities.service';
import { Experience, ExperienceKind } from '../../core/models/spa.model';

type ViewMode = 'list' | 'booking' | 'confirming' | 'confirmed';

@Component({
  selector: 'app-spa-activities',
  standalone: true,
  imports: [CommonModule, TopHeaderComponent],
  templateUrl: './spa-activities.component.html',
  styleUrl: './spa-activities.component.scss'
})
export class SpaActivitiesComponent implements OnInit {
  private spaService = inject(SpaActivitiesService);

  experiences: Experience[] = [];
  loading = true;
  activeKind: ExperienceKind = 'spa';

  mode: ViewMode = 'list';
  selectedExperience: Experience | null = null;
  selectedSlot = '';

  ngOnInit(): void {
    this.spaService.getExperiences().subscribe((experiences) => {
      this.experiences = experiences;
      this.loading = false;
    });
  }

  get visibleExperiences(): Experience[] {
    return this.experiences.filter((e) => e.kind === this.activeKind);
  }

  openBooking(experience: Experience): void {
    this.selectedExperience = experience;
    this.selectedSlot = '';
    this.mode = 'booking';
  }

  backToList(): void {
    this.mode = 'list';
  }

  confirm(): void {
    if (!this.selectedExperience || !this.selectedSlot) return;
    this.mode = 'confirming';
    const today = new Date().toISOString().substring(0, 10);

    this.spaService.book(this.selectedExperience, today, this.selectedSlot).subscribe(() => {
      this.mode = 'confirmed';
    });
  }

  reset(): void {
    this.mode = 'list';
    this.selectedExperience = null;
    this.selectedSlot = '';
  }
}
