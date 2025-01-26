import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkout, updateWorkout } from "../../services/workoutService";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import "./EditWorkoutPage.css";

export default function EditWorkoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workoutData, setWorkoutData] = useState(null);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const data = await getWorkout(id);
        setWorkoutData(data);
      } catch (err) {
        console.error("Error fetching workout:", err);
      }
    }
    fetchWorkout();
  }, [id]);

  async function handleUpdateWorkout(updatedData) {
    try {
      await updateWorkout(id, updatedData);
      navigate("/workouts");
    } catch (err) {
      console.error("Error updating workout:", err);
    }
  }

  if (!workoutData) return <p>Loading workout...</p>;

  return (
    <div className="EditWorkoutPage">
      <h1>Edit Workout</h1>
      <WorkoutForm handleSubmit={handleUpdateWorkout} initialData={workoutData} />
    </div>
  );
}
