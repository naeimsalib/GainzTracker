import "./ExerciseCard.css";
import { shareExercise } from "../../services/exerciseService";

export default function ExerciseCard({ exercise, onEdit, onDelete, onShare }) {
  async function handleShare() {
    try {
      await shareExercise(exercise._id);
      alert("Exercise shared successfully! 🎉");
      if (onShare) onShare(exercise._id);
    } catch (err) {
      console.error("Error sharing exercise:", err);
      alert("Failed to share exercise.");
    }
  }

  return (
    <div className="exercise-card">
      <button className="delete-btn" onClick={() => onDelete(exercise._id)}>X</button>
      <h3 className="exercise-title">{exercise.name}</h3>
      <p><strong>Category:</strong> {exercise.category}</p>
      <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
      {!exercise.sharedWithCommunity && (
  <button className="share-btn" onClick={handleShare}>Share with Community</button>
)}
      <button onClick={() => onEdit(exercise._id)}>Edit</button>
    </div>
  );
}
