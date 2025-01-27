import { useEffect, useState } from "react";
import { getSharedWorkouts, saveWorkout } from "../../services/workoutService";
import { getSharedExercises, saveExercise } from "../../services/exerciseService";
import "./CommunityPage.css";

export default function CommunityPage() {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [viewType, setViewType] = useState("workouts"); // Toggle between 'workouts' and 'exercises'

  useEffect(() => {
    async function fetchCommunityData() {
      try {
        if (viewType === "workouts") {
          const workoutsData = await getSharedWorkouts();
          setWorkouts(workoutsData);
        } else {
          const exercisesData = await getSharedExercises();
          setExercises(exercisesData);
        }
      } catch (err) {
        console.error("Error fetching community data:", err);
      }
    }
    fetchCommunityData();
  }, [viewType]);

  async function handleSaveWorkout(id) {
    try {
      await saveWorkout(id);
      alert("Workout saved to your account!");
    } catch (err) {
      console.error("Error saving workout:", err);
    }
  }

  async function handleSaveExercise(id) {
    try {
      await saveExercise(id);
      alert("Exercise saved to your account!");
    } catch (err) {
      console.error("Error saving exercise:", err);
    }
  }

  return (
    <div className="CommunityPage">
      <h1>Community Workouts & Exercises</h1>

      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={viewType === "workouts" ? "active" : ""}
          onClick={() => setViewType("workouts")}
        >
          Workouts
        </button>
        <button
          className={viewType === "exercises" ? "active" : ""}
          onClick={() => setViewType("exercises")}
        >
          Exercises
        </button>
      </div>

      {/* Workouts Section */}
      {viewType === "workouts" && (
        <>
          <h2>Shared Workouts</h2>
          {workouts.length > 0 ? (
            <div className="community-container">
              {workouts.map((workout) => (
                <div key={workout._id} className="community-item">
                  <h3>{workout.title}</h3>
                  <p><strong>Day:</strong> {workout.dayOfWeek}</p>
                  <p><strong>Type:</strong> {workout.workoutType}</p>
                  <p><strong>By:</strong> {workout.user?.name || "Anonymous"}</p>
                  <button onClick={() => handleSaveWorkout(workout._id)}>Save</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No shared workouts available.</p>
          )}
        </>
      )}

      {/* Exercises Section */}
      {viewType === "exercises" && (
        <>
          <h2>Shared Exercises</h2>
          {exercises.length > 0 ? (
            <div className="community-container">
              {exercises.map((exercise) => (
                <div key={exercise._id} className="community-item">
                  <h3>{exercise.name}</h3>
                  <p><strong>Category:</strong> {exercise.category}</p>
                  <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
                  <p><strong>By:</strong> {exercise.user?.name || "Anonymous"}</p>
                  <button onClick={() => handleSaveExercise(exercise._id)}>Save</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No shared exercises available.</p>
          )}
        </>
      )}
    </div>
  );
}
