define(['Phaser', 'jquery'], function (Phaser, $) {

    var gamePtr = null;
    var gotchiCollection = null;
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

    var Intro = function (game) {
        gamePtr = game;
    };

    var init = function(collection) {
        gotchiCollection = collection;
    };

    var preload = function () {
      $('#container-region').show();
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
        $('#container-region').hide();
        gamePtr.state.start('SelectMenu', true, false, gotchiCollection);
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

    Intro.prototype = {
        constructor: Intro,
        preload: preload,
        create: create,
        update: update,
        init: init
    };

    return Intro;

});
