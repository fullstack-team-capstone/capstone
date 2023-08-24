// api/comments.js

const express = require('express')
const commentsRouter = express.Router()

const {createComment, getAllComments, getCommentById, deleteCommentById, editComment} = require('../db')
const{ getUserById } = require('../db')
const jwt = require('jsonwebtoken');

// Middleware to require admin or author access
const requireAdminOrAuthor = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const review = await getCommentById(reviewId);
    if (req.user.isAdmin || req.user.id === review.userid) {
      next();
    } else {
      res.status(403).send({ error: 'You must be an admin or the author of this review to perform this action' });
    }
  };
  
// Middleware to require author access
const requireAuthor = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const review = await getCommentById(reviewId);
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

commentsRouter.post('/', requireUser, async(req, res, next) => {
    const { thumbsUpOrDown, title, commentBody } = req.body;
    const userid = req.user.id;
    try {
      const comment = await createComment({
        userid,
        thumbsUpOrDown: thumbsUpOrDown || false, 
        title,
        commentBody
      });
      res.send({ comment });
    } catch(error) {
      throw error;
    }
  });
  
  

commentsRouter.get('/', async(req, res, next) =>{
    try{
        const comments = await getAllComments()
        res.send({comments})
    } catch(error){
        throw error
    }
})

commentsRouter.get('/:commentid', async(req, res, next) =>{
    try{
        const comment = await getCommentById(req.params.commentid) 
        res.send({comment})
    } catch(error){
        throw error
    }
})

commentsRouter.delete('/:commentid', requireAdminOrAuthor, async(req, res, next) => {

    try{
        const comment = await deleteCommentById(req.params.commentid)
        res.send({comment})
    } catch(error){
        throw error
    }



})


commentsRouter.put('/:commentid', requireAuthor, async(req, res, next) => {

    try{
        const comment = await editComment(req.params.commentid, req.body)
        res.send({comment})


    }catch(error){
        throw error
    }





})

module.exports = commentsRouter









