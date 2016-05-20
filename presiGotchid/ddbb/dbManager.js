var DBManagerWrapper = (function() {
    'use strict';

    //*****************************************************
    // PRIVATE AND SHARED OBJECTS
    //*****************************************************
    var mongoose = require('mongoose');
    var Q = require('q');


    //*****************************************************
    // PUBLIC
    //*****************************************************
    function DBManager(options) {
        this._options = options || {};
        this._db = mongoose.connect(this._options.uri);
        this._collections = this._options.collections;
    }

    DBManager.prototype.desconect = function() {
        mongoose.connection.close();
        this._db = null;
    };

    DBManager.prototype.getModel = function(collectionName, query) {
        var deferred = Q.defer();
        var model = mongoose.model(this._collections[collectionName].modelName, this._collections[collectionName].schema, this._collections[collectionName].collectionName);

        model.findOne(query, {}, function(error, response) {
            if (error) {
                deferred.reject(error);
            } else {
                if (response === null) {
                    deferred.resolve({
                        data: new model(),
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

    DBManager.prototype.addModel = function(collectionName, model) {
        var deferred = Q.defer();
        var mongooseModel = mongoose.model(this._collections[collectionName].modelName, this._collections[collectionName].schema, this._collections[collectionName].collectionName);
        var mongooseModelInst = new mongooseModel(model);

        mongooseModelInst.save(function(error, response) {
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

    DBManager.prototype.updateModel = function(collectionName, model) {
        var deferred = Q.defer();
        var mongooseModel = mongoose.model(this._collections[collectionName].modelName, this._collections[collectionName].schema, this._collections[collectionName].collectionName);

        mongooseModel.findOneAndUpdate({
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

    DBManager.prototype.getCollection = function(collectionName, query) {
        var deferred = Q.defer();
        var mongooseModel = mongoose.model(this._collections[collectionName].modelName, this._collections[collectionName].schema, this._collections[collectionName].collectionName);

        mongooseModel.find().exec(function(error, response) {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.length === 0) {
                    response.push(new mongooseModel());
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

    DBManager.prototype.addCollection = function(collectionName, collection) {
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

    DBManager.prototype.updateCollection = function(collectionName, collection) {
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

    return DBManager;

})();


module.exports = {
    create: function(options) {
        return new DBManagerWrapper(options);
    }

};
