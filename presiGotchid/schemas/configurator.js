var Schema = require('mongoose').Schema;

var schema = {
    index: {
        type: Number
    },
    block: {
        type: String
    },
    blockDescription: {
        type: String
    },
    questions: [{
        question: {
            type: String
        },
        responses: [{
            text: {
                type: String
            },
            thumb: {
                type: String
            },
            direction: {
                type: String,
                uppercase: true,
                trim: true,
                enum: ['LEFT', 'RANDOM', 'RIGHT'],
                default: 'RANDOM'
            }
        }]
    }]
};


module.exports = {
    create: function() {
        var retSchema = new Schema(schema);
        retSchema.index({
            index: 1
        }, {
            unique: true
        });
        retSchema.set('autoIndex', false);

        return retSchema;
    }
};
