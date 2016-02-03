define(['Phaser', 'jquery', 'modules/models/gotchiCollection'], function (Phaser, $, gotchiCollection) {

  var gamePtr = null;

  var Boot = function (game) {
      this._gamePtr = game;
  };

  var create = function () {
    var self = this;
    this._gamePtr._collection = gotchiCollection.create({restUrl: 'http://127.0.0.1:46969/gotchi'});
    $.when(this._gamePtr._collection.syncDB()).done(function(data, textStatus, jqXHR) {
      self._gamePtr.state.start('IntroMenu');
    }).fail(function(error) {
      console.error(error);
    });
  };

  Boot.prototype = {
      constructor: Boot,
      create: create
  };

  return Boot;

});
