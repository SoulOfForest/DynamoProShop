const multer = require('multer');
const path = require('path');
const fs = require('fs');

const express = require('express');
const asyncHandler = require('express-async-handler');

const Product = require('../models/Product.model')

const {handleAuthentication, handleAdminProtected} = require('../middlewares/auth.middleware');

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const checkFileType = (file, cb) => {
    const filetypes= /\.(jpg|png|jpeg)$/;
    const mimetypes= /(jpg|png|jpeg)$/;

    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        checkFileType(file, cb);
    }
});

router.post('/', handleAuthentication, handleAdminProtected, upload.single('image'), asyncHandler(async (req, res) => {
    const { productId } = req.body;

    const { image } = await Product.findById(productId);

    const imagePath = `${path.join(path.resolve(), image)}`;

    console.log(imagePath);

    fs.existsSync(imagePath) && fs.unlink(imagePath, (err) => {
        if (err) throw err;
        console.log(`${image} was deleted`);
    });

    const response = req.file.path.replace(/\\/g, "/");
    res.send(`/${response}`);
}));

module.exports = router;