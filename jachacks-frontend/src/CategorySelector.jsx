import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importez le CSS de Bootstrap

function CategorySelector({ categories }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      // Si la catégorie est déjà sélectionnée, on la retire de la liste
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else if (selectedCategories.length < 5) {
      // Si moins de 5 catégories sont sélectionnées, on l'ajoute
      setSelectedCategories([...selectedCategories, category]);
    } else {
      // Ici, on pourrait afficher un message à l'utilisateur indiquant qu'il a atteint la limite
      alert("You can only pick 5 category.");
    }
  };

  const isCategorySelected = (category) => {
    return selectedCategories.includes(category);
  };

  return (
    <div>
      <h4>Choose up to 5:</h4>
      <div className="d-flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`btn ${
              isCategorySelected(category) ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => handleCategoryClick(category)}
            disabled={selectedCategories.length >= 5 && !isCategorySelected(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategories.length > 0 && (
        <div className="mt-3">
          <p>Category Selected:</p>
          <ul>
            {selectedCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategorySelector;