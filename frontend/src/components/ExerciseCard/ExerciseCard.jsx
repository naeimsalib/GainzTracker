import { useNavigate } from "react-router-dom";
import { shareExercise, unshareExercise } from "../../services/exerciseService";
import "./ExerciseCard.css";

export default function ExerciseCard({ exercise, user, onEdit, onDelete, onShare }) {
  const navigate = useNavigate();

  if (!exercise) return null;

  async function handleShare(e) {
    e.stopPropagation();
    try {
      await shareExercise(exercise._id);
      if (onShare) onShare(exercise._id, true);
    } catch (err) {
      console.error("Error sharing exercise:", err);
    }
  }

  async function handleUnshare(e) {
    e.stopPropagation();
    try {
      await unshareExercise(exercise._id);
      if (onShare) onShare(exercise._id, false);
    } catch (err) {
      console.error("Error unsharing exercise:", err);
    }
  }

  return (
    <div
      className="exercise-card"
      onClick={() => navigate(`/exercises/${exercise._id}`)}
    >
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(exercise._id);
        }}
      >
        X
      </button>
      <h3 className="exercise-title">{exercise.name}</h3>
      <p><strong>Category:</strong> {exercise.category}</p>
      <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>

      <div className="exercise-actions">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(exercise._id);
          }}
        >
          Edit
        </button>

        <button
          className={`share-btn ${exercise.sharedWithCommunity ? "unshare" : "share"}`}
          onClick={exercise.sharedWithCommunity ? handleUnshare : handleShare}
        >
          {exercise.sharedWithCommunity ? "Unshare" : "Share"}
        </button>
      </div>
    </div>
  );
}
