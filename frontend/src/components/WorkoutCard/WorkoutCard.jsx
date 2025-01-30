import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
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
    <div className="workout-card" onClick={() => navigate(`/workouts/${workout._id}`)}>
      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(workout._id); }}>X</button>
      <h3 className="workout-title">{workout.title}</h3>
      <p><strong>Day:</strong> {workout.dayOfWeek}</p>
      <p><strong>Type:</strong> {workout.workoutType}</p>
      <p><strong>Duration:</strong> {workout.duration} mins</p>

      {/* Display exercises if available */}
      {workout.exercises && workout.exercises.length > 0 ? (
        <div className="exercise-list">
          <h4>Exercises:</h4>
          <ul>
            {workout.exercises.map((exercise) => (
              <li key={exercise._id}>
                <strong>{exercise.name}</strong> - {exercise.sets} sets of {exercise.reps} reps
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No exercises found.</p>
      )}

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

// PropTypes validation
WorkoutCard.propTypes = {
  workout: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dayOfWeek: PropTypes.string.isRequired,
    workoutType: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        sets: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
      })
    ).isRequired,
    sharedWithCommunity: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};