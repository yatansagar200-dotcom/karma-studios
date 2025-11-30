import axios from 'axios';
export const login = (email, password) => {
  return axios.post('/api/auth/login', { email, password });
};
// src/api/auth.js

const API = import.meta.env.VITE_API_URL;

export async function loginUser(credentials) {
  try {
    const res = await fetch(`${API}/api/login`, { // /api/login ko apne backend route se replace kar
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error("Login failed");
    return await res.json();
  } catch (err) {
    console.error("Auth API error:", err);
    return null;
  }
}
