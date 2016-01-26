define(['Phaser', 'jquery', 'modules/helpers/logger', 'modules/config/presiGotchi'], function(Phaser, $, Logger, presiConfig) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  function presiGotchi() {
    this._gamePtr = null;
    this._gotchi = null;
    this._config = $.extend({}, presiConfig.config);
  }

  function init() {
    return new presiGotchi();
  }

  presiGotchi.prototype.preload = function(game) {
    this._gamePtr = game;
    this._gamePtr.load.spritesheet(this._config.name, this._config.spriteSheet.imagePath, this._config.spriteSheet.boxSize.width, this._config.spriteSheet.boxSize.height, this._config.spriteSheet.frames);
  };

  presiGotchi.prototype.create = function() {
    Logger.MSG_DESP('presiGotchi init machine states');
    this._config.spriteSheet.position.x = this._gamePtr.world.centerX;
    this._config.spriteSheet.position.y = this._gamePtr.world.height / 2;
    this._gotchi = this._gamePtr.add.sprite(this._config.spriteSheet.position.x, this._config.spriteSheet.position.y, this._config.name);
    this._gotchi.animations.add(this._config.actions.WAITING, [1, 2, 3]);
    this._gotchi.anchor.set(0.5, 0.5);
    this._gotchi.scale.set(4, 4);

    this._gotchi.animations.play(this._config.actions.WAITING, 2, true);
  };

  presiGotchi.prototype.update = function(states) {
    if (states === null) {
      Logger.ERROR_DESP('Please set "states" as object of actions. Ej: state = { "HUNGRY" : function() {}, ... }');
      return;
    }

    this._dispacheStates(states);
  };

  presiGotchi.prototype._dispacheStates = function(statesActions) {
    var timeDiff, self;
    for (var state in this._config.states) {
      if ( this._config.times.elapsed[state] === 0.0 ) {
        this._config.live.status[state] = this._config.liveStatusTop;
        this._config.times.elapsed[state] = this._gamePtr.time.time;
        continue;
      }

      if (!this._config.states.hasOwnProperty(state)) {
        Logger.ERROR_DESP(this._config.states[state] + ' doesnt exist in States');
        continue;
      }

      timeDiff = this._gamePtr.time.time - this._config.times.elapsed[state];
      if (timeDiff >= this._config.times.consts[state]) {

        Logger.MSG_DESP('presiGotchi is in ' + this._config.states[state] + ' state.');
        this._config.times.elapsed[state] = 0;
        if ($.isFunction(statesActions[state])) {
          self = this;
          setTimeout(statesActions[state].call(self, state), 1);
        } else {
          Logger.ERROR_DESP(this._config.states[state] + ' is not Function');
          break;
        }

        this._config.times.elapsed[state] = this._gamePtr.time.time;
      }
    }
  };

  return {
    init: init
  };

});
