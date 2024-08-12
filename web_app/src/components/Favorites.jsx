import React, { useEffect, useState } from 'react';
import './weatherCss/Favorites.css';

const Favorites = ({ weatherData, onCitySelect }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const localFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(localFavorites);
  }, []);

  const handleAddFavorite = () => {
    if (weatherData) {
      const cityExists = favorites.some(
        (favorite) => favorite.toLowerCase() === weatherData.name.toLowerCase()
      );
      if (cityExists) {
        alert(`${weatherData.name} is already in your favorites.`);
        return;
      }
      const updatedFavorites = [...favorites, weatherData.name];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleRemove = (city) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.toLowerCase() !== city.toLowerCase()
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h3 className="favorites-title">Favorites</h3>
      <button
        className="add-favorite-button"
        onClick={handleAddFavorite}
        disabled={!weatherData}
      >
        Add to Favorites
      </button>
      <ul className="favorites-list">
        {favorites.map((favorite, index) => (
          <li key={index} className="favorite-item">
            <span onClick={() => onCitySelect(favorite)}>{favorite}</span>
            <button
              className="remove-favorite-button"
              onClick={() => handleRemove(favorite)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
