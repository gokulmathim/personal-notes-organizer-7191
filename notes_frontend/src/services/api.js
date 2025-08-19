//
// PUBLIC_INTERFACE
// Simple HTTP client for the notes backend API using axios.
// Reads base URL from REACT_APP_API_BASE_URL environment variable.
//
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Create an axios instance configured for the API.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Interceptor to normalize errors
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const message = error?.response?.data?.message || error?.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns the base URL the frontend is using to connect to the backend API. */
  return API_BASE_URL;
}

// PUBLIC_INTERFACE
export async function fetchNotes(params = {}) {
  /** Fetch list of notes with optional filters.
   * Params: { q?: string, category?: string }
   * Returns: Array<Note>
   */
  const res = await api.get('/notes', { params });
  return res.data;
}

// PUBLIC_INTERFACE
export async function fetchCategories() {
  /** Fetch list of categories. Returns: Array<{id: string, name: string, count?: number}> */
  const res = await api.get('/categories');
  return res.data;
}

// PUBLIC_INTERFACE
export async function createNote(payload) {
  /** Create a new note. Payload: { title, content, category } Returns: Note */
  const res = await api.post('/notes', payload);
  return res.data;
}

// PUBLIC_INTERFACE
export async function updateNote(id, payload) {
  /** Update an existing note by id. Payload: { title?, content?, category? } Returns: Note */
  const res = await api.put(`/notes/${id}`, payload);
  return res.data;
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete note by id. Returns: { success: boolean } */
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}

// PUBLIC_INTERFACE
export async function getNote(id) {
  /** Fetch single note by id. Returns: Note */
  const res = await api.get(`/notes/${id}`);
  return res.data;
}
