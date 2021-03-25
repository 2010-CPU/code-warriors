const express = require('express');
const productsRouter = express.Router();

const {createProduct, getProductById, getAllProducts} = require('../db');

productsRouter.get('/', async (req, res, next) => { 
    try {
        const products = await getAllProducts(); 

        res.send(products)
        
    } catch (error) {
        next(error)
    }
})

productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const product = await getProductById();
        
        res.send(product);
    } catch (error) {
        next(error);
    }
})

module.exports = productsRouter; 