import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import StatusBar from './components/StatusBar';
import { useNotes } from './hooks/useNotes';

// PUBLIC_INTERFACE
function App() {
  /** Root component that composes the layout and features:
   * - Top nav with search and new note
   * - Sidebar categories
   * - Main area with notes list and editor
   */
  const {
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
  } = useNotes();

  const handleSearch = (q) => setFilters(prev => ({ ...prev, q }));
  const handleCategory = (category) => setFilters(prev => ({ ...prev, category }));

  return (
    <div className="app-shell">
      <Navbar
        onSearch={handleSearch}
        onNew={() => selectNote(null)}
      />
      <div className="content">
        <Sidebar
          categories={categories}
          activeCategory={filters.category}
          onSelectCategory={handleCategory}
        />
        <main className="main">
          <div className="toolbar">
            <button className="btn primary" onClick={() => selectNote(null)}>New</button>
            {selectedId ? (
              <button
                className="btn"
                onClick={() => {
                  if (window.confirm('Delete this note?')) removeNote(selectedId);
                }}
              >
                Delete
              </button>
            ) : null}
          </div>

          <div className="split">
            <div className="card">
              <div className="card-header">Notes</div>
              <div className="card-body">
                <NotesList
                  notes={notes}
                  selectedId={selectedId}
                  onSelect={selectNote}
                  onDelete={removeNote}
                />
              </div>
            </div>

            <div className="card">
              <div className="card-header">{selectedId ? 'Edit Note' : 'Create Note'}</div>
              <div className="card-body">
                <NoteEditor
                  note={selectedNote}
                  categories={categories}
                  onSave={(id, payload) => updateNote(id, payload)}
                  onCreate={(payload) => createNote(payload)}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <StatusBar loading={loading || loadingCategories} error={error} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
