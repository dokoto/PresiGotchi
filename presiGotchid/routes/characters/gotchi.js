/*global define, module, require, dbManager*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/
'use strict';

var router = require('express').Router();
var tools = {
    response: require('../../utils/response').create(),
};


/*
 * GET /characters/gotchis
 */
router.get('/gotchis', function(request, response) {
    dbManager.getCollection('gotchi', request.query);

    dbManager.once('complete', (collectionResponse) => {
        tools.response.standardWithValue(response, '200', 'OK', collectionResponse);
    });

    dbManager.once('error', (error) => {
        tools.response.standardWithValue(response, '200', 'ERROR', {
            'error': error
        });
    });
});

/*
 * POST  /characters/gotchis
 */
router.post('/gotchis', function(request, response) {
    dbManager.addCollection('gotchi', request.body.collection);

    dbManager.once('complete', (collectionResponse) => {
        tools.response.standardWithValue(response, '200', 'OK', collectionResponse);
    });

    dbManager.once('error', (error) => {
        tools.response.standardWithValue(response, '200', 'ERROR', {
            'error': error
        });
    });
});

/*
 * PUT  /characters/gotchis
 */
router.put('/gotchis', function(request, response) {
    dbManager.updateCollection('gotchi', request.body.collection);

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
