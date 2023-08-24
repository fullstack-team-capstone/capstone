// db/reviews.js

const db = require('./client');
const createReview = async ({ userid, reviewableid, title, stars, reviewbody, bottomline }) => {
  try {
    const { rows: [review] } = await db.query(`
      INSERT INTO reviews ("userid", "reviewableid", title, stars, reviewbody, bottomline)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [userid, reviewableid, title, stars, reviewbody, bottomline]);
    return review;
  } catch (err) {
    throw err;
  }
};
const getAllReviews = async () => {
  try {
    const { rows: reviews } = await db.query(`
      SELECT * FROM reviews;
    `);
    return reviews;
  } catch (err) {
    throw err;
  }
};
const getReviewById = async (reviewId) => {
  try {
    const { rows: [review] } = await db.query(`
      SELECT * FROM reviews WHERE reviewid = $1;
    `, [reviewId]);
    return review;
  } catch (err) {
    throw err;
  }
};
const updateReview = async (reviewId, fieldsToUpdate) => {
  const setString = Object.keys(fieldsToUpdate).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');
  try {
    const { rows: [review] } = await db.query(`
      UPDATE reviews
      SET ${setString}
      WHERE reviewid = $${Object.keys(fieldsToUpdate).length + 1}
      RETURNING *;
    `, [...Object.values(fieldsToUpdate), reviewId]);
    return review;
  } catch (err) {
    throw err;
  }
};
const deleteReview = async (reviewId) => {
  try {
    await db.query(`
      DELETE FROM reviews WHERE reviewid = $1;
    `, [reviewId]);
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview

};