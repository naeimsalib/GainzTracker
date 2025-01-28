import { useNavigate } from "react-router-dom";
import { shareExercise, unshareExercise } from "../../services/exerciseService";
import "./ExerciseCard.css";

export default function ExerciseCard({ exercise, user, onEdit, onDelete }) {
  const navigate = useNavigate();

  async function handleShare() {
    try {
      if (exercise.sharedWithCommunity) {
        await unshareExercise(exercise._id);
      } else {
        await shareExercise(exercise._id);
      }

      // Toggle the shared status (for immediate UI update)
      exercise.sharedWithCommunity = !exercise.sharedWithCommunity;
    } catch (err) {
      console.error("Error toggling share status:", err);
    }
  }

  return (
    <div className="exercise-card">
      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(exercise._id); }}>X</button>
      <h3 className="exercise-title">{exercise.name}</h3>
      <p><strong>Category:</strong> {exercise.category}</p>
      <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>

      <div className="exercise-actions">
        <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEdit(exercise._id); }}>Edit</button>
        
        {/* ✅ Share/Unshare button - Only visible to the owner */}
        {user && user._id === exercise.user._id && (
          <button 
            className={`share-btn ${exercise.sharedWithCommunity ? "unshare" : "share"}`}
            onClick={(e) => { e.stopPropagation(); handleShare(); }}
          >
            {exercise.sharedWithCommunity ? "Unshare" : "Share"}
          </button>
        )}
      </div>
    </div>
  );
}
