import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotesService } from './notes.service';
import { DatePipe } from '@angular/common';

// Declare browser global for linter; available at runtime in browser.
declare const confirm: (message?: string) => boolean;

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <ng-container *ngIf="loaded(); else missing">
      <div class="card" style="padding:1rem;display:grid;gap:.5rem">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem">
          <div>
            <div class="note-title" style="font-size:1.25rem">{{ note()?.title || 'Untitled' }}</div>
            <div class="note-meta">
              Created {{ note()?.createdAt | date:'short' }} · Updated {{ note()?.updatedAt | date:'short' }}
            </div>
          </div>
          <div style="display:flex;gap:.5rem">
            <a class="btn" [routerLink]="['/notes']">Back</a>
            <a class="btn btn-primary" [routerLink]="['/notes', note()?.id, 'edit']">Edit</a>
            <button class="btn btn-danger" (click)="onDelete()">Delete</button>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);margin:.5rem 0"></div>
        <div style="white-space:pre-wrap">{{ note()?.content || 'No content' }}</div>
      </div>
    </ng-container>

    <ng-template #missing>
      <div class="card" style="padding:1rem;color:var(--muted)">
        Note not found.
      </div>
    </ng-template>
  `
})
export class NoteDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private svc = inject(NotesService);

  note = signal(this.svc.get(this.route.snapshot.paramMap.get('id') || ''));
  loaded = signal(true);

  onDelete(): void {
    const id = this.note()?.id;
    if (!id) return;
    if (typeof confirm === 'function' ? confirm('Delete this note?') : true) {
      this.svc.delete(id);
      this.router.navigate(['/notes']);
    }
  }
}
