// api/comments.js

const express = require('express')
const commentsRouter = express.Router()

const {createComment, getAllComments, getCommentById, deleteCommentById, editComment} = require('../db')


commentsRouter.post('/', async(req, res, next) => {
    const { thumbsUpOrDown, title, commentBody } = req.body;
    try {
      const comment = await createComment({
        thumbsUpOrDown: thumbsUpOrDown || true, 
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

commentsRouter.delete('/:commentid', async(req, res, next) => {

    try{
        const comment = await deleteCommentById(req.params.commentid)
        res.send({comment})
    } catch(error){
        throw error
    }



})


commentsRouter.put('/:commentid', async(req, res, next) => {

    try{
        const comment = await editComment(req.params.commentid, req.body)
        res.send({comment})


    }catch(error){
        throw error
    }





})

module.exports = commentsRouter









