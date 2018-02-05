
"use strict";

/**
 * implementation ModuleInterface
 * @ignore
 */
const ModuleInterface = require('../interfaces/module');

/**
 * instance of last created Logger
 * @ignore
 */
var instance;

 /**
  * @see {@link ModuleInterface}
  * @author Sajera <allsajera@gmail.com>
  * @classdesc Core.logger || Core.utils.logger
  * @implements ModuleInterface
  * @public
  * @class
  */
class Logger extends ModuleInterface {
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
     * @override
     * @public
     */
    initialize () {
        // ...
    }

    /**
     * @desc
        last created instance.
        depend on "create" method.
        NOTE if you override "static create" method of logger you must override "static instance" too.
     * @public
     */
    static get instance () {
        return instance;
    }

    /**
     * @desc
        Create Logger instance.
        NOTE if you override "static create" method of logger you must override "static instance" too.
     * @override
     * @private
     */
    static create (a,r,g,u,m,e,n,t,s) {
        // current constructor
        let Class = this;
        // instantiate
        instance = new Class(a,r,g,u,m,e,n,t,s);
        // initialize
        instance.initialize(a,r,g,u,m,e,n,t,s);
        //
        return instance;
    }
}

/**
 * exports Logger
 */
module.exports = Logger;
