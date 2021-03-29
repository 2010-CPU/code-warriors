const express = require('express');
const ordersRouter = express.Router();

const {
  getAllOrders,
  getOrderById,
  updateOrder,
  completeOrder,
  cancelOrder,
  createOrder
} = require('../db');
const {requireUser} = require('./utils');

//where does completeOrder fit in here?
ordersRouter.get('/', requireUser, async (req,res,next) => {
  try {
    if (req.user.isAdmin) {
      const orders = await getAllOrders();
      res.send(orders);
    } else {
      res.status(401);
      throw new Error("Access denied!");
    }

  } catch (err) {
    next(err);
  }
});

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
        const originalOrder = await getOrderById(Number(orderId));

        if (originalOrder.id === Number(orderId)) {
            const updatedOrder = await updateOrder({id: Number(orderId), ...updateFields});

            res.send(updatedOrder)
        }

    } catch (error) {
        next(error);
    }
});

ordersRouter.post('/', requireUser, async (req,res,next) => {
  try {
    const order = await createOrder({status:'created',userId:req.user.id});
    res.send(order);
  } catch (err) {
    next(err);
  }
})

ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
    const {id} = req.params;

    try {
        const order = await cancelOrder(id);

        res.send(order);
    } catch (error) {
        next(error);
    }
})

module.exports = ordersRouter;
