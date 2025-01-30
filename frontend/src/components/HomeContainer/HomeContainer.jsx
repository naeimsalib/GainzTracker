import { useEffect, useState } from "react";
import { getWorkouts } from "../../services/workoutService";
import { useNavigate } from "react-router-dom";
import "./HomeContainer.css";

const motivationalQuotes = [
  "The difference between a successful person and others is not a lack of strength, but a lack of will.",
  "You miss 100% of the workouts you don’t start.",
  "Strength does not come from physical capacity. It comes from an indomitable will.",
  "Success starts with self-discipline.",
  "No pain, no gain. Stay determined!",
  "Push yourself because no one else is going to do it for you.",
  "The hardest lift of all is lifting yourself up.",
  "Train insane or remain the same.",
  "Excuses don’t burn calories.",
  "The only bad workout is the one that didn’t happen."
];

export default function HomeContainer({ user }) {
  const [quote, setQuote] = useState("");
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [error, setError] = useState(null); // ✅ Track errors
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

    async function fetchWorkout() {
      if (!user) {
        console.log("User not logged in. Skipping workout fetch.");
        return;
      }

      try {
        const workouts = await getWorkouts();
        const todayWorkout = workouts.find((w) => w.dayOfWeek === today);
        setTodayWorkout(todayWorkout);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError("Could not load workouts. Please try again later.");
      }
    }

    fetchWorkout();
  }, [user]); // ✅ Only fetch when user is logged in

  return (
    <div className="home-container">
      <div className="quote-section">
        <p className="quote-text">"{quote}"</p>
      </div>

      {user ? (
        <>
          <p className="date-text">
            Today is <span className="highlight">{today}</span>
          </p>
          {error && <p className="error-text">{error}</p>} {/* ✅ Show error if fetching fails */}
          {todayWorkout ? (
            <div
              className="workout-summary"
              onClick={() => navigate(`/workouts/${todayWorkout._id}`)}
            >
              <h3>{todayWorkout.title}</h3>
              <p>Type: {todayWorkout.workoutType}</p>
              <p>Duration: {todayWorkout.duration} mins</p>
              <button className="start-workout-btn">Start Your Workout</button>
            </div>
          ) : (
            <p className="no-workout-text">No workout assigned for today.</p>
          )}
        </>
      ) : (
        <p className="no-workout-text">
          Please <a href="/login">log in</a> to see your workouts.
        </p>
      )}
    </div>
  );
}
