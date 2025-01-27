const Workout = require('../models/workout');
const Exercise = require('../models/exercise');

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  addExercisesToWorkout,
  getSharedWorkouts,
};

// ✅ Get all workouts with exercises populated
async function getAllWorkouts(req, res) {
  try {
    const workouts = await Workout.find({ user: req.user._id }).populate(
      'exercises'
    );
    res.json(workouts);
  } catch (err) {
    console.error('Error Fetching Workouts:', err);
    res.status(500).json({ message: 'Failed to fetch workouts' });
  }
}

// ✅ Fetch all workouts that are shared with the community
async function getSharedWorkouts(req, res) {
  try {
    const sharedWorkouts = await Workout.find({ sharedWithCommunity: true }).populate('user', 'name');
    res.json(sharedWorkouts);
  } catch (err) {
    console.error('Error Fetching Shared Workouts:', err);
    res.status(500).json({ message: 'Failed to fetch shared workouts', error: err.message });
  }
}

// ✅ Get a specific workout with exercises
async function getWorkoutById(req, res) {
  try {
    const workout = await Workout.findById(req.params.id).populate('exercises');
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    console.error('Error Fetching Workout:', err);
    res.status(500).json({ message: 'Failed to fetch workout' });
  }
}

// ✅ Create a new workout
async function createWorkout(req, res) {
  try {
    const { title, dayOfWeek, workoutType, duration, exercises } = req.body;

    if (!title || !dayOfWeek || !workoutType || !duration) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newWorkout = await Workout.create({
      title,
      dayOfWeek,
      workoutType,
      duration: Number(duration),
      exercises: exercises || [],
      user: req.user._id,
    });

    res.status(201).json(newWorkout);
  } catch (err) {
    console.error('Error Creating Workout:', err);
    res.status(500).json({ message: 'Failed to create workout' });
  }
}

// ✅ Update a workout with new exercises
async function updateWorkout(req, res) {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('exercises');
    if (!updatedWorkout)
      return res.status(404).json({ message: 'Workout not found' });
    res.json(updatedWorkout);
  } catch (err) {
    console.error('Error Updating Workout:', err);
    res.status(500).json({ message: 'Failed to update workout' });
  }
}

// ✅ Delete a workout
async function deleteWorkout(req, res) {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted successfully' });
  } catch (err) {
    console.error('Error Deleting Workout:', err);
    res.status(500).json({ message: 'Failed to delete workout' });
  }
}

// ✅ Add Exercises to a Workout
async function addExercisesToWorkout(req, res) {
  try {
    const { exercises } = req.body; // List of exercise IDs
    if (!Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({ message: 'Invalid exercise list' });
    }

    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // ✅ Check if each exercise exists
    const existingExercises = await Exercise.find({ _id: { $in: exercises } });
    if (existingExercises.length !== exercises.length) {
      return res
        .status(400)
        .json({ message: 'One or more exercises do not exist' });
    }

    // ✅ Add unique exercises
    const newExercises = exercises.filter(
      (ex) => !workout.exercises.includes(ex)
    );
    workout.exercises.push(...newExercises);

    await workout.save();
    res.json(workout);
  } catch (err) {
    console.error('Error Adding Exercises:', err);
    res.status(500).json({ message: 'Failed to add exercises to workout' });
  }
}
