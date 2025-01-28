import { getToken } from './authService';

export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };

  if (payload instanceof FormData) {
    options.body = payload;
  } else if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  const token = localStorage.getItem('token');
  if (token) {
    options.headers ||= {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    let errorMessage = `HTTP ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (err) {
      console.error('Failed to parse error response:', err);
    }
    throw new Error(errorMessage);
  }

  try {
    return await res.json();
  } catch (err) {
    console.error('Failed to parse JSON response:', err);
    throw new Error('Invalid JSON response from server');
  }
}
