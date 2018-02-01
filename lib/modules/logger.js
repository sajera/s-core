
"use strict";

/**
 * @interface ModuleInterface
 */
const ModuleInterface = require('../interfaces/module');

/**
 * instance of last created Logger
 */
var instance;

 /**
  * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
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
     * @description log
        Default implementation of warn method.
        Can be overidet by inheritance.
     * @public
     */
    log () {
        this.SILENCE || console.log.apply(console, arguments);
    }

    /**
     * @description log information
        Default implementation of warn method.
        Can be overidet by inheritance.
     * @public
     */
    info () {
        this.SILENCE || console.info.apply(console, arguments);
    }

    /**
     * @description
        Default implementation of warn method.
        Can be overidet by inheritance.
     * @public
     */
    warn () {
        this.SILENCE || console.warn.apply(console, arguments);
    }

    /**
     * @description
        Default implementation of error method.
        Can be overidet by inheritance.
     * @public
     */
    error () {
        this.SILENCE || console.error.apply(console, arguments);
    }

    /**
     * @description
        Default implementation of debug log method.
        Can be overidet by inheritance.
     * @public
     */
    debug () {
        this.DEBUG && this.log.apply(this, arguments);
    }

    /**
     * @description
        As module no initialization by defaults.
        Dummy. Can be overidet by inheritance.
     * @override ModuleInterface
     * @public
     */
    init () {
        // ...
    }

    /**
     * @description
        last created instance.
        depend on "create" method.
        NOTE if you override "static create" method of logger you must override "static instance" too.
     * @public
     */
    static get instance () {
        return instance;
    }

    /**
     * @description
        Create Logger instance.
        NOTE if you override "static create" method of logger you must override "static instance" too.
     * @override ModuleInterface
     * @private
     */
    static create (a,r,g,u,m,e,n,t,s) {
        // current constructor
        let Class = this;
        // instantiate
        instance = new Class(a,r,g,u,m,e,n,t,s);
        // initialize
        instance.init(a,r,g,u,m,e,n,t,s);
        //
        return instance;
    }
}

/**
 * @exports Logger
 */
module.exports = Logger;
