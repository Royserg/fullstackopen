import React from 'react';
import Country from './Country';

const CountriesList = ({ countries, filter }) => {

  const rows = countries
    .filter(country => country.name.toLowerCase().startsWith(filter))
    .map(country => <Country key={country.alpha3Code} country={country} />)

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