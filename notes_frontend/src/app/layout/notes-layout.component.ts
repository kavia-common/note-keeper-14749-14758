import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notes-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">
          <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:var(--color-primary)"></span>
          Note Keeper
        </div>

        <div class="card" style="padding:.75rem">
          <div style="font-weight:600;color:var(--muted);font-size:.85rem;margin-bottom:.5rem">Quick actions</div>
          <a class="btn btn-accent" [routerLink]="['/notes/new']">+ New note</a>
        </div>

        <nav class="nav" style="display:flex;flex-direction:column;gap:.25rem">
          <a routerLink="/notes" routerLinkActive="active">All notes</a>
        </nav>

        <div style="margin-top:auto;color:var(--muted);font-size:.8rem">
          <div>Theme: Light</div>
          <div>Primary: #1976d2</div>
          <div>Accent: #ffca28</div>
        </div>
      </aside>

      <main>
        <header class="header">
          <div style="display:flex;align-items:center;gap:.5rem">
            <div style="width:8px;height:8px;border-radius:2px;background:var(--color-accent)"></div>
            <div class="section-title">Your notes</div>
          </div>
          <a class="btn btn-primary" [routerLink]="['/notes/new']">Create note</a>
        </header>
        <section class="content">
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `
})
export class NotesLayoutComponent {
  // PUBLIC_INTERFACE
  /** Layout component with sidebar + main content area. */
  collapsed = signal(false);
}
