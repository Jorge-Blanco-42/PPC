'use strict'

var express = require("express");
var pushController = require("../controllers/push");

var router = express.Router();
router.get("/homePush", pushController.home);
router.get("/get-push/:id", pushController.getPush);
router.get("/get-pushs", pushController.getPushs);
router.post("/save-push", pushController.savePush);



module.exports = router;