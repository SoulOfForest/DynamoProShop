const Product = require('../models/Product.model');
const asyncHandler = require('express-async-handler');

module.exports.index = asyncHandler(async (req, res) => {
    const PAGE_SIZE = 10;

    const page = Number(req.query.page) || 1; 
    const query = req.query.q;

    const products = await Product.find({ name: {
        $regex: query,
        $options: 'i'
    }}).limit(PAGE_SIZE).skip(PAGE_SIZE * (page - 1));

    const totalProducts = await Product.countDocuments({
        name: {
            $regex: query,
            $options: 'i'
        }
    });

    const pages = Math.ceil(totalProducts / PAGE_SIZE);

    res.json({ products, page, pages });
});

module.exports.get = asyncHandler(async (req, res, next) => {
    const matchedProduct = await Product.findById(req.params.id);

    if (!matchedProduct) {
        res.status(404);
        
        throw new Error('Product not found !');
    } else {
        res.json(matchedProduct);
    } 
});


module.exports.delete = asyncHandler(async (req, res, next) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
        res.status(404);        
        throw new Error('Product not found !');
    } else {
        res.json(deletedProduct);
    } 
});

module.exports.create = asyncHandler(async (req, res, next) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })
    
    const createdProduct = await product.save();

    if (createdProduct) {
        res.status(201).json(createdProduct);
    } else {
        res.status(400);
        throw new Error('Can\'t create product');
    }
});

module.exports.update = asyncHandler(async (req, res, next) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    }, { new: true, runValidators: true })

    if (updatedProduct) {
        res.status(201).json(updatedProduct);
    } else {
        res.status(400);
        throw new Error('Can\'t update product');
    }
});

module.exports.createReview = asyncHandler(async (req, res, next) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(review => {
            return review.user.toString() === req.user._id.toString();
        });

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        } else {
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            };

            product.reviews.push(review);

            product.numReviews = product.reviews.length;
            
            // Get latest 10 reviews and get rating from them
            const firstIndexReview = product.reviews.length > 10 ? product.reviews.length - 10: 0;
            const lastIndexReview = product.reviews.length;

            const productReviews = product.reviews.slice(firstIndexReview, lastIndexReview);

            product.rating = productReviews.reduce((acc, item) => {
                return item.rating + acc;
            }, 0) / productReviews.length;

            const updatedProduct = await product.save();

            res.status(201).json(updatedProduct);
        }
    } else {
        res.status(400);
        throw new Error('Can\'t create product');
    }
});

module.exports.getTopProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);  

    res.json(products);
});
