import sendRequest from './sendRequest';

const BASE_URL = '/api/exercises';

// 📌 Fetch all exercises for logged-in user
export async function getExercises() {
  return sendRequest(BASE_URL);
}

// 📌 Fetch a single exercise by ID
export async function getExerciseById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

// 📌 Add a new exercise
export async function createExercise(exerciseData) {
  return sendRequest(BASE_URL, 'POST', exerciseData);
}

// 📌 Update an existing exercise
export async function updateExercise(id, exerciseData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', exerciseData);
}

// 📌 Delete an exercise
export async function deleteExercise(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
