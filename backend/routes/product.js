'use strict'

var express  = require('express');
var Product = require('../controllers/product');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});
router.get('/home', Product.home);
router.post('/test', Product.test);
router.post('/save-product', Product.addProduct);
router.get('/get-product/:id?', Product.getProduct);
router.get('/get-products', Product.getProducts);
router.post("/upload-image-product/:id", multipartMiddleware, Product.uploadImage);
router.put('/update-product/:id', Product.updateProduct);
router.delete('/delete-product/:id', Product.deleteProduct);
router.get("/get-imageP/:image", Product.getImageFile);


module.exports = router;