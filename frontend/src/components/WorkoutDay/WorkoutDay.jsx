import { useNavigate } from "react-router-dom";
import "./WorkoutDay.css";

export default function WorkoutDay({ day, workout, onAdd, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="workout-day">
      <h2>{day}</h2>

      {workout ? (
        <div className="workout-card">
          <h3 className="workout-title">{workout.title}</h3>
          <p><strong>Type:</strong> {workout.workoutType}</p>
          <p><strong>Duration:</strong> {workout.duration} mins</p>

          <div className="workout-actions">
            <button className="edit-btn" onClick={() => onEdit(workout._id)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(workout._id)}>Delete</button>
            <button className="add-exercise-btn" onClick={() => navigate(`/workouts/${workout._id}/add-exercises`)}>
              Add Exercises
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-day">
          <p className="no-workout-text">No workout assigned.</p>
          <button className="add-btn" onClick={() => onAdd(day)}>Add Workout</button>
        </div>
      )}
    </div>
  );
}
