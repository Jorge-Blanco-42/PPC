'use strict'

var express  = require('express');
var PaymentMethod = require('../controllers/paymentMethod');

var router = express.Router();

router.get('/home', PaymentMethod.home);
router.post('/test', PaymentMethod.test);
router.post('/save-payment-method', PaymentMethod.addPaymentMethod);
router.get('/get-payment/:id?', PaymentMethod.getPaymentMethod);
router.get('/get-payments', PaymentMethod.getPaymentMethods);
router.put('/update-payments/:id', PaymentMethod.updatePaymentMethod);
router.delete('/delete-payment/:id', PaymentMethod.deletePaymentMethod);

module.exports = router;