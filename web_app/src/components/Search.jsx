import React, { useState } from "react";
import './weatherCss/Search.css'
const Search = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity("");
    } else {
      alert("Please enter a city name.");
    }
  };

  return (
    <div>
      <input
        type="text"
        className="city-input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
