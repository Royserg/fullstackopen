import React from 'react';

const BookRow = ({ person }) => {

  const { name, number } = person;

  return (
    <div>
      {name} {number}
    </div>
  )
}

export default BookRow;