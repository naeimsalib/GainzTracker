import sendRequest from './sendRequest';

const BASE_URL = '/api/profile';

export async function getProfile() {
  return sendRequest(BASE_URL);
}

export async function updateProfile(profileData) {
  return sendRequest(BASE_URL, 'PUT', profileData);
}
