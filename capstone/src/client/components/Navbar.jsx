import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Navbar.css';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();  // Call the logout function from AuthContext
    localStorage.removeItem('user');  // Remove user data from local storage
  };

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <Link to='/'>Home</Link>
      </div>
      <div className='navbar-right'>
        {isLoggedIn ? (
          <div>
            <Link to='/user'>Profile</Link>
            {user && user.isAdmin && <Link to='/admin'>Admin</Link>}
            <button onClick={handleLogout}>Logout</button>
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
