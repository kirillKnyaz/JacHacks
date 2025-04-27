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
        <div>
          <Link to="/" className="btn btn-home">
            <h3>Charity Match</h3>
          </Link>
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
        <div className="d-flex justify-content-end me-3 trsp-bg">
          <div>{user.email}</div>
        </div>
      )}

      <Outlet />
    </>
  )
}

export default Layout
