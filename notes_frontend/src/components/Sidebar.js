import React from 'react';
import cls from 'classnames';

// PUBLIC_INTERFACE
export default function Sidebar({ categories = [], activeCategory = '', onSelectCategory }) {
  /** Sidebar for categories */
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="section-title">Categories</div>
      <div className="category-list">
        <button
          className={cls('category-item', { active: activeCategory === '' })}
          onClick={() => onSelectCategory?.('')}
          aria-label="All notes"
        >
          <span>All</span>
          <span className="chip">{categories.reduce((sum, c) => sum + (c.count || 0), 0) || '-'}</span>
        </button>
        {categories.map(cat => (
          <button
            key={cat.id || cat.name}
            className={cls('category-item', { active: activeCategory === (cat.id || cat.name) })}
            onClick={() => onSelectCategory?.(cat.id || cat.name)}
            aria-label={`Category ${cat.name}`}
          >
            <span>{cat.name}</span>
            {'count' in cat ? <span className="chip">{cat.count}</span> : null}
          </button>
        ))}
      </div>
    </aside>
  );
}
