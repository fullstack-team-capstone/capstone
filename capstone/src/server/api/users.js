// api/users.js

const express = require('express');
const usersRouter = express.Router();
const {
    createUser,
    getUser,
    getUserByEmail,
    getUserById,
    getAllUsers, 
    deleteUser,
    editUser
} = require('../db');
const jwt = require('jsonwebtoken');

usersRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    if (!process.env.JWT_SECRET) {
        next({
            name: 'MissingSecretError',
            message: 'JWT_SECRET must be defined'
        });
        return;
    }
    try {
        const user = await getUser({email, password});
        if (user) {
            const token = jwt.sign({
                id: user.id,
                email,
                isAdmin: user.isAdmin
              }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            res.send({
                message: 'Login successful!',
                token
            });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Email or password is incorrect'
            });
        }
    } catch (error) {
        console.log(error); 
        next(error);
    }
});


usersRouter.post('/register', async(req, res, next) => {
    const { username, email, password } = req.body;

   
    if (!process.env.JWT_SECRET) {
        next({
            name: 'MissingSecretError',
            message: 'JWT_SECRET must be defined'
        });
        return;
    }

    try {
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            username,
            email,
            password,
            isAdmin: false
        });

        const token = jwt.sign({
            id: user.id,
            email,
            isAdmin: user.isAdmin
          }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

const requireAdmin = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
     
      const user = await getUserById(decoded.id);
  
      if (user && user.isAdmin) {
        next();
      } else {
        next({
          name: 'UnauthorizedError',
          message: 'You must be an admin to perform this action',
        });
      }
    } catch (error) {
      next(error);
    }
  };
  

usersRouter.get('/', requireAdmin, async(req, res, next) => {
    try {
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch (err) {
        next('Only admins may see user list')
    }
});

usersRouter.delete('/:id', requireAdmin, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10); 

        if (isNaN(id)) {
            return next({
                name: 'InvalidIdError',
                message: 'The id must be a valid integer'
            });
        }

        const user = await deleteUser(id);

        if (!user) {
            return next({
                name: 'UserNotFoundError',
                message: `User with id ${id} not found`
            });
        }

        res.send({
            user
        });

    } catch (err) {
        console.error(err);
        next(err);
    }
})


usersRouter.put('/:id', requireAdmin, async (req, res, next) => {
    try {
        const user = await editUser(req.params.id, req.body)

        res.send({
            user
        })

    } catch (err) {
        throw ('Must be admin to edit user')
    }
})

module.exports = usersRouter;

