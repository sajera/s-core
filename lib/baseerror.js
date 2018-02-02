
'use strict';

/**
 * base implementation ErrorInterface
 */
const ErrorInterface = require('./interfaces/error');

/**
* outsource
*/
const uid = require('s-uid');
const is = require('s-is');

/**
 * @description
    BaseError has minimal implementation logic.
    Use to make oyur custom errors within your applications
    <br/><br/>
    Base implementation of Error Interface.
    <br/><br/>
 * @author Sajera <allsajera@gmail.com>
 * @implements Error
 * @public
 * @class
 */
class BaseError extends ErrorInterface {
    /**
     * @description BaseError inheritance from native error
     * @prop {string} message - error mesaage
     * @prop {object} error - previous error to build full stack of errors
     * @constructor
     */
    constructor ( message, error ) {
        // this
        super(message, error);

        /**
         * @description The time when error has occurred.
         * @example new Date();
         * @type {Date}
         * @private
         */
        this.date = new Date();

        /**
         * @description uid wich will be generated from date
         * @example
         * let err = BaseError.create(message, null);
         * parseInt(err.uid, 36) == err.date.valueOf();
         * @type {String}
         * @private
         */
        this.uid = uid.th(this.date);

        /**
         * @description Prefix which will contain error constructor name
         * @example
         * let err = BaseError.create(message, null);
         * err.prefix; // => '[Processed BaseError]:'
         * @type {String}
         * @private
         */
        this.prefix = `[Processed ${this.constructor.name}]:`;
    }

    /**
     * @description Representation of error data in string format.
     * @example
     * let err = BaseError.create(message, null);
     * err.toString();
     * @returns {String}
     * @public
     */
    toString () {
        throw new Error(`
            Abstract interface only dummy of method
            Please define own "toString" method for ${this.constructor.name}
        `);
    }

    /**
     * @description Representation of error data in object format.
     * @example
     * let err = BaseError.create(message, null);
     * err.toJSON();
     * @returns {Object} error instance
     * @public
     */
    toJSON () {
        throw new Error(`
            Abstract interface define only dummy of method
            Please define own "toJSON" method for ${this.constructor.name}
        `);
    }

    /**
     * @description Create Error instance.
     * @example let err = BaseError.create(message, error);
     * @param {String} message - error message
     * @param {Object} [error=null] - previous error
     * @returns {BaseError} error instance
     * @public
     */
    static create ( message, error ) {
        error = is.object(error) ? error : null;
        let Class = this;
        let result = new Class(message, error);
        return result;
    }
}

/**
 * @exports BaseError
 */
module.exports = BaseError;
