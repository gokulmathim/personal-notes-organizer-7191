import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiDelete, apiGet, apiPost, apiPut } from '../services/api';

// PUBLIC_INTERFACE
export function useNotes() {
  /** Hook that manages notes, categories, selection, and CRUD operations through the API. */
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ q: '', category: '' });

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (filters.q) params.set('q', filters.q);
      if (filters.category) params.set('category', filters.category);
      const qs = params.toString();
      const data = await apiGet(`/notes${qs ? `?${qs}` : ''}`);
      setNotes(data);
    } catch (e) {
      setError(e.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [filters.q, filters.category]);

  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const data = await apiGet('/categories');
      setCategories(data);
    } catch (e) {
      setError((prev) => prev || e.message || 'Failed to fetch categories');
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const selectNote = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const createNote = useCallback(
    async (payload) => {
      try {
        const created = await apiPost('/notes', payload);
        setNotes((prev) => [created, ...prev]);
        setSelectedId(created.id);
        fetchCategories();
      } catch (e) {
        setError(e.message || 'Failed to create note');
      }
    },
    [fetchCategories]
  );

  const updateNote = useCallback(
    async (id, payload) => {
      try {
        const updated = await apiPut(`/notes/${id}`, payload);
        setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
        fetchCategories();
      } catch (e) {
        setError(e.message || 'Failed to update note');
      }
    },
    [fetchCategories]
  );

  const removeNote = useCallback(
    async (id) => {
      try {
        await apiDelete(`/notes/${id}`);
        setNotes((prev) => prev.filter((n) => n.id !== id));
        if (selectedId === id) setSelectedId(null);
        fetchCategories();
      } catch (e) {
        setError(e.message || 'Failed to delete note');
      }
    },
    [fetchCategories, selectedId]
  );

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
    removeNote
  };
}
