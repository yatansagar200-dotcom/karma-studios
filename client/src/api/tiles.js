import axios from 'axios';
export const fetchTiles = (q='') => axios.get('/api/tiles' + (q ? ('?q=' + encodeURIComponent(q)) : ''));
export const addTile = (formData, token) => axios.post('/api/tiles', formData, { headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'multipart/form-data' }});
export const updateTile = (id, formData, token) => axios.put('/api/tiles/' + id, formData, { headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'multipart/form-data' }});
export const deleteTile = (id, token) => axios.delete('/api/tiles/' + id, { headers: { Authorization: 'Bearer ' + token }});

// src/api/tile.js

const API = import.meta.env.VITE_API_URL;

export async function getTiles() {
  try {
    const res = await fetch(`${API}/api/tiles`); // /api/tiles ko backend route se replace kar
    if (!res.ok) throw new Error("Tiles fetch failed");
    return await res.json();
  } catch (err) {
    console.error("Tile API error:", err);
    return [];
  }
}
