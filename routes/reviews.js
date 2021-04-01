const express = require('express');
const { getAllReviews } = require('../db');
const reviewsRouter = express.Router();

reviewsRouter.get('./', async (req, res, next) => { 
    try {
        const reviews = await getAllReviews(); 

        res.send(reviews); 

    } catch (error) {
        next(error)
    }
})



module.exports = reviewsRouter;
