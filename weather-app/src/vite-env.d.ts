// vite-env.d.ts

interface WeatherData {
    list: any;
    coord?: {
      lat: number;
      lon: number;
    };
    name?: string;
    main?: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    wind?: {
      speed: number;
    };
    weather?: {
      description: string;
    }[];
    sys?: {
      sunrise: number;
      sunset: number;
    };
    forecast?: ForecastData;
  }
  
  interface ForecastData {
    list: {
      dt: number;
      main: {
        temp: number;
        humidity: number;
      };
      wind: {
        speed: number;
      };
      weather: {
        description: string;
      }[];
    }[];
  }
  