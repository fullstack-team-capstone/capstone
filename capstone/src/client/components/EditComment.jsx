import { response } from 'express';
import React, { useState } from 'react';

const EditCommentForm = ({ commentToEdit, onClose, onSave }) => {
  const [editedComment, setEditedComment] = useState(commentToEdit.commentBody);

  const handleSave = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/comments/${commentToEdit.commentid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({commentBody:editedComment})
        })
    
    if (response.ok) {
        onSave(commentToEdit.commentid, editedComment);
        onClose();

    } else {
        console.log('Failed to update')
    }
    
  } catch (error) {
    console.error(error)
  }
}

  return (
    <div>
      <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditCommentForm;