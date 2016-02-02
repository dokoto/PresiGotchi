define(['jquery', './modelBase'], function($, modelBase) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var CollectionBase = (function() {
    function collectionBase(options) {
      this._collection = [];
      this._model = modelBase.create(options);
    }

    collectionBase.prototype.appendContainer = function(data) {
      this._appendContainer(data);
    };

    collectionBase.prototype.appendModel = function(data) {
      this._appendModel(data);
    };

    collectionBase.prototype.appendRawContainer = function(data) {
      this._appendRawContainer(data);
    };

    collectionBase.prototype.delete = function(position) {
      return this._delete(position);
    };

    collectionBase.prototype.empty = function() {
      return this._empty();
    };

    collectionBase.prototype.indexOf = function(position) {
      return this._get(position);
    };

    collectionBase.prototype.getByName = function(name) {
      return this._getByName(name);
    };

    collectionBase.prototype.toObject = function() {
      return this._toObject();
    };

    collectionBase.prototype.cloneModel = function() {
      return modelBase.create(this._model._data);
    };


    collectionBase.prototype.updateDB = function() {
      var deferred = $.Deferred();

      $.ajax({
        type: 'PUT',
        url: this._model._options.restUrl + '/collection',
        data: {
          collection: this._collection
        }
      }).done(function(response) {
        deferred.resolve({
          success: true
        });
      }).fail(function(error) {
        deferred.reject({
          success: false,
          err: error
        });
      });

      return deferred.promise();
    };

    collectionBase.prototype.addDB = function() {
      var deferred = $.Deferred();

      $.ajax({
        type: 'POST',
        url: this._model._options.restUrl + '/collection',
        data: {
          collection: this._collection
        }
      }).done(function(response) {
        deferred.resolve({
          success: true
        });
      }).fail(function(error) {
        deferred.reject({
          success: false,
          err: error
        });
      });

      return deferred.promise();
    };

    /*
    collectionBase.prototype.getDB = function(query) {
      var deferred = $.Deferred();

      $.ajax({
        type: 'GET',
        url: this._model._options.restUrl + '/collection',
        data: query
      }).done(function(response) {
        deferred.resolve(response);
      }).fail(function(error) {
        deferred.reject(error);
      });

      return deferred.promise();
    };*/

    collectionBase.prototype.syncDB = function(query) {
      var deferred = $.Deferred();
      var self = this;

      $.ajax({
        type: 'GET',
        url: this._model._options.restUrl + '/collection',
        data: query
      }).done(function(response) {
        if (response.isNew === true) {
          console.log('DDBB does not exist, synchronizing collection with only one void model');
        } else {
          self.empty();
          self.appendRawContainer(response.value.collection);
        }
        deferred.resolve({
          success: true
        });
      }).fail(function(error) {
        deferred.reject({
          success: false,
          err: error
        });
      });

      return deferred.promise();
    };

    collectionBase.prototype._appendContainer = function(data) {
      if (data instanceof ContainerBase) {
        for (var i = 0; i < data._collection.length; i++) {
          this._append(data._collection[i]);
        }
      } else {
        console.error('"data" parameter must be a "ContainerBase" object');
      }

    };

    collectionBase.prototype._appendModel = function(data) {
      if (!data) {
        console.error('"data" parameter must be a "modelBase" object');
      }
      if (data instanceof modelBase.this) {
        this._collection.push(data);
      } else {
        console.error('"data" parameter must be a "modelBase" object');
      }
    };

    collectionBase.prototype._appendRawContainer = function(data) {
      var newModel;
      for (var i = 0; i < data.length; i++) {
        newModel = modelBase.create(this._model._options);
        newModel.insert(data[i]);
        this._collection.push(newModel);
      }

    };

    collectionBase.prototype._indexOf = function(position) {
      if (position > this._collection.length) {
        console.warn('Position is too longer... container has : ' + this._collection.length + ' length');
        return null;
      }
      return this._collection[position];
    };

    collectionBase.prototype._getByName = function(name) {
        for (var i = 0; i < this._collection.length; i++) {
          if (this._collection[i].get('name') === name) {
            return this._collection[i];
          }
        }

        return null;
      },

      collectionBase.prototype._toObject = function(position) {
        var result = [];
        for (var i = 0; i < this._collection.length; i++) {
          result.push(this._collection[i]._data);
        }
        return result;
      };

    collectionBase.prototype._delete = function(position) {
      this._collection.splice(position, 1);
    };

    collectionBase.prototype._empty = function() {
      this._collection = [];
    };

    return collectionBase;

  })();


  return {
    /*
     * { restUrl: '', userID: ''}
     */
    create: function(options) {
      return new CollectionBase(options);
    },
    this: CollectionBase
  };

});
