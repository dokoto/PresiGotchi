define(['Phaser', 'jquery', 'modules/helpers/logger', 'modules/helpers/android_toast',
        'modules/models/gotchiCollection', 'json!modules/config/initParams.json',
    ],
    function(Phaser, $, Logger, Android_Toast, gotchiCollection, initParams) {
        /*
         * Estos datos son temporales para ir probando.
         * Esto ira asi:
         * 1 - Si no existen datos en localStorage se para oAuth2 contra  google para identificar al usuario y tomar su email
         * 2 - Se obtendra la url de un fichero de configuracion
         * 3 - Se presentara un pantalla donde elegir al presiGotchi, por el momento solo exitiran:
         *    > name: Morinum Rajor, description: Capitalistium zopencus, country: Corruptania, type: POLITICIANS
         *    > name: Pecor Sancha, description:  Borregum clonicus, country: Corruptania, type: POLITICIANS
         */
        var Boot = function(game) {
            this._gamePtr = game;
            /*
            this._testSelection = {
                name: 'Morinum Rajor'
            };*/
            this._gotchiCollection = gotchiCollection.create(initParams);
            this._model = null;
        };


        var create = function() {
            var self = this;
            this._gotchiCollection.syncDB({
                email: initParams.email
            }).then(function(response) {
                if (response.value.collection.length > 0) {
                    self._gamePtr.state.start('IntroMenu', true, false, self._gotchiCollection);
                } else {
                    console.error('Collection response is void');
                }
            }).fail(function(error) {
                console.error(error);
            });
        };


        Boot.prototype = {
            constructor: Boot,
            create: create
        };

        return Boot;

    });
