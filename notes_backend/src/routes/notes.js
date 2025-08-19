import { Router } from 'express';
import { listNotes, getNote, createNote, updateNote, deleteNote as deleteNoteFromStore } from '../store.js';

export const notesRouter = Router();

/**
 * GET /notes
 * Query: q, category
 */
notesRouter.get('/', (req, res) => {
  const { q, category } = req.query;
  const notes = listNotes({ q, category });
  res.json(notes);
});

/**
 * POST /notes
 * Body: { title, content, category }
 */
notesRouter.post('/', (req, res) => {
  const { title, content, category } = req.body || {};
  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({ error: 'Invalid payload: title and content must be strings' });
  }
  const note = createNote({ title, content, category });
  return res.status(201).json(note);
});

/**
 * GET /notes/:id
 */
notesRouter.get('/:id', (req, res) => {
  const note = getNote(req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  return res.json(note);
});

/**
 * PUT /notes/:id
 * Body: partial { title?, content?, category? }
 */
notesRouter.put('/:id', (req, res) => {
  const payload = {};
  const { title, content, category } = req.body || {};
  if (title !== undefined) {
    if (typeof title !== 'string') return res.status(400).json({ error: 'title must be a string' });
    payload.title = title;
  }
  if (content !== undefined) {
    if (typeof content !== 'string') return res.status(400).json({ error: 'content must be a string' });
    payload.content = content;
  }
  if (category !== undefined) {
    if (typeof category !== 'string') return res.status(400).json({ error: 'category must be a string' });
    payload.category = category;
  }
  const updated = updateNote(req.params.id, payload);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  return res.json(updated);
});

/**
 * DELETE /notes/:id
 */
notesRouter.delete('/:id', (req, res) => {
  const ok = deleteNoteFromStore(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  return res.status(204).send();
});
