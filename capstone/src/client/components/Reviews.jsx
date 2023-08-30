
import React, { useState, useEffect } from 'react';

const Reviews = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/reviews?itemId=${itemId}`);
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [itemId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id}>
          <h4>{review.title}</h4>
          <p>Rating: {review.stars}</p>
          <p>{review.reviewbody}</p>
          <p>Bottom line: {review.bottomline}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
