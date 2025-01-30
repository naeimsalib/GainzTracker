import sendRequest from './sendRequest';

const BASE_URL = '/api/workouts';

// Fetch all workouts for logged-in user
export async function getWorkouts() {
  return sendRequest(BASE_URL);
}

// Fetch a single workout by ID
export async function getWorkout(id) {
  return sendRequest(`${BASE_URL}/${id}`);
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

// Share a workout
export async function shareWorkout(id) {
  return sendRequest(`${BASE_URL}/${id}/share`, 'PUT');
}

// Unshare a workout
export async function unshareWorkout(id) {
  return sendRequest(`${BASE_URL}/${id}/unshare`, 'PUT');
}

// Fetch shared workouts
export async function getSharedWorkouts() {
  return sendRequest(`${BASE_URL}/community`);
}

// Save a shared workout to the user's account
export async function saveWorkout(id) {
  return sendRequest(`${BASE_URL}/${id}/save`, 'POST');
}

// Add exercises to a workout
export async function addExercisesToWorkout(workoutId, exercises) {
  return sendRequest(
    `${BASE_URL}/${workoutId}/add-exercises`,
    'PUT',
    exercises
  );
}

export async function removeExerciseFromWorkout(workoutId, exerciseId) {
  return sendRequest(`${BASE_URL}/${workoutId}/remove-exercise`, 'PUT', {
    exerciseId,
  });
}
