define(['jquery', './modelBase'], function($, modelBase) {
    'use strict';


    //*****************************************************
    // PRIVATE AND SHARED MEMORY OBJECTS
    //*****************************************************

    //*****************************************************
    // PUBLIC
    //*****************************************************
    var ContainerBaseWrapper = (function() {
        function ContainerBase(options) {
            this._container = [];
            this._options = options;
        }

        ContainerBase.prototype.appendContainer = function(data) {
            this._appendContainer(data);
        };

        ContainerBase.prototype.append = function(data) {
            this._append(data);
        };

        ContainerBase.prototype.delete = function(name) {
            return this._delete(name);
        };

        ContainerBase.prototype.empty = function() {
            return this._empty();
        };

        ContainerBase.prototype.get = function(name) {
            return this._get(name);
        };

        ContainerBase.prototype.toObject = function() {
            return this._toObject();
        };

        ContainerBase.prototype.updateDB = function() {
            var deferred = $.Deferred();

            $.ajax({
                type: 'PUT',
                url: this._options.restUrl + '/collection',
                data: {
                    collection: this._container,
                }
            }).done(function(response) {
                deferred.resolve(response);
            }).fail(function(error) {
                deferred.reject(error);
            });

            return deferred.promise();
        };

        ContainerBase.prototype.addDB = function() {
            var deferred = $.Deferred();

            $.ajax({
                type: 'POST',
                url: this._options.restUrl + '/collection',
                data: {
                    collection: this._container,
                }
            }).done(function(response) {
                deferred.resolve(response);
            }).fail(function(error) {
                deferred.reject(error);
            });

            return deferred.promise();
        };

        ContainerBase.prototype.getDB = function(query) {
            var deferred = $.Deferred();

            $.ajax({
                type: 'GET',
                url: this._options.restUrl + '/collection',
                data: query
            }).done(function(response) {
                deferred.resolve(response);
            }).fail(function(error) {
                deferred.reject(error);
            });

            return deferred.promise();
        };

        ContainerBase.prototype.syncDB = function(query) {
            var deferred = $.Deferred();
            var self = this;
            $.ajax({
                type: 'GET',
                url: this._options.restUrl + '/collection',
                data: query
            }).done(function(response) {
                var newOptions = self._options;
                for (var i = 0; i < response.value.collection.length > 0; i++) {
                    newOptions.data = response.value.collection[i];
                    self._container.push(modelBase.create(newOptions));
                }
                deferred.resolve(response);
            }).fail(function(error) {
                deferred.reject(error);
            });

            return deferred.promise();
        };

        ContainerBase.prototype._appendContainer = function(data) {
            if (data instanceof ContainerBase) {
                for (var i = 0; i < data._container.length; i++) {
                    this._append(data._container[i]);
                }
            } else {
                console.error('"data" parameter must be a "ContainerBase" object');
            }

        };

        ContainerBase.prototype._append = function(data) {
            if (!data) {
                console.error('"data" parameter must be a "modelBase" object');
            }
            if (data instanceof modelBase.this) {
                this._container.push(data);
            } else {
                console.error('"data" parameter must be a "modelBase" object');
            }
        };

        ContainerBase.prototype._findNameIndex = function(name) {
            for (var i = 0; i < this._container.length; i++) {
                if (this._container[i].get('name') === name) {
                    return i;
                }
            }
            return -1;
        };

        ContainerBase.prototype._get = function(name) {
            var position = this._findNameIndex(name);
            if (position > this._container.length) {
                console.warn('Position is too longer... container has : ' + this._container.length + ' length');
                return null;
            }
            return this._container[position];
        };

        ContainerBase.prototype._toObject = function() {
            var result = [];
            for (var i = 0; i < this._container.length; i++) {
                result.push(this._container[i]._data);
            }
            return result;
        };

        ContainerBase.prototype._delete = function(name) {
            this._container.splice(this._findNameIndex(name), 1);
        };

        ContainerBase.prototype._empty = function() {
            this._container = [];
        };

        return ContainerBase;

    })();


    return {
        /*
         * { restUrl: '', userID: ''}
         */
        create: function(options) {
            return new ContainerBaseWrapper(options);
        },
        this: ContainerBaseWrapper
    };

});
