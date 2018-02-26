
/**
 * Core library
 */
const Core = require('../core');

/**
 * Customization Logger example
 *
 *
 */
class Logger extends Core.Logger {
    /**
     * @constructor
     */
    constructor () {
        // this
        super();
        // defaults
        this.DEBUG = true;
        this.SILENCE = false;
    }

    /**
     * @param {Function} done
     */
    // initialize ( done ) {
    //     console.log('Logger.initialize');
    //     done();
    // }
}


/**
 * exports Logger
 */
module.exports = Logger;
