var url = 'http://tribu-zubu.local:8090/';

var casper = require('casper').create({
    clientScripts:  [
        'includes/jquery.js',      // These two scripts will be injected in remote
        'includes/underscore.js'   // DOM on every request
    ],
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});

casper.test.comment('Starting Testing');
