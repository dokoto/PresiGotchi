//*****************************************************
// PRIVATE AND SHARED OBJECTS
//*****************************************************
var Schema = require('mongoose').Schema;

var schema = {
    menu: {
        type: Object,
        enum: ['ES'],
        default: 'ES'
    }
};


module.exports = {
    create: function() {
        var retSchema = new Schema(schema);
        retSchema.set('autoIndex', false);

        return retSchema;
    }
};
