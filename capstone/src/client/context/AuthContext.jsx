
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider invoked');

  // Initialize from local storage
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  const storedUser = localStorage.getItem('user');

  console.log('IsLoggedIn:', storedIsLoggedIn);
  console.log('Stored User:', storedUser);

  // Safely parse stored user
  let parsedUser = {};

  if (storedUser && storedUser !== 'undefined') { // Checking against the string 'undefined' as well
    try {
      parsedUser = JSON.parse(storedUser);
    } catch (error) {
      console.error('Failed to parse stored user:', error);
    }
  } else {
    console.warn('Stored user is undefined or not present.');
  }

  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn === 'true');
  const [user, setUser] = useState(parsedUser);

  console.log('User state:', user);

  // Adding the login function
  const login = (token) => {
    // Your login logic here
    // For example, set the token in local storage and update state
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    // Set user information if needed
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    login, // Add login function here
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
