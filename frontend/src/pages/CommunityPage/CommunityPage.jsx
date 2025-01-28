import { useEffect, useState } from "react";
import { getSharedWorkouts, saveWorkout, unshareWorkout } from "../../services/workoutService";
import { getSharedExercises, saveExercise, unshareExercise } from "../../services/exerciseService";
import "./CommunityPage.css";

export default function CommunityPage({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [viewType, setViewType] = useState("workouts"); // "workouts" or "exercises"

  useEffect(() => {
    async function fetchData() {
      try {
        if (viewType === "workouts") {
          const sharedWorkouts = await getSharedWorkouts();
          setWorkouts(sharedWorkouts);
        } else {
          const sharedExercises = await getSharedExercises();
          setExercises(sharedExercises);
        }
      } catch (err) {
        console.error("Error fetching shared items:", err);
      }
    }
    fetchData();
  }, [viewType]);

  async function handleSaveWorkout(id) {
    try {
      await saveWorkout(id);
      alert("Workout saved successfully! 🎉");
    } catch (err) {
      console.error("Error saving workout:", err);
      alert("Failed to save workout.");
    }
  }

  async function handleSaveExercise(id) {
    try {
      await saveExercise(id);
      alert("Exercise saved successfully! 🎉");
    } catch (err) {
      console.error("Error saving exercise:", err);
      alert("Failed to save exercise.");
    }
  }

  async function handleUnshareWorkout(id) {
    try {
      await unshareWorkout(id);
      setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout._id !== id));
      alert("Workout unshared successfully!");
    } catch (err) {
      console.error("Error unsharing workout:", err);
      alert("Failed to unshare workout.");
    }
  }

  async function handleUnshareExercise(id) {
    try {
      await unshareExercise(id);
      setExercises(prevExercises => prevExercises.filter(exercise => exercise._id !== id));
      alert("Exercise unshared successfully!");
    } catch (err) {
      console.error("Error unsharing exercise:", err);
      alert("Failed to unshare exercise.");
    }
  }

  return (
    <div className="CommunityPage">
      <h1>🌍 Shared Workouts & Exercises</h1>

      <div className="toggle-buttons">
        <button className={viewType === "workouts" ? "active" : ""} onClick={() => setViewType("workouts")}>
          Workouts
        </button>
        <button className={viewType === "exercises" ? "active" : ""} onClick={() => setViewType("exercises")}>
          Exercises
        </button>
      </div>

      {viewType === "workouts" ? (
        <div className="workout-list">
          {workouts.map(workout => (
            <div key={workout._id} className="workout-card">
              <h3>{workout.title}</h3>
              <p><strong>Day:</strong> {workout.dayOfWeek}</p>
              <p><strong>By:</strong> {workout?.user?.name ? workout.user.name : "Anonymous"}</p>

              {user && user._id === workout.user._id ? (
                <button onClick={() => handleUnshareWorkout(workout._id)}>Unshare</button>
              ) : (
                <button onClick={() => handleSaveWorkout(workout._id)}>Save</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="exercise-list">
          {exercises.map(exercise => (
            <div key={exercise._id} className="exercise-card">
              <h3>{exercise.name}</h3>
              <p><strong>Category:</strong> {exercise.category}</p>
              <p><strong>By:</strong> {exercise?.user?.name ? exercise.user.name : "Anonymous"}</p>

              {user && user._id === exercise.user._id ? (
                <button onClick={() => handleUnshareExercise(exercise._id)}>Unshare</button>
              ) : (
                <button onClick={() => handleSaveExercise(exercise._id)}>Save</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
