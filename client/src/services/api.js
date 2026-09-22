const API_BASE = '/api';

export async function fetchClaims({ category, status, sort, search } = {}) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (status) params.append('status', status);
  if (sort) params.append('sort', sort);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/claims?${params.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch claims feed');
  }
  return res.json();
}

export async function fetchClaimById(id) {
  const res = await fetch(`${API_BASE}/claims/${id}`);
  if (!res.ok) {
    throw new Error('Claim not found');
  }
  return res.json();
}

export async function submitClaim(payload) {
  const res = await fetch(`${API_BASE}/claims`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to submit claim');
  }
  return res.json();
}

export async function reviewClaim(id, { status, reviewerNote }) {
  const res = await fetch(`${API_BASE}/claims/${id}/review`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, reviewerNote })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update review');
  }
  return res.json();
}

export async function fetchDecisions() {
  const res = await fetch(`${API_BASE}/decisions`);
  if (!res.ok) {
    throw new Error('Failed to fetch decision points');
  }
  return res.json();
}

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) {
    throw new Error('Health check failed');
  }
  return res.json();
}
