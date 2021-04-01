const express = require('express');
const { getAllReviews, createReview, updateReview } = require('../db');
const reviewsRouter = express.Router();
const {requireUser} = require('./utils');

reviewsRouter.get('./', async (req, res, next) => { 
    try {
        const reviews = await getAllReviews(); 

        res.send(reviews); 

    } catch (error) {
        next(error);
    }
})

reviewsRouter.post('./', requireUser, async (req, res, next) => { 
    try {
        const review = await createReview({title, content, stars, userId, productId})
        res.send(review);
    } catch (error) {
        next(error);
    }
})

reviewsRouter.patch('/:reviewId', requireUser, async (req, res, next) => { 
    const { title, content, userId, productId } = req.body;
    const { reviewId } = req.params; 

    try {
        const review = await updateReview({})
    } catch (error) {
        next(error)
    }
})

reviewsRouter.delete('./:reviewId', requireUser, async (req, res, next) => { 
    try {
        const reviews = await destroyReview({id});
        res.send(reviews)
    } catch (error) {
        next(error);
    }
})


module.exports = reviewsRouter;
