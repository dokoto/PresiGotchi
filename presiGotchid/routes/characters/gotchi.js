var router = require('express').Router();
var tools = {
    response: require('../../utils/response').create(),
    request: require('../../utils/request').create()
};

/*
 * GET /gotchi/model
 */
router.get('/gotchi/model', function(request, response) {
    var queryParams = tools.request.decodeQueryParams(request);
    tools.response.returnJSON(response, dbManager.getModel(queryParams), 'Model no found');
});

/*
 * GET /gotchi/model/:email/:name
 */
router.get('/gotchi/model/:email/:name', function(request, response) {
    var queryParams = {
        email: request.params.email,
        name: request.params.name
    };
    tools.response.returnJSON(response, dbManager.getModel(queryParams), 'Model no found');
});

/*
 * POST  /gotchi/model
 */
router.post('/gotchi/model', function(request, response) {
    tools.response.returnJSON(response, dbManager.addModel(request.body.model), 'Model no created');
});

/*
 * PUT  /gotchi/model
 */
router.put('/gotchi/model', function(request, response) {
    tools.response.returnJSON(response, dbManager.updateModel(request.body.model), 'Model no updated');
});

/*
 * GET  /gotchi/
 */
router.get('/gotchi/collection', function(request, response) {
    var queryParams = tools.request.decodeQueryParams(request);
    tools.response.returnJSON(response, dbManager.getCollection(queryParams), 'Collection no found');
});

/*
 * GET  /gotchi/:email/:name
 */
router.get('/gotchi/collection/:email/:name', function(request, response) {
    var queryParams = {
        email: request.params.email,
        name: request.params.name
    };
    tools.response.returnJSON(response, dbManager.getCollection(queryParams), 'Collection no found');
});

/*
 * POST  /gotchi/collection
 */
router.post('/gotchi/collection', function(request, response) {
    tools.response.returnJSON(response, dbManager.addCollection(request.body.collection), 'Collection no created');
});

/*
 * PUT  /gotchi/collection
 */
router.put('/gotchi/collection', function(request, response) {
    tools.response.returnJSON(response, dbManager.updateCollection(request.body.collection), 'Collection no updated');
});

module.exports = router;
