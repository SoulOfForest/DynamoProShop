const express = require('express');
const asyncHandler = require('express-async-handler');

const Product = require('../models/Product.model');

const controller = require('../controllers/auth.controller');

const {handleAuthentication} = require('../middlewares/auth.middleware');

const router = express.Router();

// @desc   Login and get JWT token
// @route  POST /api/auth/login
// @access Public
router.post('/login', controller.login);

// @desc   logout and clear JWT token
// @route  GET /api/auth/logout
// @access Private
router.get('/logout', handleAuthentication, controller.logout);

// @desc   get user profile
// @route  GET /api/auth/profile
// @access Private
router.get('/profile', handleAuthentication, controller.profile);

// @desc   register user account
// @route  PATCH /api/auth/profile
// @access Private
router.patch('/profile', handleAuthentication, controller.updateUserProfile);

// @desc   register user account
// @route  POST /api/auth/register
// @access Public
router.post('/register', controller.register);

module.exports = router;