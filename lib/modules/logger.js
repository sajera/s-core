
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
  * @implements {ModuleInterface}
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
     * @param {*} ...arguments - any type and any count of arguments
     * @public
     */
    log () {
        // eslint-disable-next-line
        this.SILENCE || console.log.apply(console, arguments);
    }

    /**
     * @description
        Default implementation of warn method.
        Can be overidet by inheritance.
     * @param {*} ...arguments - any type and any count of arguments
     * @public
     */
    info () {
        // eslint-disable-next-line
        this.SILENCE || console.info.apply(console, arguments);
    }

    /**
     * @description
        Default implementation of warn method.
        Can be overidet by inheritance.
     * @param {*} ...arguments - any type and any count of arguments
     * @public
     */
    warn () {
        // eslint-disable-next-line
        this.SILENCE || console.warn.apply(console, arguments);
    }

    /**
     * @description
        Default implementation of error method.
        Can be overidet by inheritance.
     * @param {*} ...arguments - any type and any count of arguments
     * @public
     */
    error () {
        // eslint-disable-next-line
        this.SILENCE || console.error.apply(console, arguments);
    }

    /**
     * @description
        Default implementation of debug log method.
        Can be overidet by inheritance.
     * @param {*} ...arguments - any type and any count of arguments
     * @public
     */
    debug () {
        this.DEBUG && this.log.apply(this, arguments);
    }

    /**
     * @description
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
