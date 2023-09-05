import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Make sure to provide the correct path to your AuthContext

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();  // Destructure the logout function from the AuthContext

  const handleLogout = () => {
    logout();  // Call the logout function from AuthContext
    localStorage.removeItem('user');  // Remove user data from local storage
    navigate('/');  // Redirect to home page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
