import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthApi from './assets/api';
import { useNavigate } from 'react-router-dom';

function SelectedOrgsPage() {
  const { user } = useAuth0(); // Assure-toi que tu as accès à l'utilisateur ici
  const authApi = useAuthApi();

  const navigate = useNavigate();

  const [topOrganizations, setTopOrganizations] = useState([]);
  const [topOrganizationsLoading, setTopOrganizationsLoading] = useState(true);
  const [userSavedOrganizations, setUserSavedOrganizations] = useState([]);

  useEffect(() => {
    reloadOrganizations();
  }, []);

  const reloadOrganizations = () => {
    setTopOrganizationsLoading(true);
    authApi.get(`/user-organization/top-matching/${user.sub}`).then((response) => {
      console.log("Top organizations:", response.data);
      setTopOrganizations(response.data.organizations);
    }).catch((error) => {
      console.error("Error fetching top organizations:", error);
    }).finally(() => {
      setTopOrganizationsLoading(false);
    });
  }

  
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

  return (
    <div className="container mt-5">
      <h2>Top Organizations for You</h2>
      {topOrganizations.length === 0 ? (
        <p>No organization has been selected yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          {topOrganizations.map((org, index) => {
            const isAlreadySelected = userSavedOrganizations.some((o) => o.id === org.id);
            return (<div className="col" key={index}>
              <div className="card h-100 rounded-card position-relative">
                <div className="card-body">
                  <h5 className="card-title">{org.name}</h5>
                  <p className="card-text">{org.description}</p>
                </div>
                <button
                  className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 m-2"
                  onClick={() => {
                    if (!isAlreadySelected) saveOrganization(org);
                    else removeOrganization(org);
                  }}
                  title="Remove from list"
                >{isAlreadySelected ? <FontAwesomeIcon icon={faCheck} />: "+"}</button>
              </div>
            </div>)
          })}
        </div>
      )}

      <hr className="my-5" />

      <button className="btn btn-primary mb-3" onClick={() => navigate('/donation')}>Continue</button>
    </div>
  );
}

export default SelectedOrgsPage;