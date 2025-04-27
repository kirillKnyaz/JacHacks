import React from 'react';
import { Link } from 'react-router-dom';
import CategorySelector from './CategorySelector'; // Assure-toi que le chemin est correct
import 'bootstrap/dist/css/bootstrap.min.css'; // Si ce n'est pas déjà importé
import DonationPage from './DonationPage';
import SelectedOrgsPage from './SelectedOrgsPage';

function Quiz() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="container mt-4">
      <h1>Quiz</h1>
      <p>choose up to 5 category, they will help us determine wich charity is right for you!</p>
      <CategorySelector
        categories={[
          "Animals",
      "Arts and Culture",
      "Children and Youth",
      "Community Development",
      "Crisis Relief",
      "Education",
      "Environment",
      "Health",
      "Human Rights",
      "International Affairs",
      "Science and Technology",
      "Children",
      "Youth",
      "Families",
      "Seniors",
      "People with Disabilities",
      "Veterans",
      "Specific Ethnic or Racial Groups",
      "LGBTQ+ Community",
      "People Experiencing Homelessness",
      "Direct Services",
      "Advocacy",
      "Research", // Renamed to avoid confusion with cause area
      "Education and Training",
      "Grantmaking",
      "Volunteer Services",
      "Fundraising",
      "Community Building", // Renamed for clarity
      "Sustainability Focused",
      "Social Justice Oriented",
      "Grassroots Efforts",
      "Innovation in Approach",
      "Transparency and Accountability",
        ]}
      />
      {/* Autres éléments de ton quiz (questions, etc.) */}
      <button className="btn btn-primary mt-3">Confirm</button>
      <br />
      <Link to={"/donation"} className='btn btn-primary mt-3'>Temp Donation</Link>
      <Link to={"/selectedOrgs"} className='btn btn-primary mt-3'>Temp SeleOrgs</Link>
    </div>
    </div>
    
  );
}

export default Quiz;