import sendRequest from './sendRequest';

const BASE_URL = '/api/auth';

export async function signUp(userData) {
  const token = await sendRequest(`${BASE_URL}/signup`, 'POST', userData);
  localStorage.setItem('token', token);
  return getUser(); // ✅ Return user after signup
}

export async function logIn(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  localStorage.setItem('token', token);
  return getUser(); // ✅ Return user after login
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
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded payload:', payload); // Debugging statement
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return null;
    }
    return token;
  } catch (e) {
    console.error('Error decoding token:', e); // Debugging statement
    localStorage.removeItem('token');
    return null;
  }
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}
