import { useEffect, useState } from "react";
import "./HomeContainer.css";
import SignUpButton from "../SignUpButton/SignUpButton";

const quotes = [
  "“The only way to do great work is to love what you do.” — Steve Jobs",
  "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” — Albert Schweitzer",
  "“Your time is limited, so don’t waste it living someone else’s life.” — Steve Jobs",
  "“The best way to predict the future is to invent it.” — Alan Kay",
  "“I find that the harder I work, the more luck I seem to have.” — Thomas Jefferson",
  "“Success usually comes to those who are too busy to be looking for it.” — Henry David Thoreau",
  "“Don’t be afraid to give up the good to go for the great.” — John D. Rockefeller",
  "“I failed my way to success.” — Thomas Edison",
  "“The only limit to our realization of tomorrow is our doubts of today.” — Franklin D. Roosevelt",
  "“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt"
];

export default function HomeContainer({ user }) {
  const [quote, setQuote] = useState("Loading motivational quote...");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    function fetchQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
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