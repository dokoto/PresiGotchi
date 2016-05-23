/*global define, module, require, dbManager*/
/*jshint esversion: 6 */
/*jshint globalstrict: true*/
'use strict';

const tpl = require('./tpl').create();

class Response {
    constructor() {

    }

    standard(res, status, message) {

        let params = {
            status: status,
            message: message
        };

        res.status(status).json(tpl.fromFile('../templates/responses/standard.json', params));
    }

    standardWithValue(res, status, message, value) {
        let params = {
            status: status,
            message: message,
            value: ((value === undefined) ? 'null' : value)
        };

        res.status(status).json(params);
    }

}

module.exports = {
    create: function() {
        return new Response();
    }

};
