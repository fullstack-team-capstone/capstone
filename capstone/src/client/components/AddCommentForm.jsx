import React, { useState } from 'react';

const AddCommentForm = ({ reviewId, onSave }) => {
  const [newComment, setNewComment] = useState({
    commentBody: '',
    title: '',
    thumbsUpOrDown: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === 'thumbsUpOrDown' ? e.target.checked: value


    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  

  return (
    <div>
      <input
        type="text"
        name="title"
        value={newComment.title}
        onChange={handleInputChange}
        placeholder="Comment Title"
      />
      <textarea
        name="commentBody"
        value={newComment.commentBody}
        onChange={handleInputChange}
        placeholder="Comment Body"
      />
      <label>
        Thumbs Up 
        <input
            type="checkbox"
            name="thumbsUpOrDown"
            checked={newComment.thumbsUpOrDown}
            onChange={handleInputChange}
        />
      </label>
      <button onClick={() => onSave(reviewId, newComment)}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm
