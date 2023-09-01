// components/Userpage.jsx



import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Logout from './Logout';
import { Link } from 'react-router-dom';
 


const Userpage = ({user}) => {
  console.log('is the user here??', user)
  const [reviews, setReviews] = useState([])
  const [comments,setComments] = useState([])
  
  useEffect(() => {
    const fetchReviewsAndComments = async () => {
      try{
        let response = await fetch('http://localhost:3000/api/reviews')
        let data = await response.json()
        setReviews(data.reviews)
        response = await fetch('http://localhost:3000/api/comments')
        data = await response.json()
        setComments(data.comments)

      }catch(error){
        console.error(error)
      }
    }
    fetchReviewsAndComments()
  }, [] )

  const getReviewsById = () => {
    try{
      const reviewsForUser=reviews.filter(review => review.userid ===user.id)
      console.log('filtered reviews for user: ', reviewsForUser)
      
      return reviewsForUser.map(review => (
        <Card>
          <div key={review.id}>
            <Card.Body>
              <h3>{review.title}</h3>
            </Card.Body>
            <Card.Body>
             <Link to={`/items/${review.reviewableid}`} className="card-link">View Review</Link>
            </Card.Body>
          </div>
        </Card>
      ))

    } catch(error) {
      console.error(error)
    }
  }

  const getCommentsById = () => {
    try{
      const commentsForUser=comments.filter(comment => comment.userid ===user.id)
      console.log('filtered comments for user: ', commentsForUser)
      
      return commentsForUser.map(comment => (
        <Card>
          <div key={comment.id}>
            <Card.Body>
             <h4>{comment.title}</h4>
            </Card.Body>
            <Card.Body>
              <Link to={`/items/${comment.reviewid}`}   className="card-link">View Comment</Link>
            </Card.Body>
          </div>
        </Card>
      ))
      

    } catch(error) {
      console.error(error)
    }
  }


  return (
    <div>
      <h1>Shalom! {user.username}</h1>
      <br></br>
      <div>
        <h1>Your Reviews</h1>
        {getReviewsById().length > 0 ? (
          getReviewsById()
        ) : (
          <p>It looks like you haven't left any reviews. Try viewing the items page and leave a review!</p>
        )}
        <h2>Your comments:</h2>
        {getCommentsById().length > 0 ? (
          getCommentsById()
        ) : (
          <p>You haven't left any comments. Check out some product reviews and see if you agree!</p>
        )}
        
        
      </div>
      
    </div>
  );
};

export default Userpage;

