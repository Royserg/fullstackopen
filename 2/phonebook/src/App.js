import React, { useState } from 'react';
import './App.css';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

    setPersons(persons.concat(newPerson));
    // Clear input fields
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        onSubmit={handleAddPerson}
        name={newName}
        number={newNumber}
        onNameChange={(name) => setNewName(name)}
        onNumberChange={(number) => setNewNumber(number)}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
