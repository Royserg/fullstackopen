import React from 'react';

const PersonForm = ({ onSubmit, name, onNameChange, number, onNumberChange }) => {

  return (
    <form onSubmit={onSubmit}>
      <h4>Add new</h4>
      <div>
        name: <input value={name} onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <div>
        number: <input value={number} onChange={(e) => onNumberChange(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;