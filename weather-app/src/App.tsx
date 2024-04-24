import React, { useState, useEffect } from "react";
import WeatherDisplay from "./assets/weatherdisplay";
import "./App.css";

const App: React.FC = () => {
  const [data, setData] = useState<WeatherData>({});
  const [location, setLocation] = useState<string>("");
  const [unit, setUnit] = useState<string>("metric");
  const [nextUpdates, setNextUpdates] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    const apiKey = "e1b5f3b9d7f887668e19551d222dc013";

    const fetchWeatherForLocation = async (latitude: number, longitude: number) => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

      fetchData(weatherUrl);
      fetchData(forecastUrl);
    };

    const fetchWeatherForCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherForLocation(latitude, longitude);
        });
      }
    };

    fetchWeatherForCurrentLocation();

    const intervalId = setInterval(() => {
      setNextUpdates((prevUpdates) => {
        const now = new Date();
        const nextUpdate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
        return [...prevUpdates, nextUpdate.toLocaleTimeString()];
      });
      fetchWeatherForCurrentLocation();
    }, 2 * 60 * 60 * 1000); // Update every 2 hours

    return () => {
      clearInterval(intervalId);
    };
  }, [unit]);

  const searchLocation = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const apiKey = "e1b5f3b9d7f887668e19551d222dc013";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setLocation("");
      } catch (error) {
        console.log("Search Error:", error);
      }
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="app">
      <button className="switch-btn" onClick={toggleUnit}>
        {unit === "metric" ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </button>

      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="Container">
        <WeatherDisplay data={data} unit={unit} nextUpdates={nextUpdates} />

        {data.forecast && (
          <div className="forecast">
            {data.forecast.list.slice(0, 3).map((item, index) => (
              <div key={index} className="forecast-item">
                <p>{new Date(item.dt * 1000).toLocaleTimeString()}</p>
                <p>{item.main?.temp?.toFixed()}˚{unit === "metric" ? "C" : "F"}</p>
                <p>{item.weather[0]?.description}</p>
                <p>Wind: {item.wind?.speed?.toFixed(1)} MPH</p>
                <p>Humidity: {item.main?.humidity}%</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;