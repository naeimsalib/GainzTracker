import { useEffect, useState } from "react";
import { getWorkouts } from "../../services/workoutService";
import { useNavigate } from "react-router-dom";

export default function HomeContainer({ user }) {
    const [quote, setQuote] = useState("Loading motivational quote...");
    const [todayWorkout, setTodayWorkout] = useState(null);
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchWorkout() {
            try {
                const workouts = await getWorkouts();
                const todayWorkout = workouts.find((w) => w.dayOfWeek === today);
                setTodayWorkout(todayWorkout);
            } catch (err) {
                console.error("Error fetching workouts:", err);
            }
        }
        fetchWorkout();
    }, []);

    return (
        <div className="home-container">
            <p className="quote-text">{quote}</p>

            {user && (
                <>
                    <p className="date-text">Today is {today}</p>
                    {todayWorkout ? (
                        <div className="workout-summary" onClick={() => navigate(`/workouts/${todayWorkout._id}`)}>
                            <h3>{todayWorkout.title}</h3>
                            <p>Type: {todayWorkout.workoutType}</p>
                            <p>Duration: {todayWorkout.duration} mins</p>
                        </div>
                    ) : (
                        <p>No workout assigned for today.</p>
                    )}
                </>
            )}
        </div>
    );
}
