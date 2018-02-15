
/**
 * outsource
 * @ignore
 */
const is = require('s-is');
const uid = require('s-uid');

/**
 * supportin modules of library
 * @ignore
 */
const HttpParams = require('./httpparams');
const HttpPoint = require('./httppoint');

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
    }

    /**
     * @description Method to provide ability to use for asynchronous actions "async" flow.
     * <br/> Regardless of the action thread used.
     * <br/> <strong> NOTE </strong> Context binding to an action is strongly suggested.
     * <br/> Without binding action will lose the context, as any other callback function.
     * <br/><br/> <strong> NOTE </strong> We asume the last arguments its async callback
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
        }));
        if ( is.promise(possiblePromise) ) {
            return possiblePromise;
        } else {
            return deferred.promise;
        }
    }

    /**
     * @description Deffered object based on native promise
     * @typedef {Object} utils.defer
     * @property {String} status - status of promise ['pending'|'rejected'|'resolved']
     * @property {Promise} promise - instance of native Promise
     * @property {Function} resolve - binded to instance resolve
     * @property {Function} reject - binded to instance reject
     */

    /**
     * @description wrapper for native Promise
     * @example
     * function asyncAction () {
     *      let deffered = Core.utils.defer();
     *      setTimeout(deffered.resolve, 1000, {success: true});
     *      return deffered.promise;
     * }
     * asyncAction()
     *  .then(success => console.log('success', success))
     *  .catch(error => console.log('error', error))
     * @returns {utils.defer}
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
            /**
             * @param {*} error - exception data
             * @ignore
             */
            reject: function ( error ) {
                deffered.status == 'pending'&&(deffered.status = 'rejected');
                reject(error);
            },
            /**
             * @param {*} success - succesuful results
             * @ignore
             */
            resolve: function ( success ) {
                deffered.status == 'pending'&&(deffered.status = 'resolved');
                resolve(success);
            }
        };
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

    /**
     * Provide access to HttpPoint
     * @see {@link HttpPoint}
     * @public
     */
    get HttpPoint () {
        return HttpPoint;
    }

    /**
     * Provide access to HttpParams
     * @see {@link HttpParams}
     * @public
     */
    get HttpParams () {
        return HttpParams;
    }
}

/**
 * export instance of utils
 */
module.exports = utils = new Utilities();
