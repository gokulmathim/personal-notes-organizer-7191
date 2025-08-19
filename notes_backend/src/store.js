import { nanoid } from 'nanoid';

// A very simple in-memory data store. Replace with DB as needed.
const state = {
  notes: [],
  categories: new Map() // key: id, value: { id, name }
};

// Initialize categories from env
const defaultCategories = (process.env.DEFAULT_CATEGORIES || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

for (const id of defaultCategories) {
  if (!state.categories.has(id)) {
    state.categories.set(id, { id, name: capitalize(id) });
  }
}

// Seed with one example note
if (state.notes.length === 0) {
  const seedCategory = defaultCategories[0] || 'general';
  if (!state.categories.has(seedCategory)) {
    state.categories.set(seedCategory, { id: seedCategory, name: capitalize(seedCategory) });
  }
  const now = new Date().toISOString();
  state.notes.push({
    id: nanoid(12),
    title: 'Welcome',
    content: 'This is your first note. Edit or create more!',
    category: seedCategory,
    createdAt: now,
    updatedAt: now
  });
}

// Helpers
function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// PUBLIC_INTERFACE
export function listNotes({ q, category }) {
  /** List notes with optional text and category filters. */
  let out = [...state.notes];
  if (category) {
    out = out.filter(n => (n.category || '') === category);
  }
  if (q) {
    const query = q.toLowerCase();
    out = out.filter(n => (n.title || '').toLowerCase().includes(query) || (n.content || '').toLowerCase().includes(query));
  }
  // Sort by updatedAt desc
  out.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return out;
}

// PUBLIC_INTERFACE
export function getNote(id) {
  /** Get a single note by id or null if not found. */
  return state.notes.find(n => n.id === id) || null;
}

// PUBLIC_INTERFACE
export function createNote({ title, content, category }) {
  /** Create a new note and ensure category exists. */
  const now = new Date().toISOString();
  const id = nanoid(12);
  const cat = category || 'general';
  ensureCategory(cat);
  const note = {
    id,
    title: title || '',
    content: content || '',
    category: cat,
    createdAt: now,
    updatedAt: now
  };
  state.notes.push(note);
  return note;
}

// PUBLIC_INTERFACE
export function updateNote(id, payload) {
  /** Update an existing note. Returns updated note or null. */
  const idx = state.notes.findIndex(n => n.id === id);
  if (idx === -1) return null;
  const prev = state.notes[idx];
  const next = {
    ...prev,
    ...payload,
    updatedAt: new Date().toISOString()
  };
  if (payload && payload.category) {
    ensureCategory(payload.category);
  }
  state.notes[idx] = next;
  return next;
}

// PUBLIC_INTERFACE
export function deleteNote(id) {
  /** Delete note by id. Returns true if deleted. */
  const idx = state.notes.findIndex(n => n.id === id);
  if (idx === -1) return false;
  state.notes.splice(idx, 1);
  return true;
}

// PUBLIC_INTERFACE
export function listCategoriesWithCounts() {
  /** List categories with note counts. If a note references a category not in map, add it. */
  const counts = new Map();
  for (const n of state.notes) {
    const cat = n.category || 'general';
    counts.set(cat, (counts.get(cat) || 0) + 1);
    ensureCategory(cat);
  }
  const result = [];
  for (const [id, cat] of state.categories.entries()) {
    result.push({ id, name: cat.name, count: counts.get(id) || 0 });
  }
  // Sort alphabetically by name
  result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

function ensureCategory(id) {
  if (!id) return;
  if (!state.categories.has(id)) {
    state.categories.set(id, { id, name: capitalize(id) });
  }
}
