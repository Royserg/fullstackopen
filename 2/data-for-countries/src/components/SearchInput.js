import React from 'react';

const SearchInput = ({ country, onChange }) => {
  return (
    <div>
      <label htmlFor="country">find countries</label>
      <input
        id="country"
        name="country"
        type="text"
        value={country}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchInput;