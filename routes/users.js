const express = require('express');
const usersRouter = express.Router();

const {createUser, getUser, getUserById, getUserByUsername} = require('../db')

const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

usersRouter.post('/register', async (req, res, next) => {
    const {username, password, firstName, lastName, email} = req.body;

    try {
        const checkUser = await getUserByUsername(username);

        if (checkUser) {
            throw new Error('A user by that username already exists');
        }

        if (password.length < 8) {
            throw new Error('Password must be a minimum of 8 characters');
        }

        const user = await createUser({firstName, lastName, email, username, password});
        const token = jwt.sign({
            id: user.id,
            username
        }, JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            user,
            token,
            message: 'Registered successfully'
        })

    } catch (error) {
        next(error);
    }
})

usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        next({message: 'Please supply both a username and a password'})
    }

    try {
        const user = await getUser({username, password});

        const token = jwt.sign({
            id: user.id,
            username
        }, JWT_SECRET, {
            expiresIn: '1w'
        });

        const passwordVerification = jwt.verify(token, JWT_SECRET);

        if (user && passwordVerification) {
            res.send({
                user, 
                token,
                message: "You're logged in!"
            });
        } else {
            next({message: 'Username or password is incorrect'});
        }

    } catch (error) {
        next(error);
    }
})

usersRouter.get('/me', async (req, res, next) => {
    try {
        const meData = await getUserById(req.user.id);
        res.send(meData);
    } catch (error) {
        next(error);
    }
})

module.exports = usersRouter;