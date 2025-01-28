const Workout = require('../models/workout');
const Exercise = require('../models/exercise');

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  addExercisesToWorkout, // ✅ Ensure this function exists
  getSharedWorkouts,
  saveWorkout, // ✅ New function for saving community workouts
};

// ✅ Get all workouts
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

// ✅ Get a specific workout
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

// ✅ Update an existing workout
async function updateWorkout(req, res) {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // Ensure user can only edit their workouts
      req.body,
      { new: true }
    );

    if (!workout) {
      return res
        .status(404)
        .json({ message: 'Workout not found or unauthorized' });
    }
    res.json(workout);
  } catch (err) {
    console.error('Error updating workout:', err);
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
    const { exercises } = req.body;
    if (!Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({ message: 'Invalid exercise list' });
    }

    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // ✅ Ensure all exercises exist
    const existingExercises = await Exercise.find({ _id: { $in: exercises } });
    if (existingExercises.length !== exercises.length) {
      return res
        .status(400)
        .json({ message: 'One or more exercises do not exist' });
    }

    // ✅ Add only new exercises
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

// ✅ Get shared workouts
async function getSharedWorkouts(req, res) {
  try {
    const sharedWorkouts = await Workout.find({
      sharedWithCommunity: true,
    }).populate('user', 'name');
    res.json(sharedWorkouts);
  } catch (err) {
    console.error('Error Fetching Shared Workouts:', err);
    res.status(500).json({ message: 'Failed to fetch shared workouts' });
  }
}

// ✅ Save a shared workout to a user's account
async function saveWorkout(req, res) {
  try {
    const sharedWorkout = await Workout.findById(req.params.id).populate(
      'exercises'
    );
    if (!sharedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    const copiedWorkout = new Workout({
      title: sharedWorkout.title,
      dayOfWeek: sharedWorkout.dayOfWeek,
      workoutType: sharedWorkout.workoutType,
      duration: sharedWorkout.duration,
      exercises: [...sharedWorkout.exercises],
      user: req.user._id,
    });

    await copiedWorkout.save();
    res.json(copiedWorkout);
  } catch (err) {
    console.error('Error Saving Workout:', err);
    res.status(500).json({ message: 'Failed to save workout' });
  }
}

async function shareWorkout(req, res) {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // Ensure the user owns the workout
      { sharedWithCommunity: true },
      { new: true }
    );
    if (!workout) {
      return res
        .status(404)
        .json({ message: 'Workout not found or unauthorized.' });
    }
    res.json({ message: 'Workout shared successfully!', workout });
  } catch (err) {
    console.error('Error sharing workout:', err);
    res.status(500).json({ message: 'Failed to share workout' });
  }
}
