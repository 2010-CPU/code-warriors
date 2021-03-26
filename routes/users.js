const express = require('express');
const usersRouter = express.Router();

const {createUser, getUser, getAllUsers, getUserById, getUserByUsername} = require('../db')

const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

usersRouter.post('/register', async (req, res, next) => {
    const {username, password} = req.body;

    try {

    } catch (error) {
        next(error);
    }
})

usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;

    try {
        
    } catch (error) {
        next(error);
    }
})

usersRouter.get('/me', async (req, res, next) => {

    try {

    } catch (error) {
        next(error);
    }
})

module.exports = usersRouter;