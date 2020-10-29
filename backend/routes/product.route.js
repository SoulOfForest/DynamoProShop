const express = require('express');
const Product = require('../models/Product.model');
const asyncHandler = require('express-async-handler');

const controller = require('../controllers/product.controller');

const {handleAuthentication, handleAdminProtected} = require('../middlewares/auth.middleware');

const router = express.Router();

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
router.get('/', controller.index);

// @desc   Get Top Products
// @route  GET /api/products/top
// @access Public
router.get('/top', controller.getTopProducts);


// @desc   Fetch single products
// @route  GET /api/products/:id
// @access Public
router.get('/:id', controller.get);

// @desc   Delete single products
// @route  DELETE /api/products/:id
// @access Private, Admin
router.delete('/:id', handleAuthentication, handleAdminProtected, controller.delete);

// @desc   Update single products
// @route  PUT /api/products/:id
// @access Private, Admin
router.put('/:id', handleAuthentication, handleAdminProtected, controller.update);

// @desc   Create single products
// @route  POST /api/products
// @access Private, Admin
router.post('/', handleAuthentication, handleAdminProtected, controller.create);

// @desc   Create review about product
// @route  POST /api/products/:id/review
// @access Private
router.post('/:id/reviews', handleAuthentication, controller.createReview);

module.exports = router;