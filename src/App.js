import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const API_KEY = '467c0e39f1b656dea83929e8f1462fea';

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      setLocation({ lat, lon });
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    setWeatherData(data);
    console.log('Weather Data:', data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      getWeatherByCurrentLocation(location.lat, location.lon);
    }
  }, [location]);

  return;
}

export default App;
