import React from 'react';

const Welcome = ({ currentUser }) => {
  return (
    <div className='welcome'>
      <img className='welcome__img' src='../assets/robot.gif' alt='Welcome' />
      <h1 className='welcome__h1'>
        Welcome <span className='welcome__span'>{currentUser.username}!</span>
      </h1>
      <h3 className='welcome__h3'>Please select a chat to Start Messaging</h3>
    </div>
  );
};

export default Welcome;
