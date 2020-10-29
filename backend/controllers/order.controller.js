const Order = require('../models/Order.model');
const Product = require('../models/Product.model');
const asyncHandler = require('express-async-handler');

module.exports.addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }
    
    const order = new Order({
        orderItems, 
        user: req.user._id,
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    });


    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
    
});

module.exports.deleteOrder = asyncHandler(async (req, res) => {
    let deletedOrder = null;
    
    if (req.user.isAdmin) {
        deletedOrder = await Order.deleteOne({ user: req.user._id, _id: req.params.id });
    } else {
        deletedOrder = await Order.deleteOne({ user: req.user._id, _id: req.params.id, isPaid: false });
    }


    if (deletedOrder) {  
        res.status(201).json(deletedOrder);
    } else {
        res.status(400);
        throw new Error('No order found');
    }
});

module.exports.getById = asyncHandler(async (req, res) => {
    let matchedOrder;

    if (req.user.isAdmin) {
        matchedOrder = await Order.findOne({ _id: req.params.id }).populate('user', 'name email');
    } else {
        matchedOrder = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate('user', 'name email');
    }

    if (!matchedOrder) {
        res.status(400);
        throw new Error('No order found');
    } else {
        res.status(201).json(matchedOrder);
    }
});

module.exports.updateOrderToPaid = asyncHandler(async (req, res) => {
    const matchedOrder = await Order.findOne({ _id: req.params.id, user: req.user._id });

    if (!matchedOrder) {
        res.status(400);
        throw new Error('No order found');
    } else {
        const { orderItems, paymentResult } = req.body;
        const { id, status, update_time, payer } = paymentResult;

        let errorMessage = null;

        for (let orderItem of orderItems) {
            const updatedProduct = await Product.findById(orderItem._id, async function(err, product) {
                if (product.countInStock < orderItem.quantity) {
                    errorMessage = `Product '${product.name}' already out of stock!`;
                    return;
                }

                product.countInStock -= parseInt(orderItem.quantity);

                const updatedProduct = await product.save();

                if (!updatedProduct) {
                    error = 'Can\'t update quantity in product stock';
                    return;
                }
            });
        }

        if (errorMessage) {
            res.status(400);
            throw new Error(errorMessage);
        }

        matchedOrder.isPaid = true;
        matchedOrder.paidAt = Date.now();
        matchedOrder.paymentResult = {
            id,
            status,
            update_time,
            email_address: payer.email_address
        }

        const updatedOrder = await matchedOrder.save();

        res.status(201).json(updatedOrder);
    }
});


module.exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
    const matchedOrder = await Order.findOne({ _id: req.params.id });

    if (!matchedOrder) {
        res.status(400);
        throw new Error('No order found');
    } else {
        matchedOrder.isDelivered = true;
        matchedOrder.deliveredAt = Date.now();

        const updatedOrder = await matchedOrder.save();

        res.status(201).json(updatedOrder);
    }
});

module.exports.getUserOrders = asyncHandler(async (req, res) => {
    const matchedOrders = await Order.find({ user: req.user._id });

    res.json(matchedOrders);
});

module.exports.getAllOrders = asyncHandler(async (req, res) => {
    const PAGE_SIZE = 10;

    const page = Number(req.query.page) || 1; 
    const query = req.query.q;

    const orders = await Order.find({}).populate('user', '_id name').limit(PAGE_SIZE).skip(PAGE_SIZE * (page - 1));;

    const totalProducts = await Order.countDocuments({});

    const pages = Math.ceil(totalProducts / PAGE_SIZE);

    res.json({ orders, page, pages });
})