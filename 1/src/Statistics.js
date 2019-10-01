import React from 'react';
import Statistic from './Statistic';

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
          <table>
            <tbody>
              <Statistic text="good" value={good} />
              <Statistic text="neutral" value={neutral} />
              <Statistic text="bad" value={bad} />

              <Statistic text="all" value={allCount} />
              <Statistic text="average" value={average} />
              <Statistic text="positive" value={positive + ' %'} />
            </tbody>
          </table>
        )
      }

    </div>
  )
}

export default Statistics;