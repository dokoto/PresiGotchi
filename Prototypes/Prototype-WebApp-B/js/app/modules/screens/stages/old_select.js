define(['Phaser', 'jquery', 'underscore', 'freewall', 'text!../templates/SelectMenu.html'],
  function(Phaser, $, _, freewall, SelectMenuTpl) {

    var gamePtr = null;

    var presiDatas = [{
      id: 'mariano_rajoy',
      height: 100,
      width: 100,
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Mariano_Rajoy_2005_%28cropped%29.jpg',
      credit: 'Por European People&#039;s Party [CC BY 2.0 (http://creativecommons.org/licenses/by/2.0)], undefined'
    }, {
      id: 'jose_luis_rodriguez_zapatero',
      height: 100,
      width: 100,
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Jos%C3%A9_Luis_Rodr%C3%ADguez_Zapatero_%28para_tabla%29.png',
      credit: 'By Luis Jáspez (Own work) [GFDL (http://www.gnu.org/copyleft/fdl.html), CC-BY-SA-3.0 (http://creativecommons.org/licenses/by-sa/3.0/) or CC BY-SA 2.5-2.0-1.0 (http://creativecommons.org/licenses/by-sa/2.5-2.0-1.0)], via Wikimedia Commons'
    }, {
      id: 'jose_maria_aznar',
      height: 100,
      width: 100,
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jose_Maria_Aznar_DF-SD-05-00920.jpg/256px-Jose_Maria_Aznar_DF-SD-05-00920.jpg',
      credit: 'By Staff Sgt. Michelle Michaud, USAF ([1]) [Public domain], via Wikimedia Commons'
    }, {
      id: 'pablo_iglesis_turri',
      height: 100,
      width: 100,
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Pablo_Iglesias_Turri%C3%B3n_14614.jpg/256px-Pablo_Iglesias_Turri%C3%B3n_14614.jpg',
      credit: 'Por Javier Garrido (Dominio público) [CC0], undefined'
    }, {
      id: 'felipe_gonzalez',
      height: 100,
      width: 100,
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Felipe_Gonz%C3%A1lez_par_Claude_Truong-Ngoc_juillet_2013.jpg/256px-Felipe_Gonz%C3%A1lez_par_Claude_Truong-Ngoc_juillet_2013.jpg',
      credit: 'Claude Truong-Ngoc / Wikimedia Commons [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], undefined'
    }, {
      id: 'abert_rivera',
      height: 100,
      width: 100,
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Albert_Rivera_%282015%29.jpg',
      credit: 'Por Carlos Delgado (Albert Rivera - 04.jpg) [CC BY-SA 4.0 (http://creativecommons.org/licenses/by-sa/4.0)], undefined'
    }, {
      id: 'pedro_sanchez',
      height: 100,
      width: 100,
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Pedro_S%C3%A1nchez_2015b_%28cropped%29.jpg',
      credit: 'Por psoe extremadura [CC BY 2.0 (http://creativecommons.org/licenses/by/2.0)], undefined'
    }];

    var SelectMenu = function(game) {
      gamePtr = game;
    };

    var preload = function() {
      $('body').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/0/07/Libertatis_%C3%86quilibritas.svg)');
      $('#menus-region').show();
      var selectMenuTplCompiled = _.template(SelectMenuTpl);
      $('#menus-region').append(selectMenuTplCompiled({
        presis: presiDatas
      }));
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
      create: create
    };

    return SelectMenu;

  });
