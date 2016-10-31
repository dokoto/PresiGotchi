//http://blog.romanliutikov.com/post/98094863603/organizing-phaser-project-with-requirejs
define(['jquery', 'modules/helpers/logger'], function($, Logger) {
  'use strict';

  var run = function() {
    $('#header-region').hide();
    require(['modules/config/game', 'modules/screens/stages/boot', 'modules/screens/menus/intro',
    'modules/screens/stages/select', 'modules/screens/stages/one'],
    function(Game, BootProcess, IntroMenu, SelectMenu, StageONE) {

      Logger.APP_TITLE('START: PRESIGOTCHI');

      var game = new Game.create();
      game.state.add('BootProcess', BootProcess);
      game.state.add('IntroMenu', IntroMenu);
      game.state.add('SelectMenu', SelectMenu);
      game.state.add('StageONE', StageONE);

      game.state.start('BootProcess');
    });

  };

  var ajaxConf = function() {
    $('#loaders-region').css('position', 'absolute');
    $('#loaders-region').css('width', '100%');
    $('#loaders-region').css('height', '100%');
    $('#loaders-region').css('filter', '0.8');
    $('#loaders-region').css('-moz-opacity', '0.8');
    $('#loaders-region').css('opacity', '0.8');
    $('#loaders-region').css('background-color', 'crimson');
    $('#loaders-region').append('<img id="ajax-loader-img" src="assets/images/loaders/ajax-loader-money.gif">');
    $('#ajax-loader-img').css('margin-top', '60%');
    $('#ajax-loader-img').css('margin-left', '40%');
    $('#loaders-region').append('<div id="ajax-loader-text">Loading...</div>');
    $('#ajax-loader-text').css('margin-top', '4%');
    $('#ajax-loader-text').css('margin-left', '41%');

    $.ajaxSetup({
      timeout: 20000 //Time in milliseconds
    });

    var $loading = $('#loaders-region').hide();
    $(document)
      .ajaxStart(function() {
        $loading.show();
      })
      .ajaxStop(function() {
        $loading.hide();
      });
  };

  return {
    run: run,
    ajaxConf: ajaxConf
  };
});
