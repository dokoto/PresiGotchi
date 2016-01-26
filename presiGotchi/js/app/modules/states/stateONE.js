define(['Phaser', 'jquery', 'modules/helpers/logger', 'modules/models/presiGotchi', 'modules/helpers/android_toast'], function(Phaser, $, Logger, PresiGotchi, Android_Toast) {

  var gamePtr = null;
  var presiGotchi = PresiGotchi.init();

  var StageONE = function(game) {
    gamePtr = game;
  };

  var preload = function() {
    presiGotchi.preload(gamePtr);
  };

  var create = function() {
    presiGotchi.create();
  };

  var update = function() {
    presiGotchi.update(statesActions);
  };

  var statesActions = {};

  statesActions[presiGotchi._config.states.HUNGRY] = function(state) {
    new Android_Toast({content: 'You must be a nasty-bastard son of the bitch. I have to eat !!!', duration: 9*1000});
  };

  statesActions[presiGotchi._config.states.THIRSTY] = function(state) {
    if ( this._config.liveStatus[state] <= 0.0) {
      new Android_Toast({content: 'Im DEATH, motherFucker !! by ' + state, duration: 9*1000 });
      gamePtr.state.start('MainMenu');
    } else {
      new Android_Toast({content: 'Im thirsty, motherFucker !! ' + ' My thirsty status is : ' + this._config.liveStatus[state], duration: 9*1000 });
      this._config.liveStatus[state] -= 50;
    }
  };

  statesActions[presiGotchi._config.states.SLEEPY] = function(state) {
    new Android_Toast({content: 'Its time to sleep, where is my bed, bastard ??'});
  };

  StageONE.prototype = {
    constructor: StageONE,
    preload: preload,
    create: create,
    update: update
  };

  return StageONE;

});
