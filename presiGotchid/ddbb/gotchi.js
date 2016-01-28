'use strict';

var Gotchi = (function() {

      //*****************************************************
      // PRIVATE AND SHARED OBJECTS
      //*****************************************************
      var mongoose = require('mongoose');
      var gotchiSchema = require('../schemas/gotchi');


      //*****************************************************
      // PUBLIC
      //*****************************************************
      function gotchi() {
        mongoose.connect(Config.fetch('db', 'db.mongo.session.uri'));
      }

      gotchi.prototype.getModel = function(userID, gotchiID) {
        var deferred = Q.defer();
        var gotchiModel = mongoose.model('Gotchi', gotchiSchema);

        gotchiModel.find({
          email: userID,
          name: gotchiID
        }, function(error, gotchi) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve(gotchi);
          }
        });

        return deferred.promise;
      };

      gotchi.prototype.addModel = function((userID, gotchiID, model) {
          var deferred = Q.defer();
          var gotchiModel = new gotchiSchema(model);

          gotchiModel.save(function(error, numAffected) {
            if (error) {
              deferred.reject(error);
            } else {
              deferred.resolve(numAffected);
            }
          });

          return deferred.promise;
        };

        gotchi.prototype.updateModel = function((userID, gotchiID, model) {
            var deferred = Q.defer();
            var gotchiModel = new gotchiSchema(model);

            gotchiModel.find({
              email: userID,
              name: gotchiID
            }, function(error, gotchi) {
              if (error) {
                deferred.reject(error);
              } else {
                gotchi.save(function(error, numAffected) {
                  if (error) {
                    deferred.reject(error);
                  } else {
                    deferred.resolve(numAffected);
                  }
                });
              }
            });

            return deferred.promise;
          };

          gotchi.prototype.getCollection = function(userID) {
            var deferred = Q.defer();
            var gotchiModel = mongoose.model('Gotchi', gotchiSchema);

            gotchiModel.find({
              email: userID
            }, function(error, gotchis) {
              if (error) {
                deferred.reject(error);
              } else {
                deferred.resolve(gotchis);
              }
            });

            return deferred.promise;
          };

          gotchi.prototype.addCollection = function(userID, collection) {
            var deferred = Q.defer();
            var gotchiModel = mongoose.model('Gotchi', gotchiSchema);

            gotchiModel.collection.insert(collection, function(error, numAffected) {
              if (error) {
                deferred.reject(error);
              } else {
                deferred.resolve(numAffected);
              }
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
