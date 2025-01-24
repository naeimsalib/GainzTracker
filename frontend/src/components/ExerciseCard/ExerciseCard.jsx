import "./ExerciseCard.css";

export default function ExerciseCard({ exercise, onEdit, onDelete }) {
  return (
    <div className="exercise-card">
      <button className="delete-btn" onClick={() => onDelete(exercise._id)}>X</button>
      <h3 className="exercise-title">{exercise.name}</h3>
      <p><strong>Category:</strong> {exercise.category}</p>
      <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
      <button className="share-btn">Share with Community</button>
      <button onClick={() => onEdit(exercise._id)}>Edit</button>
    </div>
  );
}
