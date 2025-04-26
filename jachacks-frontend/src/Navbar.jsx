import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';

function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">My App</Link>
        <LoginButton />
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Navbar;
