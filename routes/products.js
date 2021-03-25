const express = require('express');
const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => { 
    try {
        const products = await getAllProducts(); 

        res.send(products)
        
    } catch (error) {
        next(error)
    }
})


module.exports = productsRouter; 