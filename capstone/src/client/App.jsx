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
import Admin from './components/Admin';  // Import the Admin component
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser]=useState(null)

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
        <Route path='/admin' element={<Admin />} />  {/* Add this line for Admin route */}
      </Routes>
    </div>
  );
}

export default App;
