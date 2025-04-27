import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function SelectedOrgsPage() {
  const { user } = useAuth0(); // Assure-toi que tu as accès à l'utilisateur ici

  useEffect(() => {
    reloadOrganizations();
  }, []);

  const reloadOrganizations = () => {
    setTopOrganizationsLoading(true);
    axios.get(`http://localhost:8080/public/organization/top-matching/${user.sub}`).then((response) => {
      console.log("Top organizations:", response.data);
      setTopOrganizations(response.data.organizations);
    }).catch((error) => {
      console.error("Error fetching top organizations:", error);
    }).finally(() => {
      setTopOrganizationsLoading(false);
    });
  }

  const [topOrganizations, setTopOrganizations] = useState([]);
  const [topOrganizationsLoading, setTopOrganizationsLoading] = useState(true);

  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [otherOrgs, setOtherOrgs] = useState([]);

  const handleAddToMainListDirectly = (orgToAdd) => {
    if (!selectedOrganizations.some(org => org.name === orgToAdd.name)) {
      setSelectedOrganizations([...selectedOrganizations, orgToAdd]);
      setOtherOrgs(otherOrgs.filter(org => org.name !== orgToAdd.name));
    }
  };

  const handleRemoveSelectedOrg = (orgToRemove) => {
    setSelectedOrganizations(selectedOrganizations.filter(org => org.name !== orgToRemove.name));
    setOtherOrgs([...otherOrgs, orgToRemove]);
  };

  const isAlreadySelected = (org) => selectedOrganizations.some(selectedOrg => selectedOrg.name === org.name);

  return (
    <div className="container mt-5">
      <h2>Selected Organizations</h2>
      {topOrganizations.length === 0 ? (
        <p>No organization has been selected yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          {selectedOrganizations.map((org, index) => (
            <div className="col" key={index}>
              <div className="card h-100 rounded-card position-relative">
                <div className="card-body">
                  <h5 className="card-title">{org.name}</h5>
                  <p className="card-text">{org.description}</p>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                  onClick={() => handleRemoveSelectedOrg(org)}
                  title="Remove from list"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="my-5" />

      <h2>Other organizations you might like</h2>
      <p>Click the plus icon to add directly to your list.</p>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
        {otherOrgs.map((org, index) => (
          <div className="col" key={index}>
            <div className="card h-100 rounded-card position-relative">
              <div className="card-body">
                <h5 className="card-title">{org.name}</h5>
                <p className="card-text">{org.description}</p>
              </div>
              {!isAlreadySelected(org) && (
                <div className="position-absolute top-0 end-0 m-2">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-success"
                    style={{ cursor: 'pointer' }}
                    title="Add to my list"
                    onClick={() => handleAddToMainListDirectly(org)}
                  />
                </div>
              )}
              {isAlreadySelected(org) && (
                <div className="position-absolute top-0 end-0 m-2">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-primary"
                    title="Already in your list"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className="my-5" />

      <div className="d-flex flex-column align-items-start">
        <p className="text-muted fs-5 mb-2">Please verify your selection before confirming.</p>
        <button
          className="btn btn-primary"
          disabled={selectedOrganizations.length === 0}
          style={{ width: 'auto' }}
        >
          <h4>Confirm</h4>
        </button>
        <br />
      </div>
    </div>
  );
}

export default SelectedOrgsPage;