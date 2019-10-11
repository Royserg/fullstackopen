import React from 'react';

const Country = ({ country, detailed }) => {

  console.log(country);
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
        </div>
        :
        <li>
          {country.name}
        </li>
      }
    </>
  )
}

export default Country;