import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import LoginButton from './auth/LoginButton'
import LogoutButton from './auth/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function Layout() {
  const { user, isAuthenticated } = useAuth0()

  return (
    <>
      <header className="d-flex justify-content-between align-items-center header p-2 header-bg text-black">
        {/* LEFT side: Home Button */}
          <div className="dropdown">
            <button
              className="btn btn-home dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h3>Charity Match</h3>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Link to="/donation" className="dropdown-item">
            Donate
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="dropdown-item">
            Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT side: Profile + Login/Logout */}
        <div className="d-flex align-items-center gap-2">
          {isAuthenticated && (
            <Link to="/profile" className="btn btn-primary">
              Profile
            </Link>
          )}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </header>

      {/* Show user email below header */}
      {isAuthenticated && (
        <div className="d-flex justify-content-end trsp-bg" style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
          <div className="d-flex align-items-center me-3">
            <FontAwesomeIcon icon={faCircle} className="text-success me-2" />
            <span className="text-muted">Logged in as:</span>
          </div>
          <div className='me-3'>{user.email}</div>
        </div>
      )}

      <Outlet />
    </>
  )
}

export default Layout
