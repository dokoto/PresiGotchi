var router = require('express').Router();
var tools = {
  gotchi: require('../../ddbb/gotchi').create(),
  response: require('../../utils/response').create()
};


/*
 * GET /gotchi/model
 */
router.get('/gotchi/model', function (request, response) {
  var gotchiModel = tools.gotchi.getModel( request.query['userID'], request.query['gotchiID'] );
  tools.response.standardWithValue(response, '200', 'OK', {model: gotchiModel});
});

/*
 * POST  /gotchi/model
 */
router.post('/gotchi/model', function (request, response) {
  var ret = tools.gotchi.saveModel( request.query['userID'], request.query['gotchiID'],  request.query['model']);
  tools.response.standardWithValue(response, '200', 'OK', {status: ret});
});

/*
 * GET  /gotchi/collection
 */
router.get('/gotchi/collection', function (request, response) {
  var gotchiCollection = tools.gotchi.getCollection( request.query['userID']] );
  tools.response.standardWithValue(response, '200', 'OK', {collection: gotchiCollection});
});

/*
 * POST  /gotchi/collection
 */
router.post('/gotchi/collection', function (request, response) {
  var ret = tools.gotchi.saveCollection( request.query['userID'], request.query['collection']);
  tools.response.standardWithValue(response, '200', 'OK', {status: ret});
});

module.exports = router;
