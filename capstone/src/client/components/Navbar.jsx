import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';  // Import the Logout component
import { useAuth } from '../context/AuthContext';  // Import useAuth
import '../css/Navbar.css';

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();  // Use isLoggedIn and user from AuthContext

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <Link to='/'>Home</Link>
      </div>
      <div className='navbar-right'>
        {isLoggedIn ? (
          <div>
            <Link to='/user'>Profile</Link>
            {/* Check if user exists and is an admin before showing the Admin link */}
            {user && user.isAdmin && <Link to='/admin'>Admin</Link>}

            <Logout />  {/* Render the Logout component when logged in */}
          </div>
        ) : (
          <div>
            <Link to='/login'>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;