import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const LoginPage = () => {

  return (<>
    {/* <div className="container d-flex justify-content-center align-items-center ">
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
          </div> 
          <button type="button" className="btn btn-gradient w-100 mb-3" onClick={() => console.log("login")}>Login</button>
        </form>
        <div className="text-center">
          <small>
            Don't have an account? <Link to="/register">Register</Link>
          </small>
        </div>
      </div>
    </div> */}
  </>);
};

export default LoginPage;
