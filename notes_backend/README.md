# Notes Backend (Express)

Simple Node/Express API for managing notes with categories, supporting CRUD and search.

## Quickstart

1. Copy `.env.example` to `.env` and adjust values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server (default port 8000):
   ```bash
   npm run start
   ```
   For development with watch:
   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT` — Server port (default: `8000`)
- `CORS_ORIGIN` — Allowed origin for CORS (e.g., `http://localhost:3000`)
- `DEFAULT_CATEGORIES` — Optional comma-separated seed categories (e.g., `work,personal,ideas`)

Use a `.env` file to set these.

## API

Base URL: `http://localhost:PORT`

- `GET /health` → Health check
- `GET /notes?q=&category=` → List notes (filter by `q` in title/content and/or `category`)
- `POST /notes` → Create note
- `GET /notes/:id` → Get note by id
- `PUT /notes/:id` → Update note (any of title/content/category)
- `DELETE /notes/:id` → Delete note
- `GET /categories` → List categories with counts (`[{ id, name, count }]`)

### Note model

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "category": "string",
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

### Examples

Create:
```http
POST /notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "Hello world",
  "category": "work"
}
```

Search:
```http
GET /notes?q=hello&category=work
```

## Data Persistence

This demo uses in-memory storage. Data resets on restart. Swap the `store` implementation for a database if needed.
