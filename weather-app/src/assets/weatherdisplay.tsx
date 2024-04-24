import React from "react";
import { fetchCurrentWeather, fetchWeatherForecast, fetchWeatherForSearch } from "./api";
interface WeatherDisplayProps {
  data: { current?: WeatherData; forecast?: WeatherForecast };
  unit: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, unit }) => {
  const getCurrentTemperature = () => {
    return data.current?.main?.temp;
  };

  const getForecastData = () => {
    if (data.forecast) {
      return data.forecast.list.slice(0, 5).map((item: { dt: number; main: { temp: any; }; weather: { description: any; }[]; clouds: { all: any; }; }) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString(),
        temperature: item.main?.temp,
        description: item.weather[0]?.description,
        cloudCover: item.clouds?.all,
      }));
    }
    return [];
  };

  return (
    <div className="top">
      <div className="location">
        <p>{data.current?.name}, {data.current?.sys?.country}</p>
      </div>
      <div className="time-zone">
        <p>Time Zone: {data.current?.timezone}</p>
      </div>
      <div className="sunrise-sunset">
        <p>Sunrise: {new Date(data.current?.sys?.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: {new Date(data.current?.sys?.sunset * 1000).toLocaleTimeString()}</p>
      </div>
      <div className="temp">
        <h1>{getCurrentTemperature()}˚{unit === "metric" ? "C" : "F"}</h1>
      </div>
      <div className="forecast">
        {getForecastData().map((forecast: { time: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; temperature: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; cloudCover: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <div key={index} className="forecast-item">
            <p>{forecast.time}</p>
            <p>{forecast.temperature}˚{unit === "metric" ? "C" : "F"}</p>
            <p>{forecast.description}</p>
            <p>Cloud Cover: {forecast.cloudCover}%</p>
          </div>
        ))}
      </div>
      <div className="description">
        {data.current?.weather ? <p>{data.current.weather[0].description}</p> : null}
      </div>
    </div>
  );
};

export default WeatherDisplay;
