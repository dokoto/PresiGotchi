define(['Phaser', 'jquery', 'modules/helpers/Logger', 'modules/models/presiGotchi'], function (Phaser, $, Logger, presiGotchi) {

    var gamePtr = null;    
    
    var StageONE = function (game) {
        gamePtr = game;        
    };

    var preload = function () {
        presiGotchi.preload(gamePtr);
    };

    var create = function () {
        presiGotchi.create();
    };

    var update = function () {
        presiGotchi.update(states);        
    };
    
    var states = {};
    
    states[presiGotchi.config.states.HUNGRY] = function() {
            
    };
    
    states[presiGotchi.config.states.THIRSTY] = function() {
            
    };
    
    states[presiGotchi.config.states.SLEEPY] = function() {
            
    };

    StageONE.prototype = {
        constructor: StageONE,
        preload: preload,
        create: create,
        update: update
    };

    return StageONE;

});


