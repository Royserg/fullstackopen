import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';


const API_URL = `http://api.weatherstack.com/current?access_key=${config.API_KEY}&query=`;

const WeatherInfo = ({ city }) => {

  console.log('key', config.API_KEY);

  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}${city}`)
      .then(response => {
        setWeather(response.data.current);
      })
  }, [])

  console.log('weather', weather);

  return (
    <div>
      {Object.entries(weather).length !== 0 ?
        <>
          <h3>Weather in {city}</h3>
          <h5>temperature: {weather.temperature} Celsius</h5>
          <div>
            <img src={weather.weather_icons} alt="" />
          </div>
          <h5>wind: {weather.wind_speed} kph direction {weather.wind_dir}</h5>
        </>
        :
        'Loading...'
      }


    </div>
  )
}

export default WeatherInfo;