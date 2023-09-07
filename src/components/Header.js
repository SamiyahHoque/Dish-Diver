import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/DishDiverLogo.png';

const Header = ({ isResultsPage, getRecipe }) => {
    const imageStyles = {
        maxWidth: '170px',
        maxHeight: '100px',
        width: 'auto',
        height: 'auto'
    }
    
  return (
    <header className="header">
      <Link to={`/`}>
        <img src={logoImage} alt="Logo" style={imageStyles} />
      </Link>
      {isResultsPage ? (
        <form className="search" onSubmit={getRecipe}>
          <input type="text" name="recipeName" />
          <button>Search</button>
        </form>
      ) : null}
    </header>
  );
};

export default Header;
