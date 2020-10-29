require('dotenv').config();
const mongoose = require('mongoose');
const colors = require('colors');
const products = require('./data/products');
const users = require('./data/users');
const User = require('./models/User.model');
const Product = require('./models/Product.model');
const Order = require('./models/Order.model');
const connectDB = require('./config/db');

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => ({
            ...product,
            user: adminUser
        }));

        await Product.insertMany(sampleProducts);

        console.log('Data imported!'.green.inverse);

        process.exit();
    } catch (err) {
        console.log(`${err}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed!'.red.inverse);
        
        process.exit();
    } catch (err) {
        console.log(`${err}`.red.inverse);       
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}