import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {

  const { name, parts } = course;

  const exercisesTotal = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0)

  return (
    <div>
      <Header text={name} />

      {
        parts.map(part => <Content
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />)
      }

      <p>
        <strong>
          total of {exercisesTotal} exercises
        </strong>
      </p>
    </div>
  )
}

export default Course;