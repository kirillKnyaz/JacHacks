import { Link } from 'react-router-dom';
import auth0 from './config/auth0';
import Navbar from './Navbar';

const LoginPage = () => {

  const handleLogin = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: 'http://localhost:5173/callback',
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: "openid profile email"
    });
  }

  return (<>
    <Navbar/>
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="card p-4 shadow" style={{ minWidth: '350px' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form>
          {/* <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" required />
          </div> */}
          <button type="button" className="btn btn-gradient w-100 mb-3" onClick={handleLogin}>Login</button>
        </form>
        <div className="text-center">
          <small>
            Don't have an account? <Link to="/register">Register</Link>
          </small>
        </div>
      </div>
    </div>
  </>);
};

export default LoginPage;
