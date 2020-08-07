'use strict'

var express = require("express");
var RestaurantController = require("../controllers/restaurant");

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});
router.get("/homeR", RestaurantController.home);
router.get("/get-restaurants", RestaurantController.getRestaurants);
router.get("/get-restaurant/:id", RestaurantController.getRestaurant);
router.put("/update-restaurant/:id", RestaurantController.updateRestaurant);
router.post("/upload-image/:id", multipartMiddleware, RestaurantController.uploadImage);
router.get("/get-image/:image", RestaurantController.getImageFile);


module.exports = router;