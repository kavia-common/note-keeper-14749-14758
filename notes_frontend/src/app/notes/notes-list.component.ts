import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotesService } from './notes.service';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [RouterLink, DatePipe, SlicePipe],
  template: `
    <div class="card" style="padding:1rem">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:.5rem">
        <div class="section-title">All notes</div>
        <a class="btn btn-accent" routerLink="/notes/new">New</a>
      </div>
      <div *ngIf="notes().length === 0" style="color:var(--muted);padding:.75rem">
        No notes yet. Click "New" to create your first note.
      </div>
      <div style="display:flex;flex-direction:column;gap:.5rem">
        <a class="list-item" *ngFor="let n of notes()" [routerLink]="['/notes', n.id]">
          <div style="min-width:0">
            <div class="note-title" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ n.title || 'Untitled' }}</div>
            <div class="note-meta">Updated {{ n.updatedAt | date:'short' }}</div>
          </div>
          <span class="badge">Open</span>
        </a>
      </div>
    </div>
  `
})
export class NotesListComponent {
  private svc = inject(NotesService);
  notes = computed(() => this.svc.all()());
}
