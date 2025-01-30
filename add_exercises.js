const mongoose = require('mongoose');
const Exercise = require('./backend/models/exercise'); // Correct path to your Exercise model
const User = require('./backend/models/user'); // Correct path to your User model

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;

// Define new exercises
const newExercises = [
  {
    name: 'Incline Bench Press',
    category: 'Strength',
    muscleGroup: 'Chest',
    equipment: 'Barbell',
    difficultyLevel: 'Intermediate',
    sets: 4,
    reps: 8,
    restTime: 60,
    video: '',
    notes: 'Focus on upper chest',
    sharedWithCommunity: false,
  },
  {
    name: 'Leg Press',
    category: 'Strength',
    muscleGroup: 'Legs',
    equipment: 'Machine',
    difficultyLevel: 'Intermediate',
    sets: 4,
    reps: 12,
    restTime: 90,
    video: '',
    notes: 'Keep knees aligned with toes',
    sharedWithCommunity: false,
  },
  {
    name: 'Bent Over Rows',
    category: 'Strength',
    muscleGroup: 'Back',
    equipment: 'Barbell',
    difficultyLevel: 'Intermediate',
    sets: 4,
    reps: 10,
    restTime: 60,
    video: '',
    notes: 'Keep back straight',
    sharedWithCommunity: false,
  },
  {
    name: 'Dumbbell Shoulder Press',
    category: 'Strength',
    muscleGroup: 'Shoulders',
    equipment: 'Dumbbells',
    difficultyLevel: 'Intermediate',
    sets: 3,
    reps: 12,
    restTime: 60,
    video: '',
    notes: 'Press overhead',
    sharedWithCommunity: false,
  },
  {
    name: 'Tricep Dips',
    category: 'Strength',
    muscleGroup: 'Arms',
    equipment: 'Parallel Bars',
    difficultyLevel: 'Intermediate',
    sets: 3,
    reps: 15,
    restTime: 60,
    video: '',
    notes: 'Keep elbows close to body',
    sharedWithCommunity: false,
  },
  {
    name: 'Running',
    category: 'Cardio',
    muscleGroup: 'Full Body',
    equipment: 'None',
    difficultyLevel: 'Intermediate',
    sets: 1,
    reps: 30,
    restTime: 0,
    video: '',
    notes: 'Maintain steady pace',
    sharedWithCommunity: false,
  },
  {
    name: 'Mountain Climbers',
    category: 'Cardio',
    muscleGroup: 'Full Body',
    equipment: 'None',
    difficultyLevel: 'Intermediate',
    sets: 3,
    reps: 20,
    restTime: 30,
    video: '',
    notes: 'Keep core tight',
    sharedWithCommunity: false,
  },
  {
    name: 'Russian Twists',
    category: 'Strength',
    muscleGroup: 'Core',
    equipment: 'Medicine Ball',
    difficultyLevel: 'Intermediate',
    sets: 3,
    reps: 20,
    restTime: 30,
    video: '',
    notes: 'Twist torso',
    sharedWithCommunity: false,
  },
  {
    name: 'Leg Raises',
    category: 'Strength',
    muscleGroup: 'Core',
    equipment: 'None',
    difficultyLevel: 'Intermediate',
    sets: 3,
    reps: 15,
    restTime: 30,
    video: '',
    notes: 'Lift legs to 90 degrees',
    sharedWithCommunity: false,
  },
  {
    name: 'Box Jumps',
    category: 'Cardio',
    muscleGroup: 'Legs',
    equipment: 'Box',
    difficultyLevel: 'Intermediate',
    sets: 3,
    reps: 10,
    restTime: 60,
    video: '',
    notes: 'Explosive movement',
    sharedWithCommunity: false,
  },
];

async function addExercises() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Fetch a user from the database
    const user = await User.findOne();
    if (!user) {
      throw new Error('No user found in the database');
    }

    // Add the user ID to each exercise
    const exercisesWithUser = newExercises.map((exercise) => ({
      ...exercise,
      user: user._id,
    }));

    await Exercise.insertMany(exercisesWithUser);
    console.log('Exercises added successfully');

    mongoose.disconnect();
  } catch (err) {
    console.error('Error adding exercises:', err);
  }
}

addExercises();
