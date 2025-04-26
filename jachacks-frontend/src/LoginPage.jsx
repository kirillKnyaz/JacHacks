import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 position-absolute top-50 start-50 translate-middle">
      <div className="card p-4 shadow" style={{ minWidth: '350px' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
        </form>
        <div className="text-center">
          <small>
            Don't have an account? <Link to="/register">Register</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
