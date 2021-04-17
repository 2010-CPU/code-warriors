const express = require('express');
const reviewsRouter = express.Router();

const { createReview, getAllReviews, getReviewById, getReviewByProductId, destroyReview } = require('../db');
const {requireUser} = require('./utils');

reviewsRouter.get('/', async (req, res, next) => { 
    try {
        const reviews = await getAllReviews(); 

        res.send(reviews); 
    } catch (error) {
        next(error);
    }
})

reviewsRouter.post('/', requireUser, async (req, res, next) => { 
    const { title, content, stars, userId, productId } = req.body; 
    const reviewData = {};

    try {
        reviewData.title = title;
        reviewData.content = content;
        reviewData.stars = stars;
        reviewData.userId = userId;
        reviewData.productId = productId;

        const review = await createReview(reviewData);
        res.send(review);
    } catch (error) {
        next(error);
    }
})

reviewsRouter.delete('/:reviewId', requireUser, async (req, res, next) => { 
    const {productId} = req.params;
    
    try {
        const reviews = await destroyReview(productId);

        res.send(reviews);
    } catch (error) {
        next(error);
    }
})

module.exports = reviewsRouter;