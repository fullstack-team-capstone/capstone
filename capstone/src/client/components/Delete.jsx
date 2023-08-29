

import React from 'react';

const Delete = ({ reviewId, userId, isAdmin }) => {
  const handleDelete = async () => {
    try {
      // Ensure the user is either the admin or the author
      if (isAdmin || userId === reviewId) {
        // Perform the delete operation (replace with actual API call)
        await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
          method: 'DELETE',
        });
        alert('Review deleted successfully.');
      } else {
        alert('You do not have permission to delete this review.');
      }
    } catch (error) {
      console.error('An error occurred while deleting the review:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete Review</button>
  );
};

export default Delete;

