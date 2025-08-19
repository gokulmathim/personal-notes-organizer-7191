# Personal Notes Organizer

This repository contains a full-stack example for a notes app.

- Frontend Container: `notes_frontend` (React)
- Backend Container: `notes_backend` (Express)
- Purpose: A web UI to create, edit, delete, list, and search notes via HTTP API.

## Running Locally

1. Backend:
   - cd `notes_backend`
   - Copy `.env.example` to `.env` and adjust `PORT` and `CORS_ORIGIN`
   - `npm install`
   - `npm start` (default at http://localhost:8000)

2. Frontend:
   - cd `notes_frontend`
   - Copy `.env.example` to `.env` and set `REACT_APP_API_BASE_URL` to the backend URL
   - `npm install`
   - `npm start` (default at http://localhost:3000)

See `notes_frontend/README.md` and `notes_backend/README.md` for details.