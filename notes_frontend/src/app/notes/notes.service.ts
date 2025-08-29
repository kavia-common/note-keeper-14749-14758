import { Injectable, signal } from '@angular/core';
import { Note, nowIso } from './note.model';
import { v4 as uuidv4 } from './uuid';

const STORAGE_KEY = 'notes-app-items';

// Declare browser globals for linter; guarded at runtime for SSR.
// Use 'any' to avoid referencing DOM lib types that eslint treats as undefined in this environment.
declare const localStorage: any;

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notesSig = signal<Note[]>(this.load());
  // PUBLIC_INTERFACE
  /** Returns a reactive signal of all notes sorted by updatedAt desc. */
  all = this.notesSig.asReadonly;

  // PUBLIC_INTERFACE
  /** Get a single note by id. */
  get(id: string): Note | undefined {
    return this.notesSig().find(n => n.id === id);
  }

  // PUBLIC_INTERFACE
  /** Create a new note. */
  create(title: string, content: string): Note {
    const n: Note = {
      id: uuidv4(),
      title: title?.trim() || 'Untitled',
      content: content ?? '',
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    const updated = [n, ...this.notesSig()];
    this.notesSig.set(this.sort(updated));
    this.persist();
    return n;
  }

  // PUBLIC_INTERFACE
  /** Update an existing note by id. */
  update(id: string, patch: Partial<Pick<Note, 'title'|'content'>>): Note | undefined {
    let updatedNote: Note | undefined;
    const next = this.notesSig().map(n => {
      if (n.id !== id) return n;
      updatedNote = { ...n, ...patch, updatedAt: nowIso() };
      return updatedNote;
    });
    this.notesSig.set(this.sort(next));
    this.persist();
    return updatedNote;
  }

  // PUBLIC_INTERFACE
  /** Delete a note by id. */
  delete(id: string): void {
    this.notesSig.set(this.notesSig().filter(n => n.id !== id));
    this.persist();
  }

  private sort(arr: Note[]): Note[] {
    return [...arr].sort((a,b)=> (b.updatedAt.localeCompare(a.updatedAt)));
  }

  private load(): Note[] {
    try{
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return [];
      const arr = JSON.parse(raw) as Note[];
      return Array.isArray(arr) ? this.sort(arr) : [];
    }catch { return []; }
  }

  private persist(): void {
    try{
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notesSig()));
    }catch { /* ignore quota */ }
  }
}
