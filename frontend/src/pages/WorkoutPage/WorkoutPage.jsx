import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, deleteWorkout } from "../../services/workoutService";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import "./WorkoutPage.css";

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      }
    }
    fetchWorkouts();
  }, []);

  function handleDelete(id) {
    setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== id));
  }

  return (
    <div className="WorkoutPage">
      <h1>Your Workouts</h1>
      <button onClick={() => navigate("/workouts/new")} className="add-workout-btn">
        Add Workout
      </button>

      <div className="workout-container">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onEdit={(id) => navigate(`/workouts/${id}/edit`)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>You have no saved workouts.</p>
        )}
      </div>
    </div>
  );
}
