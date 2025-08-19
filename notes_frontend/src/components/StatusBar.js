import React from 'react';
import { getApiBaseUrl } from '../services/api';

// PUBLIC_INTERFACE
export default function StatusBar({ loading, error }) {
  /** Status bar shows loading or error, and the API base url for transparency. */
  const base = getApiBaseUrl();

  return (
    <div className="row" style={{ justifyContent: 'space-between', padding: '4px 2px' }}>
      <small className="muted">API: {base || 'not configured (set REACT_APP_API_BASE_URL)'}</small>
      {loading ? <small>Loading…</small> : null}
      {error ? <small style={{ color: '#b00020' }}>{error}</small> : null}
    </div>
  );
}
