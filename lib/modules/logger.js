
/**
 * implementation ModuleInterface
 * @ignore
 */
const ModuleBase = require('./modulebase');

/**
 * utilities of library
 * @ignore
 */
const utils = require('../utilities/utilities')
    , highlightLabel = utils.highlightLabel;

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
    log ( ...args ) {
        // eslint-disable-next-line
        this.SILENCE || console.log(...args);
    }

    /**
     * @description
        Default implementation of warn method.
        Can be overidet by inheritance.
     * @param {*} ...arguments - any type and any count of arguments
     * @public
     */
    info ( ...args ) {
        // eslint-disable-next-line
        this.SILENCE || console.info(...args);
    }

    /**
     * @description
        Default implementation of warn method.
        Can be overidet by inheritance.
     * @param {*} ...arguments - any type and any count of arguments
     * @public
     */
    warn ( ...args ) {
        // eslint-disable-next-line
        this.SILENCE || console.warn(...args);
    }

    /**
     * @description
        Default implementation of error method.
        Can be overidet by inheritance.
     * @param {*} ...arguments - any type and any count of arguments
     * @public
     */
    error ( ...args ) {
        // eslint-disable-next-line
        this.SILENCE || console.error(...args);
    }

    /**
     * @description
        Default implementation of debug log method.
        Can be overidet by inheritance.
     * @param {*} ...arguments - any type and any count of arguments
     * @public
     */
    debug ( ...args ) {
        this.DEBUG && console.log(highlightLabel('DEBUG'), ...args);
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
