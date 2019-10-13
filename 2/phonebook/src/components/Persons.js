import React from 'react';
import BookRow from './BookRow';

const Persons = ({ persons, filter, onDelete }) => {
  const rows = persons
    .filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
    .map((person) => <BookRow key={person.id} person={person} onDelete={onDelete} />)

  return (
    <div>
      {rows}
    </div>
  )
}

export default Persons;