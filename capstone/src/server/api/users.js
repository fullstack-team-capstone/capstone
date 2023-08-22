const express = require('express')
const usersRouter = express.Router();

const {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers, 
    deleteUser,
    editUser
} = require('../db');

const jwt = require('jsonwebtoken')

usersRouter.get('/', async( req, res, next) => {
    try {
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({email, password});
        if(user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

usersRouter.post('/register', async(req, res, next) => {
    const { username, email, password } = req.body;

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
            email
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

usersRouter.delete('/:id', requireAdmin, async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id)

        res.send({
            user
        });

    } catch (err) {
        throw err
    }
})

usersRouter.put('/:id', requireAdmin, async (req, res, next) => {
    try {
        const user = await editUser(req.params.id, req.body)

        res.send({
            user
        })

    } catch (err) {
        throw err
    }
})

const requireAdmin = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      
      if (user.isAdmin) {
        next();
      } else {
        next({
          name: 'UnauthorizedError',
          message: 'You must be an admin to perform this action'
        });
      }
    } catch (error) {
      next(error);
    }
  }

module.exports = usersRouter;