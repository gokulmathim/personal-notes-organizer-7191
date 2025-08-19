import React from 'react';
import cls from 'classnames';

// PUBLIC_INTERFACE
export default function NotesList({ notes = [], selectedId, onSelect, onDelete }) {
  /** Displays notes list with title and small meta; supports select and delete. */
  if (!notes.length) {
    return <div className="empty">No notes yet</div>;
  }
  return (
    <div className="note-list" role="list" aria-label="Notes list">
      {notes.map(note => (
        <div
          key={note.id}
          className={cls('note-item', { active: selectedId === note.id })}
          role="listitem"
          onClick={() => onSelect?.(note.id)}
        >
          <div>
            <div className="note-title">{note.title || 'Untitled'}</div>
            <div className="note-meta">
              {note.category ? `${note.category} • ` : ''}
              {formatDate(note.updatedAt || note.createdAt)}
            </div>
          </div>
          <div className="row">
            <button
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Delete this note?')) onDelete?.(note.id);
              }}
              aria-label={`Delete note ${note.title || note.id}`}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(value) {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString();
  } catch {
    return '';
  }
}
