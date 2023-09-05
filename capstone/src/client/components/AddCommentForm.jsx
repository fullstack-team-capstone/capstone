import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';  // Import useAuth

const AddCommentForm = ({ reviewId, onSave }) => {
  const { user } = useAuth();  // Destructure the user from AuthContext
  const [newComment, setNewComment] = useState({
    commentBody: '',
    title: '',
    thumbsUpOrDown: false,
    userId: user ? user.id : null  // Initialize with the user ID if available
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === 'thumbsUpOrDown' ? e.target.checked : value;

    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  // Update the userId whenever the user object changes
  useEffect(() => {
    if (user) {
      setNewComment(prevComment => ({ ...prevComment, userId: user.id }));
    }
  }, [user]);

  return (
    <div>
      {/* Existing input fields */}
      <button onClick={() => onSave(reviewId, newComment)}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
