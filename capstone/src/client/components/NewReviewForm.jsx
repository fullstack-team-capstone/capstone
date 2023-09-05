import React, { useState } from 'react';

const NewReviewForm = ({ productId, onSave }) => {
  const [newReview, setNewReview] = useState({
    title: '',
    stars: 1,
    reviewbody: '',
  });

  const handleInputChange = (e) => {
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

  return (
    <div>
      <input
        type="text"
        name="title"
        value={newReview.title}
        onChange={handleInputChange}
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
              onChange={handleInputChange}
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
      <button onClick={() => onSave(newReview)}>Add Review</button>
    </div>
  );
};

export default NewReviewForm;
