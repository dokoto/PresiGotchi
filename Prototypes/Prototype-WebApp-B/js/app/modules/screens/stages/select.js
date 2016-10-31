define(['Phaser', 'jquery', 'underscore', 'freewall', 'text!../templates/SelectMenu.html'],
  function(Phaser, $, _, freewall, SelectMenuTpl) {

    var gamePtr = null;
    var gotchiCollection = null;
    var gotchiThumbs = [];

    var SelectMenu = function(game) {
      gamePtr = game;
    };

    var init = function(collection) {
          gotchiCollection = collection;
    };

    var preload = function() {
      $('body').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/0/07/Libertatis_%C3%86quilibritas.svg)');
      $('#menus-region').show();
      var selectMenuTplCompiled = _.template(SelectMenuTpl);
      $('#menus-region').append(selectMenuTplCompiled({
        gotchiCollection: gotchiCollection.toObject()
      }));
      $('.item').on('click', function(event) {
        var model = gotchiCollection.get( $(event.target).data('id') );
        $('#container-region').show();
        gamePtr.state.start('StageONE', true, false, model);
      });
    };

    var sizes = {
      window: {
        width: $(window).width() - 5,
        height: $(window).height() - 5
      },
      cell: {
        cellW: 120,
        cellH: 120
      },
      gutter: {
        gutterY: 1,
        gutterX: 1
      },
      fixSize: 1
    };

    var create = function() {
      var wall = new freewall('#menus-region');
      wall.reset({
        selector: '.item',
        animate: true,
        cellW: 120,
        cellH: 120,
        fixSize: 0,
        gutterY: 1,
        gutterX: 1,
        onResize: function() {
          //wall.fitWidth();
          wall.refresh($(window).width() - 5, $(window).height() - 5);
        }
      });
      //wall.fitWidth();
      wall.fitZone($(window).width() - 5 , $(window).height() - 5);
    };

    SelectMenu.prototype = {
      constructor: SelectMenu,
      preload: preload,
      create: create,
      init: init
    };

    return SelectMenu;

  });
