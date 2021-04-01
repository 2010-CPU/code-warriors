const express = require('express');
const usersRouter = express.Router();

const {createUser, getUser, getUserById, getUserByUsername,getOrdersByUser, updateUser} = require('../db')

const jwt = require('jsonwebtoken');
const {JWT_SECRET = 'nevertell'} = process.env;
const {requireUser} = require('./utils');

usersRouter.post('/register', async (req, res, next) => {
    const {username, password, firstName, lastName, email, address, city, state, zip} = req.body;

    try {
        const checkUser = await getUserByUsername(username);

        if (checkUser) {
            throw new Error('A user by that username already exists');
        }

        if (password.length < 8) {
            throw new Error('Password must be a minimum of 8 characters');
        }

        const user = await createUser({firstName, lastName, email, username, password, address, city, state, zip});
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

usersRouter.get('/:userId/orders', requireUser, async (req,res,next) => {
  try {
    const {userId} = req.params;

    if (+userId === req.user.id || req.user.isAdmin) {
      const orders = await getOrdersByUser(userId);
      res.send(orders);
    } else {
      throw new Error("Invalid credentials for this request!");
    }
  } catch (err) {
    next(err);
  }
})

usersRouter.patch('/:userId', requireUser, async (req, res, next) => { 
    const { firstName, lastName, email, address, city, state, zip, isAdmin, username, password} = req.body;
    const { userId } = req.params;

    const updateFields = {}; 

    if (firstName){
        updateFields.firstName = firstName
    }
    if(lastName){
        updateFields.lastName = lastName
    }
    if(email){
        updateFields.email = email
    }
    if(address){
        updateFields.address = address
    }
    if(city){
        updateFields.city = city
    }
    if(state){
        updateFields.state = state
    }
    if(zip){
        updateFields.zip = zip
    }
    if(isAdmin){
        updateFields.isAdmin = isAdmin
    }
    if(username){
        updateFields.username = username
    }
    if(password){
        updateFields.password = password
    }
    try {
        const oldUser = await getUserByUserId(userId);

        if(oldUser.id === userId){
            const updatedUser = await updateUser({id: userId, ...updateFields})
            res.send(updatedUser)
        } else {
            console.error('user update encountered an error')
        }

    } catch (error) {
        next(error)
    }
})


module.exports = usersRouter;
