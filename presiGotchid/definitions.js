/*global define, module, require, dbManager*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/

'use strict';

var express = require('express');
var gotchi = require('./routes/characters/gotchi');
var menus = require('./routes/texts/menus');
var configurator = require('./routes/texts/configurator');
var quotes = require('./routes/texts/quotes');

var router = express.Router();

router.use('/characters/', gotchi);
router.use('/texts/', menus);
router.use('/texts/', configurator);
router.use('/texts/', quotes);

module.exports = router;
