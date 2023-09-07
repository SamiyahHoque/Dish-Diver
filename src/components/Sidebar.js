import React from 'react';

function Sidebar({ selectedCuisines, handleCuisineChange, minCalories, maxCalories, handleCaloriesChange, dietaryRestrictions, handleDietaryChange }) {
  const restrictions = ["Vegan", "Vegetarian", "Pescatarian", "Keto-Friendly", "Sugar-Conscious", "Peanut-Free", "Alcohol-Free"]
  const cuisines = ["Mexican", "Italian", "Indian", "Chinese", "French", "South American", "American", "Japanese", "Korean", "Caribbean", "Middle Eastern"]
  
  return (
    <aside className="sidebar">
      <div className="checkbox-filter">
        <h3>Select Cuisines:</h3>
        {cuisines.map((cuisine, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={cuisine.toLowerCase()}
            checked={selectedCuisines.includes(cuisine.toLowerCase())}
            onChange={handleCuisineChange}
          />
          {cuisine}
        </label>
      ))}
      </div>

      <div className="calories-filter">
        <h3>Min Calories:</h3>
        <input
          type="number"
          value={minCalories}
          onChange={handleCaloriesChange}
          id='min-calories'
          className='sidebar-inputs'
        />
      </div>

      <div className="calories-filter">
        <h3>Max Calories:</h3>
        <input
          type="number"
          value={maxCalories}
          onChange={handleCaloriesChange}
          id='max-calories'
          className='sidebar-inputs'
        />
      </div>

      <div className="checkbox-filter">
        <h3>Dietary Restrictions:</h3>
        {restrictions.map((restriction, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={restriction}
            checked={dietaryRestrictions.includes(restriction)}
            onChange={handleDietaryChange}
          />
          {restriction}
        </label>
      ))}
      </div>
    </aside>
  );
}

export default Sidebar;
