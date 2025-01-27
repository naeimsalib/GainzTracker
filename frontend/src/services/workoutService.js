import sendRequest from './sendRequest';

const BASE_URL = '/api/workouts';

// Get all workouts
export async function getWorkouts() {
  return sendRequest(BASE_URL, 'GET');
}

// Get single workout with exercises
export async function getWorkout(id) {
  return sendRequest(`${BASE_URL}/${id}?populate=exercises`, 'GET');
}

// Create a workout
export async function createWorkout(workoutData) {
  console.log('Creating workout:', workoutData); // ✅ Debugging
  return sendRequest(BASE_URL, 'POST', workoutData);
}

export async function addExercisesToWorkout(workoutId, exerciseIds) {
  return sendRequest(`${BASE_URL}/${workoutId}/add-exercises`, 'PUT', {
    exercises: exerciseIds,
  });
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
  return sendRequest('/api/workouts/community');
}
