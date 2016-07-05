//*****************************************************
// PRIVATE AND SHARED OBJECTS
//*****************************************************
var Schema = require('mongoose').Schema;

var schema = {
    status: {
        type: String,
        index: true,
        uppercase: true,
        trim: true,
        enum: ['FILOSOFER', 'CANDIDATE', 'POWERFUL', 'NAZI'],
        default: 'FILOSOFER'
    },
    quotes: [{
        lang: {
            type: String,
            uppercase: true,
            trim: true,
            enum: ['ES', 'EN', 'DE'],
            default: 'ES'
        },
        direction: {
            type: String,
            uppercase: true,
            trim: true,
            enum: ['LEFT', 'RANDOM', 'RIGHT'],
            default: 'RANDOM'
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
            status: 1
        }, {
            unique: true
        });
        retSchema.set('autoIndex', false);

        return retSchema;
    }
};
