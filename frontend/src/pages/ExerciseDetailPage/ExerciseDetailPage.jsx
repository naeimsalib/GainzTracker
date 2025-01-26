import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExerciseById, deleteExercise, shareExercise } from "../../services/exerciseService";
import "./ExerciseDetailPage.css";

export default function ExerciseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    async function fetchExercise() {
      try {
        const data = await getExerciseById(id);
        setExercise(data);
      } catch (err) {
        console.error("Error fetching exercise:", err);
      }
    }
    fetchExercise();
  }, [id]);

  async function handleDelete() {
    try {
      await deleteExercise(id);
      navigate("/exercises"); // ✅ Redirect after deleting
    } catch (err) {
      console.error("Error deleting exercise:", err);
    }
  }

  async function handleShare() {
    try {
      await shareExercise(id);
      setExercise({ ...exercise, sharedWithCommunity: true });
    } catch (err) {
      console.error("Error sharing exercise:", err);
    }
  }

  if (!exercise) return <p>Loading...</p>;

  return (
    <div className="exercise-detail-container">
      <h1>{exercise.name}</h1>
      <p><strong>Category:</strong> {exercise.category}</p>
      <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
      <p><strong>Equipment:</strong> {exercise.equipment || "None"}</p>
      <p><strong>Difficulty Level:</strong> {exercise.difficultyLevel}</p>
      <p><strong>Sets:</strong> {exercise.sets}</p>
      <p><strong>Reps:</strong> {exercise.reps}</p>
      <p><strong>Rest Time (s):</strong> {exercise.restTime}</p>
      <p><strong>Notes:</strong> {exercise.notes || "No additional notes."}</p>

      {/* Buttons for Edit, Delete, Share */}
      <div className="button-group">
        <button className="edit-btn" onClick={() => navigate(`/exercises/${id}/edit`)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
        <button className="share-btn" onClick={handleShare}>Share</button>
      </div>
    </div>
  );
}
