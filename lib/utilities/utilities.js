
'use strict';

/**
 * outsource
 * @ignore
 */
 const is = require('s-is');
 const uid = require('s-uid');

/**
 * native Node.js modules
 * @ignore
 */
const EventEmitter = require('events').EventEmitter;

/**
 * instance of utils to use inside this file
 * @ignore
 */
var utils;

/**
 * core utilities
 * @ignore
 */
const Logger = require('./logger');
const Configuration = require('./logger');

/**
 * @description delegate common abilities within library
 * @author Sajera <allsajera@gmail.com>
 * @classdesc Core.utils
 * @alias utils
 * @class
 */
class Utilities extends EventEmitter {
    /**
     * @description
        Inheritance from native EventEmitter.
        Implement common event bus.
     * @constructor
     */
    constructor () {
        // this
        super();
        // store current logger module
        this.CurrentLogger = Logger;
        // initialize Logger
        this.CurrentLogger.create();
        // store current Configuration module
        this.CurrentConfiguration = Configuration;
        // initialize Configuration
        this.CurrentConfiguration.create();
    }

    /**
     * @description Method to provide ability to use for asynchronous actions "async" flow.
     * <br/> Regardless of the action thread used.
     * <br/> <strong> NOTE </strong> Context binding to an action is strongly suggested.
     * <br/> Without binding action will lose the context, as any other callback function.
     * <br/><br/> <strong> NOTE </strong> We asume the lasr arguments its async callback
     * @example
     *  const handle = Core.utils.handleAsAsync;
     *  // async flow
     *  handle(action.bind(ctx),a,r,g,u,m,e,n,t,s,(error, result) => {
     *      ... // handle using async cllback
     *  });
     * @alias utils.handleAsAsync
     * @see {@link https://www.npmjs.com/package/async|asinc on NPM}
     * @param {function} action - asynchronous action
     * @param {*} ...arguments - any type and any count of arguments to deleagete it in action
     * @param {function} callback - async callback to use async way
     * @public
     */
    handleAsAsync ( action ) {
        let callback = arguments[arguments.length-1];
        let possiblePromise = action.apply(null, Array.prototype.slice.call(arguments, 1) );
        if ( is.promise(possiblePromise) ) {
            possiblePromise
                .then( callback.bind(null, null) )
                .catch( callback.bind(null) );
        }
    }

    /**
     * @description Method to provide ability to use for asynchronous actions "promise" flow.
     * <br/> Regardless of the action thread used.
     * <br/> <strong> NOTE </strong> Context binding to an action is strongly suggested.
     * <br/> Without binding action will lose the context, as any other callback function.
     * @example
     *  const handle = Core.utils.handleAsPromise;
     *  // promise flow
     *  let promise = handle(action.bind(ctx),a,r,g,u,m,e,n,t,s);
     *  promise.then(success => console.log('success', success));
     *  promise.catch(error => console.log('error', error));
     * @alias utils.handleAsPromise
     * @see {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise|native Promise}
     * @param {function} action - asynchronous action
     * @param {*} ...arguments - any type and any count of arguments to deleagete it in action
     * @returns {Promise} - to use promise way
     * @public
     */
    handleAsPromise ( action ) {
        let deferred = utils.defer();
        let args = Array.prototype.slice.call(arguments, 1);
        let possiblePromise = action.apply(null, args.concat(function ( error, result ) {
            if (deferred.status == 'pending') {
                error ? deferred.reject(error) : deferred.resolve(result);
            }
        }))
        if ( is.promise(possiblePromise) ) {
            return possiblePromise;
        } else {
            return deferred.promise;
        }
    }

    /**
     * @description Deffered object based on nativepromise
     * @example
     * function asyncAction () {
     *      let deffered = Core.utils.defer();
     *      setTimeout(deffered.resolve, 1000, {success: true});
     *      return deffered.promise;
     * }
     * asyncAction().then(success => console.log('success', success))
     * @typedef {Object} Deferred
     * @property {String} status - status of promise ['pending'|'rejected'|'resolved']
     * @property {Promise} promise - instance of native Promise
     * @property {Function} resolve - binded to instance resolve
     * @property {Function} reject - binded to instance reject
     */

