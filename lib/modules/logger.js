
/**
 * implementation ModuleInterface
 * @ignore
 */
const ModuleBase = require('./modulebase');

 /**
  * @desc Implement default logger within the Core.
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
     * @desc
        Default implementation of log method.
        Can be overidet by inheritance.
     * @public
     */
    log () {
        this.SILENCE || console.log.apply(console, arguments);
    }

    /**
     * @desc
        Default implementation of warn method.
        Can be overidet by inheritance.
     * @public
     */
    info () {
        this.SILENCE || console.info.apply(console, arguments);
    }

    /**
     * @desc
        Default implementation of warn method.
        Can be overidet by inheritance.
     * @public
     */
    warn () {
        this.SILENCE || console.warn.apply(console, arguments);
    }

    /**
     * @desc
        Default implementation of error method.
        Can be overidet by inheritance.
     * @public
     */
    error () {
        this.SILENCE || console.error.apply(console, arguments);
    }

    /**
     * @desc
        Default implementation of debug log method.
        Can be overidet by inheritance.
     * @public
     */
    debug () {
        this.DEBUG && this.log.apply(this, arguments);
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
