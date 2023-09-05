import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const initialToken = localStorage.getItem('JWT_SECRET');
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialToken));

  const login = (token) => {
    localStorage.setItem('JWT_SECRET', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('JWT_SECRET');
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('JWT_SECRET');

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get('http://localhost:3000/api/admin/current-user', config);
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    login,
    logout,
    isAdmin: user?.isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
