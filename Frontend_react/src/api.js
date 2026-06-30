const BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function extractClaimsFromText(text) {
  const res = await fetch(`${BASE}/extract-claims`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  const data = await res.json();
  return data.claims;
}

export async function extractClaimsFromPDF(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${BASE}/extract-claims-pdf`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  const data = await res.json();
  return data.claims;
}

export async function factCheck(claim) {
  const res = await fetch(`${BASE}/fact-check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claim }),
  });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  return res.json();
}
