import React from 'react';
import { Link } from 'react-router-dom';
import CategorySelector from './CategorySelector'; // Assure-toi que le chemin est correct
import 'bootstrap/dist/css/bootstrap.min.css'; // Si ce n'est pas déjà importé
import DonationPage from './DonationPage';
import axios from 'axios';
import useAuthApi from './assets/api';

function Quiz() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const authApi = useAuthApi();

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

  const confirmCategoriesSelection = () => {
    if (selectedCategories.length > 0) {
      console.log("Selected categories:", selectedCategories);

      let interestIds = selectedCategories.map(category => category.id);
      console.log("Interest IDs:", interestIds);
      authApi.post('/user-interests/add/multiple', interestIds).then((response) => {
        console.log("Interests added successfully:", response.data);
        // Rediriger vers la page de donation ou faire autre chose
      }).catch((error) => {
        console.error("Error adding interests:", error);
      });
    } else {
      alert("Please select at least one category.");
    }
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="container mt-4">
      <h1>Quiz</h1>
      <p>choose up to 5 category, they will help us determine wich charity is right for you!</p>
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
        </div>
      )} */}
      <button className="btn btn-primary mt-3" onClick={confirmCategoriesSelection}>Confirm</button>
      <br />
      <Link to={"/donation"} className='btn btn-primary mt-3'>Temp Donation</Link>
      <Link to={"/selectedOrgs"} className='btn btn-primary mt-3'>Temp SeleOrgs</Link>
    </div>
    </div>
    
  );
}

export default Quiz;