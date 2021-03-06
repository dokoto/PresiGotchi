/*global define, module, require, dbManager*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/
'use strict';

var router = require('express').Router();
var tools = {
    response: require('../../utils/response').create(),
};


/*
 * GET /texts/menus
 */
router.get('/menus', function(request, response) {
  dbManager.getCollection('menus', request.query);

  dbManager.once('complete', (collectionResponse) => {
      tools.response.standardWithValue(response, '200', 'OK', collectionResponse);
  });

  dbManager.once('error', (error) => {
      tools.response.standardWithValue(response, '200', 'ERROR', {
          'error': error
      });
  });
});

module.exports = router;
