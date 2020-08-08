'use strict'

var express  = require('express');
var Product = require('../controllers/product');

var router = express.Router();

router.get('/home', Product.home);
router.post('/test', Product.test);
router.post('/save-product', Product.addProduct);
router.get('/get-product/:id?', Product.getProduct);
router.get('/get-products', Product.getProducts);
router.put('/update-product/:id', Product.updateProduct);
router.delete('/delete-product/:id', Product.deleteProduct);

module.exports = router;