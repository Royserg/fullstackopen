import React from 'react';

const Button = ({ text, onBtnPress }) => {
  return (
    <button className='btn' onClick={onBtnPress} >
      {text}
    </button>
  )
}

export default Button;