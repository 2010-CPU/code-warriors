const express = require('express');
const ordersRouter = express.Router();

const {updateOrder, completeOrder, cancelOrder} = require('../db');

ordersRouter.patch('/:orderId', async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
});

ordersRouter.delete('/:orderId', async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
})

module.exports = ordersRouter;