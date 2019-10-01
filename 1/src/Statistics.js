import React from 'react';
import Display from './Display';

const Statistics = ({ good, neutral, bad }) => {

  const allCount = good + neutral + bad;
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / allCount;
  const positive = (good / allCount) * 100;

  return (
    <div>
      <h3>Statistics</h3>

      {allCount === 0
        ?
        "No feedback given"
        :
        (
          <React.Fragment>
            <Display text="good" value={good} />
            <Display text="neutral" value={neutral} />
            <Display text="bad" value={bad} />

            <Display text="all" value={allCount} />
            <Display text="average" value={average} />
            <Display text="positive" value={positive + ' %'} />
          </React.Fragment>
        )
      }

    </div>
  )
}

export default Statistics;