define(['Phaser', 'jquery', 'modules/helpers/Logger'], function (Phaser, $, Logger) {

    var config = {
        width : parseInt( $(document).width() ),
        height : parseInt( $(document).height() ),
        mode : Phaser.AUTO,
        title: 'PresiGotchi'
    };
    
    var game = function () {
        try {
                        
            Logger.MSG_DESP('Configurating PresiGotchi at ' + config.width + 'x' + config.height);
            return new Phaser.Game(config.width, config.height, config.mode, config.title);

        } catch (error) {
            Logger.ERROR_DESP(error);
        }
    };

    return  { 
        presiGotchi: game,
        config: config
    };

});


