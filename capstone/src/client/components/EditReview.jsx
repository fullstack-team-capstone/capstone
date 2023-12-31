import React, { useState } from 'react';

const EditReviewForm = ({ reviewToEdit, onClose, onSave }) => {
  const [editedReview, setEditedReview] = useState({
    title: reviewToEdit.title,
    stars: reviewToEdit.stars,
    reviewbody: reviewToEdit.reviewbody,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stars') {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 5) {
        setEditedReview((prevReview) => ({
          ...prevReview,
          [name]: parsedValue,
        }));
      }
    } else {
      setEditedReview((prevReview) => ({
        ...prevReview,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/reviews/${reviewToEdit.reviewid}`,
        {
          method: 'PATCH', // Change this to 'PATCH'
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedReview),
        }
      );

      if (response.ok) {
        onSave(reviewToEdit.reviewid, editedReview);
        onClose();
      } else {
        console.log('Failed to update review');
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
        value={editedReview.title}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="stars"
        value={editedReview.stars}
        onChange={handleInputChange}
      />
      <textarea
        name="reviewbody"
        value={editedReview.reviewbody}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditReviewForm;