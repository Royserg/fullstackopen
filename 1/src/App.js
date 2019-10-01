import React, { useState } from 'react';
import './App.css';
import Button from './Button';
import Display from './Display';


const App = props => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodPress = () => {
    setGood(good + 1);
  }

  const handleNeutralPress = () => {
    setNeutral(neutral + 1);
  }
  const handleBadPress = () => {
    setBad(bad + 1);
  }

  const allCount = good + neutral + bad;
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / allCount;
  const positive = (good / allCount) * 100;

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button text='good' onBtnPress={handleGoodPress} />
      <Button text='neutral' onBtnPress={handleNeutralPress} />
      <Button text='bad' onBtnPress={handleBadPress} />

      <h3>Statistics</h3>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />

      <Display text="all" value={allCount} />
      <Display text="average" value={average} />
      <Display text="positive" value={positive + ' %'} />
    </div>
  )
}

export default App;
