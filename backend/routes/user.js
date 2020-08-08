'use strict'

var express  = require('express');
var User = require('../controllers/user');

var router = express.Router();

router.get('/home', User.home);
router.post('/test', User.test);
router.post('/save-user', User.addUser);
router.get('/get-user/:id?', User.getUser);
router.get('/get-users', User.getUsers);
router.put('/update-user/:id', User.updateUser);
router.delete('/delete-user/:id', User.deleteUser);

module.exports = router;