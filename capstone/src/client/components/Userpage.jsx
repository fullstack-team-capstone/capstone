import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Logout from './Logout';

const Userpage = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchReviewsAndComments = async () => {
      try {
        let response = await fetch('http://localhost:3000/api/reviews');
        let data = await response.json();
        setReviews(data.reviews);
        response = await fetch('http://localhost:3000/api/comments');
        data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviewsAndComments();
  }, []);

  const getReviewsById = () => {
    const reviewsForUser = reviews.filter(review => review.userid === user?.id);
    return reviewsForUser.map(review => (
      <Card key={review.id}>
        <Card.Body>
          <h3>{review.title}</h3>
          <Link to={`/items/${review.reviewableid}`} className="card-link">View Review</Link>
        </Card.Body>
      </Card>
    ));
  };

  const getCommentsById = () => {
    const commentsForUser = comments.filter(comment => comment.userid === user?.id);
    return commentsForUser.map(comment => (
      <Card key={comment.id}>
        <Card.Body>
          <h4>{comment.title}</h4>
          <Link to={`/items/${comment.reviewid}`} className="card-link">View Comment</Link>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <Container>
      {user ? (
        <>
          <h1>Shalom! {user.username}</h1>
          <div>
            <h1>Your Reviews</h1>
            {getReviewsById().length > 0 ? getReviewsById() : <p>You haven't left any reviews yet. Check out some items!</p>}
            <h2>Your Comments</h2>
            {getCommentsById().length > 0 ? getCommentsById() : <p>You haven't left any comments yet. Join the discussion!</p>}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default Userpage;
