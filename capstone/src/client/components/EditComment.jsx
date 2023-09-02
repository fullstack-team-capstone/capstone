import React, { useState } from 'react';

const EditCommentForm = ({ commentToEdit, onClose, onSave, editCommentId }) => {
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
    try {
      const token = localStorage.getItem('token');
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