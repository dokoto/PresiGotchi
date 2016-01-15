//http://blog.romanliutikov.com/post/98094863603/organizing-phaser-project-with-requirejs
define(['jquery', 'modules/helpers/Logger'], function ($, Logger) {
    'use strict';

      var run = function () {        
          
        require([
            'modules/config/Game', 
            'modules/states/MainMenu', 
            'modules/states/StateONE'
            ], function(Game, MainMenu, StateONE) {
                
                Logger.APP_TITLE('START: PRESIGOTCHI');
                $('#header-region').empty();
                
                var game = new Game.presiGotchi();
                game.state.add('MainMenu', MainMenu);
                game.state.add('StageONE', StateONE);
                
                game.state.start('MainMenu');                
        });  
        
    };

    return {
        run: run
    };
});
