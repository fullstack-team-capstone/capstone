
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Delete = () => {
    const [itemName, setItemName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
  
    console.log("User info:", user);  // Debugging user info
    console.log("Item ID:", id);  // Debugging item ID
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`/api/items/${id}`);
          setItemName(data.itemName);
        } catch (error) {
          console.error('An error occurred while fetching data: ', error);
        }
      };
  
      fetchData();
    }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/items/${id}`);
      navigate('/');
    } catch (error) {
      console.error('An error occurred while deleting the item: ', error);
    }
  };

  return (
    <div>
     
      {(user.role === 'admin' || user._id === id) && (
        <button onClick={handleDelete}>Delete</button>
      )}
      
    </div>
  );
};

export default Delete;
