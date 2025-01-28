import { useEffect, useState } from "react";
import {
  getSharedWorkouts,
  saveWorkout,
  unshareWorkout,
} from "../../services/workoutService";
import {
  getSharedExercises,
  saveExercise,
  unshareExercise,
} from "../../services/exerciseService";
import "./CommunityPage.css";

export default function CommunityPage({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [viewType, setViewType] = useState("workouts");

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

  async function handleUnshareExercise(id) {
    try {
      await unshareExercise(id);
      setExercises((prevExercises) =>
        prevExercises.filter((exercise) => exercise._id !== id)
      );
    } catch (err) {
      console.error("Error unsharing exercise:", err);
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

      {viewType === "exercises" && (
        <div className="exercise-list">
          {exercises.map((exercise) => (
            <div key={exercise._id} className="exercise-card">
              <h3>{exercise.name}</h3>
              <p><strong>Category:</strong> {exercise.category}</p>
              <p><strong>By:</strong> {exercise?.user?.name ? exercise.user.name : "Anonymous"}</p>

              {user && user._id === exercise.user._id ? (
                <button onClick={() => handleUnshareExercise(exercise._id)}>Unshare</button>
              ) : (
                <button onClick={() => saveExercise(exercise._id)}>Save</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
