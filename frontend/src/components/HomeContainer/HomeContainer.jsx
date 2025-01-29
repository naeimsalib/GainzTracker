import { useEffect, useState } from "react";
import { getWorkouts } from "../../services/workoutService";
import "./HomeContainer.css";
import SignUpButton from "../SignUpButton/SignUpButton";

export default function HomeContainer({ user }) {
  const placeholderQuote = "“Success is not final, failure is not fatal: it is the courage to continue that counts.”";
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    if (user) {
      async function fetchWorkouts() {
        try {
          const allWorkouts = await getWorkouts();
          const filteredWorkouts = allWorkouts.filter(workout => workout.dayOfWeek === today);
          setTodayWorkouts(filteredWorkouts);
        } catch (err) {
          console.error("Error fetching workouts:", err);
        }
      }
      fetchWorkouts();
    }
  }, [user, today]);

  return (
    <div className="home-container">
      <p className="quote-text">{placeholderQuote}</p>

      {!user && <SignUpButton />}

      {user && (
        <>
          <p className="date-text">Today is {today}</p>

          {todayWorkouts.length > 0 ? (
            <div className="workout-list">
              <h2>Today's Workouts</h2>
              {todayWorkouts.map((workout) => (
                <div key={workout._id} className="workout-card">
                  <h3>{workout.title}</h3>
                  <p><strong>Type:</strong> {workout.workoutType}</p>
                  <p><strong>Duration:</strong> {workout.duration} minutes</p>
                  <p><strong>Intensity Level:</strong> {workout.intensityLevel}/10</p>
                  {workout.notes && <p><strong>Notes:</strong> {workout.notes}</p>}
                  
                  {workout.exercises.length > 0 && (
                    <div className="exercise-list">
                      <h4>Exercises</h4>
                      <div className="exercise-grid">
                        {workout.exercises.map((exercise) => (
                          <div key={exercise._id} className="exercise-item">
                            <h5>{exercise.name}</h5>
                            <p><strong>Category:</strong> {exercise.category}</p>
                            <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
                            <p><strong>Sets:</strong> {exercise.sets} | <strong>Reps:</strong> {exercise.reps}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-workout-text">No scheduled workouts for today.</p>
          )}
        </>
      )}
    </div>
  );
}
