import './Footer.css';

export default function Footer() {
  return (
    <footer className="Footer">
      <p>&copy; {new Date().getFullYear()} GainzTracker. All Rights Reserved.</p>
    </footer>
  );
}
