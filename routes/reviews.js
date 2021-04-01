const express = require('express');
const { getAllReviews, createReview, updateReview, getReviewById } = require('../db');
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
    const { title, content, stars, userId, productId } = req.body;
    const { reviewId } = req.params; 

    const updateFields = {}

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
        const reviewToModify = await getReviewById({id})
        if(reviewToModify.id === req.params.reviewId){
            const modifiedReview = await updateReview({id: Number(reviewId), ...updateFields})
            res.send(modifiedReview)
        } else { 
            next({message: 'This review could not be modified at this time.'})
        }
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
