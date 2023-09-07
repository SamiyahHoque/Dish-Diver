import React from 'react';

const NutritionCard = ({ recipe, closeNutritionDialog }) => {
  return (
    <div className="nutrition-dialog">
        <button onClick={closeNutritionDialog} className="close-button">
        X
        </button>

        <h3>Nutrition Information</h3>
        
        <p>Calories: {Math.round(recipe.recipe.calories)}</p>

        <p>Health Labels</p>
        <div className="nutrition-dialog-container">
            {recipe.recipe.healthLabels.map((label, index) => (
                <span key={index} className="nutrition-dialog-detail">
                    {label}
                </span>
            ))}
        </div>


        <p>Cautions</p>
        <div className="nutrition-dialog-container">
            {recipe.recipe.cautions.map((label, index) => (
                <span key={index} className="nutrition-dialog-detail">
                    {label}
                </span>
            ))}
        </div>

        <p>Macros</p>
        <div className="nutrition-dialog-container">
            {recipe.recipe.digest.slice(0, 3).map((item, index) => (
                <span key={index} className="nutrition-dialog-detail">
                    {item.label}: {Math.round(item.total)} {item.unit}
                </span>
            ))}
        </div>
        
    </div>
  )};

export default NutritionCard;
