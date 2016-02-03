define(['Phaser', 'jquery', 'modules/helpers/Logger', 'modules/helpers/Utils'], function(Phaser, $, Logger, Utils) {

  var gamePtr = null;

  var Options = function(game) {
    gamePtr = game;
  };

  var preload = function() {

  };

  var create = function() {};

  var update = function() {};

  Options.prototype = {
    constructor: Options,
    preload: preload,
    create: create
  };

  return Options;

});
