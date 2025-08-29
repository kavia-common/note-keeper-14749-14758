import { TestBed } from '@angular/core/testing';
import { NotesLayoutComponent } from './notes-layout.component';

describe('NotesLayoutComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [NotesLayoutComponent]
    }).compileComponents();
    const fixture = TestBed.createComponent(NotesLayoutComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
