import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import Userpage from './components/Userpage';
import Singleitem from './components/Singleitem';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Items from './components/Items';
import './App.css';


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
        <h1>Boilerplate</h1>
        <img id='comp-img' src='./computer.png'></img>
        <p>Replace the starter code in this template with something cool</p>
        <Login />
    </div>
  );
}

export default App;
