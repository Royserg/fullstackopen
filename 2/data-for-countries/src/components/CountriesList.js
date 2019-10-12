import React from 'react';
import Country from './Country';

const CountriesList = ({ countries, filter, onShowClick }) => {

  const rows = countries
    .filter(country => country.name.toLowerCase().startsWith(filter))
    .map(country => <Country
      key={country.alpha3Code}
      country={country}
      onShowClick={onShowClick} />)

  return (
    <div>
      {rows.length > 10
        ?
        <p>Too many matches, specify another filter</p>
        :
        (
          rows.length === 1
            ?
            <Country {...rows[0].props} detailed={true} />
            :
            <ul>
              {rows}
            </ul>
        )
      }
    </div>
  )
}

export default CountriesList;