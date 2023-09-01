// api/admin.js

const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getAllItems,
    getItemById,
    editItem,
    deleteItem,
    createItem,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getAllComments,
    getCommentById,
    editComment,
    deleteCommentById
} = require('../db');

// Users
router.get('/users', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

router.get('/users/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

router.put('/users/:id', async (req, res, next) => {
    const { id } = req.params;
    const { fields } = req.body;
    try {
        const user = await editUser(id, fields);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

router.delete('/users/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteUser(id);
        res.send({ message: 'User deleted' });
    } catch (error) {
        next(error);
    }
});

// Items
router.get('/items', async (req, res, next) => {
    try {
        const items = await getAllItems();
        res.send(items);
    } catch (error) {
        next(error);
    }
});

router.get('/items/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await getItemById(id);
        res.send(item);
    } catch (error) {
        next(error);
    }
});

router.post('/items', async (req, res, next) => {
    const { fields } = req.body;
    try {
        const newItem = await createItem(fields);
        res.status(201).send(newItem);
    } catch (error) {
        next(error);
    }
});

router.put('/items/:id', async (req, res, next) => {
    const { id } = req.params;
    const { fields } = req.body;
    try {
        const item = await editItem(id, fields);
        res.send(item);
    } catch (error) {
        next(error);
    }
});

router.delete('/items/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteItem(id);
        res.send({ message: 'Item deleted' });
    } catch (error) {
        next(error);
    }
});

// Reviews
router.get('/reviews', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        res.send(reviews);
    } catch (error) {
        next(error);
    }
});

router.get('/reviews/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const review = await getReviewById(id);
        res.send(review);
    } catch (error) {
        next(error);
    }
});

router.put('/reviews/:id', async (req, res, next) => {
    const { id } = req.params;
    const { fields } = req.body;
    try {
        const review = await updateReview(id, fields);
        res.send(review);
    } catch (error) {
        next(error);
    }
});

router.delete('/reviews/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteReview(id);
        res.send({ message: 'Review deleted' });
    } catch (error) {
        next(error);
    }
});

// Comments
router.get('/comments', async (req, res, next) => {
    try {
        const comments = await getAllComments();
        res.send(comments);
    } catch (error) {
        next(error);
    }
});

router.get('/comments/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const comment = await getCommentById(id);
        res.send(comment);
    } catch (error) {
        next(error);
    }
});

router.put('/comments/:id', async (req, res, next) => {
    const { id } = req.params;
    const { fields } = req.body;
    try {
        const comment = await editComment(id, fields);
        res.send(comment);
    } catch (error) {
        next(error);
    }
});

router.delete('/comments/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteCommentById(id);
        res.send({ message: 'Comment deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

