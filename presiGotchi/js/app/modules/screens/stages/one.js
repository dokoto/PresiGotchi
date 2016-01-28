define(['Phaser', 'jquery', 'modules/helpers/logger', 'modules/characters/gotchi', 'modules/helpers/android_toast'], function(Phaser, $, Logger, Gotchi, Android_Toast) {

  var gamePtr = null;
  var gotchi = null;
  var statesActions = {};

  var StageONE = function(game) {
    gamePtr = game;
  };

  var preload = function() {
    gotchi = Gotchi.init();
    setStateActions();
    gotchi.preload(gamePtr);
  };

  var create = function() {
    gotchi.create();
  };

  var update = function() {
    gotchi.update(statesActions);
  };


  var setStateActions = function() {
    statesActions['HUNGRY'] = function(state) {
      new Android_Toast({
        content: 'You must be a nasty-bastard son of the bitch. I have to eat !!!',
        duration: 9 * 1000
      });
    };

    statesActions['THIRSTY'] = function(state) {
      if (this._config.states[state].live.status <= 0.0) {
        new Android_Toast({
          content: 'Im DEATH, motherFucker !! by ' + state,
          duration: 7 * 1000
        });
        gotchi = null;
        gamePtr.state.start('MainMenu');
      } else {
        new Android_Toast({
          content: 'Im thirsty, motherFucker !! ' + ' My thirsty status is : ' + this._config.states[state].live.status,
          duration: 7 * 1000
        });
      }
    };

    statesActions['SLEEPY'] = function(state) {
      new Android_Toast({
        content: 'Its time to sleep, where is my bed, bastard ??'
      });
    };
  };

  StageONE.prototype = {
    constructor: StageONE,
    preload: preload,
    create: create,
    update: update
  };

  return StageONE;

});
