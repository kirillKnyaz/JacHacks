import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginButton from './auth/LoginButton'
import LogoutButton from './auth/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'

function Layout() {
  const {isAuthenticated} = useAuth0()

  return (<>
    <header className="d-flex justify-content-between header p-2 bg-light">
      {isAuthenticated && <div className="d-flex align-items-center">Authenticated!</div>}
      <h3>JacHacks </h3>
      <div >
        <LoginButton/>
        <LogoutButton/>
      </div>
    </header>

    <Outlet />
  </>)
}

export default Layout