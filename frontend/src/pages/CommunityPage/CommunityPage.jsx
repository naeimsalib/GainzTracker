import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSharedWorkouts, getSharedExercises } from "../../services/workoutService";
import "./CommunityPage.css";

export default function CommunityPage() {
  const navigate = useNavigate();
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
        <div key={workout._id} className="shared-item">
          <p>{workout.title} by {workout.user.name}</p>
          <button onClick={() => navigate(`/workouts/${workout._id}`)}>View Details</button>
        </div>
      ))}

      <h2>Shared Exercises</h2>
      {exercises.map((exercise) => (
        <div key={exercise._id} className="shared-item">
          <p>{exercise.name} by {exercise.user.name}</p>
          <button onClick={() => navigate(`/exercises/${exercise._id}`)}>View Details</button>
        </div>
      ))}
    </div>
  );
}