    /**
     * @description wrapper for native Promise
     * @example
     * let utils = Core.utils;
     * function asyncAction () {
     *      let deffered = utils.defer();
     *      setTimeout(deffered.resolve, 1000, {success: true});
     *      return deffered.promise;
     * }
     * asyncAction().then(success => console.log('success', success))
     * @param {Object}
     * @returns {Deferred}
     * @public
     */
    defer () {
        var resolve, reject, deffered;
        const promise = new Promise(function ( res, rej ) {
            resolve = res;
            reject = rej;
        });
        return deffered = {
            promise,
            status: 'pending',
            reject: function ( error ) {
                deffered.status = 'rejected';
                reject(error);
            },
            resolve: function ( success ) {
                deffered.status = 'resolved';
                resolve(success);
            }
        }
    }

    /**
     * Method to provide ability replace configuration within the Core.
     * <br/> <strong> NOTE </strong> Make sure to be before initialize the Core.
     * @example
     *  class MyConfiguration extends Core.utils.Configuration {
     *      ...
     *  }
     *  Core.utils.setupConfiguration(MyConfiguration);
     * @see {@link Configuration}
     * @alias utils.setupConfiguration
     * @param {Configuration}
     * @public
     */
    setupConfiguration ( CustomConfiguration ) {
        if (
            is.function(CustomConfiguration)
            && (new CustomConfiguration('instanceOf')) instanceof Configuration
        ) {
            // store current Configuration module
            this.CurrentConfiguration = CustomConfiguration;
            // initialize Configuration
            this.CurrentConfiguration.create();
        } else {
            this.logger.error(`
                Unsuccessful attempt to replace the logger was detected.
                Should be:
                class ${CustomConfiguration.name} extends Core.utils.Configuration {
                    ...
                }
            `);
        }
    }

    /**
     * Common Configuration
     * @example
     *  class MyConfiguration extends Core.utils.Configuration {
     *      ...
     *  }
     *  Core.utils.setupConfiguration(MyConfiguration);
     * @see {@link Configuration}
     * @public
     */
    get Configuration () {
        return Configuration;
    }

    /**
     * Initiated configuration. <br/>
     * <strong> NOTE </strong> Before initialization of the Core it contain only default data
     * @example
     *  Core.utils.config;
     *  Core.config; // alias to Core.utils.config
     * @public
     */
    get config () {
        return this.CurrentConfiguration.instance;
    }

    /**
     * Method to provide ability replace logger within the Core.
     * @example
     *  class MyLogger extends Core.utils.Logger {
     *      ...
     *  }
     *  Core.utils.setupLogger(MyLogger)
     * @see {@link Logger}
     * @alias utils.setupLogger
     * @param {Logger}
     * @public
     */
    setupLogger ( CustomLogger ) {
        if (
            is.function(CustomLogger)
            && (new CustomLogger('instanceOf')) instanceof Logger
        ) {
            // store current logger module
            this.CurrentLogger = CustomLogger;
            // initialize Logger
            this.CurrentLogger.create();
        } else {
            this.logger.error(`
                Unsuccessful attempt to replace the logger was detected.
                Should be:
                class ${CustomLogger.name} extends Core.utils.Logger {
                    ...
                }
            `);
        }
    }

    /**
     * Logger class to provide ability replace logger within the Core.
     * @example
     *  class MyLogger extends Core.utils.Logger {
     *      ...
     *  }
     *  Core.utils.setupLogger(MyLogger)
     * @see {@link Logger}
     * @public
     */
    get Logger () {
        return Logger;
    }

    /**
     * Common current logger within the Core
     * @example
     *  Core.utils.logger;
     *  Core.logger; // alias to Core.utils.logger
     * @public
     */
    get logger () {
        return this.CurrentLogger.instance;
    }

    /**
     * outsource <strong> "s-is" </strong>
     * @see {@link https://www.npmjs.com/package/s-is|s-is on NPM}
     * @public
     */
    get is () {
        return is;
    }

    /**
     * outsource <strong> "s-uid" </strong>
     * @see {@link https://www.npmjs.com/package/s-uid|s-uid on NPM}
     * @public
     */
    get uid () {
        return uid;
    }

}

/**
 * export instance of utils
 */
module.exports = utils = new Utilities();
