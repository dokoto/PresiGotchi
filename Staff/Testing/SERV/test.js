var initParams = require('./initParams').create();
/*
initParams.run();
initParams.once('complete', function(response) {
    global.dbManager = response.dbManager;
});
initParams.once('error', function(response) {
    console.error(response.error);
});
*/
initParams.test();
initParams.once('test-finish', function(response) {
    console.log('finish test');
});
