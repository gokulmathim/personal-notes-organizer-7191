import React, { useCallback, useState } from 'react';

// PUBLIC_INTERFACE
export default function Navbar({ onSearch, onNew }) {
  /** Top navigation bar with brand, search input, and "New Note" button. */
  const [q, setQ] = useState('');

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setQ(value);
    onSearch?.(value);
  }, [onSearch]);

  return (
    <div className="navbar" role="navigation" aria-label="Top Navigation">
      <div className="brand" aria-label="Brand">
        <span className="brand-mark" />
        Notes
      </div>
      <div className="nav-actions">
        <div className="search" role="search">
          <input
            type="search"
            placeholder="Search notes..."
            value={q}
            onChange={handleChange}
            aria-label="Search notes"
          />
        </div>
        <button className="btn primary" onClick={onNew} aria-label="Create new note">
          + New Note
        </button>
      </div>
    </div>
  );
}
