var helloView = require('./hello_view');

module.exports = function() {

    app.module('hello', function (Ride, TAXI, Backbone, Marionette) {
        var RideController = Marionette.Controller.extend({
            show: function (coors) {
                Ride.show(coors);
            }
        });

        Ride.Controller = new RideController();
    });

};
