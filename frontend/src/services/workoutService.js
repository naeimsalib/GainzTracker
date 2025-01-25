import sendRequest from './sendRequest';

const BASE_URL = '/api/workouts';

// Fetch all workouts
export async function getWorkouts() {
  return sendRequest(BASE_URL, 'GET');
}

// Create a new workout
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
