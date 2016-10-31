define(['jquery'], function($) {
    'use strict';


    //*****************************************************
    // PRIVATE AND SHARED MEMORY OBJECTS
    //*****************************************************

    //*****************************************************
    // PUBLIC
    //*****************************************************
    var ModelBaseWrapper = (function() {
        function ModelBase(options) {
            this._options = options;
            this._data = options.data || {};
        }

        ModelBase.prototype.insert = function(data) {
            this._insert(data);
        };

        ModelBase.prototype.delete = function(prop) {
            return this._delete(prop);
        };

        ModelBase.prototype.get = function(prop) {
            return this._get(prop);
        };

        ModelBase.prototype.set = function(prop, value) {
            this._set(prop, value);
        };

        ModelBase.prototype.cloneModel = function() {
            return modelBase.create(this._options);
        };

        ModelBase.prototype.updateDB = function() {
            var deferred = $.Deferred();

            $.ajax({
                type: 'PUT',
                url: this._options.restUrl + '/model',
                data: {
                    model: this._data
                }
            }).done(function(response) {
                deferred.resolve(response);
            }).fail(function(error) {
                deferred.reject(error);
            });

            return deferred.promise();
        };

        ModelBase.prototype.addDB = function() {
            var deferred = $.Deferred();

            $.ajax({
                type: 'POST',
                url: this._options.restUrl + '/model',
                data: {
                    model: this._data
                }
            }).done(function(response) {
                deferred.resolve(response);
            }).fail(function(error) {
                deferred.reject(error);
            });

            return deferred.promise();
        };

        ModelBase.prototype.getDB = function() {
            var deferred = $.Deferred();

            $.ajax({
                type: 'GET',
                url: this._options.restUrl + '/model',
                data: {
                    email: this._data.email,
                    name: this._data.name
                }
            }).done(function(response) {
                deferred.resolve(response);
            }).fail(function(error) {
                deferred.reject(error);
            });

            return deferred.promise();
        };

        ModelBase.prototype.syncDB = function() {
            var deferred = $.Deferred();
            var self = this;
            $.ajax({
                type: 'GET',
                url: this._options.restUrl + '/model',
                data: {
                    email: this._data.email,
                    name: this._data.name
                }
            }).done(function(response) {
                self._data = response.value.model;
                deferred.resolve(true);
            }).fail(function(error) {
                deferred.reject(error);
            });

            return deferred.promise();
        };

        ModelBase.prototype._insert = function(data) {
            for (var prop in data) {
                if (!data.hasOwnProperty(prop)) continue;
                this._set(prop, data[prop]);
            }
        };

        ModelBase.prototype._detete = function(prop) {
            return delete this._data[prop];
        };

        ModelBase.prototype._get = function(prop) {
            try {
                return prop.split('.').reduce(function(prev, curr) {
                    return prev[curr];
                }, this._data);
            } catch (e) {
                console.error('path to property ' + path + ' does not exist in this model');
                return null;
            }
        };

        ModelBase.prototype._set = function(prop, value) {
            try {
                prop.split('.').reduce(function(prev, curr, index, vec) {
                    if (index === vec.length - 1) {
                        prev[curr] = value;
                    }
                    return prev[curr];
                }, this._data);
            } catch (e) {
                console.error('path to property ' + path + ' does not exist in this model');
                return null;
            }

        };

        return ModelBase;

    })();


    return {
        create: function(options) {
            return new ModelBaseWrapper(options);
        },
        this: ModelBaseWrapper
    };

});
