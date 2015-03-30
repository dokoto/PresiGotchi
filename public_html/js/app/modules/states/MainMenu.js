define(['Phaser', 'jquery', 'modules/helpers/Logger', 'modules/helpers/Utils'], function (Phaser, $, Logger, Utils) {

    var gamePtr = null;
    var text = {
        consts: {
            title: 'PresiGotchi',
            next: 'Press screen to continue'
        },
        ptr: {
            title: null,
            next: null,
            timer: 0            
        }
    };

    var MainMenu = function (game) {
        gamePtr = game;
    };

    var preload = function () {

    };

    var create = function () {
        text.ptr.title = gamePtr.add.text(gamePtr.world.centerX, gamePtr.world.height / 4, text.consts.title, {
            font: '32px Arial',
            fill: '#dedede',
            align: 'center'
        });
        text.ptr.title.anchor.set(0.5);
        
        text.ptr.next = gamePtr.add.text(gamePtr.world.centerX, gamePtr.world.height - 100, text.consts.next, {
            font: '18px Arial',
            fill: '#407CC9',
            align: 'center'
        });
        text.ptr.next.anchor.set(0.5);
        
        gamePtr.input.onTap.add(nextStage);
    };


    var nextStage = function() {
        console.log('Next Stage');
        gamePtr.state.start('StageONE');
    };
    
    var update = function () {
        blinkText(text.ptr.next, 500);
    };
    
    var blinkText = function(stringText, time) {
        text.ptr.timer += gamePtr.time.elapsed;
        if (text.ptr.timer >= time) {
            text.ptr.timer -= time;            
            stringText.visible = !stringText.visible;
        }
    };

    MainMenu.prototype = {
        constructor: MainMenu,
        preload: preload,
        create: create,
        update: update
    };

    return MainMenu;

});


