import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthApi from './assets/api';

function ThankYouPage({ donations = [] }) {
const {user} = useAuth0();
const authApi = useAuthApi();

  const [receipts, setReceipts] = useState([]);
  const [receiptsLoading, setReceiptsLoading] = useState(true);

  useEffect(() => {
    authApi.get(`/receipts/user/${user.sub}`).then((response) => {
      console.log("Receipts:", response.data);
      setReceipts(response.data.receipts);
    }).catch((error) => {
      console.error("Error fetching receipts:", error);
    }).finally(() => {
      setReceiptsLoading(false);
    });

  }, [user.sub])

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="mb-4 text-center">Thank You for Your Donation!</h1>

      {receipts.length > 0 ? (
        <div className="card p-4 shadow w-100" style={{ maxWidth: '600px' }}>
          <h4 className="mb-3">You have donated to:</h4>
          <ul className="list-group">
            {receipts.map((donation, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{donation.organizationName}</strong>
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
