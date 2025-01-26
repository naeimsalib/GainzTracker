import { useEffect, useState } from "react";
import { getSharedWorkouts } from "../../services/workoutService"; 
import { getSharedExercises } from "../../services/exerciseService"; 
import "./CommunityPage.css";

export default function CommunityPage() {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchCommunityData() {
      try {
        const workoutsData = await getSharedWorkouts();
        const exercisesData = await getSharedExercises();
        setWorkouts(workoutsData);
        setExercises(exercisesData);
      } catch (err) {
        console.error("Error fetching community data:", err);
      }
    }
    fetchCommunityData();
  }, []);

  return (
    <div className="CommunityPage">
      <h1>Community Workouts & Exercises</h1>

      <h2>Shared Workouts</h2>
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <div key={workout._id}>
            {workout.title} by {workout.user?.name || "Anonymous"}
          </div>
        ))
      ) : (
        <p>No shared workouts available.</p>
      )}

      <h2>Shared Exercises</h2>
      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <div key={exercise._id}>
            {exercise.name} by {exercise.user?.name || "Anonymous"}
          </div>
        ))
      ) : (
        <p>No shared exercises available.</p>
      )}
    </div>
  );
}
