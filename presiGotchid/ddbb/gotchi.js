'use strict';

var Gotchi = (function() {

  //*****************************************************
  // PRIVATE AND SHARED OBJECTS
  //*****************************************************
  var mongoose = require('mongoose');
  var gotchiSchema = require('../schemas/gotchi').create();
  var Q = require('q');


  //*****************************************************
  // PUBLIC
  //*****************************************************
  function gotchi() {
    mongoose.connect(Config.fetch('db', 'db.mongo.session.uri'));
  }

  gotchi.prototype.getModel = function(query) {
    var deferred = Q.defer();
    var gotchiModel = mongoose.model('gotchiModel', gotchiSchema);

    gotchiModel.findOne(query, {}, function(error, docResponse) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(docResponse);
      }
    });

    return deferred.promise;
  };

  gotchi.prototype.addModel = function(model) {
    var deferred = Q.defer();
    var gotchiModel = mongoose.model('gotchiModel', gotchiSchema);
    var character = new gotchiModel(model);

    character.save(function(error, docResponse) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(docResponse);
      }
    });

    return deferred.promise;
  };

  gotchi.prototype.updateModel = function(model) {
    var deferred = Q.defer();
    var gotchiModel = mongoose.model('gotchiModel', gotchiSchema);

    gotchiModel.findOneAndUpdate({
      email: model.email,
      name: model.name
    }, model, {}, function(error, docResponse) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(docResponse);
      }
    });

    return deferred.promise;
  };

  gotchi.prototype.getCollection = function(query) {
    var deferred = Q.defer();
    var gotchiModel = mongoose.model('Gotchi', gotchiSchema);

    gotchiModel.find(query)
    .exec(function(error, response) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  };

  gotchi.prototype.addCollection = function(collection) {
    var deferred = Q.defer();
    var self = this;
    var promeses = [];

    for (var i = 0; i < collection.length; i++) {
        promeses.push(this.addModel(collection[i]));
    }

    Q.allSettled(promeses).then(function(response) {
      deferred.resolve(response);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  return gotchi;

})();


module.exports = {
  create: function() {
    return new Gotchi();
  }

};
