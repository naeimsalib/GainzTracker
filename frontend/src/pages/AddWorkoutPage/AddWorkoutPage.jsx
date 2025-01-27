import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { createWorkout } from "../../services/workoutService";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";

export default function AddWorkoutPage() {
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  async function handleCreateWorkout(workoutData) {
    try {
      console.log("Submitting Workout Data:", workoutData);
      await createWorkout(workoutData);
      navigate("/workouts"); 
    } catch (err) {
      console.error("Error creating workout:", err);
    }
  }

  return (
    <div>
      <h1>Add New Workout</h1>
      <WorkoutForm handleSubmit={handleCreateWorkout} />
    </div>
  );
}
