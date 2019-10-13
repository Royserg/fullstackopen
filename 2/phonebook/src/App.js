import React, { useState, useEffect } from 'react';
import './App.css';
import personService from './services/personService';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons);
      })
  }, [])

  const handleAddPerson = (e) => {
    // Prevent page refresh
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    // Person already exists
    if (persons.find(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        // Clear input fields
        setNewName('');
        setNewNumber('');
      })
  }

  const handleFilterChange = e => {
    setFilter(e.target.value);
  }

  const handleDelete = id => {
    personService
      .deleteOne(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id));
      });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange} />
      <PersonForm
        onSubmit={handleAddPerson}
        name={newName}
        number={newNumber}
        onNameChange={(name) => setNewName(name)}
        onNumberChange={(number) => setNewNumber(number)}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={handleDelete} />
    </div>
  )
}

export default App
