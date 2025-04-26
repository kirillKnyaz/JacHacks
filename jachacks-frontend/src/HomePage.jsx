import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="mb-4">Welcome to the Donation App</h1>
      <p className="mb-4">Please login or register to continue!</p>
      <div>
        <Link to="/login" className="btn btn-primary me-2">Login</Link>
        <Link to="/register" className="btn btn-success">Register</Link>
      </div>
    </div>
  );
};

export default HomePage;
