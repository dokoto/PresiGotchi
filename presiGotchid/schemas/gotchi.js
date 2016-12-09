//*****************************************************
// PRIVATE AND SHARED OBJECTS
//*****************************************************
var Schema = require('mongoose').Schema;

var schema = {
    email: {
        type: String,
        trim: true,
        index: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        default: ''
    },
    name: {
        type: String,
        trim: true,
        index: true,
        default: ''
    },
    country: {
        type: String,
        trim: true,
        index: true,
        default: ''
    },
    description: {
        type: String
    },
    state: {
        "activated": {
            type: Boolean,
            required: true,
            index: true,
            default: false
        },
        "isDead": {
            type: Boolean,
            required: true,
            index: true,
            default: false
        },
        "direction": {
            type: String,
            uppercase: true,
            trim: true,
            enum: ['LEFT', 'RANDOM', 'RIGHT'],
            default: 'RANDOM'
        },
        "stage": {
            type: String,
            uppercase: true,
            trim: true,
            enum: ['FILOSOFER', 'CANDIDATE', 'POWERFUL', 'NAZI'],
            default: 'FILOSOFER'
        },
        "status": {
            type: Number,
            default: 0.0
        }
    }
};


module.exports = {
    create: function() {
        var retSchema = new Schema(schema);
        retSchema.index({
            email: 1,
            name: 1
        }, {
            unique: true
        });
        retSchema.set('autoIndex', false);

        return retSchema;
    }
};
