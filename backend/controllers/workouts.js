const Workout = require('../models/workout');
const Exercise = require('../models/exercise');

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};

// ✅ Get all workouts for the logged-in user
async function getAllWorkouts(req, res) {
  try {
    const workouts = await Workout.find({ user: req.user._id }).populate(
      'exercises'
    );
    res.json(workouts);
  } catch (err) {
    console.error('Error Fetching Workouts:', err);
    res
      .status(500)
      .json({ message: 'Failed to fetch workouts', error: err.message });
  }
}

// ✅ Get a specific workout by ID
async function getWorkoutById(req, res) {
  try {
    const workout = await Workout.findById(req.params.id).populate('exercises');
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    console.error('Error Fetching Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to fetch workout', error: err.message });
  }
}

// ✅ Create a new workout
async function createWorkout(req, res) {
  try {
    console.log('Received Workout Data:', req.body);

    const { title, date, workoutType, duration, exercises } = req.body;

    if (!title || !date || !workoutType || !duration) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create the new workout
    const newWorkout = await Workout.create({
      ...req.body,
      user: req.user._id,
    });

    // If exercises are included, link them to this workout
    if (exercises && exercises.length > 0) {
      await Exercise.updateMany(
        { _id: { $in: exercises } },
        { $push: { workouts: newWorkout._id } }
      );
    }

    res.status(201).json(newWorkout);
  } catch (err) {
    console.error('Error Creating Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to create workout', error: err.message });
  }
}

// ✅ Update an existing workout
async function updateWorkout(req, res) {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWorkout)
      return res.status(404).json({ message: 'Workout not found' });
    res.json(updatedWorkout);
  } catch (err) {
    console.error('Error Updating Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to update workout', error: err.message });
  }
}

// ✅ Delete a workout
async function deleteWorkout(req, res) {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });

    // Remove workout reference from exercises
    await Exercise.updateMany(
      { workouts: workout._id },
      { $pull: { workouts: workout._id } }
    );

    res.json({ message: 'Workout deleted successfully' });
  } catch (err) {
    console.error('Error Deleting Workout:', err);
    res
      .status(500)
      .json({ message: 'Failed to delete workout', error: err.message });
  }
}
