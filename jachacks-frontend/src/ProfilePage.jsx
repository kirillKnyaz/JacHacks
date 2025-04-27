import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategorySelector from './CategorySelector';
import axios from 'axios';
import useAuthApi from './assets/api.js';

function ProfilePage() {
  const { user } = useAuth0();
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [saveInterestsLoading, setSaveInterestsLoading] = useState(false);

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

  const initialOrganizations = [
    { name: 'Green Planet', description: 'Protecting the environment.' },
    { name: 'Education for All', description: 'Accessible education worldwide.' },
  ];

  const initialSuggestedOrganizations = [
    { name: 'Health Heroes', description: 'Supporting healthcare initiatives.' },
    { name: 'Save the Forest', description: 'Preserving natural habitats.' },
    { name: 'Tech for Good', description: 'Using technology for positive impact.' },
  ];

  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [suggestedOrganizations, setSuggestedOrganizations] = useState(initialSuggestedOrganizations);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [savedPaymentAmount, setSavedPaymentAmount] = useState('');
  const [savedPaymentFrequency, setSavedPaymentFrequency] = useState('');

  const toggleCategory = (category) => {
    if (preferences.includes(category)) {
      setPreferences(preferences.filter((c) => c !== category));
    } else {
      if (preferences.length < 5) {
        setPreferences([...preferences, category]);
      } else {
        alert("You can only select up to 5 preferences.");
      }
    }
  };

  const removeOrganization = (orgName) => {
    const orgToRemove = organizations.find(org => org.name === orgName);
    if (orgToRemove) {
      setOrganizations(organizations.filter(org => org.name !== orgName));
      setSuggestedOrganizations([...suggestedOrganizations, orgToRemove]);
    }
  };

  const addOrganization = (org) => {
    if (!organizations.find(o => o.name === org.name)) {
      setOrganizations([...organizations, org]);
      setSuggestedOrganizations(suggestedOrganizations.filter(o => o.name !== org.name));
    }
  };

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

  const handleDiscard = () => {
    setPaymentAmount(savedPaymentAmount);
    setPaymentFrequency(savedPaymentFrequency);
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
        <h4>Preferences (0/5 selected)</h4>
        <div className="d-flex flex-wrap gap-2">
          <CategorySelector 
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          loading={categoriesLoading}
          />
        </div>
        <div className='d-flex align-items-center mt-3'>
          <button className='btn btn-primary' style={{width:"max-content"}} onClick={handleSaveInterests}>Save Prefernces</button>
          {saveInterestsLoading && <div className="spinner-border text-primary ms-2" role="status"/>}
        </div>

      </div>

      <div className="card p-4 mb-4">
        <h4>Assigned Organizations</h4>
        {organizations.length > 0 ? (
          <ul className="list-group">
            {organizations.map((org) => (
              <li key={org.name} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{org.name}</h5>
                  <small>{org.description}</small>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => removeOrganization(org.name)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No organizations assigned yet.</p>
        )}
      </div>

      <div className="card p-4 mb-4">
        <h4>Suggested Organizations</h4>
        {suggestedOrganizations.length > 0 ? (
          <ul className="list-group">
            {suggestedOrganizations.map((org) => (
              <li key={org.name} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{org.name}</h5>
                  <small>{org.description}</small>
                </div>
                <button className="btn btn-sm btn-primary" onClick={() => addOrganization(org)}>Add</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No suggested organizations available.</p>
        )}
      </div>

      <div className="card p-4 mb-4">
        <h4>Payment Information</h4>
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
      </div>

      <div className="d-flex gap-3 mb-5">
        <button className="btn btn-success btn-lg" disabled={isSaveDisabled}>
          Save Changes
        </button>
        <button className="btn btn-danger btn-lg" onClick={handleDiscard}>
          Discard Changes
        </button>
      </div>

      <br />
    </div>
  );
}

export default ProfilePage;
