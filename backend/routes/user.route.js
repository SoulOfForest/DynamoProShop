const express = require('express');
const Product = require('../models/Product.model');
const asyncHandler = require('express-async-handler');

const controller = require('../controllers/user.controller');

const {handleAuthentication, handleAdminProtected} = require('../middlewares/auth.middleware');

const router = express.Router();

// @desc   Fetch all users 
// @route  GET /api/users
// @access Private
router.get('/', handleAuthentication, handleAdminProtected, controller.index);

// @desc   Delete one user 
// @route  DELETE /api/users/:id
// @access Private
router.delete('/:id', handleAuthentication, handleAdminProtected, controller.deleteUser);

// @desc   update one user by id
// @route  PUT /api/users/:id
// @access Private
router.put('/:id', handleAuthentication, handleAdminProtected, controller.updateUser);

// @desc   get user by id
// @route  GET /api/users/:id
// @access Private
router.get('/:id', handleAuthentication, handleAdminProtected, controller.getById);


module.exports = router;