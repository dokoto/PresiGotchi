/*global define, module, require*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/
'use strict';

const EventEmitter = require('events');
const mongoose = require('mongoose');

class DBManager extends EventEmitter {
    constructor(options) {
        super();
        this.options = options || {};
        this.db = mongoose.connect(this.options.uri);
        this.collections = this.options.collections;
    }

    disconnect() {
        mongoose.connection.close();
        this.db = null;
    }

    getModel(collectionName, query) {
        let model = mongoose.model(this.collections[collectionName].modelName,
            this.collections[collectionName].schema, this.collections[collectionName].collectionName);
        model.findOne(query, {}, function(error, response) {
            if (error) {
                this.emit('error', error);
            } else {
                if (response === null) {
                    this.emit('complete', {
                        data: new model()
                    });
                } else {
                    this.emit('complete', {
                        data: response
                    });
                }
            }
        });
    }

    addModel(collectionName, model) {

        let mongooseModel = mongoose.model(this.collections[collectionName].modelName,
            this.collections[collectionName].schema, this.collections[collectionName].collectionName);
        let mongooseModelInst = new mongooseModel(model);

        mongooseModelInst.save(function(error, response) {
            if (error) {
                this.emit('error', error);
            } else {
                this.emit('complete', {
                    data: response
                });
            }
        }.bind(this));

    }

    updateModel(collectionName, model) {
        let mongooseModel = mongoose.model(this.collections[collectionName].modelName,
            this.collections[collectionName].schema, this.collections[collectionName].collectionName);

        mongooseModel.findOneAndUpdate({
            email: model.email,
            name: model.name
        }, model, {}, function(error, response) {
            if (error) {
                this.emit('error', error);
            } else {
                this.emit('complete', {
                    data: response
                });
            }
        }.bind(this));

    }

    getCollection(collectionName, query) {
        let mongooseModel = mongoose.model(this.collections[collectionName].modelName,
            this.collections[collectionName].schema, this.collections[collectionName].collectionName);

        mongooseModel.find(query).exec(function(error, response) {
            if (error) {
                this.emit('error', error);
            } else {
                this.emit('complete', {
                    data: response
                });
            }
        }.bind(this));

    }

    addCollection(collectionName, collection) {
        for (var i = 0; i < collection.length; i++) {
            this.addModel(collectionName, collection[i]);
        }
        let itemsCompleted = 0;
        let responses = [];
        this.on('complete', (response) => {
            itemsCompleted++;
            responses.push(response);
            if (itemsCompleted === collection.length) {
                this.emit('complete-collection', {
                    data: responses
                });
            }
        });

    }

    addCollections(poll) {
        for (var i = 0; i < poll.length; i++) {
            this.addCollection(poll[i].collectionName, poll[i].collection);
        }
        let itemsCompleted = 0;
        let responses = [];
        this.on('complete-collection', (response) => {
            itemsCompleted++;
            responses.push(response);
            if (itemsCompleted === poll.length) {
                this.emit('complete-collections', {
                    data: responses
                });
            }
        });
    }

    updateCollection(collectionName, collection) {
        for (var i = 0; i < collection.length; i++) {
            this.updateModel(collectionName, collection[i]);
        }
        let itemsCompleted = 0;
        let responses = [];
        this.on('complete', (response) => {
            itemsCompleted++;
            responses.push(response);
            if (itemsCompleted === collection.length) {
                this.emit('complete-collection', {
                    data: responses
                });
            }
        });
    }

}

module.exports = {
    create: function(options) {
        return new DBManager(options);
    }

};
