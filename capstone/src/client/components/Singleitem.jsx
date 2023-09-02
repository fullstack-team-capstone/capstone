// components/Singleitem.jsx


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import EditCommentForm from './EditComment';
import EditReviewForm from './EditReview'
import AddCommentForm from './AddCommentForm';
import NewReviewForm from './NewReviewForm';

const Singleitem = ({user}) => {
  console.log('is the user here??', user)

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null)
  const [editReviewId, setEditReviewId] = useState(null)
  const [newReview, setNewReview] = useState({
    title: '',
    stars: 0,
    reviewbody: '',
  })
  const [userHasReviewed, setUserHasReviewed] = useState(false)
  const [isAddingComment,setIsAddingComment] = useState(false)
  const [selectedReviewId, setSelectedReviewId] = useState(null)
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [newlyAddedReviews, setNewlyAddedReviews] = useState([])

  useEffect(() => {
    if (user) {
      const userReviewedItem = reviews.some((review) => review.userid === user.id && review.reviewableid === product.id);
      setUserHasReviewed(userReviewedItem);
    }
  }, [user, reviews, product]);

  

  const handleAddReview = async (newReview) => {
    
    console.log('how many times is handle add review being called')

    const token = localStorage.getItem('token');

    try {
      
      if (userHasReviewed) {
        console.log('You have already reviewed this item.');
        return;
      }

      const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reviewableid: product.id,
          ...newReview,
        }),
      });

      if (response.ok) {
        setNewReview({
          title: '',
          stars: 0,
          reviewbody: '',
        });

        const updatedReviewsResponse = await fetch('http://localhost:3000/api/reviews');
        const updatedReviewsData = await updatedReviewsResponse.json();
        setReviews(updatedReviewsData.reviews);
        setUserHasReviewed(true); 
      } else {
        console.log('Failed to add review');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveComment = async (reviewId, newComment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reviewid: reviewId,
          ...newComment,
        }),
      });
  
      if (response.ok) {
        
        const updatedCommentsResponse = await fetch('http://localhost:3000/api/comments');
        const updatedCommentsData = await updatedCommentsResponse.json();
        setComments(updatedCommentsData.comments);
  
        
        setIsAddingComment(false);
        setSelectedReviewId(null);
      } else {
        console.log('Failed to add comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProductAndReviewsAndComments = async () => {
      try {
        let response = await fetch(`http://localhost:3000/api/items/${id}`);
        let data = await response.json();
        setProduct(data.item);
        response = await fetch('http://localhost:3000/api/reviews');
        data = await response.json();
        setReviews(data.reviews);
        response = await fetch('http://localhost:3000/api/comments');
        data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductAndReviewsAndComments();
  }, [id]);

  const deleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const updatedComments = comments.filter(comment => comment.commentid !== commentId);
        setComments(updatedComments);
      } else {
        console.log('Failed to delete');
      }

    } catch (error) {
      console.error(error);
    }
  };

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
      const updatedReviewsResponse = await fetch('http://localhost:3000/api/reviews');
      const updatedReviewsData = await updatedReviewsResponse.json();
      setReviews(updatedReviewsData.reviews);
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

  const handleEditReview = (reviewId) => {
    setEditReviewId(reviewId);
  }

  const handleAddComment = (reviewId) => {
    console.log('trying to add comment')
    console.log('reviewId', reviewId)
    setIsAddingComment(true)
    setSelectedReviewId(reviewId)
    console.log('isAddingComment:', isAddingComment)
    console.log('selectedReviewId:', selectedReviewId)

  }

  



  

  const getReviewsByItemId = () => {
    const reviewsForItem = reviews.filter(review => review.reviewableid === product.id);
    return reviewsForItem.map(review => (
      <div key={review.reviewid}>
        <h3>{review.title}</h3>
        <h4>{'\u2B50'.repeat(review.stars)}</h4>
        {user && user.id === review.userid ? (
          <div>
            <p>{review.reviewbody}</p>
            <button onClick={() => handleDeleteReview(review.reviewid)}>Remove Review</button>
            <button onClick={() => handleEditReview(review.reviewid)}>Edit Review</button>
          </div>
        ) : (
          <p>{review.reviewbody}</p>
        )}
        {editReviewId === review.reviewid ? (
          <EditReviewForm
          reviewToEdit={review}
          onClose={() => setEditReviewId(null)}
          onSave={(reviewId, editedReview) => handleSaveReview(reviewId, editedReview)}
        />
      ) : null}
        
        <ul>
          {user ? (
            <button onClick={() => handleAddComment(review.reviewid)}> Add Comment</button>
          )
        : (
          <p>You must be signed in to comment</p>
        )}
          {isAddingComment && selectedReviewId === review.reviewid ? (
            <AddCommentForm
            reviewId={review.reviewid} 
            onSave={handleSaveComment}
            />
          ): null}
          {getCommentsByReviewId(review.reviewid)}
        </ul>
      </div>
    ))
  }

  const getCommentsByReviewId = (reviewid) => {
    const commentsForReview = comments.filter(comment => comment.reviewid === reviewid);
    return commentsForReview.map(comment => (
      <div key={comment.commentid}>
        <h5>
          {comment.thumbsUpOrDown ? '👍' : '👎'}{comment.title}
          {user && user.id === comment.userid && (<button onClick={() => deleteComment(comment.commentid)}>Delete</button>)}
          {user && user.id === comment.userid && (<button onClick={() => handleEditComment(comment.commentid)}>Edit</button>)}
        </h5>
        {editCommentId === comment.commentid ? (
          <EditCommentForm
            commentToEdit={comment}
            onClose={() => setEditCommentId(null)}
            onSave={(commentId, editedComment) => handleSave(commentId, editedComment)}
          />
        ) : (
          <p> {comment.commentBody}</p>
        )}
      </div>
    ));
  };

  const handleSave = async (commentId, editedComment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/comments/${commentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            commentBody: editedComment.commentBody,
            title: editedComment.title,
          }),
        }
      );

      if (response.ok) {
        const updatedCommentsResponse = await fetch('http://localhost:3000/api/comments');
        const updatedCommentsData = await updatedCommentsResponse.json();
        setComments(updatedCommentsData.comments);
        setEditCommentId(null);
      } else {
        console.log('Failed to update comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveReview = async (reviewId, editedReview) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editedReview.title,
          stars: editedReview.stars,
          reviewbody: editedReview.reviewbody,
        }),
      });
  
      if (response.ok) {
        const updatedReviewsResponse = await fetch('http://localhost:3000/api/reviews');
        const updatedReviewsData = await updatedReviewsResponse.json();
        setReviews(updatedReviewsData.reviews)
        setEditReviewId(null);
      } else {
        console.log('Failed to update review')
      }
    } catch (error) {
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
          {getReviewsByItemId()}
          {user && !userHasReviewed && !isAddingReview ? (
            <div>
              <button onClick={() => setIsAddingReview(true)}>Add Review</button>
            </div>
          ) : null}

          {isAddingReview ? (
            <form onSubmit={handleAddReview}>
              <NewReviewForm productId={product.id} onSave={handleAddReview} />
            </form>
          ) : null}

          
          {newlyAddedReviews.map((review) => (
            <div key={review.reviewid}>
              
              <h3>{review.title}</h3>
              <h4>{'\u2B50'.repeat(review.stars)}</h4>
              
            </div>
          ))}


        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Singleitem
