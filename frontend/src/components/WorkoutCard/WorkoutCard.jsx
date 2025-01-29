import { useNavigate } from "react-router-dom";
import "./WorkoutCard.css";
import { shareWorkout, unshareWorkout } from "../../services/workoutService";

export default function WorkoutCard({ workout, onEdit, onDelete, onShare }) {
  const navigate = useNavigate();

  async function handleShare(e) {
    e.stopPropagation();
    try {
      await shareWorkout(workout._id);
      if (onShare) {
        onShare(workout._id, true);
      }
    } catch (err) {
      console.error("Error sharing workout:", err);
    }
  }

  async function handleUnshare(e) {
    e.stopPropagation();
    try {
      await unshareWorkout(workout._id);
      if (onShare) {
        onShare(workout._id, false);
      }
    } catch (err) {
      console.error("Error unsharing workout:", err);
    }
  }

  return (
    <div className="workout-card">
      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(workout._id); }}>X</button>
      <h3 className="workout-title">{workout.title}</h3>
      <p><strong>Day:</strong> {workout.dayOfWeek}</p>
      <p><strong>Type:</strong> {workout.workoutType}</p>
      <p><strong>Duration:</strong> {workout.duration} mins</p>

      <button
        className={workout.sharedWithCommunity ? "unshare-btn" : "share-btn"}
        onClick={workout.sharedWithCommunity ? handleUnshare : handleShare}
      >
        {workout.sharedWithCommunity ? "Unshare" : "Share"}
      </button>

      <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEdit(workout._id); }}>
        Edit
      </button>
    </div>
  );
}