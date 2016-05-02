//http://blog.romanliutikov.com/post/98094863603/organizing-phaser-project-with-requirejs
define(['jquery', 'modules/helpers/logger'], function($, Logger) {
  'use strict';

  var run = function() {

    require(['modules/config/game', 'modules/screens/menus/mainMenu', 'modules/screens/menus/SelectCharacterOptionMenu', 'modules/screens/stages/one'], function(Game, MainMenu, SelectCharacterOptionMenu, StageONE) {

      Logger.APP_TITLE('START: PRESIGOTCHI');
      $('#header-region').empty();

      var game = new Game.create();
      window.presiGotchi = {};
      game.state.add('MainMenu', MainMenu);
      game.state.add('SelectCharacterOptionMenu', SelectCharacterOptionMenu);
      game.state.add('StageONE', StageONE);

      game.state.start('MainMenu');
    });

  };

  return {
    run: run
  };
});
