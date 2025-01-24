import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExercises, deleteExercise } from "../../services/exerciseService";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import "./ExercisesPage.css";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  // Fetch exercises from backend
  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    }
    fetchExercises();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      try {
        await deleteExercise(id);
        setExercises(exercises.filter((exercise) => exercise._id !== id));
      } catch (err) {
        console.error("Error deleting exercise:", err);
      }
    }
  }

  return (
    <div className="ExercisesPage">
      <h1>Your Exercises</h1>
      <button onClick={() => navigate("/exercises/new")} className="add-exercise-btn">
        Add Exercise
      </button>
      
      <div className="exercise-container">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCard
              key={exercise._id}
              exercise={exercise}
              onEdit={(id) => navigate(`/exercises/${id}/edit`)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>You have no saved exercises.</p>
        )}
      </div>
    </div>
  );
}
