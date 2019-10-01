import React, { useState } from 'react';
import './App.css';
import Button from './Button';
import Statistics from './Statistics';


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



  return (
    <div>
      <h2>Give Feedback</h2>
      <Button text='good' onBtnPress={handleGoodPress} />
      <Button text='neutral' onBtnPress={handleNeutralPress} />
      <Button text='bad' onBtnPress={handleBadPress} />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App;
