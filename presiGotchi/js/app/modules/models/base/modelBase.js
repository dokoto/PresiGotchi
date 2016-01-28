define(['jquery'], function($) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************


  //*****************************************************
  // PUBLIC
  //*****************************************************
  var ModelBase = (function() {
    function modelBase(options) {
      this._restUrl: options.restUrl;
      this._userID: options.restUrl;
      this._data = {};
    }

    modelBase.prototype.insert = function(data) {
      this._insert(data);
    };

    modelBase.prototype.delete = function(prop) {
      return this._delete(prop);
    };

    modelBase.prototype.get = function(prop) {
      //return this._get(prop);
      return this.__getPath(this._data, prop);
    };

    modelBase.prototype.set = function(prop, value) {
      this._set(prop, value);
    };

    modelBase.prototype.commit = function() {
      var deferred = $.Deferred();

      $.ajax({
        type: 'POST',
        url: this._rest + '/model'
        data: {
          userID: this._userID,
          model: this._data,
        }
      }).done(function(response) {
        deferred.resolve(response);
      }).fail(function(error) {
        deferred.reject(error);
      });

      return deferred.promise();
    };
    modelBase.prototype.fetch = function() {
      var deferred = $.Deferred();

      $.ajax({
        type: 'GET',
        url: this._rest + '/model'
        data: {
          userID: this._userID,
          gotchiID: this._data.gotchiID
        }
      }).done(function(response) {
        deferred.resolve(response);
      }).fail(function(error) {
        deferred.reject(error);
      });

      return deferred.promise();
    };

    modelBase.prototype._insert = function(data) {
      for (var prop in data) {
        if (!data.hasOwnProperty(prop)) continue;
        this._set(prop, data[prop]);
      }
    };

    modelBase.prototype._detete = function(prop) {
      return delete this._data[prop];
    };

    modelBase.prototype._get = function(prop) {
      if (this._data[prop] === undefined) {
        console.error('property ' + prop + ' does not exist in this model');
        return null;
      } else {
        return this._data[prop];
      }
    };

    modelBase.prototype._getPath = function(obj, path) {
      try {
        var current = obj;
        path.split('.').forEach(function(p) {
          current = current[p];
        });
        return current;
      } catch (e) {
        console.error('path to property ' + path + ' does not exist in this model');
        return null;
      }
    };

    modelBase.prototype._set = function(prop, value) {
      this._data[prop] = value;
    };

    return modelBase;

  })();


  return {
    /*
     * { restUrl: '', userID: ''}
     */
    create: function(options) {
      return new ModelBase(options);
    },
    this: ModelBase
  };

});
