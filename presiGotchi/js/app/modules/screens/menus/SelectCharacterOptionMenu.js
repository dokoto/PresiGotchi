define(['Phaser', 'jquery', 'modules/helpers/logger', 'modules/helpers/android_toast',
        'modules/models/gotchiCollection'
    ],
    function(Phaser, $, Logger, Android_Toast, gotchiCollection) {
        /*
         * Estos datos son temporales para ir probando.
         * Esto ira asi:
         * 1 - Si no existen datos en localStorage se para oAuth2 contra  google para identificar al usuario y tomar su email
         * 2 - Se obtendra la url de un fichero de configuracion
         * 3 - Se presentara un pantalla donde elegir al presiGotchi, por el momento solo exitiran:
         *    > name: Morinum Rajor, description: Capitalistium zopencus, country: Corruptania, type: POLITICIANS
         *    > name: Pecor Sancha, description:  Borregum clonicus, country: Corruptania, type: POLITICIANS
         */
        var SelectCharacterOptionMenu = function(game) {
            this._gamePtr = game;
            this._defaultOptions = {
                restUrl: 'http://127.0.0.1:46969/gotchi',
                email: 'presigotchi@gmail.com',

            };
            this._testSelection = {
                name: 'Morinum Rajor'
            };
            this._gotchiCollection = gotchiCollection.create(this._defaultOptions);
            this._model = null;
        };

        var preload = function() {};

        var create = function() {
            var self = this;
            this._gotchiCollection.syncDB({
                email: this._defaultOptions.email
            }).then(function(response) {
                if (response.value.collection.length > 0) {
                    self._model = self._gotchiCollection.get(self._testSelection.name);
                    self._gamePtr.state.start('StageONE', true, false, self._model);
                } else {
                    console.error('Collection response is void');
                }
            }).fail(function(error) {
                console.error(error);
            });
        };

        var update = function() {};

        SelectCharacterOptionMenu.prototype = {
            constructor: SelectCharacterOptionMenu,
            preload: preload,
            create: create,
            update: update
        };

        return SelectCharacterOptionMenu;

    });
