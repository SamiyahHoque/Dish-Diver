import React, { useState } from 'react';
import ShareDialog from './ShareDialog';
import NutritionCard from './NutritionCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

const RecipeCard = ({ recipe, isHomepage }) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);

  const openShareDialog = () => {
    setShowShareDialog(true);
  };

  const closeShareDialog = () => {
    setShowShareDialog(false);
  };

  const copyLinkToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = recipe.recipe.url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    // Show the confirmation message
    setShowCopyConfirmation(true);

    // Hide the confirmation message after a few seconds
    setTimeout(() => {
      setShowCopyConfirmation(false);
    }, 3000);
  };

  const [showNutritionDialog, setShowNutritionDialog] = useState(false);

  const openNutritionDialog = () => {
    setShowNutritionDialog(true);
  };

  const closeNutritionDialog = () => {
    setShowNutritionDialog(false);
  };

  return (
    <div className={`recipe-card ${isHomepage ? "homepage" : "results"}`}>
      <img src={recipe.recipe.image} alt={recipe.recipe.label} />
      <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
        <h2>{recipe.recipe.label}</h2>
      </a>
      {!isHomepage && (
        <>
        <p>Source: {recipe.recipe.source}</p>
        <div className="recipe-buttons">
          <button onClick={openNutritionDialog}>View Nutrition</button>
          <FontAwesomeIcon icon={faShare} className="icon" onClick={openShareDialog} />
        </div>
        {showNutritionDialog && (<NutritionCard recipe={recipe} closeNutritionDialog={closeNutritionDialog}/>)}
        {showShareDialog && (<ShareDialog closeShareDialog={closeShareDialog} recipe={recipe} copyLinkToClipboard={copyLinkToClipboard}/>)}
        {showCopyConfirmation && <p className="copy-confirmation">Link copied!</p>}
        </>
      )}
    </div>
  );
};

export default RecipeCard;