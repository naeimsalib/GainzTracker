import { useNavigate } from "react-router-dom";
import { createExercise } from "../../services/exerciseService";
import ExerciseForm from "../../components/ExerciseForm/ExerciseForm";

export default function AddExercisePage() {
  const navigate = useNavigate();

  async function handleSubmit(exerciseData) {
    try {
      console.log("Submitting Exercise Data:", exerciseData); // ✅ Debugging
      await createExercise(exerciseData);
      navigate("/exercises");
    } catch (err) {
      console.error("Error creating exercise:", err);
    }
  }

  return (
    <div>
      <h1>Add New Exercise</h1>
      <ExerciseForm handleSubmit={handleSubmit} />
    </div>
  );
}
