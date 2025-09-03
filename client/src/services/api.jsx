const BASE = import.meta.env.VITE_SERVER_URL;

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`API response is not valid JSON: ${text}`);
  }
}
