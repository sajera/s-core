
/**
 * outsource
 * @ignore
 */
const is = require('s-is');

/**
 * native Node.js modules
 * @ignore
 */
const EventEmitter = require('events').EventEmitter;

/**
 * @description delegate common abilities within library
 * @author Sajera <allsajera@gmail.com>
 * @classdesc Core.Utilities
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
        // make own emitter
        // this.init();
    }

    /**
     * @description
        Wrap text ([CORE: ${text}]) and only for (node) console output paint it as error.
     * @param {String} text - for core error label
     * @returns {String}
     * @public
     */
    static errorLabel ( text ) {
        if (typeof window === 'undefined') {
            return `\x1B[0m\x1B[47m\x1B[31m[${text}]:\x1B[39m\x1B[49m\x1B[0m `;
        }
        return `[${text}]: `;
    }

    /**
     * @description
        Wrap text ([CORE: ${text}]) and only for (node) console output paint it as success.
     * @param {String} text - for core success label
     * @returns {String}
     * @public
     */
    static successLabel ( text ) {
        if (typeof window === 'undefined') {
            return `\x1B[0m\x1B[40m\x1B[32m[${text}]:\x1B[39m\x1B[49m\x1B[0m `;
        }
        return `[${text}]: `;
    }

    /**
     * @description
        Wrap text ([CORE: ${text}]) and only for (node) console output paint it as success.
     * @param {String} text - for core highlighted label
     * @returns {String}
     * @public
     */
    static highlightLabel ( text ) {
        if (typeof window === 'undefined') {
            return `\x1B[0m\x1B[103m\x1B[32m[${text}]:\x1B[39m\x1B[49m\x1B[0m `;
        }
        return `[${text}]: `;
    }

    /**
     * @description Method to provide ability to use for asynchronous actions "async" flow.
     * <br/> Regardless of the action thread used.
     * <br/> <strong> NOTE </strong> Context binding to an action is strongly suggested.
     * <br/> Without binding action will lose the context, as any other callback function.
     * <br/><br/> <strong> NOTE </strong> Assumes the last arguments its async callback
     * @example
     *  const handle = Core.utils.handleAsAsync;
     *  // async flow
     *  handle(action.bind(ctx),a,r,g,u,m,e,n,t,s,(error, result) => {
     *      ... // handle using async callback
     *  });
     * @alias utils.handleAsAsync
     * @see {@link https://www.npmjs.com/package/async|asinc on NPM}
     * @param {function} action - asynchronous action
     * @param {*} ...args - any type and any count of arguments to delegate it in the action
     * @param {function} callback - async callback to use async way
     * @public
     */
    static handleAsAsync ( action ) {
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
     * @param {*} ...args - any type and any count of arguments to delegate it in the action
     * @returns {Promise} - to use promise way
     * @public
     */
    static handleAsPromise ( action ) {
        let deferred = Utilities.defer();
        let args = Array.prototype.slice.call(arguments, 1);
        let possiblePromise = action.apply(null, args.concat(function ( error, result ) {
            if (deferred.status === 'pending') {
                error ? deferred.reject(error) : deferred.resolve(result);
            }
        }));
        if ( is.promise(possiblePromise) ) {
            return possiblePromise;
        } else {
            return deferred.promise;
        }
    }

    /**
     * @description Deferred object based on native promise
     * @typedef {Object} utils.defer
     * @property {String} status - status of promise ['pending'|'rejected'|'resolved']
     * @property {Promise} promise - instance of native Promise
     * @property {Function} resolve - binding to instance resolve
     * @property {Function} reject - binded to instance reject
     */

    /**
     * @description wrapper for native Promise
     * @example
     * function asyncAction () {
     *      let deferred = Core.utils.defer();
     *      setTimeout(deferred.resolve, 1000, {success: true});
     *      return deferred.promise;
     * }
     * asyncAction()
     *  .then(success => console.log('success', success))
     *  .catch(error => console.log('error', error))
     * @returns {utils.defer}
     * @public
     */
    static defer () {
        let resolve, reject, deferred;
        const promise = new Promise(function ( res, rej ) {
            resolve = res;
            reject = rej;
        });
        return deferred = {
            promise,
            status: 'pending',
            /**
             * @param {*} error - exception data
             * @ignore
             */
            reject: function ( error ) {
                deferred.status === 'pending'&&(deferred.status = 'rejected');
                reject(error);
            },
            /**
             * @param {*} success - successful results
             * @ignore
             */
            resolve: function ( success ) {
                deferred.status === 'pending'&&(deferred.status = 'resolved');
                resolve(success);
            }
        };
    }

    /**
     * outsource <strong> "s-is" </strong>
     * @see {@link https://www.npmjs.com/package/s-is|s-is on NPM}
     * @public
     */
    static get is () {
        return require('s-is');
    }

    /**
     * outsource <strong> "s-uid" </strong>
     * @see {@link https://www.npmjs.com/package/s-uid|s-uid on NPM}
     * @public
     */
    static get uid () {
        return require('s-uid');
    }

    /**
     * Provide access to HttpPoint
     * @see {@link HttpPoint}
     * @public
     */
    static get HttpPoint () {
        return require('./httppoint');
    }

    /**
     * Provide access to HttpParams
     * @see {@link HttpParams}
     * @public
     */
    static get HttpParams () {
        return require('./httpparams');
    }
}

/**
 * export instance of utils
 */
module.exports = Utilities;
