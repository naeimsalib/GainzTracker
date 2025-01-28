import { useNavigate } from "react-router-dom";
import { shareWorkout, unshareWorkout } from "../../services/workoutService";
import "./WorkoutCard.css";

export default function WorkoutCard({ workout, onEdit, onDelete, onShare }) {
  const navigate = useNavigate();

  async function handleShare(e) {
    e.stopPropagation();
    try {
      await shareWorkout(workout._id);
      if (onShare) onShare(workout._id, true);
    } catch (err) {
      console.error("Error sharing workout:", err);
    }
  }

  async function handleUnshare(e) {
    e.stopPropagation();
    try {
      await unshareWorkout(workout._id);
      if (onShare) onShare(workout._id, false);
    } catch (err) {
      console.error("Error unsharing workout:", err);
    }
  }

  return (
    <div
      className="workout-card"
      onClick={() => navigate(`/workouts/${workout._id}`)}
    >
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(workout._id);
        }}
      >
        X
      </button>
      <h3 className="workout-title">{workout.title}</h3>
      <p><strong>Day:</strong> {workout.dayOfWeek}</p>
      <p><strong>Type:</strong> {workout.workoutType}</p>
      <p><strong>Duration:</strong> {workout.duration} mins</p>

      <div className="workout-actions">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(workout._id);
          }}
        >
          Edit
        </button>

        <button
          className={`share-btn ${workout.sharedWithCommunity ? "unshare" : "share"}`}
          onClick={workout.sharedWithCommunity ? handleUnshare : handleShare}
        >
          {workout.sharedWithCommunity ? "Unshare" : "Share"}
        </button>
      </div>
    </div>
  );
}
