'use strict';

var express = require('express');
var gotchi = require('./routes/gotchi/gotchi');

var router = express.Router();

router.use('/', gotchi);

module.exports = router;
