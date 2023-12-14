import React, { useState } from 'react';
import axios from 'axios';
import './WeatherComponent.css';

const WeatherComponent = () => {
  const [cities, setCities] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false); 

  const getWeather = async () => {
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:5000/getWeather', {
        cities: cities.split(',').map(city => city.trim()),
      });
      setWeatherData(response.data.weather);
      setCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="weatherApp">
      <div className="hero">
        <h1 className="title">Weather App</h1>
        <div className="inputContainer">
          <input
            type="text"
            className="input"
            placeholder="Enter cities separated by commas"
            value={cities}
            onChange={(e) => {
              setCities(e.target.value)
              setWeatherData(null)
            }}
          />
          <button className="button" onClick={getWeather}>
            Get Weather
          </button>
        </div>
        {loading && <p>Loading...</p>} 
      </div>
      <div className="weatherCards">
        {weatherData &&
          Object.entries(weatherData).map(([city, temp]) => (
            <div className="card" key={city}>
              <h3>{city}</h3>
              <p>{temp}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherComponent;
