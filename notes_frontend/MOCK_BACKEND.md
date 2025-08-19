# Mock Backend (Optional)

This project expects a backend exposing REST endpoints:

- GET /notes?q=&category=
- POST /notes
- GET /notes/:id
- PUT /notes/:id
- DELETE /notes/:id
- GET /categories

If you don't have a backend yet, you can quickly mock with a tool like json-server:

1) Create `db.json`:
```json
{
  "notes": [],
  "categories": [
    { "id": "work", "name": "Work", "count": 0 },
    { "id": "personal", "name": "Personal", "count": 0 }
  ]
}
```

2) Install and run:
```bash
npm install -g json-server
json-server --watch db.json --port 8000
```

3) Set `.env`:
```
REACT_APP_API_BASE_URL=http://localhost:8000
```

Note: You may need to implement mapping for counts and query parameters to match the app's expectations.
