define(['Phaser', 'jquery', 'modules/helpers/Logger'], function (Phaser, $, Logger) {

    var gamePtr = null;
    var gotchi = null;
    
    var StageONE = function (game) {
        gamePtr = game;
    };

    var preload = function () {
        // Test
        gamePtr.load.spritesheet('gotchi', 'assets/images/sprites/presiGotchi_temp_vec.png', 27, 28, 6);
        //gamePtr.load.spritesheet('gotchi', 'assets/images/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    };

    var create = function () {
        var gotchi = gamePtr.add.sprite(gamePtr.world.centerX, gamePtr.world.height/2, 'gotchi');
        //gotchi = gamePtr.add.sprite(40, 100, 'gotchi');
        gotchi.animations.add('waiting', [1, 2, 3]);
        gotchi.anchor.set(0.5, 0.5);
        gotchi.scale.set(4, 4);

        gotchi.animations.play('waiting', 2, true);
        //gamePtr.add.tween(gotchi).to({x: gamePtr.width}, 10000, Phaser.Easing.Linear.None, true);
    };

    var update = function () {
    };

    StageONE.prototype = {
        constructor: StageONE,
        preload: preload,
        create: create,
        update: update
    };

    return StageONE;

});


