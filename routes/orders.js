const express = require('express');
const ordersRouter = express.Router();

const {getOrderById, updateOrder, completeOrder, cancelOrder} = require('../db');
const {requireUser} = require('./utils');

ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
    const {status, userId} = req.body;
    const {orderId} = req.params;

    const updateFields = {};

    if (status) {
        updateFields.status = status;
    }

    if (userId) {
        updateFields.userId = userId;
    }

    try {
        console.log('updateFields: ', updateFields)
        const originalOrder = await getOrderById(Number(orderId));
        console.log('originalOrder: ', originalOrder)
        console.log('heck1')
        if (originalOrder.id === Number(orderId)) {
            console.log('heck2')
            const updatedOrder = await updateOrder({id: Number(orderId), ...updateFields});
            console.log('updatedOrder: ', updatedOrder)
            console.log('heck3')
            res.send(updatedOrder)
        }

    } catch (error) {
        next(error);
    }
});

ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
    const {id} = req.params;

    try {
        const order = await cancelOrder(id);
        console.log('order: ', order)

        res.send(order);
    } catch (error) {
        next(error);
    }
})

module.exports = ordersRouter;