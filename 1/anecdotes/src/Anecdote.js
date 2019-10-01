import React from 'react'

const Anecdote = ({ text, score }) => {
  return (
    <div>
      <div>
        {text}
      </div>
      <div>
        has {score} votes
      </div>
    </div>
  )
}

export default Anecdote