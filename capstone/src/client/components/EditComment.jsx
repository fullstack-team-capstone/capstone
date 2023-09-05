// components/EditComment.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';  // Import useAuth

const EditCommentForm = ({ commentToEdit, onClose, onSave, editCommentId }) => {
  const { user } = useAuth();  // Use user from AuthContext
  const [editedComment, setEditedComment] = useState(commentToEdit.commentBody);
  const [editedTitle, setEditedTitle] = useState(commentToEdit.title);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (user?.id !== commentToEdit.userid && !user?.isAdmin) {
      console.log("You don't have permission to edit this comment.");
      return;
    }

    try {
      const token = localStorage.getItem('JWT_SECRET');  // Updated key name to JWT_SECRET
      const response = await fetch(
        `http://localhost:3000/api/comments/${commentToEdit.commentid}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            commentBody: editedComment,
            title: editedTitle,
          }),
        }
      );

      if (response.ok) {
        onSave(commentToEdit.commentid, editedComment);
        onClose();
      } else {
        console.log('Failed to update');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        name="commentBody"
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditCommentForm;
