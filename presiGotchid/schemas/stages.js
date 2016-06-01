//*****************************************************
// PRIVATE AND SHARED OBJECTS
//*****************************************************
var Schema = require('mongoose').Schema;

var schema = {
    status: {
        type: String,
        index: true
    },
    index: {
        type: Number,
        index: true
    },
    level: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        }
    },
    power: {
        like: {
            type: Number,
        },
        dislike: {
            type: Number,
        }
    },
    quotes: [{
        lang: {
            type: String,
            uppercase: true,
            trim: true,
            enum: ['ES', 'EN', 'DE'],
            default: 'ES'
        },
        urlRoot: {
            type: String
        },
        page: {
            type: String
        },
        texts: [{
            type: String
        }]
    }]
};


module.exports = {
    create: function() {
        var retSchema = new Schema(schema);
        retSchema.index({
            status: 1,
            index: 1
        }, {
            unique: true
        });
        retSchema.set('autoIndex', false);

        return retSchema;
    }
};
