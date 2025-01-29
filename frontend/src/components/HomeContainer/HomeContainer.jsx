import { useEffect, useState } from "react";
import "./HomeContainer.css";
import SignUpButton from "../SignUpButton/SignUpButton";

export default function HomeContainer({ user }) {
  const [quote, setQuote] = useState("Loading motivational quote...");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch("https://zenquotes.io/api/today");
        const data = await response.json();
        if (data && data.length > 0) {
          setQuote(`${data[0].q} — ${data[0].a}`);
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
        setQuote("“Success is not final, failure is not fatal: it is the courage to continue that counts.” — Winston Churchill");
      }
    }
    fetchQuote();
  }, []);

  return (
    <div className="home-container">
      <p className="quote-text">{quote}</p>

      {!user && <SignUpButton />}

      {user && (
        <>
          <p className="date-text">Today is {today}</p>
        </>
      )}
    </div>
  );
}
