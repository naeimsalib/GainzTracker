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
              <ul>
                {todayWorkouts.map((workout) => (
                  <li key={workout._id} className="workout-item">
                    <strong>{workout.title}</strong> - {workout.workoutType} ({workout.duration} mins)
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-workout-text">No scheduled workouts for today.</p>
          )}
        </>
      )}
    </div>
  );
}
