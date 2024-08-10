import { useState } from "react";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSmog,
  FaSnowflake,
  FaCloudSun,
  FaCloudShowersHeavy,
} from "react-icons/fa";
import "./weatherCss/WeatherDisplay.css";
const WeatherDisplay = ({ weatherData, forecastData, error }) => {
  const [unit, setUnit] = useState("metric");

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const displayTemp = (temp) => {
    return unit === "metric"
      ? `${Math.ceil(temp)}°C`
      : `${Math.ceil((temp * 9) / 5 + 32)}°F`;
  };

  if (!weatherData || !forecastData.length) return;

  const getWeatherIcon = () => {
    const mainWeather = weatherData.weather[0].main.toLowerCase();
    const desc = weatherData.weather[0].description.toLowerCase();
    if (desc.includes("moderate rain"))
      return <FaCloudShowersHeavy size={40} />;
    if (desc.includes("light rain")) return <FaCloudRain size={40} />;
    if (desc.includes("scattered clouds")) return <FaCloudSun size={40} />;
    if (desc.includes("overcast clouds")) return <FaCloud size={40} />;
    if (mainWeather.includes("rain")) return <FaCloudRain size={40} />;
    if (mainWeather.includes("cloud")) return <FaCloud size={40} />;
    if (mainWeather.includes("haze")) return <FaSmog size={40} />;
    if (mainWeather.includes("snow")) return <FaSnowflake size={40} />;
    if (mainWeather.includes("clear")) return <FaSun size={40} />;
    return <FaCloud size={40} />; // Default icon
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Get the day of the month
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    return `${day}/${month}`;
  };

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div className="weather-icon">{getWeatherIcon()}</div>
        <div>
          <div>{displayTemp(weatherData.main.temp)}</div>
          <div style={{ marginTop: "10px" }}>{weatherData.weather[0].main}</div>
        </div>
      </div>
      <button className="unit-toggle-button" onClick={toggleUnit}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
      <h3>5-Day Forecast:</h3>
      <div className="Five_Forcast">
        {forecastData.map((forecast, index) => (
          <div key={index} className="seperateDay">
             <div>{formatDate(forecast.dt_txt)}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div className="weather-icon">{getWeatherIcon()}</div>
              <div>
                <div>
                  {displayTemp(forecast.main.temp_min)} /{" "}
                  {displayTemp(forecast.main.temp_min)}
                </div>
              </div>
            </div>
            <div>{forecast.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
