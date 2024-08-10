import React, { useState, useEffect } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import { getWeatherData } from '../services/weatherService';
import { getFavorites, addFavorite, removeFavorite } from '../services/jsonServerService';

const MainDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFavorites();
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      handleSearch(lastCity);
    }
  }, []);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleSearch = async (city) => {
    try {
      setError(''); 
      const { currentWeather, forecast } = await getWeatherData(city);
      if (!currentWeather || !forecast) {
        throw new Error('No data found');
      }
      setWeatherData(currentWeather);
      setForecastData(forecast);
      localStorage.setItem('lastCity', city);
    } catch (error) {
      setWeatherData(null);
      setForecastData([]);
      setError('No data found for the specified city.');
    }
  };

  const handleAddFavorite = async (city) => {
    await addFavorite(city);
    loadFavorites();
  };

  const handleRemoveFavorite = async (id) => {
    await removeFavorite(id);
    loadFavorites();
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <WeatherDisplay weatherData={weatherData} forecastData={forecastData} />
      <Favorites 
        favorites={favorites} 
        onRemove={handleRemoveFavorite} 
        onAdd={handleAddFavorite} 
      />
    </div>
  );
};

export default MainDashboard;
