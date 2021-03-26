const express = require('express');
const usersRouter = express.Router();

const {} = require('../db')

usersRouter.post('/register', async (req, res, next) => {
    const {username, password} = req.body;

    try {

    } catch (error) {
        next(error);
    }
})

module.exports = usersRouter;