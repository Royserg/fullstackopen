import React from 'react';
import BookRow from './BookRow';

const Persons = ({ persons, filter }) => {
  const rows = persons
    .filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
    .map((person, index) => <BookRow key={index} person={person} />)

  return (
    <div>
      {rows}
    </div>
  )
}

export default Persons;