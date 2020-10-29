const express = require('express');
const Order = require('../models/Order.model');
const asyncHandler = require('express-async-handler');

const controller = require('../controllers/order.controller');
const {handleAuthentication, handleAdminProtected} = require('../middlewares/auth.middleware');

const router = express.Router();

// @desc   Add order items
// @route  POST /api/orders
// @access Private
router.post('/', handleAuthentication,  controller.addOrderItems);

// @desc   Get orders 
// @route  GET /api/orders
// @access Private, Admin
router.get('/', handleAuthentication, handleAdminProtected, controller.getAllOrders);

// @desc   get all user orders
// @route  GET /api/orders/my
// @access Private
router.get('/my', handleAuthentication,  controller.getUserOrders);

// @desc   get an order by id
// @route  GET /api/orders/:id
// @access Private
router.get('/:id', handleAuthentication,  controller.getById);

// @desc   delete an order by id
// @route  DELETE /api/orders/:id
// @access Private
router.delete('/:id', handleAuthentication,  controller.deleteOrder);

// @desc   update an order to be paid
// @route  PATCH /api/orders/:id
// @access Private
router.patch('/:id/pay', handleAuthentication,  controller.updateOrderToPaid);

// @desc   update an order to be delivered
// @route  PUT /api/orders/:id
// @access Private, Admin
router.put('/:id/deliver', handleAuthentication, handleAdminProtected, controller.updateOrderToDelivered);

module.exports = router;