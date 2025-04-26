import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginButton from './auth/LoginButton'
import LogoutButton from './auth/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'

function Layout() {
  const {user, isAuthenticated} = useAuth0()

  return (<>
    <header className="d-flex justify-content-between header p-2 header-bg text-black">
      <div>
        <h3>Charity Match </h3>
      </div>
      
      <div >
        {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
      </div>
    </header>
    {isAuthenticated && <div className="d-flex justify-content-end me-3 trsp-bg">
      <div>{user.email}</div>  
    </div>}

    <Outlet />
  </>)
}

export default Layout