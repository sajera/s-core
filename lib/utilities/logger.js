
"use strict";

 /**
  * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
  * @private
  * @class
  */
class Logger {

    constructor () {
        // defaults
        this.DEBUG = true;
        this.SILENCE = false;

    }

    /**
     * @description log
     * @example ( new Logger() ).log()
     * @public
     */
    log () {
        this.SILENCE || console.log.apply(console, arguments);
    }

    /**
     * @description log information
     * @example ( new Logger() ).info()
     * @public
     */
    info () {
        this.SILENCE || console.info.apply(console, arguments);
    }

    /**
     * @description log warning
     * @example ( new Logger() ).warn()
     * @public
     */
    warn () {
        this.SILENCE || console.warn.apply(console, arguments);
    }

    /**
     * @description log error
     * @example ( new Logger() ).error()
     * @public
     */
    error () {
        this.SILENCE || console.error.apply(console, arguments);
    }

    /**
     * @description simpe log only for debug mode
     * @example ( new Logger() ).debug()
     * @public
     */
    debug () {
        this.DEBUG && this.log.apply(this, arguments);
    }

    /**
     * @example Logger.instance
     * @public
     */
    static get instance () {
        return instance;
    }

    /**
     * @description to provide ability to customize origin loger
     * @example
        class CustomLogger extends Logger {
            ...
        }
        Logger.replace( CustomConfiguration );
     * @param { Class } Logger - class inherited from a Logger
     * @public
     */
    static replace ( CustomLogger ) {
        var tmp;
        if ( typeof CustomLogger == 'function' ) {
            tmp = new CustomLogger();
        }
        if ( tmp instanceof Logger  ) {
            instance = tmp;
        }
    }

    /**
     * @description wrapped replace
     * @protected
     * @public
     */
    static init () {
        Configuration.replace( Configuration );
    }
}

/**
 * @description Initializing application logger before init
 * @private
 */
var instance = new Logger();

/**
 * @description public representation of logger module
 * @public
 */
module.exports = Logger;
