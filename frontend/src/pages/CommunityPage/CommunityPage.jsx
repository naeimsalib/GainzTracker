import { useEffect, useState } from "react";
import { getSharedWorkouts } from "../../services/workoutService";
import { getSharedExercises } from "../../services/exerciseService";
import "./CommunityPage.css";

export default function CommunityPage() {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchCommunityData() {
      setWorkouts(await getSharedWorkouts());
      setExercises(await getSharedExercises());
    }
    fetchCommunityData();
  }, []);

  return (
    <div className="CommunityPage">
      <h1>Community Workouts & Exercises</h1>
      <h2>Shared Workouts</h2>
      {workouts.map((workout) => (
        <div key={workout._id}>{workout.title} by {workout.user.name}</div>
      ))}

      <h2>Shared Exercises</h2>
      {exercises.map((exercise) => (
        <div key={exercise._id}>{exercise.name} by {exercise.user.name}</div>
      ))}
    </div>
  );
}
