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
    mongoose.connect(Config.fetch('db', 'db.mongo.gotchi.uri'));
    this._charactersCollectionName = Config.fetch('db', 'db.mongo.gotchi.collections.characters');
    this._gotchiModelName = 'gotchiModel';
  }

  gotchi.prototype.getModel = function(query) {
    var deferred = Q.defer();
    var gotchiModel = mongoose.model(this._gotchiModelName, gotchiSchema, this._charactersCollectionName);

    gotchiModel.findOne(query, {}, function(error, response) {
      if (error) {
        deferred.reject(error);
      } else {
        if (response === null) {
          deferred.resolve({
            data: new gotchiModel(),
            isNew: true
          });
        } else {
          deferred.resolve({
            data: response,
            isNew: false
          });
        }
      }
    });

    return deferred.promise;
  };

  gotchi.prototype.addModel = function(model) {
    var deferred = Q.defer();
    var gotchiModel = mongoose.model(this._gotchiModelName, gotchiSchema, this._charactersCollectionName);
    var character = new gotchiModel(model);

    character.save(function(error, response) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve({
          data: response,
          isNew: false
        });
      }
    });

    return deferred.promise;
  };

  gotchi.prototype.updateModel = function(model) {
    var deferred = Q.defer();
    var gotchiModel = mongoose.model(this._gotchiModelName, gotchiSchema, this._charactersCollectionName);

    gotchiModel.findOneAndUpdate({
      email: model.email,
      name: model.name
    }, model, {}, function(error, response) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve({
          data: response,
          isNew: false
        });
      }
    });

    return deferred.promise;
  };

  gotchi.prototype.getCollection = function(query) {
    var deferred = Q.defer();
    var gotchiModel = mongoose.model(this._gotchiModelName, gotchiSchema, this._charactersCollectionName);

    gotchiModel.find().exec(function(error, response) {
      if (error) {
        deferred.reject(error);
      } else {
        if (response.length === 0) {
          response.push(new gotchiModel());
          deferred.resolve({
            data: response,
            isNew: true
          });
        } else {
          deferred.resolve({
            data: response,
            isNew: false
          });
        }

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
      deferred.resolve({
        data: response,
        isNew: false
      });
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  gotchi.prototype.updateCollection = function(collection) {
    var deferred = Q.defer();
    var self = this;
    var promeses = [];

    for (var i = 0; i < collection.length; i++) {
      promeses.push(this.updateModel(collection[i]));
    }

    Q.allSettled(promeses).then(function(response) {
      deferred.resolve({
        data: response,
        isNew: false
      });
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
