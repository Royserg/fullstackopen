import React, { useState, useEffect } from 'react';
import './App.css';
import personService from './services/personService';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null);
  const [success, setSuccess] = useState(true);

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
    const personExists = persons.find(person => person.name === newPerson.name);
    if (personExists) {
      const replace =
        window.confirm(`${newPerson.name} is already added to phonebook, replace old number with the new one?`);

      if (replace) {

        personService
          .update(personExists.id, newPerson)
          .then(changedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson));
            makeNotification(`Changed ${personExists.name}'s number`, true);
          })
          .catch(err => {
            makeNotification(`Information on ${personExists.name} has been removed from the server`);
            setPersons(persons.filter(person => person.id !== personExists.id));
          });
      }

      return;
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        makeNotification(`Added ${returnedPerson.name}`, true);
        // Clear input fields
        setNewName('');
        setNewNumber('');
      })
      .catch(err => {
        makeNotification(`Can't add person, ${err}`, false);
      });
  }

  const handleFilterChange = e => {
    setFilter(e.target.value);
  }

  const handleDelete = id => {
    personService
      .deleteOne(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id));
        makeNotification('Deleted successfully', true);
      })
      .catch(err => {
        makeNotification(`Couldn't delete`, false);
      });
  }

  const makeNotification = (message, isSuccess) => {
    setNotification(message);
    setSuccess(isSuccess);
    setTimeout(() => {
      setNotification(null);
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} success={success} />
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
