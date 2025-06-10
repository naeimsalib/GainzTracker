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
      <div className="workout-card-header">
        <h3 className="workout-title">{workout.title}</h3>
        <div className="workout-actions">
          <button 
            className="action-btn edit-btn" 
            onClick={(e) => { e.stopPropagation(); onEdit(workout._id); }}
            aria-label="Edit workout"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={(e) => { e.stopPropagation(); onDelete(workout._id); }}
            aria-label="Delete workout"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div className="workout-info">
        <div className="info-item">
          <i className="fas fa-calendar-day"></i>
          <span>{workout.dayOfWeek}</span>
        </div>
        <div className="info-item">
          <i className="fas fa-dumbbell"></i>
          <span>{workout.workoutType}</span>
        </div>
        <div className="info-item">
          <i className="fas fa-clock"></i>
          <span>{workout.duration} mins</span>
        </div>
      </div>

      {workout.exercises && workout.exercises.length > 0 ? (
        <div className="exercise-list">
          <h4>
            <i className="fas fa-list"></i>
            Exercises
          </h4>
          <ul>
            {workout.exercises.map((exercise) => (
              <li key={exercise._id} className="exercise-item">
                <span className="exercise-name">{exercise.name}</span>
                <span className="exercise-details">
                  {exercise.sets} sets × {exercise.reps} reps
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-exercises">
          <i className="fas fa-info-circle"></i>
          No exercises added yet
        </p>
      )}

      <div className="workout-footer">
        <button
          className={`share-btn ${workout.sharedWithCommunity ? 'shared' : ''}`}
          onClick={workout.sharedWithCommunity ? handleUnshare : handleShare}
        >
          <i className={`fas fa-${workout.sharedWithCommunity ? 'share-alt' : 'share'}`}></i>
          {workout.sharedWithCommunity ? 'Shared' : 'Share'}
        </button>
      </div>
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