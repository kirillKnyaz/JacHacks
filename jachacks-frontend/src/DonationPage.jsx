import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuthApi from './assets/api';
import { useAuth0 } from '@auth0/auth0-react';

function DonationPage() {
  const { user } = useAuth0();

  const [donationAmount, setDonationAmount] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isReady, setIsReady] = useState(false); // Use state for isReady

  const authApi = useAuthApi();

  const handleAmountChange = (event) => {
    setDonationAmount(event.target.value);
    UpdateIsReady(event.target.value, document.getElementById('frequencyForm').value); // Call UpdateIsReady on amount change
  };

  const handleFrequencyChange = (event) => {
    UpdateIsReady(donationAmount, event.target.value); // Call UpdateIsReady on frequency change
  };

  function UpdateIsReady(amount, frequency) {
    if (amount !== '' && frequency !== '') {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }

  const handleDonate = () => {
    setPaymentLoading(true);

    const donationData = {
      totalAmount: parseFloat(donationAmount),
      userAuth0Id: user.sub, 
    }

    console.log("Donation data:", donationData);
    authApi.post('/donation', donationData).then((response) => {
      setPaymentStatus(response.data.message);
      console.log("Donation successful:", response.data);
    }).catch((error) => {
      console.error("Error processing donation:", error);
      setPaymentStatus("An error occurred while processing your donation.");
    }).finally(() => {
      setPaymentLoading(false);
    });
  };

  return (
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
          <div className="container mt-5">
      <h1>Make a Donation</h1>
      <p className="lead">Your generosity makes a difference.</p>

      <div className="mb-3">
        <label htmlFor="donationAmount" className="form-label">Donation Amount (in CAD) :</label>
        <input
          type="number"
          className="form-control"
          id="donationAmount"
          value={donationAmount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
        />
      </div>

      {/* Optional: Donation Frequency */}
       <div className="mb-3">
        <label className="form-label">Frequency:</label>
        <select className="form-select" id="frequencyForm" onChange={handleFrequencyChange}>
          <option value=""></option>
          <option value="once">Once</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="mb-3">
        <h3>Payment Information (Simulated)</h3>
        <p className="text-muted">This information will not be actually processed.</p>

        <div className="mb-2">
          <label htmlFor="cardNumber" className="form-label">Card Number:</label>
          <input type="text" className="form-control" id="cardNumber" placeholder="****-****-****-****" disabled={!isReady} />
        </div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <label htmlFor="expiryDate" className="form-label">Expiry Date:</label>
            <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" disabled={!isReady} />
          </div>
          <div className="col-md-6 mb-2">
            <label htmlFor="cvv" className="form-label">CVV:</label>
            <input type="text" className="form-control" id="cvv" placeholder="***" disabled={!isReady} />
          </div>
        </div>
      </div>
    </div>

    <div className='d-flex align-items-center mt-3'>
      <button
        className="btn btn-primary btn-lg"
        onClick={handleDonate}
        disabled={!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0}
      >
        Make a Donation
      </button>
      {paymentLoading && <div className="spinner-border text-primary ms-2" role="status" />}
    </div>

      {paymentStatus && (
        <div className="mt-3 alert alert-info">{paymentStatus}</div>
      )}
    </div>
  );
}

export default DonationPage;