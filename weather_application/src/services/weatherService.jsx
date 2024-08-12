import axios from 'axios';

const API_KEY = 'a28f45f7f761d0c364910a272d4ed1a3';

export const getWeatherData = async (city) => {
  const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);

  const uniqueDailyForecasts = getUniqueDailyForecasts(forecast.data.list);

  return {
    currentWeather: currentWeather.data,
    forecast: uniqueDailyForecasts,
  };
};

const getUniqueDailyForecasts = (list) => {
  const uniqueForecasts = [];
  const seenDates = new Set();

  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!seenDates.has(date)) {
      uniqueForecasts.push(item); 
      seenDates.add(date);
    }
  });

  return uniqueForecasts;
};
