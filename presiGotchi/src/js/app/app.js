var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Router = require('./router_app');

module.exports = {
    create: function() {

      var API = {
          initialize: function() {
              console.log('TEST initialized');
          }
      };

        var APP = new Marionette.Application();

        APP.on('start', function(options) {
            Backbone.history.start();
            APP.navigate('hello', {trigger: true});
        });

        APP.addRegions({
            headerRegion: '#header-region',
            mainRegion: '#container-region',
            footerRegion: '#footer-region',
            popupRegion: '#popups-region'
        });

        APP.addInitializer(function() {
            var router = new Router({
                controller: API
            });

            APP.Router = router;
        });

        APP.navigate = function(route, options) {
            if (!options) {
                options = {};
            }
            Backbone.history.navigate(route, options);
        };

        APP.getCurrentRoute = function() {
            return Backbone.history.fragment;
        };



        return APP;

    }
};
