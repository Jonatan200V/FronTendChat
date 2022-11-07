import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <button onClick={handleClick} className='logout'>
      <BiPowerOff />
    </button>
  );
};

export default Logout;
