import React from "react";

interface WeatherDisplayProps {
    data: WeatherData;
    unit: string;
    nextUpdates: string[];
  }
  
  const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, unit, nextUpdates }) => {
    return (
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          <h1>{data.main?.temp?.toFixed()}˚{unit === "metric" ? "C" : "F"}</h1>
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].description}</p> : null}
        </div>
        <div className="sunrise-sunset">
          <p>Sunrise: {data.sys?.sunrise ? new Date(data.sys.sunrise * 1000).toLocaleTimeString() : 'Unknown'}</p>
          <p>Sunset: {data.sys?.sunset ? new Date(data.sys.sunset * 1000).toLocaleTimeString() : 'Unknown'}</p>
        </div>
        <div className="next-updates">
          <p>Next Updates: {nextUpdates.join(', ')}</p>
        </div>
      </div>
    );
  };
  
  export default WeatherDisplay;

