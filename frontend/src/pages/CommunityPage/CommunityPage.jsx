import { useEffect, useState } from "react";
import {
  getSharedWorkouts,
  saveWorkout,
} from "../../services/workoutService";
import {
  getSharedExercises,
  saveExercise,
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

      {viewType === "workouts" && (
        <div className="community-container">
          {workouts.map((workout) => (
            <div key={workout._id} className="community-item">
              <h3>{workout.title}</h3>
              <p><strong>Day:</strong> {workout.dayOfWeek}</p>
              <p><strong>Type:</strong> {workout.workoutType}</p>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <button onClick={() => saveWorkout(workout._id)}>Save</button>
            </div>
          ))}
        </div>
      )}

      {viewType === "exercises" && (
        <div className="community-container">
          {exercises.map((exercise) => (
            <div key={exercise._id} className="community-item">
              <h3>{exercise.name}</h3>
              <p><strong>Category:</strong> {exercise.category}</p>
              <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
              <button onClick={() => saveExercise(exercise._id)}>Save</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
