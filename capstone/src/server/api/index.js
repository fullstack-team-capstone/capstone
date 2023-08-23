// api/index.js

const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const volleyball = require('volleyball');
apiRouter.use(volleyball);

// Logging middleware to print Authorization header
apiRouter.use((req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("Authorization Header:", authHeader); // Log the full Authorization header
  next();
});

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    // Logging the token and JWT secret for debugging
    console.log("Extracted Token:", token); // Log the extracted token without the Bearer prefix
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }
  next();
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const itemsRouter = require('./items');
apiRouter.use('/items', itemsRouter);

const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

module.exports = apiRouter;
