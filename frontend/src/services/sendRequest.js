import { getToken } from './authService';

export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = {
    method,
    headers: {},
  };

  // Handle payload
  if (payload instanceof FormData) {
    options.body = payload;
  } else if (payload) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  // Retrieve and attach token
  const token = getToken() || localStorage.getItem('token');
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      let errorMessage = `HTTP ${res.status} - ${res.statusText}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (err) {
        console.error('Error parsing response JSON:', err);
      }
      throw new Error(errorMessage);
    }

    // Return JSON response if possible
    return await res.json();
  } catch (err) {
    console.error('Request failed:', err);
    throw err;
  }
}
