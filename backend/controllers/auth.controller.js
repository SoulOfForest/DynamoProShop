const User = require('../models/User.model');
const asyncHandler = require('express-async-handler');

const { generateToken } = require('../utils/generateJWT');
const sendAccessToken = require('../utils/sendAccessToken');
const invalidateTokens = require('../utils/invalidateTokens')

module.exports.login = asyncHandler(async (req, res ,next) => {
    const { email, password } = req.body;

    const matchedUser = await User.findOne({ email });

    if (matchedUser && (await matchedUser.matchPassword(password))) {
        const token = generateToken(matchedUser);

        sendAccessToken(res, token);
        
        res.json({
            _id: matchedUser._id,
            name: matchedUser.name,
            email: matchedUser.email,
            isAdmin: matchedUser.isAdmin,
            token
        })
    } else {
        res.status(401);
        throw new Error('Email or password is not valid!');
    }
});

module.exports.logout = asyncHandler(async (req, res) => {
    invalidateTokens(res, ['jwt-payload', 'jwt-token']);

    res.json({
        message: 'Log out successful'
    })
});

module.exports.register = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    const takenUser = await User.findOne({ email });

    if (takenUser) {
        res.status(404);
        throw new Error('Email is already taken !');
    } 

    const newUser = await User.create({
        email,
        name,
        password
    });
    

    if (newUser) {
        const token = generateToken(newUser);
        sendAccessToken(res, token);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        });
    } else {
        res.status(401);
        throw new Error('User data register is not valid !');
    }
    
});

module.exports.profile = asyncHandler(async (req, res ,next) => {
});

module.exports.updateUserProfile = asyncHandler(async (req, res ,next) => {
    const { _id, email, name, password } = req.body;
    const updateUser = await User.findById(req.user._id);

    if (updateUser) {
        let takenEmail = await User.findOne({ email });
        
        if (updateUser.email !== email && takenEmail) {
            res.status(401);
            throw new Error('Email is already taken');
        }

        updateUser.name = name || updateUser.name;
        updateUser.email = email || updateUser.email;
        
        if (password) {
            updateUser.password = password;
        }

        const updatedUser = await updateUser.save();

        const token = generateToken(updatedUser);
        sendAccessToken(res, token);
        
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Update User not found');
    }
});