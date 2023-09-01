// components/Singleitem.jsx


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Reviews from './Reviews'; 
import Delete from './Delete';
import EditCommentForm from './EditComment';  

const Singleitem = ({user}) => {
  console.log('is the user here??', user)
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([])
  const [comments,setComments] = useState([])
  const [editCommentId, setEditCommentId] = useState(null)

  useEffect(() => {
    const fetchProductAndReviewsAndComments = async () => {
      try {
        let response = await fetch(`http://localhost:3000/api/items/${id}`);
        let data = await response.json();
        setProduct(data.item);
        response = await fetch('http://localhost:3000/api/reviews')
        data = await response.json()
        setReviews(data.reviews)
        response = await fetch('http://localhost:3000/api/comments')
        data = await response.json()
        setComments(data.comments)
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductAndReviewsAndComments();
  }, [id]);


  const deleteComment = async(commentId) => {
    try {
      const token=localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/api/comments/${commentId}` , {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

        

      })

      console.log('response from trying to delete',response)

      if (response.ok) {
        console.log('Comment deleted')
        const updatedComments = comments.filter(comment => comment.commentid !== commentId);
        setComments(updatedComments);
      } else {
        console.log('Failed to delete')
      }

    } catch(error) {
      console.error(error)
    }
  }

  const handleDeleteReview = async (reviewId) => {
    try{
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }, body: JSON.stringify({
        title:'Review taken down by user',
        stars: 0,
        reviewbody:'',
      })
    })

    if (response.ok) {
      console.log('Review taken down by user')
    } else {
      console.log('Failed to take down review')
    }

    } catch (error) {
      console.error(error)
    }
  }

  const handleEditComment = (commentId) => {
    setEditCommentId(commentId)
  }


  const getReviewsByItemId = () => {
    try{
      const reviewsForItem=reviews.filter(review => review.reviewableid ===product.id)
      console.log('filtered reviews for item: ', reviewsForItem)
      
      return reviewsForItem.map(review => (
        <div key={review.reviewid}>
          
          <h3>{review.title}</h3>
          <h4>{'\u2B50'.repeat(review.stars)}</h4>
          {user && user.id === review.userid ? (
            <div>
              <p>{review.reviewbody}</p>
              <button onClick = {() => handleDeleteReview(review.reviewid)}>Remove Review</button>
              <button onClick = {() => handleEditReview(review.reviewid)}>Edit Review</button>
            </div>
          ) : (
            <p>{review.reviewbody}</p>
          )}
          <ul>
            {getCommentsByReviewId(review.reviewid)}
          </ul>
          
        </div>
      ))

    } catch(error) {
      console.error(error)
    }
  }

  const getCommentsByReviewId = (reviewid) => {
    try{
      const commentsForReview=comments.filter(comment => comment.reviewid ===reviewid)
      console.log('filtered comments for review: ', commentsForReview)
      
      return commentsForReview.map(comment => (
        <div key={comment.commentid}>
          
          
          <h5>
            {comment.thumbsUpOrDown ? '👍': '👎'}{comment.title}
            {user && user.id === comment.userid && (<button onClick={() => deleteComment(comment.commentid)}>Delete</button>)}
            {user && user.id === comment.userid && (<button onClick={() => handleEditComment(comment.commentid)}>Edit</button>)}
            </h5>
          <p>{comment.commentBody}</p>
          <br></br>
          
        </div>
      ))

    } catch(error) {
      console.error(error)
    }
  }





  return (
    <div>
      {product ? (
        <>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.imageurl} />
            <Card.Body>
              <Card.Title>{product.itemname}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>
          {getReviewsByItemId()}  {/* Render the Reviews component under the item */}
          <Delete itemId={id} />  {/* Render the Delete component under the reviews */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Singleitem;
