import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, deleteWorkout } from "../../services/workoutService";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import "./WorkoutPage.css";

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  // Fetch workouts from backend
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

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await deleteWorkout(id);
        setWorkouts(workouts.filter((workout) => workout._id !== id));
      } catch (err) {
        console.error("Error deleting workout:", err);
      }
    }
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
