import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DonationPage() {
  const [donationAmount, setDonationAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isReady, setIsReady] = useState(false); // Use state for isReady

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
    // Simulate payment processing
    setPaymentStatus('Processing...');
    setTimeout(() => {
      // Simulate a response after a few seconds
      const isPaymentSuccessful = Math.random() < 0.8; // 80% chance of success (for simulation)
      if (isPaymentSuccessful) {
        setPaymentStatus('Thank you for your donation! Payment successful.');
        setDonationAmount(''); // Reset the amount
      } else {
        setPaymentStatus('Payment failed. Please try again.');
      }
    }, 2000); // Simulate a 2-second delay
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


      <button
        className="btn btn-primary btn-lg"
        onClick={handleDonate}
        disabled={!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0}
      >
        Make a Donation
      </button>

      {paymentStatus && (
        <div className="mt-3 alert alert-info">{paymentStatus}</div>
      )}
    </div>
  );
}

export default DonationPage;