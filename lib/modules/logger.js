
/**
 * implementation ModuleInterface
 * @ignore
 */
const Singleton = require('./singleton');

/**
 * utilities of library
 * @ignore
 */
const utils = require('../utilities/utilities'),
    is = utils.is,
    successLabel = utils.successLabel,
    highlightLabel = utils.highlightLabel;

/**
  * @description Implement default logger within the Core.
  * @example
  * class MyLogger extends Core.Logger {
  *  ...
  * }
  * @author Sajera <allsajera@gmail.com>
  * @implements {ModuleInterface}
  * @see {@link Singleton}
  * @classdesc Core.logger
  * @alias Logger
  * @public
  * @class
  */
class Logger extends Singleton {
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
     Can be overridden by inheritance.
     * @param {*} ...args - any type and any count of arguments
     * @public
     */
    log ( ...args ) {
        // eslint-disable-next-line
        this.SILENCE || console.log(...args);
    }

    /**
     * @description
     Default implementation of warn method.
     Can be overridden by inheritance.
     * @param {*} ...args - any type and any count of arguments
     * @public
     */
    info ( ...args ) {
        // eslint-disable-next-line
        this.SILENCE || console.info(...args);
    }

    /**
     * @description
     Default implementation of warn method.
     Can be overridden by inheritance.
     * @param {*} ...args - any type and any count of arguments
     * @public
     */
    warn ( ...args ) {
        // eslint-disable-next-line
        this.SILENCE || console.warn(...args);
    }

    /**
     * @description
     Default implementation of error method.
     Can be overridden by inheritance.
     * @param {*} ...args - any type and any count of arguments
     * @public
     */
    error ( ...args ) {
        // eslint-disable-next-line
        this.SILENCE || console.error(...args);
    }

    /**
     * @description
     Default implementation of debug log method.
     Can be overridden by inheritance.
     * @param {*} ...args - any type and any count of arguments
     * @public
     */
    debug ( ...args ) {
        // eslint-disable-next-line
        this.DEBUG && console.log(highlightLabel('DEBUG'), ...args);
    }

    /**
     * @description
     As module no initialization by defaults.
     Dummy. Can be overridden by inheritance.
     * @param {function} callback
     * @public
     */
    initialize ( callback ) {

        this.info(successLabel('Logger'), 'Logger was initialized successfully.');
        callback();
    }

    /**
     * @description
     As module no running by defaults.
     Dummy. Can be overridden by inheritance.
     * @param {function} callback
     * @public
     */
    run ( callback ) {
        // get defaults from config
        let { DEBUG, SILENCE } = this.core.module('config');
        //
        this.SILENCE = Boolean(SILENCE);
        // by default debug mode
        this.DEBUG = is.defined(DEBUG) ? Boolean(DEBUG) : true;

        if ( this.SILENCE ) {
            this.debug('The logger calmed down. Debug not. To get fully silence use { "DEBUG": false, "SILENCE": true }.');
        }

        this.info(successLabel('Logger'), 'Logger was initialized successfully.');
        callback();
    }
}

/**
 * exports Logger
 */
module.exports = Logger;
