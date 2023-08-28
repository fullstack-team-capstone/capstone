import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import Userpage from './components/Userpage';
import Singleitem from './components/Singleitem';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Items from './components/Items';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user' element={<Userpage />} />
        <Route path='/items' element={<Items />} />
        <Route path='/items/:id' element={<Singleitem />} />
      </Routes>
    </div>
  );
}

export default App;

