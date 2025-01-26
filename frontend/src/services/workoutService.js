import sendRequest from './sendRequest';

const BASE_URL = '/api/workouts';

// Get all workouts
export async function getWorkouts() {
  return sendRequest(BASE_URL, 'GET');
}

// Get single workout with exercises
export async function getWorkout(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET');
}

// Create a workout
export async function createWorkout(workoutData) {
  return sendRequest(BASE_URL, 'POST', workoutData);
}

// Update a workout
export async function updateWorkout(id, workoutData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', workoutData);
}

// Delete a workout
export async function deleteWorkout(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

// Share a workout
export async function shareWorkout(id) {
  return sendRequest(`${BASE_URL}/${id}/share`, 'PUT');
}

// Get shared workouts
export async function getSharedWorkouts() {
  return sendRequest(`${BASE_URL}/community`);
}
