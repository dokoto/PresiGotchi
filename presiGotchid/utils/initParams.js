/*global define, module, require, Config, global, console, options, dbManager*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/
'use strict';

const EventEmitter = require('events');

var DBManagerOptions = {
    'uri': Config.fetch('db', 'db.mongo.gotchi.uri'),
    'collections': {
        'gotchi': {
            modelName: 'gotchiModel',
            schema: require('../schemas/gotchi').create(),
            collectionName: Config.fetch('db', 'db.mongo.gotchi.collections.characters')
        },
        'menus': {
            modelName: 'menusModel',
            schema: require('../schemas/menus').create(),
            collectionName: Config.fetch('db', 'db.mongo.gotchi.collections.menus')
        },
        'quotes': {
            modelName: 'quotesModel',
            schema: require('../schemas/quotes').create(),
            collectionName: Config.fetch('db', 'db.mongo.gotchi.collections.quotes')
        },
        'configurator': {
            modelName: 'configuratorModel',
            schema: require('../schemas/configurator').create(),
            collectionName: Config.fetch('db', 'db.mongo.gotchi.collections.configurator')
        }
    }
};

class InitParams extends EventEmitter {
    constructor(options) {
        super();
        this.options = options || {};
    }

    ddbb() {
        dbManager = require('../utils/dbManager').create(DBManagerOptions);

        if (options.args.initdb === true) {
            var gotchiModels = require('../config/default/gotchi.json');
            var menusModels = require('../config/default/menus.json');
            var quotesModels = require('../config/default/quotes.json');
            var configuratorModels = require('../config/default/configurator.json');

            dbManager.addCollections([{
                collectionName: 'gotchi',
                collection: gotchiModels
            }, {
                collectionName: 'menus',
                collection: menusModels
            }, {
                collectionName: 'quotes',
                collection: quotesModels
            }, {
                collectionName: 'configurator',
                collection: configuratorModels
            }]);

            dbManager.once('complete-collections', (responses) => {
                this.emit('complete', {
                    "status": true
                });
            });

            dbManager.once('error', (error) => {
                this.emit('error', {
                    "error": error
                });
            });

        }
    }
}

module.exports = {
    create: function(options) {
        return new InitParams(options);
    }
};
