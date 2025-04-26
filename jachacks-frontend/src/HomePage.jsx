import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const HomePage = () => {
  return (<>
    <Navbar />
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="mb-4 text-center">
        What Matters to You? <br /> Find Your Perfect Charity Match.
      </h1>
      <p className="lead mb-5 text-center" style={{ maxWidth: '600px' }}>
        CharityMatch makes it a reality. Tell us what you care about through a
        short, engaging quiz or explore our diverse categories. Then, set up
        automated donations and seamlessly support the causes that resonate with
        you most.
      </p>
      <div className="d-flex gap-3">
        <Link to="/login" className="btn btn-primary btn-lg">
          Login
        </Link>
        <Link to="/register" className="btn btn-success btn-lg">
          Register
        </Link>
      </div>
      <div className="mt-4 text-center">
        <button className="btn btn-outline-info">Take the Quiz</button> {/* Add Quiz Button */}
      </div>
    </div>
  </>);
};

export default HomePage;