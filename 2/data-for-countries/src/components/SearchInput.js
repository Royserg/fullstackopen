import React from 'react';

const SearchInput = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="country">find countries</label>
      <input
        id="country"
        name="country"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchInput;