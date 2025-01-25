import "./WorkoutCard.css";

export default function WorkoutCard({ workout, onEdit, onDelete }) {
  return (
    <div className="workout-card">
      <button className="delete-btn" onClick={() => onDelete(workout._id)}>X</button>
      <h3 className="workout-title">{workout.title}</h3>
      <p><strong>Day:</strong> {workout.day}</p>
      <p><strong>Type:</strong> {workout.workoutType}</p>
      <button onClick={() => onEdit(workout._id)}>Edit</button>
    </div>
  );
}
