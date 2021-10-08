'use strict';
var express = require('express');

var router = express.Router();
const cabsController = require('./cabs');
const ridersController = require('./riders');

router = cabsController.init(router);
router = ridersController.init(router);

module.exports = router;
