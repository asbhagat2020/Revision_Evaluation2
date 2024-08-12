import React, { useEffect, useState } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../services/jsonServerService';
import './weatherCss/Favorites.css';

const Favorites = ({ weatherData, onCitySelect }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleAddFavorite = async () => {
    if (weatherData) {
      const cityExists = favorites.some(favorite => favorite.city.toLowerCase() === weatherData.name.toLowerCase());
      if (cityExists) {
        alert(`${weatherData.name} is already in your favorites.`);
        return;
      }
      await addFavorite(weatherData.name);
      loadFavorites(); // Reload favorites after adding a new one
    }
  };

  const handleRemove = async (id) => {
    await removeFavorite(id);
    loadFavorites(); // Reload favorites after removal
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
        {favorites.map((favorite) => (
          <li key={favorite.id} className="favorite-item">
            <span onClick={() => onCitySelect(favorite.city)}>
              {favorite.city}
            </span>
            <button 
              className="remove-favorite-button" 
              onClick={() => handleRemove(favorite.id)}
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
