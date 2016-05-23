//*****************************************************
// PRIVATE AND SHARED OBJECTS
//*****************************************************
var Schema = require('mongoose').Schema;

var schema = {
    name: {
      type: String,
    },
    lang: {
      type: String,
    },
    texts: {
      type: Array
    }
};


module.exports = {
    create: function() {
        var retSchema = new Schema(schema);
        retSchema.set('autoIndex', false);

        return retSchema;
    }
};
