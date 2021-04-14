const express = require('express');
const reviewsRouter = express.Router();

const { 
    getAllReviews, 
    createReview, 
    updateReview, 
    getReviewById 
} = require('../db');
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

reviewsRouter.patch('/:reviewId', requireUser, async (req, res, next) => { 
    const { title, content, stars} = req.body;
    const { reviewId } = req.params; 

    const updateFields = {};

    if(title){
        updateFields.title = title;
    }
    if(content){
        updateFields.content = content;
    }
    if(stars){
        updateFields.stars = stars; 
    }

    try {
        const reviewToModify = await getReviewById(id);

        if(reviewToModify.id === reviewId) {
            const modifiedReview = await updateReview({id: Number(reviewId), ...updateFields});
            res.send(modifiedReview);
        } else { 
            next({message: 'This review could not be modified at this time.'});
        }
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