import React from 'react';
import './css/main.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar';
const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Chat />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
