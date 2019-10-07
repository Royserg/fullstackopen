import React from 'react';

const Filter = ({ onFilterChange }) => {
  return (
    <div>
      filter names starting with
      <input onChange={onFilterChange} />
    </div>
  )
}

export default Filter;