import { useNavigate } from "react-router-dom";
import "./WorkoutCard.css";

export default function WorkoutCard({ workout, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="workout-card" onClick={() => navigate(`/workouts/${workout._id}`)}>
      {/* Delete Button */}
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click event
          onDelete(workout._id);
        }}
      >
        X
      </button>

      {/* Workout Title */}
      <h3 className="workout-title">{workout.title}</h3>

      {/* Workout Details */}
      <div className="workout-details">
        <p><strong>Day:</strong> {workout.dayOfWeek}</p>
        <p><strong>Type:</strong> {workout.workoutType}</p>
        <p><strong>Duration:</strong> {workout.duration} mins</p>
        <p><strong>Intensity:</strong> {workout.intensityLevel}/10</p>
      </div>

      {/* Action Buttons */}
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
      </div>
    </div>
  );
}
