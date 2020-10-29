const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model')

const handleAuthentication = asyncHandler(async (req, res, next) => {
    const tokenHeaders = req.headers["authorization"] && req.headers["authorization"].split(' ');

    const tokenPayloadCookie = req.cookies['jwt-payload'];
    const tokenSignatureCookie = req.cookies['jwt-token'];

    let tokenStr = null;

    if (tokenPayloadCookie && tokenSignatureCookie) {
        tokenStr = `${tokenPayloadCookie}.${tokenSignatureCookie}`;
    } else if (tokenHeaders && tokenHeaders[0] === 'Bearer') {
        tokenStr = tokenHeaders[1];
    } 
 
    if (!tokenStr) {
        res.status(401);
        throw new Error('Not authorized, Token not found');
    } else {      
        const decodedToken = await jwt.verify(tokenStr, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401);
                console.error(`JWT Error: ${err}`);
                throw new Error('Error: Access denied');
            }

            res.cookie('jwt-payload', tokenPayloadCookie, {
                // secure: true,
                path: '/',
                sameSite: 'strict',
                expires: new Date(Date.now() + 3600000 * 0.5)
            });

            return decoded;
        });

        try {
            req.user = await User.findById({ _id: decodedToken._id }).select('-password');

            next();
        } catch (err) {
            console.error(err);
            res.status(401);
            throw new Error('Not authorized, Token failed');
        }
        
    }
});

const handleAdminProtected = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

module.exports = {
    handleAuthentication,
    handleAdminProtected
};