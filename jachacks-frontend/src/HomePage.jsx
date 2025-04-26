import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'

const HomePage = () => {
    const {isAuthenticated, loginWithRedirect} = useAuth0()
  return (<>
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
      <div className="mt-4 text-center">
         
         {isAuthenticated ? <Link to={"/quiz"} className="btn btn-primary btn-lg" >Take the Quiz!</Link> : <button className="btn btn-primary" onClick={() => loginWithRedirect({
      authorizationParams: {
        prompt: "login",
      }
    })}>
      Take the Quiz!
    </button> }
      </div>
    </div>
  </>);
};

export default HomePage;