define(['Phaser', 'jquery', 'modules/helpers/logger', 'modules/models/gotchiCollection'], function(Phaser, $, Logger, gotchiCollection) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************
  //*****************************************************
  // PUBLIC
  //*****************************************************

  function init() {
    return new gotchi();
  }

  /*
   * { restUrl: '', userID: '', gotchiID: ''}
   */
  function gotchi(options) {
    this._gamePtr = null;
    this._gotchi = null;
    this._collection = gotchiCollection.create(options);
    this._model = this._collection.get(options.gotchiID);
  }

  gotchi.prototype.switchGotchi = function(gotchiID) {
    this._model.commit();
    this._model = null;
    this._model = this._collection.get(gotchiID);
  };

  gotchi.prototype.preload = function(game) {
    this._gamePtr = game;
    this._gamePtr.load.spritesheet(this._model.get('name'), this._model.get('spriteSheet.imagePath'), this._model.get('spriteSheet.boxSize.width'), this._model.get('spriteSheet.boxSize.height'), this._model.get('spriteSheet.frames'));
  };

  gotchi.prototype.create = function() {
    Logger.MSG_DESP('gotchi init machine states');
    this._model.set('spriteSheet.position.x', this._gamePtr.world.centerX);
    this._model.set('spriteSheet.position.y', this._gamePtr.world.height / 2);
    this._gotchi = this._gamePtr.add.sprite(this._model.get('spriteSheet.position.x'), this._model.get('spriteSheet.position.y'), this._model.get('name'));
    this._gotchi.animations.add(this._model.get('actions.WAITING'), [1, 2, 3]);
    this._gotchi.anchor.set(0.5, 0.5);
    this._gotchi.scale.set(4, 4);

    this._gotchi.animations.play(this._model.get('actions.WAITING'), 2, true);
  };

  gotchi.prototype.update = function(states) {
    if (states === null) {
      Logger.ERROR_DESP('Please set "states" as object of actions. Ej: state = { "HUNGRY" : function() {}, ... }');
      return;
    }

    this._dispacheStates(states);
  };

  gotchi.prototype._calcDecrease = function(state, timeDiff) {
    var states = this._model.get('states');
    var diffTimes = Math.round( timeDiff / states[state].time.interval);
    if ( diffTimes > 1) {
      states[state].live.status -= ( diffTimes * states[state].live.decrease );
    } else {
      states[state].live.status -= states[state].live.decrease;
    }

    return (states[state].live.status < 0) ? 0 : states[state].live.status;
  };

  gotchi.prototype._dispacheStates = function(statesActions) {
    var timeDiff, self, states = this._model.get('states');
    for (var state in states) {
      if (!states.hasOwnProperty(state)) {
        Logger.ERROR_DESP('"' + state + '" doesnt exist in States');
        continue;
      }

      if ( states[state].time.elapsed === 0.0 ) {
        states[state].live.status = states[state].live.top;
        states[state].time.elapsed = this._gamePtr.time.time;
        continue;
      }

      timeDiff = this._gamePtr.time.time - states[state].time.elapsed;
      if (timeDiff >= states[state].time.interval) {

        Logger.MSG_DESP('gotchi is in ' + state + ' state.');
        states[state].time.elapsed = 0.0;
        if ($.isFunction(statesActions[state])) {
          self = this;
          states[state].live.status = this._calcDecrease(state, timeDiff);
          setTimeout(statesActions[state].call(self, state), 1);
        } else {
          Logger.ERROR_DESP('"statesActions[' + state + ']" parameter is not Function');
          break;
        }

        states[state].time.elapsed = this._gamePtr.time.time;
      }
    }
  };

  return {
    init: init
  };

});
