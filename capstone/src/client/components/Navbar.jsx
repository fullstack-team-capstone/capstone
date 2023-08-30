// components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';  // Import the Logout component
import { useAuth } from '../context/AuthContext';  // Import useAuth
import '../css/Navbar.css';

const Navbar = () => {
  const { isLoggedIn } = useAuth();  // Use isLoggedIn from AuthContext

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <Link to='/'>Home</Link>
      </div>
      <div className='navbar-right'>
        {isLoggedIn ? (
          <>
            <Link to='/items'>Items</Link>
            <Logout />  {/* Render the Logout component when logged in */}
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/items'>Items</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
