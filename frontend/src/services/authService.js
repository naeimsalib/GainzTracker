import sendRequest from './sendRequest';

const BASE_URL = '/api/auth';

export async function signUp(userData) {
  const token = await sendRequest(`${BASE_URL}/signup`, 'POST', userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function logIn(credentials) {
  const response = await sendRequest(`${BASE_URL}/login`, 'POST', credentials);

  const token = response.token || response;

  if (typeof token !== 'string' || token.split('.').length !== 3) {
    throw new Error('Invalid token received from server');
  }

  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null; // ✅ No token? Return null.

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token structure'); // ✅ Check if token has 3 parts
    }

    const payload = JSON.parse(atob(parts[1])); // ✅ Decode JWT payload safely
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token'); // ✅ Token expired? Remove it.
      return null;
    }
    return token;
  } catch (e) {
    console.error('Error decoding token:', e);
    localStorage.removeItem('token'); // ✅ Malformed token? Remove it.
    return null;
  }
}
