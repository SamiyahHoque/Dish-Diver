import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import HomeScreen from '../assets/HomeScreen.jpg';
import '../App.css';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import Header from './Header';

const Home = () => {
  const [recipes, setRecipes] = useState({});
  
  const sections = [
    {
      title: 'Under 30 Minutes',
      apiParams: {
        type: 'any',
        time: 30,
      },
    },
    {
      title: 'Meatless Mondays',
      apiParams: {
        type: 'any',
        health: 'vegetarian',
        dishType: 'main course',
      },
    },
    {
      title: 'Dessert For Days',
      apiParams: {
        type: 'any',
        dishType: 'desserts',
      },
    },
  ];

  const fetchRecipes = async (section) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/recipes/${section}`);
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        [section]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };  

  useEffect(() => {
    sections.forEach((section, index) => {
      fetchRecipes(index);
    });
  }, []);

  return (
    <div>
      <Header />

      <div className="home-container">
        <div className="home-image">
          <img src={HomeScreen} alt="Splash screen" />
          <div className="text-overlay">
            <h1>Welcome to DishDiver!</h1>
            <p>Discover delicious recipes from around the world.</p>
            <button>
              <Link to={`results`} style={{ textDecoration: 'none'}}>Get Started</Link>
            </button>
          </div>
        </div>
      </div>

      {sections.map((section, index) => (
        <div className="section" key={index}>
          <h2>{section.title}</h2>
          <div className="recipe-list-homepage">
            {recipes[index]?.map((recipe, recipeIndex) => (
              <RecipeCard key={recipeIndex} recipe={recipe} isHomepage={true}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
