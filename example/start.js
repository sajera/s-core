
/**
 * Core library
 */
const Core = require('./core');

/**
 * Custom bootstrap class
 */
const Bootstrap = require('./bootstrap');

// custom bootstrapping
Core.defineBootstrap(Bootstrap);
// initialization app
Core.initialize();
