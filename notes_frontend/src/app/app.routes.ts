import { Routes } from '@angular/router';
import { NotesLayoutComponent } from './layout/notes-layout.component';
import { NotesListComponent } from './notes/notes-list.component';
import { NoteDetailComponent } from './notes/note-detail.component';
import { NoteEditorComponent } from './notes/note-editor.component';

export const routes: Routes = [
  {
    path: '',
    component: NotesLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'notes' },
      { path: 'notes', component: NotesListComponent },
      { path: 'notes/new', component: NoteEditorComponent },
      { path: 'notes/:id', component: NoteDetailComponent },
      { path: 'notes/:id/edit', component: NoteEditorComponent },
      { path: '**', redirectTo: 'notes' }
    ]
  }
];
