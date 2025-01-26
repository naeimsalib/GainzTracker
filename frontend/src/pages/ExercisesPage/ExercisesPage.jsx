import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExercises, deleteExercise } from "../../services/exerciseService";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import "./ExercisesPage.css";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

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

  async function handleShare(id) {
    setExercises(exercises.map(ex => 
      ex._id === id ? { ...ex, sharedWithCommunity: true } : ex
    ));
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
              onDelete={(id) => setExercises(exercises.filter(ex => ex._id !== id))}
              onShare={handleShare}
            />
          ))
        ) : (
          <p>You have no saved exercises.</p>
        )}
      </div>
    </div>
  );
}
