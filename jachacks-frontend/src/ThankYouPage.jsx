import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ThankYouPage({ donations = [] }) {
  // Temporary donation information for testing
  const testDonations = [
    { organization: 'Green Planet', amount: 50 },
    { organization: 'Education for All', amount: 30 },
    { organization: 'Health Heroes', amount: 20 },
  ];

  const displayDonations = donations.length > 0 ? donations : testDonations;

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="mb-4 text-center">Thank You for Your Donation!</h1>

      {displayDonations.length > 0 ? (
        <div className="card p-4 shadow w-100" style={{ maxWidth: '600px' }}>
          <h4 className="mb-3">You have donated to:</h4>
          <ul className="list-group">
            {displayDonations.map((donation, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{donation.organization}</strong>
                </div>
                <div>
                  ${parseFloat(donation.amount).toFixed(2)} CAD
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="lead text-center">No donation information available.</p>
      )}

      <div className="d-flex gap-3 mt-4">
        <Link to="/profile" className="btn btn-primary">See Profile</Link>
        <Link to="/home" className="btn btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
}

export default ThankYouPage;
