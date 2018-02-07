
/**
 * implementation ModuleInterface
 * @ignore
 */
const ModuleBase = require('./modulebase');

 /**
  * @description Implement default logger within the Core.
  * @example
  * class MyLogger extends Core.Logger {
  *  ...
  * }
  * @author Sajera <allsajera@gmail.com>
  * @implements ModuleInterface
  * @see {@link ModuleBase}
  * @classdesc Core.logger
  * @public
  * @class
  */
class Logger extends ModuleBase {
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
     * @description
        Default implementation of log method.
        Can be overidet by inheritance.
     * @public
     */
    log () {
        this.SILENCE || console.log.apply(console, arguments);
    }


    /**
     * @desc
        As module no initialization by defaults.
        Dummy. Can be overidet by inheritance.
     * @param {function} callback
     * @public
     */
    initialize ( callback ) {
        callback();
    }
}

/**
 * exports Logger
 */
module.exports = Logger;
