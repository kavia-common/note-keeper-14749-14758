export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export function nowIso(): string {
  return new Date().toISOString();
}
