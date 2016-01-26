//http://blog.romanliutikov.com/post/98094863603/organizing-phaser-project-with-requirejs
define(['jquery', 'modules/helpers/logger'], function($, Logger) {
  'use strict';

  var run = function() {

    require(['modules/config/game', 'modules/states/mainMenu', 'modules/states/stateONE'], function(Game, MainMenu, StateONE) {

      Logger.APP_TITLE('START: PRESIGOTCHI');
      $('#header-region').empty();

      var game = new Game.create();
      game.state.add('MainMenu', MainMenu);
      game.state.add('StageONE', StateONE);

      game.state.start('MainMenu');
    });

  };

  return {
    run: run
  };
});
