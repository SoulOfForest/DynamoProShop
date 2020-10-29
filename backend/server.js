require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const colors = require('colors'); 
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./config/db');
const productRoute = require('./routes/product.route');
const authRoute = require('./routes/auth.route');
const orderRoute = require('./routes/order.route');
const userRoute = require('./routes/user.route');
const uploadRoute = require('./routes/upload.route');

const { errorHandler, routeNotFound } = require('./middlewares/error.middleware');
const {handleAuthentication} = require('./middlewares/auth.middleware');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// Set up for cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // allows cookies (or other user credentials) to be included on cross-origin requests.
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.disable('x-powered-by');


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});


app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/upload', uploadRoute);

app.get('/api/config/paypal', handleAuthentication, (req, res) => {   
    res.send(process.env.PAYPAL_CLIENT_ID);
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), '/frontend/build')));

    app.get('*', (req, res) => {
        console.log('send-back');
        res.sendFile(path.join(path.resolve(), '/frontend/build/index.html'))
    })
} 

app.use(routeNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => { console.log(`Server running on ${process.env.NODE_ENV} mode PORT ${PORT}`.magenta.underline)});