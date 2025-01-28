import sendRequest from './sendRequest';

const BASE_URL = '/api/exercises';

// Fetch all exercises for logged-in user
export async function getExercises() {
  return sendRequest(BASE_URL);
}

// Fetch a single exercise by ID
export async function getExerciseById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

// Create a new exercise
export async function createExercise(exerciseData) {
  return sendRequest(BASE_URL, 'POST', exerciseData);
}

// Update an existing exercise
export async function updateExercise(id, exerciseData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', exerciseData);
}

// Delete an exercise
export async function deleteExercise(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

// Share an exercise
export async function shareExercise(id) {
  return sendRequest(`${BASE_URL}/${id}/share`, 'PUT');
}

// Unshare an exercise
export async function unshareExercise(id) {
  return sendRequest(`${BASE_URL}/${id}/unshare`, 'PUT');
}

// Fetch shared exercises
export async function getSharedExercises() {
  return sendRequest(`${BASE_URL}/community`);
}

// Save a shared exercise to the user's account
export async function saveExercise(id) {
  return sendRequest(`${BASE_URL}/${id}/save`, 'POST');
}

// Fetch all exercises for the logged-in user (alias for getExercises)
export const getUserExercises = getExercises;
