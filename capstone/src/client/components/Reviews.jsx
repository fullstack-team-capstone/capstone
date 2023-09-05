// components/Reviews.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Reviews = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth(); // Destructure the user from the AuthContext

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
          {/* Example: Display an edit button only if the user is an admin */}
          {user && user.isAdmin && <button>Edit</button>}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
