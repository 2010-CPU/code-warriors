const express = require('express');
const productsRouter = express.Router();

const {createProduct, getProductById, getAllProducts} = require('../db');
const {requireAdmin} = require('./utils');

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    } catch (error) {
        next(error)
    }
})

productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const product = await getProductById(req.params.productId);

        res.send(product);
    } catch (error) {
        next(error);
    }
})

productsRouter.post('/', requireAdmin, async (req, res, next) => {
    const {name, description, price, imageURL, inStock, category} = req.body;
    const productData = {};

    try {
        productData.name = name;
        productData.description = description;
        productData.price = price;
        productData.imageURL = imageURL;
        productData.inStock = inStock;
        productData.category = category;

        const product = await createProduct(productData);

        if (product) {
            res.send(product)
        } else {
            res.status(500).send({message: 'Product was not created.'});
        }

    } catch (error) {
        next(error);
    }
})

module.exports = productsRouter;
