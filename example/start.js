
/**
 * Core library
 */
const Core = require('./core');
const ErrorSpec = Core.ErrorSpec;

/**
 * Custom bootstrap class
 */
const Bootstrap = require('./bootstrap');

// define error list
ErrorSpec.define('test', {
    name: 'Test Error',
    message: 'Test message',
    someThing: 123
});


// custom bootstrapping
Core.defineBootstrap(Bootstrap);
// initialization app
Core.initialize();
