import React from 'react';

const Controls = ({ onVotePress, onNextPress }) => {
  return (
    <div>
      <button onClick={onVotePress}>vote</button>
      <button onClick={onNextPress}>next anecdote</button>
    </div>
  )
}

export default Controls;