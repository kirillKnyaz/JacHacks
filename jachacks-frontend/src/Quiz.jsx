import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategorySelector from './CategorySelector'; // Assure-toi que le chemin est correct
import 'bootstrap/dist/css/bootstrap.min.css'; // Si ce n'est pas déjà importé
import DonationPage from './DonationPage';
import axios from 'axios';

function Quiz() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/public/interests/all').then((response) => {
      console.log(response.data);
       // Assuming the response data is an array of categories
       // If the structure is different, adjust accordingly
      setCategories(response.data);
       // Assuming each category has a 'title' property
    }).catch((error) => {
      console.error("Error fetching categories:", error);
    });
  }, []);

  useEffect(() => {
    console.log("Selected categories:", selectedCategories);
  }, [selectedCategories]);



  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="container mt-4">
      <h1>Quiz</h1>
      <p>choose up to 5 category, they will help us determine wich charity is right for you!</p>
      <CategorySelector
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
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
        </div>
      )} */}
      <button className="btn btn-primary mt-3">Confirm</button>
      <br />
      <Link to={"/donation"} className='btn btn-primary mt-3'>Temp</Link>
    </div>
    </div>
    
  );
}

export default Quiz;