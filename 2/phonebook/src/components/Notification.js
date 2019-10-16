import React from 'react';

const Notification = ({ message, success }) => {

  if (message === null) {
    return null;
  }

  return (
    <div className={`notification ${success ? 'notification--success' : 'notification--danger'}`}>
      {message}
    </div>
  )
}

export default Notification;