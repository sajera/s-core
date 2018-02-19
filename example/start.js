
/**
 * Core library
 */
const Core = require('./core');
// custom bootstraping
Core.defineBootstrap( require('./bootstrap') );

Core.initialize();
