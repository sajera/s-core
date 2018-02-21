
/**
 * Core library
 */
const Core = require('./core');
// custom bootstrapping
Core.defineBootstrap( require('./bootstrap') );

Core.initialize();
