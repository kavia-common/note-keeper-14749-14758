import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotesService } from './notes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="card" style="padding:1rem;display:grid;gap:.75rem">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="section-title">{{ isEdit() ? 'Edit note' : 'New note' }}</div>
        <a class="btn" [routerLink]="noteId() ? ['/notes', noteId()] : ['/notes']">Cancel</a>
      </div>

      <label>
        <div style="font-weight:600;margin-bottom:.25rem">Title</div>
        <input class="input" [(ngModel)]="title" placeholder="Note title" />
      </label>

      <label>
        <div style="font-weight:600;margin-bottom:.25rem">Content</div>
        <textarea class="textarea" [(ngModel)]="content" placeholder="Write your note..."></textarea>
      </label>

      <div style="display:flex;gap:.5rem;justify-content:flex-end">
        <button class="btn" type="button" [routerLink]="noteId() ? ['/notes', noteId()] : ['/notes']">Discard</button>
        <button class="btn btn-primary" type="button" (click)="onSave()" [disabled]="!title.trim() && !content.trim()">
          {{ isEdit() ? 'Save changes' : 'Create note' }}
        </button>
      </div>
    </div>
  `
})
export class NoteEditorComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private svc = inject(NotesService);

  noteId = signal<string | null>(this.route.snapshot.paramMap.get('id'));
  isEdit = computed(() => !!this.noteId());
  title = '';
  content = '';

  constructor() {
    if (this.isEdit()) {
      const n = this.svc.get(this.noteId()!);
      if (n) {
        this.title = n.title;
        this.content = n.content;
      }
    }
  }

  // PUBLIC_INTERFACE
  /** Save or create a note and navigate to its detail page. */
  onSave(): void {
    if (this.isEdit()) {
      const updated = this.svc.update(this.noteId()!, { title: this.title, content: this.content });
      this.router.navigate(['/notes', updated?.id ?? this.noteId()]);
    } else {
      const created = this.svc.create(this.title, this.content);
      this.router.navigate(['/notes', created.id]);
    }
  }
}
