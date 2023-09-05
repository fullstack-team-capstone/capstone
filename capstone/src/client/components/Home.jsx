import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Use user from AuthContext
  
  useEffect(() => {
    if (user?.isAdmin) {
      navigate('/admin'); // Navigate to admin dashboard if user is an admin
    } else {
      navigate('/items'); // Navigate to items page for regular users
    }
  }, [user]); // Added user as a dependency
  
  return null;
}

export default Home;
