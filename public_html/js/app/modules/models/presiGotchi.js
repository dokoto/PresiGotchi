define(['Phaser', 'jquery', 'modules/helpers/Logger'], function (Phaser, $, Logger) {

    var gamePtr = null;
    var gotchi = null;

    var config = {
        name: 'presiGotchi',
        spriteSheet: {
            imagePath: 'assets/images/sprites/presiGotchi_temp_vec.png',
            boxSize: {
                width: 27,
                height: 28
            },
            position: {
                x: 0,
                y: 0
            },
            frames: 6
        },
        actions: {
            WAITING: 'WAITING'
        },
        states: {
            HUNGRY: 'HUNGRY',
            THIRSTY: 'THIRSTY',
            SLEEPY: 'SLEEPY'
        },
        times: {
            consts: {
                HUNGRY: 6000,
                THIRSTY: 3000,
                SLEEPY: 12000
            },
            ptrs: {
                HUNGRY: 0,
                THIRSTY: 0,
                SLEEPY: 0
            }
        }
    };

    var preload = function (game) {
        gamePtr = game;
        gamePtr.load.spritesheet(config.name, config.spriteSheet.imagePath, config.spriteSheet.boxSize.width, config.spriteSheet.boxSize.height, config.spriteSheet.frames);
    };

    var create = function () {
        config.spriteSheet.position.x = gamePtr.world.centerX;
        config.spriteSheet.position.y = gamePtr.world.height / 2;
        gotchi = gamePtr.add.sprite(config.spriteSheet.position.x, config.spriteSheet.position.y, config.name);
        gotchi.animations.add(config.actions.WAITING, [1, 2, 3]);
        gotchi.anchor.set(0.5, 0.5);
        gotchi.scale.set(4, 4);

        gotchi.animations.play(config.actions.WAITING, 2, true);
    };

    var update = function (states) {
        if (states === null) {
            Logger.ERROR_DESP('Please set "states" as object of actions. Ej: state = { "HUNGRY" : function() {}, ... }');
            return;
        }
        for (var index in config.states) {
            if (states[config.states[index]] === undefined) {
                Logger.ERROR_DESP(config.states[index] + ' doesnt exist in States');
                return;
            }
            
            config.times.ptrs[index] += gamePtr.time.elapsed;
            if (config.times.ptrs[index] >= config.times.consts[index]) {
                Logger.MSG_DESP('presiGotchi just reach state : ' + config.states[index] + ' . Reseting count to :  ' + config.times.consts[index] + ' milliseconds');
                config.times.ptrs[index] = 0;
                if ($.isFunction( states[config.states[index]].func() )) {
                    states[config.states[index]].func();
                }
                else {
                    Logger.ERROR_DESP(config.states[index] + ' is not Function');
                    break;
                }
            }
        }
    };

    return {
        preload: preload,
        create: create,
        update: update,
        config: config
    };

});


