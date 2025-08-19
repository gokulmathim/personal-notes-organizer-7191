# Notes Frontend (React)

A minimalistic, light-themed React application for creating, editing, organizing, and searching personal notes.

## Features

- Create note
- Edit note
- Delete note
- View notes list
- Search notes
- Category filtering (sidebar)

## Layout

- Top navigation bar with brand, search, and New Note button
- Sidebar for note categories
- Main content area displaying the notes list and editor side-by-side

## Theme

- Light, minimalistic design
- Colors:
  - Primary: `#1976D2`
  - Accent: `#FFC107`
  - Secondary: `#424242`

## Backend API

The app communicates with a backend via HTTP. Set the base URL using an environment variable.

- A reference backend is included at `../notes_backend` (Express). Start it on port 8000 by default.
- Ensure CORS is configured via `CORS_ORIGIN` on the backend.

1. Copy `.env.example` to `.env`
2. Set the variable:
   - `REACT_APP_API_BASE_URL` — e.g., `http://localhost:8000`

Expected endpoints (JSON):
- `GET /notes?q=&category=` → list notes
- `POST /notes` → create note
- `GET /notes/:id` → get note
- `PUT /notes/:id` → update note
- `DELETE /notes/:id` → delete note
- `GET /categories` → list categories with optional counts

Note model (example):
```json
{
  "id": "uuid-or-number",
  "title": "My Note",
  "content": "Markdown or plain text...",
  "category": "work",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:10:00Z"
}
```

Category model (example):
```json
{ "id": "work", "name": "Work", "count": 3 }
```

## Getting Started

Install dependencies and start:

```bash
npm install
npm start
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Project Structure

- `src/components` — Navbar, Sidebar, NotesList, NoteEditor, StatusBar
- `src/hooks` — `useNotes` manages state and API integration
- `src/services` — `api.js` wraps axios requests

## Accessibility

- Keyboard-focusable interactive elements
- ARIA roles/labels for main structural components

## Notes

- Ensure the backend supports CORS for the frontend origin during development.
