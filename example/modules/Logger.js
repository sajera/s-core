
/**
 * Core library
 */
const Core = require('../core');

class Logger extends Core.Logger {
    constructor () {
        // this
        super();
        // defaults
        this.DEBUG = true;
        this.SILENCE = false;
    }

    initialize ( callback ) {
        console.log('Logger.initialize');
        callback();
    }
}


/**
 * exports Logger
 */
module.exports = Logger;
