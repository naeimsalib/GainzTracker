import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExercises } from "../../services/exerciseService";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import "./ExercisesPage.css";

export default function ExercisesPage({ user }) {
  const [exercises, setExercises] = useState([]); // ✅ Ensure default is an empty array
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await getExercises();
        setExercises(data); // ✅ Make sure state is being set
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    }
    fetchExercises();
  }, []);

  const handleShare = (exerciseId, shared) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise._id === exerciseId ? { ...exercise, sharedWithCommunity: shared } : exercise
      )
    );
  };

  return (
    <div className="ExercisesPage">
      <h1>Your Exercises</h1>
      
      {/* ✅ Debugging: Check if exercises are empty */}
      {exercises.length === 0 && <p>No exercises found.</p>}

      <div className="exercise-container">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCard
              key={exercise._id}
              exercise={exercise}
              user={user} // ✅ Ensure `user` is passed
              onEdit={(id) => navigate(`/exercises/${id}/edit`)}
              onDelete={(id) => setExercises(exercises.filter(ex => ex._id !== id))}
              onShare={handleShare}
            />
          ))
        ) : (
          <p>Loading exercises...</p> // ✅ Placeholder until exercises load
        )}
      </div>

      <button onClick={() => navigate("/exercises/new")} className="add-exercise-btn">
        Add Exercise
      </button>
    </div>
  );
}