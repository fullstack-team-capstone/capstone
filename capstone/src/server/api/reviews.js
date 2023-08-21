/ api/reviews.js
const express = require('express');
const reviewsRouter = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
} = require('../db/reviews');
reviewsRouter.get('/', async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.send({ reviews });
  } catch (err) {
    next(err);
  }
});
reviewsRouter.get('/:reviewId', async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.reviewId);
    res.send({ review });
  } catch (err) {
    next(err);
  }
});
reviewsRouter.post('/', async (req, res, next) => {
  try {
    const review = await createReview(req.body);
    res.send({ review });
  } catch (err) {
    next(err);
  }
});
reviewsRouter.patch('/:reviewId', async (req, res, next) => {
  try {
    const updatedReview = await updateReview(req.params.reviewId, req.body);
    res.send({ review: updatedReview });
  } catch (err) {
    next(err);
  }
});
reviewsRouter.delete('/:reviewId', async (req, res, next) => {
  try {
    await deleteReview(req.params.reviewId);
    res.send({ message: 'Review deleted successfully' });
  } catch (err) {
    next(err);
  }
});
module.exports = reviewsRouter;