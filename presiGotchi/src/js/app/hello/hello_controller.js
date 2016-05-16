var HelloView = require('./hello_view');
var APP = require('app');

module.exports = function() {

    APP.module('hello', function (moduleHello, APP, Backbone, Marionette) {
        var HelloController = Marionette.Controller.extend({
            run: function () {
                var view = new HelloView();
                APP.mainRegion.show(view);
            }
        });

        moduleHello.Controller = new HelloController();
    });

    return APP.moduleHello.Controller;
};
