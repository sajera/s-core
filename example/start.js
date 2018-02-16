
/**
 * Core library
 */
const Core = require('../lib/core');
// custom bootstraping
Core.defineBootstrap( require('./bootstrap') );

Core.initialize();
