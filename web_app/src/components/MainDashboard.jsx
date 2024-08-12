import { useState, useEffect } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import { getWeatherData } from '../services/weatherService';

const MainDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      handleSearch(lastCity);
    }
  }, []);

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

  return (
    <div>
      <Search onSearch={handleSearch} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <WeatherDisplay weatherData={weatherData} forecastData={forecastData} />
      <Favorites weatherData={weatherData} onCitySelect={handleSearch} />
    </div>
  );
};

export default MainDashboard;
