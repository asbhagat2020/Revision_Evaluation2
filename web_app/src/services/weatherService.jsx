import axios from 'axios';

const API_KEY = 'a28f45f7f761d0c364910a272d4ed1a3';

export const getWeatherData = async (city) => {
  const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);

  return {
    currentWeather: currentWeather.data,
    forecast: forecast.data.list.slice(0, 5),
  };
};
