import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Userpage from './components/Userpage';
import Singleitem from './components/Singleitem';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Items from './components/Items';
import Admin from './components/Admin';
import './App.css';

function App() {
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
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
