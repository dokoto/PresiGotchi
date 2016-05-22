//*****************************************************
// PRIVATE AND SHARED OBJECTS
//*****************************************************
var Schema = require('mongoose').Schema;

var schema = {
    name: {
      type: String,
    },
    texts: {
      type: Object
    }
};


module.exports = {
    create: function() {
        var retSchema = new Schema(schema);
        retSchema.set('autoIndex', false);

        return retSchema;
    }
};
