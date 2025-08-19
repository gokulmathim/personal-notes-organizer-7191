 /**
  * Simple API wrapper using fetch for the Notes app.
  * Reads base URL from environment variables:
  *   REACT_APP_API_BASE_URL
  *
  * If not provided, requests will be sent to relative paths (useful if a dev proxy is configured).
  */

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns the configured API base URL or empty string for relative paths. */
  return process.env.REACT_APP_API_BASE_URL || '';
}

function buildUrl(path) {
  const base = getApiBaseUrl();
  if (!base) return path;
  return `${base}${path}`;
}

async function handleJsonResponse(res, method, path) {
  if (!res.ok) {
    let message = '';
    try {
      const data = await res.json();
      message = data?.error || JSON.stringify(data);
    } catch {
      message = await res.text();
    }
    throw new Error(message || `${method} ${path} failed with ${res.status}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return true;
}

// PUBLIC_INTERFACE
export async function apiGet(path) {
  /** GET helper. */
  const url = buildUrl(path);
  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  });
  return handleJsonResponse(res, 'GET', path);
}

// PUBLIC_INTERFACE
export async function apiPost(path, body) {
  /** POST helper. */
  const url = buildUrl(path);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body)
  });
  return handleJsonResponse(res, 'POST', path);
}

// PUBLIC_INTERFACE
export async function apiPut(path, body) {
  /** PUT helper. */
  const url = buildUrl(path);
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body)
  });
  return handleJsonResponse(res, 'PUT', path);
}

// PUBLIC_INTERFACE
export async function apiDelete(path) {
  /** DELETE helper. */
  const url = buildUrl(path);
  const res = await fetch(url, { method: 'DELETE' });
  if (res.status === 204) return true;
  return handleJsonResponse(res, 'DELETE', path);
}
