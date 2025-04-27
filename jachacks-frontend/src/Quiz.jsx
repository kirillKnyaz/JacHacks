import React, { use, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CategorySelector from './CategorySelector'; // Assure-toi que le chemin est correct
import 'bootstrap/dist/css/bootstrap.min.css'; // Si ce n'est pas déjà importé
import DonationPage from './DonationPage';
import axios from 'axios';
import useAuthApi from './assets/api';
import { useAuth0 } from '@auth0/auth0-react';

function Quiz() {
  const { user } = useAuth0(); // Assure-toi que tu as accès à l'utilisateur ici

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [saveInterestsLoading, setSaveInterestsLoading] = useState(false);

  const authApi = useAuthApi();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/public/interests/all').then((response) => {
      console.log(response.data);
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

  const confirmCategoriesSelection = () => {
    setSaveInterestsLoading(true);
    if (selectedCategories.length > 0) {
      console.log("Selected categories:", selectedCategories);

      let interestIds = selectedCategories.map(category => category.id);
      console.log("Interest IDs:", interestIds);
      authApi.post('/user-interests/add/multiple', interestIds).then((response) => {
        console.log("Interests added successfully:", response.data);
        navigate("/selectedOrgs");
      }).catch((error) => {
        console.error("Error adding interests:", error);
      }).finally(() => {
        setSaveInterestsLoading(false);
      });
    } else {
      alert("Please select at least one category.");
    }
  }

  return (<div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <div className="container mt-4">
      <h1>What causes matter to you?</h1>
      <p>choose up to 5 categories, they will help us determine wich charity is right for you!</p>
      {selectedCategories.length > 0 && <>
        <p>{selectedCategories.length}/5 selected</p>
      </>}
      <CategorySelector
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        loading={categoriesLoading}
      />
      {/* Autres éléments de ton quiz (questions, etc.) */}
      {/* {selectedCategories.length > 0 && (
        <div className="mt-3">
          <p>Category Selected:</p>
          <ul>
            {selectedCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </di
        v>
      )} */}
      <div className='d-flex align-items-center mt-3'>

        <button className="btn btn-primary" onClick={confirmCategoriesSelection}>Confirm</button>
        {saveInterestsLoading && <div className="spinner-border text-primary ms-2" role="status"/>}
      </div>

      <br />
      <div className='mt-1'>
        {/* <Link to={"/donation"} className='btn btn-primary'>Temp Donation</Link>
        <Link to={"/selectedOrgs"} className='btn btn-primary ms-2'>Temp SeleOrgs</Link> */}
      </div>
    </div>
  </div>);
}

export default Quiz;