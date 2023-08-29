// components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <Link to='/'>Home</Link>
      </div>
      <div className='navbar-right'>
        <Link to='/login'>Login</Link>
        <Link to='/items'>Items</Link>  {/* Added link to Items */}
      </div>
    </div>
  );
};

export default Navbar;
