import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import RecipeCard from "./RecipeCard";
import Sidebar from './Sidebar';
import Header from './Header';

function Results() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Filters
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [maxCalories, setMaxCalories] = useState(10000);
  const [minCalories, setMinCalories] = useState(0);

  // To enable pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPageLink, setNextPageLink] = useState();

  // Update the filteredRecipes whenever filter criteria change
  useEffect(() => {
    const filtered = filterRecipes(
      recipes,
      selectedCuisines,
      dietaryRestrictions,
      minCalories,
      maxCalories
    );
    setFilteredRecipes(filtered);
  }, [recipes, selectedCuisines, dietaryRestrictions, minCalories, maxCalories]);

  // Handlers for filter criteria
  const handleDietaryChange = (event) => {
    const restriction = event.target.value;

    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(dietaryRestrictions.filter((r) => r !== restriction));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    }
  }

  const handleCaloriesChange = (event) => {
    if(event.target.id === 'min-calories') {
      setMinCalories(event.target.value);
    } else {
      setMaxCalories(event.target.value);
    }
  }

  const handleCuisineChange = (event) => {
    const cuisine = event.target.value;

    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const getRecipe = async (e) => {
    e.preventDefault();
    const recipeName = e.target.elements.recipeName.value;
  
    try {
      const response = await axios.get(`http://localhost:4000/api/recipes?q=${recipeName}`);
      const totalP = Math.ceil(response.data.count / 20);
      setTotalPages(totalP);
      setRecipes(response.data.hits);
      console.log(response.data);
      setNextPageLink(response.data._links.next.href);
    } catch (error) {
      console.error(error);
    }
  };  

  const loadMore = async () => {
    if (nextPageLink) {
      try {
        const nextPage = currentPage + 1;
        const response = await axios.get(nextPageLink);
        setCurrentPage(nextPage);
        setRecipes([...recipes, ...response.data.hits]);
        if (currentPage + 1 === totalPages) {
          setFilteredRecipes([...filteredRecipes, ...response.data.hits]);
        }
        setNextPageLink(response.data._links.next.href);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filterRecipes = (recipes, selectedCuisines, dietaryRestrictions, minCalories, maxCalories) => {
  return recipes.filter((recipe) => {
    // Check if the recipe's cuisine types match any selected cuisines
    const cuisineMatch =
      selectedCuisines.length === 0 ||
      (recipe.recipe.cuisineType &&
        recipe.recipe.cuisineType.some((cuisine) =>
          selectedCuisines.includes(cuisine)
        ));

    // Check if the recipe's cuisine types match ALL dietary restrictions
    const dietMatch =
      dietaryRestrictions.length === 0 ||
      (recipe.recipe.healthLabels &&
        dietaryRestrictions.every((restriction) =>
          recipe.recipe.healthLabels.includes(restriction)
        ));

    // Check if the recipe's calories are within the specified range
    const caloriesMatch =
      (!minCalories || (recipe.recipe.calories && recipe.recipe.calories >= minCalories)) &&
      (!maxCalories || (recipe.recipe.calories && recipe.recipe.calories <= maxCalories));

    // Return true if all criteria are met
    return cuisineMatch && dietMatch && caloriesMatch;
  });
};

  return (
    <div className="App">
      <Header isResultsPage={true} getRecipe={getRecipe} />
      
      <Sidebar
          selectedCuisines={selectedCuisines}
          handleCuisineChange={handleCuisineChange}
          minCalories={minCalories}
          maxCalories={maxCalories}
          handleCaloriesChange={handleCaloriesChange}
          dietaryRestrictions={dietaryRestrictions}
          handleDietaryChange={handleDietaryChange}
        />

      <div className="recipe-list">
      {filteredRecipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
      </div>

     <div className="load-button">
     {currentPage < totalPages && (<button onClick={loadMore}>Load More</button>)}
     </div>
    </div>
  );
}

export default Results;