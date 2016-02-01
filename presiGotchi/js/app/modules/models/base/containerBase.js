define(['jquery', './modelBase'], function($, modelBase) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var ContainerBase = (function() {
    function containerBase(options) {
      this._container = [];
      this._model = modelBase.create(options);
    }

    containerBase.prototype.appendContainer = function(data) {
      this._appendContainer(data);
    };

    containerBase.prototype.append = function(data) {
      this._append(data);
    };

    containerBase.prototype.delete = function(position) {
      return this._delete(position);
    };

    containerBase.prototype.empty = function() {
      return this._empty();
    };

    containerBase.prototype.get = function(position) {
      return this._get(position);
    };

    containerBase.prototype.toObject = function() {
      return this._toObject();
    };

    containerBase.prototype.cloneModel = function() {
      return modelBase.create(this._model._data);
    };


    containerBase.prototype.updateDB = function() {
      var deferred = $.Deferred();

      $.ajax({
        type: 'PUT',
        url: this._model._options.restUrl + '/collection'
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

    containerBase.prototype.addDB = function() {
      var deferred = $.Deferred();

      $.ajax({
        type: 'POST',
        url: this._model._options.restUrl + '/collection'
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

    containerBase.prototype.getDB = function(query) {
      var deferred = $.Deferred();

      $.ajax({
        type: 'GET',
        url: this._model._options.restUrl + '/collection'
        data: query
      }).done(function(response) {
        deferred.resolve(response);
      }).fail(function(error) {
        deferred.reject(error);
      });

      return deferred.promise();
    };

    containerBase.prototype.synctDB = function(query) {
      var deferred = $.Deferred();

      $.ajax({
        type: 'GET',
        url: this._model._options.restUrl + '/collection'
        data: query
      }).done(function(response) {
        this._container = response.value.collection;
        deferred.resolve(true);
      }).fail(function(error) {
        deferred.reject(error);
      });

      return deferred.promise();
    };

    containerBase.prototype._appendContainer = function(data) {
      if (data instanceof ContainerBase) {
        for (var i = 0; i < data._container.length; i++) {
          this._append(data._container[i]);
        }
      } else {
        console.error('"data" parameter must be a "ContainerBase" object');
      }

    };

    containerBase.prototype._append = function(data) {
      if (!data) {
        console.error('"data" parameter must be a "modelBase" object');
      }
      if (data instanceof modelBase.this) {
        this._container.push(data);
      } else {
        console.error('"data" parameter must be a "modelBase" object');
      }
    };

    containerBase.prototype.get = function(position) {
      if (position > this._container.length) {
        console.warn('Position is too longer... container has : ' + this._container.length + ' length');
        return null;
      }
      return this._container[position];
    };

    containerBase.prototype._toObject = function(position) {
      var result = [];
      for (var i = 0; i < this._container.length; i++) {
        result.push(this._container[i]._data);
      }
      return result;
    };

    containerBase.prototype._delete = function(position) {
      this._container.splice(position, 1);
    };

    containerBase.prototype._empty = function() {
      this._container = [];
    };

    return containerBase;

  })();


  return {
    /*
     * { restUrl: '', userID: ''}
     */
    create: function(options) {
      return new ContainerBase(options);
    },
    this: ContainerBase
  };

});
