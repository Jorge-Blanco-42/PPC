'use strict'

var express  = require('express');
var Order = require('../controllers/order');

var router = express.Router();

router.get('/home', Order.home);
router.post('/test', Order.test);
router.post('/save-order', Order.addOrder);
router.get('/get-order/:id?', Order.getOrder);
router.get('/get-orders', Order.getOrders);
router.put('/update-order/:id', Order.updateOrder);
router.delete('/delete-order/:id', Order.deleteOrder);

module.exports = router;