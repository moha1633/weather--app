// App.tsx

import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchCurrentWeather, fetchWeatherForecast, fetchWeatherForSearch } from "./api";
import WeatherDisplay from "./assets/weatherdisplay";
import { setBackgroundBasedOnWeather } from "./backgroundManager";

const App: React.FC = () => {
  const [data, setData] = useState<{ current?: WeatherData; forecast?: WeatherForecast }>({});
  const [location, setLocation] = useState<string>("");
  const [unit, setUnit] = useState<string>("metric");

  useEffect(() => {
    const fetchWeatherForCurrentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const currentWeather = await fetchCurrentWeather(latitude, longitude, unit);
            const forecast = await fetchWeatherForecast(latitude, longitude, unit);
            setData({ current: currentWeather, forecast });

            setBackgroundBasedOnWeather(currentWeather.weather[0].description);
          } catch (error) {
            console.log("Fetch Error:", error);
          }
        });
      }
    };

    fetchWeatherForCurrentLocation();
  }, [unit]);

  const handleSearch = async () => {
    try {
      const searchData = await fetchWeatherForSearch(location, unit);
      setData({ current: searchData });
      setLocation("");
    } catch (error) {
      console.log("Search Error:", error);
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className="app">
      <button className="switch-btn" onClick={toggleUnit}>
        {unit === "metric" ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </button>
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          type="text"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="Container">
        <WeatherDisplay data={data} unit={unit} />
      </div>
    </div>
  );
};

export default App;
