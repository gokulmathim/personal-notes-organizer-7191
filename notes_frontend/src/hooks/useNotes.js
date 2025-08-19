import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchNotes,
  fetchCategories,
  createNote as apiCreate,
  updateNote as apiUpdate,
  deleteNote as apiDelete,
  getNote as apiGet
} from '../services/api';

// PUBLIC_INTERFACE
export function useNotes() {
  /** Hook to manage notes data and actions in the app.
   * Exposes: notes, categories, loading flags, selectedNote, filters, and CRUD handlers.
   */
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ q: '', category: '' });

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [selectedId, notes]
  );

  const loadCategories = useCallback(async () => {
    setLoadingCategories(true);
    setError('');
    try {
      const data = await fetchCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchNotes({
        q: filters.q || undefined,
        category: filters.category || undefined
      });
      setNotes(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // PUBLIC_INTERFACE
  const selectNote = useCallback((id) => {
    /** Set the selected note by id */
    setSelectedId(id);
  }, []);

  // PUBLIC_INTERFACE
  const createNote = useCallback(async (payload) => {
    /** Create a note and refresh list, returns created note */
    const created = await apiCreate(payload);
    await loadNotes();
    setSelectedId(created?.id ?? null);
    return created;
  }, [loadNotes]);

  // PUBLIC_INTERFACE
  const updateNote = useCallback(async (id, payload) => {
    /** Update a note by id and refresh list */
    const updated = await apiUpdate(id, payload);
    await loadNotes();
    setSelectedId(updated?.id ?? id);
    return updated;
  }, [loadNotes]);

  // PUBLIC_INTERFACE
  const removeNote = useCallback(async (id) => {
    /** Delete a note by id and refresh list */
    await apiDelete(id);
    await loadNotes();
    setSelectedId(prev => (prev === id ? null : prev));
    return true;
  }, [loadNotes]);

  // PUBLIC_INTERFACE
  const refreshSelected = useCallback(async () => {
    /** Reload currently selected note detail (if needed) */
    if (!selectedId) return null;
    const fresh = await apiGet(selectedId);
    setNotes(prev => prev.map(n => (n.id === fresh.id ? fresh : n)));
    return fresh;
  }, [selectedId]);

  return {
    notes,
    categories,
    selectedNote,
    selectedId,
    loading,
    loadingCategories,
    error,
    filters,
    setFilters,
    selectNote,
    createNote,
    updateNote,
    removeNote,
    refreshSelected,
    reload: loadNotes
  };
}
