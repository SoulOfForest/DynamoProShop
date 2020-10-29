const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateJWT');
const sendAccessToken = require('../utils/sendAccessToken');
const User = require('../models/User.model');

module.exports.index = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.json(users);
})

module.exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
        user.remove();
        res.json({
            message: 'User removed successful'
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})


module.exports.getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');

    if (user) {
        res.json(user)
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

module.exports.updateUser = asyncHandler(async (req, res ,next) => {
    const { isAdmin, email, name } = req.body;
    const updateUser = await User.findById(req.params.id);

    if (updateUser) {
        let takenEmail = await User.findOne({ email });
        
        if (updateUser.email !== email && takenEmail) {
            res.status(401);
            throw new Error('Email is already taken');
        }

        updateUser.name = name || updateUser.name;
        updateUser.email = email || updateUser.email;
        updateUser.isAdmin = req.body.isAdmin || updateUser.isAdmin;

        const updatedUser = await updateUser.save();
        
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