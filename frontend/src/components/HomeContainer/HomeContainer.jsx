import './HomeContainer.css';
import SignUpButton from '../SignUpButton/SignUpButton';

export default function HomeContainer({ user }) {
  const placeholderQuote = "“Success is not final, failure is not fatal: it is the courage to continue that counts.”";

  return (
    <div className="home-container">
      <p className="quote-text">{placeholderQuote}</p>
      {!user && <SignUpButton />}
      {user && <p className="date-text">Today's Date: {new Date().toDateString()}</p>}
    </div>
  );
}
