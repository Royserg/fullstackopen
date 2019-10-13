import React from 'react';

const BookRow = ({ person, onDelete }) => {

  const { id, name, number } = person;

  const handleDeletePress = () => {
    if (window.confirm(`Delete ${name}??`)) {
      onDelete(id);
    }
  }

  return (
    <div>
      {name} {number}
      <button onClick={handleDeletePress}>delete</button>
    </div>
  )
}

export default BookRow;