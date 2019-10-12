import React from 'react';
import WeatherInfo from './WeatherInfo';

const Country = ({ country, detailed, onShowClick }) => {
  return (
    <>
      {detailed === true ?
        <div>
          <h2>{country.name}</h2>
          <div>capital: {country.capital}</div>
          <div>population: {country.population}</div>

          <h4>languages</h4>
          <ul>
            {country.languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
          </ul>
          <div>
            <img
              width='100' height='100'
              src={country.flag}
              alt={`flag of ${country.name}`} />
          </div>
          <WeatherInfo city={country.capital} />
        </div>
        :
        <li>
          {country.name}
          <button onClick={() => onShowClick(country.name)} >show</button>
        </li>
      }
    </>
  )
}

export default Country;