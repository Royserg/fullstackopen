import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')


  const handleAddName = (e) => {
    // Prevent page refresh
    e.preventDefault();

    const newPerson = {
      name: newName
    }

    setPersons(persons.concat(newPerson));
    // Clear input field
    setNewName('');
  }

  const rows = persons.map((person, index) => <div key={index}>{person.name}</div>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows}
    </div>
  )
}

export default App
