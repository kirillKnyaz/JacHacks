import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import LoginButton from './auth/LoginButton'
import LogoutButton from './auth/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function Layout() {
  const {user, isAuthenticated} = useAuth0()

  return (<>
    <header className="d-flex justify-content-between header p-2 header-bg text-black">
      <div>
          <Link to={"/"} className='btn btn-home'><h3>Charity Match</h3></Link>
      </div>
      
      <div >
        {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
      </div>
    </header>
    {isAuthenticated && <div className="d-flex justify-content-end align-items-center" style={{backgroundColor: "rgba(255, 255, 255, 0.2)"}}>
      <FontAwesomeIcon icon={faCircle} className='me-2' style={{color: "green"}}/>
      <div className='me-3'>{user.email}</div>  
    </div>}

    <Outlet />
  </>)
}

export default Layout