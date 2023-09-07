import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

const ShareDialog = ({closeShareDialog, recipe, copyLinkToClipboard}) => {
    return(
        <div className="share-dialog">
          <button onClick={closeShareDialog} className="close-button">
            X
          </button>
          <p>Share this recipe:</p>
          <div className="recipe-link-container">
            <div className="recipe-link">{recipe.recipe.url}</div>
            <FontAwesomeIcon
              icon={faClipboard}
              className="icon"
              onClick={copyLinkToClipboard}
            />
          </div>
        </div>
    )
}

export default ShareDialog;