import React, { use, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategorySelector from './CategorySelector';
import axios from 'axios';
import useAuthApi from './assets/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateForward, faSpinner } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
  const {user} = useAuth0();
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [saveInterestsLoading, setSaveInterestsLoading] = useState(false);
  
  const [topOrganizations, setTopOrganizations] = useState([]);
  const [topOrganizationsLoading, setTopOrganizationsLoading] = useState(true);

  const [userSavedOrganizations, setUserSavedOrganizations] = useState([]);
  const [userSavedOrganizationsLoading, setUserSavedOrganizationsLoading] = useState(true);

  const authApi = useAuthApi();

  useEffect(() => {
    axios.get('http://localhost:8080/public/interests/all').then((response) => {
      setCategories(response.data);
    }).catch((error) => {
      console.error("Error fetching categories:", error);
    }).finally(() => {
      setCategoriesLoading(false);
    });
  }, []);

  useEffect(() => {
    authApi.get(`/user-interests/get/${user.sub}`).then((response) => {
      setSelectedCategories(response.data.interests);
    }).catch((error) => {
      console.error("Error fetching user interests:", error);
    });
  }, []);

  useEffect(() => {
    reloadTopOrganizations();
  }, []);

  const reloadTopOrganizations = () => {
    setTopOrganizationsLoading(true);
    authApi.get(`/user-organization/top-matching/${user.sub}`).then((response) => {
      setTopOrganizations(response.data.organizations);
    }).catch((error) => {
      console.error("Error fetching top organizations:", error);
    }).finally(() => {
      setTopOrganizationsLoading(false);
    });
  }

  useEffect(() => {
    authApi.get(`/user-organization/get/${user.sub}`).then((response) => {
      console.log("User saved organizations:", response.data);
      setUserSavedOrganizations(response.data.organizations);
    }).catch((error) => {
      console.error("Error fetching user saved organizations:", error);
    }).finally(() => {
      setUserSavedOrganizationsLoading(false);
    });
  }, [])

  const saveOrganization = (org) => {
    console.log("Saving organization:", org);

    authApi.post('/user-organization/add', {organizationId: org.id}).then((response) => {
      console.log("Organization saved successfully:", response.data);
      setUserSavedOrganizations([...userSavedOrganizations, org]);
    }).catch((error) => {
      console.error("Error saving organization:", error);
    });
  }

  const removeOrganization = (org) => {
    console.log("Removing organization:", org);
    authApi.delete('/user-organization/remove', {data:{organizationId: org.id}}).then((response) => {
      console.log("Organization removed successfully:", response.data);
      setUserSavedOrganizations(userSavedOrganizations.filter((o) => o.id !== org.id));
    }).catch((error) => {
      console.error("Error removing organization:", error);
    });
  }

  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [savedPaymentAmount, setSavedPaymentAmount] = useState('');
  const [savedPaymentFrequency, setSavedPaymentFrequency] = useState('');

  const handleSaveInterests = () => {
    setSaveInterestsLoading(true);
    let interestIds = selectedCategories.map(category => category.id);
    authApi.post('/user-interests/add/multiple', interestIds).then((response) => {
      console.log("Interests saved successfully:", response.data);
    }).catch((error) => {
      console.error("Error saving interests:", error);
    }).finally(() => {
      setSaveInterestsLoading(false);
    });
  };

  const isSaveDisabled = !paymentAmount || parseFloat(paymentAmount) < 1 || !paymentFrequency;

  return (
    <div className="container mt-5">
      <h1>Profile</h1>

      <div className="card p-4 mb-4">
        <h4>User Info</h4>
        {user && (
          <div>
            {user.picture && (
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle mb-3"
                width="120"
                height="120"
              />
            )}
            <h5>{user.name}</h5>
            <p className="text-muted">{user.email}</p>
          </div>
        )}
      </div>

      {/* (rest of the page remains the same) */}

      <div className="card p-4 mb-4">
        <h4>Your causes ({selectedCategories.length}/5 selected)</h4>
        <div className="d-flex flex-wrap gap-2">
          <CategorySelector 
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          loading={categoriesLoading}
          />
        </div>
        <div className='d-flex align-items-center mt-3'>
          <button className='btn btn-success' style={{width:"max-content"}} onClick={handleSaveInterests}>Save</button>
          {saveInterestsLoading && <div className="spinner-border text-primary ms-2" role="status"/>}
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h4>Your Organizations</h4>
        <ul className='list-group overflow-hidden'>
          {userSavedOrganizationsLoading ? <>
            {Array.from({ length: 3 }, (_, index) => {
              return (<li className={`placeholder-wave p-0 ${index < 2 ? "mb-1" : ""}`} style={{height: "4rem"}} key={index}>
              <div style={{height:"100%", width: "100%", backgroundColor: "#0d6dfc"}} className='placeholder m-0'></div>
              </li>);
            })}
          </> : <>
            {userSavedOrganizations.map((org) => 
              <li key={org.name} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{org.name}</h5>
                  <small>{org.description}</small>
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => removeOrganization(org)}>-</button>
              </li>
            )}
          </>}
        </ul>
      </div>

      <div className="card p-4 mb-4">
        <div className='d-flex justify-content-between mb-2'>
          <h4>Your Top Matches</h4>
          <button className='btn' onClick={reloadTopOrganizations}>
            {topOrganizationsLoading ? <FontAwesomeIcon icon={faSpinner} spin/> : <FontAwesomeIcon icon={faArrowRotateForward}/>}
          </button>
        </div>
      
        <ul className="list-group  overflow-hidden">
          {topOrganizationsLoading ? <>
            {Array.from({ length: 3 }, (_, index) => {
                return (<li className={`placeholder-wave p-0 ${index < 2 ? "mb-1" : ""}`} style={{height: "4rem"}} key={index}>
                <div style={{height:"100%", width: "100%", backgroundColor: "#0d6dfc"}} className='placeholder m-0'></div>
                </li>);
            })}
          </> : <>
            {topOrganizations.map((org) => 
              <li key={org.name} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{org.name}</h5>
                  <small>{org.description}</small>
                </div>
                <button className="btn btn-sm btn-outline-primary" onClick={() => saveOrganization(org)}>+</button>
              </li>
            )}
          </>}
        </ul>
      </div>

      <div className="card p-4 mb-4">
        <h4>Donations:</h4>
        <div className="mb-3">
          <label htmlFor="paymentAmount" className="form-label">Donation Amount (CAD):</label>
          <input
            type="number"
            id="paymentAmount"
            className="form-control"
            min="1"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Enter amount"
          />
          {paymentAmount && parseFloat(paymentAmount) < 1 && (
            <small className="text-danger">You need to donate a minimum of $1.</small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="paymentFrequency" className="form-label">Donation Frequency:</label>
          <select
            id="paymentFrequency"
            className="form-select"
            value={paymentFrequency}
            onChange={(e) => setPaymentFrequency(e.target.value)}
          >
            <option value="">Select frequency</option>
            <option value="once">Once</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {paymentAmount && paymentFrequency && parseFloat(paymentAmount) >= 1 && (
          <div className="alert alert-info">
            You will donate <strong>${paymentAmount}</strong> <strong>{paymentFrequency}</strong>.
          </div>
        )}

        <button className="btn btn-primary" onClick={() => {setSavedPaymentAmount(paymentAmount); setSavedPaymentFrequency(paymentFrequency);}} disabled={isSaveDisabled}>
          Save Donation
        </button>
      </div>

      <br />
    </div>
  );
}

export default ProfilePage;
