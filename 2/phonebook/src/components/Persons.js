import React from 'react';
import BookRow from './BookRow';

const Persons = ({ persons }) => {
  const rows = persons.map((person, index) => <BookRow key={index} person={person} />)

  return (
    <div>
      {rows}
    </div>
  )
}

export default Persons;