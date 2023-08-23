const express = require('express');
const reviewsRouter = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
} = require('../db/reviews');

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

reviewsRouter.post('/', requireAdminOrAuthor, async (req, res, next) => {
  // Admin or author can create a review
  try {
    const review = await createReview(req.body);
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

reviewsRouter.delete('/:reviewId', requireAuthor, async (req, res, next) => {
  // Only the author can delete their review
  try {
    await deleteReview(req.params.reviewId);
    res.send({ message: 'Review deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = reviewsRouter;
