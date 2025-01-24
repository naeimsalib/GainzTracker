import { NavLink } from 'react-router-dom';
import './SignUpButton.css';

export default function SignUpButton() {
  return (
    <NavLink to="/signup" className="sign-up-btn">
      Sign Up
    </NavLink>
  );
}
