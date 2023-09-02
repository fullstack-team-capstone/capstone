import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Userpage from './components/Userpage';
import Singleitem from './components/Singleitem';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Items from './components/Items';
import Admin from './components/Admin';  // Import the Admin component
import './App.css';

function App() {

  const [user, setUser]=useState(null)
  console.log("User state in App:", user);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user' element={<Userpage user={user}/>} />
        <Route path='/items' element={<Items />} />
        <Route path='/items/:id' element={<Singleitem />} />
        <Route path='/admin' element={<Admin user={user} />} />

      </Routes>
    </div>
  );
}

export default App;
