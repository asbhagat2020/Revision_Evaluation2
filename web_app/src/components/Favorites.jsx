import React, { useState } from "react";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import './weatherCss/Favorites.css'


const Favorites = ({ favorites, onRemove, onAdd }) => {
  const [newFavorite, setNewFavorite] = useState("");

  const handleAddFavorite = () => {
    if (newFavorite.trim()) {
      onAdd(newFavorite);
      setNewFavorite(""); // Clear the input field after adding
    } else {
      alert("Please enter a valid city name.");
    }
  };

  return (
    <div>
      <h3>Favorites</h3>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <input
        type="text"
        id="newFavorite"
        className="favorite-input"
        placeholder="Add a new favorite"
        value={newFavorite}
        onChange={(e) => setNewFavorite(e.target.value)}
        required
      />
      <FaPlusCircle className="add-favorite-icon" onClick={handleAddFavorite} />
      </div>
      <ul className="favorites-list">
        {favorites.map((fav) => (
          <li key={fav.id} className="favorite-item">
            {fav.city}
            <FaTrashAlt
              className="remove-favorite-icon"
              onClick={() => onRemove(fav.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
