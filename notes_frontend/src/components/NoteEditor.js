import React, { useEffect, useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export default function NoteEditor({ note, categories = [], onSave, onCreate }) {
  /** Note editor for existing or new notes. If note is null, treats as create. */
  const isNew = !note?.id;

  const [title, setTitle] = useState(note?.title || '');
  const [category, setCategory] = useState(note?.category || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setCategory(note?.category || '');
    setContent(note?.content || '');
  }, [note?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const canSave = useMemo(() => {
    return title.trim().length > 0 || content.trim().length > 0;
  }, [title, content]);

  const handleSave = () => {
    const payload = {
      title: title.trim() || 'Untitled',
      category: category.trim(),
      content
    };
    if (isNew) onCreate?.(payload);
    else onSave?.(note.id, payload);
  };

  return (
    <div className="editor" aria-label="Note editor">
      <div className="row">
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Note category"
        >
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id || c.name} value={c.id || c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          className="btn primary"
          onClick={handleSave}
          disabled={!canSave}
          aria-label="Save note"
        >
          {isNew ? 'Create' : 'Save'}
        </button>
      </div>
      <textarea
        className="textarea"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Note content"
      />
    </div>
  );
}
