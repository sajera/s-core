
/**
 * Core library
 */
const Core = require('./core-alias');
const ErrorSpec = Core.ErrorSpec;

/**
 * Custom bootstrap class
 */
const Bootstrap = require('./bootstrap');
/**
 * Custom configuration class
 */
const Config = require('./modules/Config');

/**
 * Custom configuration class
 */
const Logger = require('./modules/Logger');

// define error list
ErrorSpec.define('test', {
    name: 'Test Error',
    message: 'Test message',
    someThing: 123
});

// custom config
Core.setupModule('config', Config);
// custom logger
Core.setupModule('logger', Logger);
// custom bootstrapping
Core.setupModule('bootstrap', Bootstrap);
// initialization app
Core.initialize();
