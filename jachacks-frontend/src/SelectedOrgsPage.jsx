import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function SelectedOrgsPage() {
  const SelectedOrgs = [
    { name: 'Animal Support Montreal', description: 'Helps and protects animals in the region.' },
    { name: 'Culture for All Quebec', description: 'Promotes access to culture for all citizens.' },
    { name: 'Young Leaders of Today', description: 'Develops the potential of young leaders.' },
  ];

  const SuggestedOrgs = [
    { name: 'Green Environment Canada', description: 'Acts for the preservation of our environment.' },
    { name: 'Local Food Aid', description: 'Provides meals to people in need.' },
    { name: 'Urban Art and Creativity', description: 'Encouraging artistic expression in urban areas.' },
    { name: 'Health for Children', description: 'Improving the health and well-being of children.' },
    { name: 'Volunteers in Action', description: 'Organizes community volunteering initiatives.' },
  ];

  const [selectedOrganizations, setSelectedOrganizations] = useState(SelectedOrgs);
  const [otherOrgs, setOtherOrgs] = useState(SuggestedOrgs);

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
      {selectedOrganizations.length === 0 ? (
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