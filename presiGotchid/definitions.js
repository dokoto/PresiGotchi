/*global define, module, require, dbManager*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/

'use strict';

var express = require('express');
var gotchi = require('./routes/characters/gotchi');
var menus = require('./routes/texts/menus');

var router = express.Router();

router.use('/characters/', gotchi);
router.use('/texts/', menus);

module.exports = router;
