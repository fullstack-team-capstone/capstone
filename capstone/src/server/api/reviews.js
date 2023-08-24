// api/reviews.js

const express = require('express');
const reviewsRouter = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
} = require('../db/reviews');
const{ getUserById } = require('../db')
const jwt = require('jsonwebtoken');

// Middleware to require admin or author access
const requireAdminOrAuthor = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await getReviewById(reviewId);
  if (req.user.isAdmin || req.user.id === review.userid) {
    next();
  } else {
    res.status(403).send({ error: 'You must be an admin or the author of this review to perform this action' });
  }
};

// Middleware to require author access
const requireAuthor = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await getReviewById(reviewId);
  if (req.user.id === review.userid) {
    next();
  } else {
    res.status(403).send({ error: 'You must be the author of this review to perform this action' });
  }
};

const requireUser = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await getUserById(decoded.id);
  if (user) {
    next();
  } else{
    next({
      name: 'UnauthorizedError',
      message: 'You must be logged in to perform this action',
    });
  }
}

reviewsRouter.get('/', async (req, res, next) => {
  // No changes here
  try {
    const reviews = await getAllReviews();
    res.send({ reviews });
  } catch (err) {
    next(err);
  }
});

reviewsRouter.get('/:reviewId', async (req, res, next) => {
  // No changes here
  try {
    const review = await getReviewById(req.params.reviewId);
    res.send({ review });
  } catch (err) {
    next(err);
  }
});

reviewsRouter.post('/', requireUser, async (req, res, next) => {
    const {title, stars, reviewbody, bottomline} = req.body
    const userid = req.user.id;
    try {
      const review = await createReview({
        userid,  
        title, 
        stars, 
        reviewbody,
        bottomline
    })
      res.send({ review });
    } catch (err) {
      next(err);
    }
  });

reviewsRouter.patch('/:reviewId', requireAuthor, async (req, res, next) => {
  // Only the author can update their review
  try {
    const updatedReview = await updateReview(req.params.reviewId, req.body);
    res.send({ review: updatedReview });
  } catch (err) {
    next(err);
  }
});

reviewsRouter.delete('/:reviewId', requireAdminOrAuthor, async (req, res, next) => {
  // Admin and Author can delete their review
  try {
    await deleteReview(req.params.reviewId);
    res.send({ message: 'Review deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = reviewsRouter;
