import React, { useState } from 'react';

const NewReviewForm = ({ productId, onSave }) => {
  const [newReview, setNewReview] = useState({
    title: '',
    stars: 1,
    reviewbody: '',
  });

  const handleInputChange = (e) => {
    console.log('how many times is handleinputchange called?')
    const { name, value } = e.target;

    if (name === 'stars') {
      setNewReview({
        ...newReview,
        [name]: parseInt(value, 10),
      });
    } else {
      setNewReview({
        ...newReview,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reviewableid: productId,
          ...newReview,
        }),
      });

      if (response.ok) {
        onSave(newReview);
      } else {
        console.log('Failed to add review');
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
        value={newReview.title}
        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
        placeholder="Review Title"
      />
      <div>
      <label>
        Stars (1-5):
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star}>
            <input
              type="radio"
              name="stars"
              value={star}
              checked={newReview.stars === star}
              onChange={(e) => setNewReview({ ...newReview, stars: parseInt(e.target.value, 10) })}
            />
            {star}
          </label>
        ))}
      </label>
      </div>
      <textarea
        name="reviewbody"
        value={newReview.reviewbody}
        onChange={handleInputChange}
        placeholder="Review Body"
      />
      <button onClick={handleSave}>Add Review</button>
    </div>
  );
};

export default NewReviewForm;