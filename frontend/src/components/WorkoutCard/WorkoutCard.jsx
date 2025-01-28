import { useNavigate } from "react-router-dom";
import "./WorkoutCard.css";
import { shareWorkout, unshareWorkout } from "../../services/workoutService";

export default function WorkoutCard({ workout, onEdit, onDelete, onShare }) {
  const navigate = useNavigate();

  async function handleShare() {
    try {
      await shareWorkout(workout._id);
      if (onShare) {
        onShare(workout._id, true);
      } else {
        alert("Workout shared successfully! 🎉");
      }
    } catch (err) {
      console.error("Error sharing workout:", err);
      alert("Failed to share workout.");
    }
  }

  async function handleUnshare() {
    try {
      await unshareWorkout(workout._id);
      if (onShare) {
        onShare(workout._id, false);
      } else {
        alert("Workout unshared successfully.");
      }
    } catch (err) {
      console.error("Error unsharing workout:", err);
      alert("Failed to unshare workout.");
    }
  }

  return (
    <div className="workout-card" onClick={() => navigate(`/workouts/${workout._id}`)}>
      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(workout._id); }}>X</button>
      <h3 className="workout-title">{workout.title}</h3>
      <p><strong>Day:</strong> {workout.dayOfWeek}</p>
      <p><strong>Type:</strong> {workout.workoutType}</p>
      <p><strong>Duration:</strong> {workout.duration} mins</p>

      {workout.sharedWithCommunity ? (
        <button className="unshare-btn" onClick={(e) => { e.stopPropagation(); handleUnshare(); }}>
          Unshare
        </button>
      ) : (
        <button className="share-btn" onClick={(e) => { e.stopPropagation(); handleShare(); }}>
          Share
        </button>
      )}

      <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEdit(workout._id); }}>
        Edit
      </button>
    </div>
  );
}
