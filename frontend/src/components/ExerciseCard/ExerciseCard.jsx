import { useNavigate } from "react-router-dom";
import "./ExerciseCard.css";
import { shareExercise } from "../../services/exerciseService";

export default function ExerciseCard({ exercise, onEdit, onDelete, onShare }) {
  const navigate = useNavigate();

  async function handleShare() {
    try {
      await shareExercise(exercise._id);
      if (onShare) {
        onShare(exercise._id);
      } else {
        alert("Exercise shared successfully! 🎉");
      }
    } catch (err) {
      console.error("Error sharing exercise:", err);
      alert("Failed to share exercise.");
    }
  }

  return (
    <div className="exercise-card" onClick={() => navigate(`/exercises/${exercise._id}`)}>
      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(exercise._id); }}>X</button>
      <h3 className="exercise-title">{exercise.name}</h3>
      <p><strong>Category:</strong> {exercise.category}</p>
      <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>

      <div className="button-group">
        <button className="share-btn" onClick={(e) => { e.stopPropagation(); handleShare(); }}>Share</button>
        <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEdit(exercise._id); }}>Edit</button>
      </div>
    </div>
  );
}
