import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchInput from './components/SearchInput';
import CountriesList from './components/CountriesList';

function App () {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleShowClick = country => {
    setCountry(country);
  }

  return (
    <div>
      <SearchInput value={country} onChange={(e) => setCountry(e.target.value)} />
      <CountriesList
        countries={countries}
        filter={country.toLowerCase()}
        onShowClick={handleShowClick}
      />
    </div>
  );
}

export default App;
