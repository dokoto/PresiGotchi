var router = require('express').Router();
var tools = {
  gotchi: require('../../ddbb/gotchi').create(),
  response: require('../../utils/response').create()
};
var Q = require('q');


var responseProc = function(response, promise, errorMsg) {
  Q.when(promise, function(responseDoc) {
    if (responseDoc) {
      var resp = {};
      if (Array.isArray(responseDoc) === true) {
        resp.collection = [];
        for (var i = 0; i < responseDoc.length; i++) {
          resp.collection.push( (responseDoc[i].value)? responseDoc[i].value.toJSON():responseDoc[i].toJSON() );
        }
      } else {
        resp.model = responseDoc.toJSON();
      }
      tools.response.standardWithValue(response, '200', 'OK', resp);
    } else {
      tools.response.standardWithValue(response, '200', 'ERROR', {
        error: errorMsg
      });
    }
  }, function(error) {
    tools.response.standardWithValue(response, '200', 'ERROR', {
      error: responseDoc
    });
  });
};

var buildQuery = function(request) {
  var query = {};
  for (var key in request.query) {
    if (request.query.hasOwnProperty(key)) {
      query[key] = request.query[key];
    }
  }

  return query;
}

/*
 * GET /gotchi/model
 */
router.get('/gotchi/model', function(request, response) {
  var query = buildQuery(request);
  responseProc(response, tools.gotchi.getModel(query), 'Model no found');
});

/*
 * POST  /gotchi/model
 */
router.post('/gotchi/model', function(request, response) {
  responseProc(response, tools.gotchi.addModel(request.body.model), 'Model no created');
});

/*
 * PUT  /gotchi/model
 */
router.put('/gotchi/model', function(request, response) {
  responseProc(response, tools.gotchi.updateModel(request.body.model), 'Model no updated');
});

/*
 * GET  /gotchi/collection
 */
router.get('/gotchi/collection', function(request, response) {
  var query = buildQuery(request);
  responseProc(response, tools.gotchi.getCollection(query), 'Collection no found');
});

/*
 * POST  /gotchi/collection
 */
router.post('/gotchi/collection', function(request, response) {
  responseProc(response, tools.gotchi.addCollection(request.body.collection), 'Collection no created');
});

/*
 * PUT  /gotchi/collection
 */
router.put('/gotchi/collection', function(request, response) {
  responseProc(response, tools.gotchi.updateCollection(request.body.collection), 'Collection no updated');
});

module.exports = router;
