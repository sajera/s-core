
'use strict';

/**
 * base implementation ErrorInterface
 * @ignore
 */
const ErrorInterface = require('../interfaces/error');

/**
 * outsource
 * @ignore
 */
const uid = require('s-uid');
const is = require('s-is');

/**
 * @description
    ErrorBase has minimal implementation logic.
    <br/> Use to make oyur custom errors within your applications
    <br/><br/> Implementation of Error Interface. <br/><br/>
 * @author Sajera <allsajera@gmail.com>
 * @example ErrorBase.create(message, [error=null], [level=1]);
 * @prop {string} message - error mesaage
 * @prop {object} error - previous error to build full stack of errors
 * @prop {object} level - critical level of error
 * @classdesc Base Error implementation within core
 * @implements Error
 * @public
 * @class
 */
class ErrorBase extends ErrorInterface {
    /**
     * @constructor
     */
    constructor ( message, error, level ) {
        // this
        super(message, error);

        /**
         * @description The time when error has occurred.
         * @type {Date}
         * @readonly
         * @private
         */
        this._date = new Date();

        /**
         * @description will be generated from date
         * @example
         * let err = ErrorBase.create(message);
         * parseInt(err.uid, 36) == err.date.valueOf();
         * @type {String}
         * @readonly
         */
        this.uid = uid.th(this.date);

        /**
         * @description will contain error constructor name
         * @example
         * let err = ErrorBase.create(message);
         * err.prefix; // => 'ErrorBase'
         * @type {String}
         * @readonly
         */
        this.processed = this.constructor.name;

        /**
         * @description critical level of error
         * @example
         * let err = ErrorBase.create(message, null, 8);
         * err.level; // => 8
         * @type {Number}
         * @readonly
         */
        this.level = level;

    }

    /**
     * @description Representation of error data in string format.
     * @example
     * let err = ErrorBase.create(message);
     * err.toString();
     * @returns {String}
     * @public
     */
    toString () {
        return `[Processed ${this.constructor.name}]: ` + this.message + this.stack.toString();
    }

    /**
     * @description Example result "toJSON" method of ErrorBase
     * @example ErrorBase.create(message, error, level).toJSON();
     * @typedef {Object} ErrorBaseJSON
     * @property {String} error - error stack to string
     * @property {String} message - error message
     * @property {String} uid - unique error identifer
     * @property {String} processed - contain Error constructor name
     * @property {Number} level - Critical level of error
     */

    /**
     * @description Representation of error data in object format.
     * @example
     * let err = ErrorBase.create(message);
     * err.toJSON();
     * @returns {ErrorBaseJSON}
     * @public
     */
    toJSON () {
        return {
            error: this.stack.toString(),
            processed: this.processed,
            message: this.message,
            level: this.level,
            uid: this.uid,
        };
    }

    /**
     * @description Create Error instance.
     * @example let err = ErrorBase.create(message, error, 2);
     * @param {String} message - error message
     * @param {Object} [error=null] - previous error
     * @param {Number} [level=1] - critical level of error
     * @returns {ErrorBase} error instance
     * @public
     */
    static create ( message, error, level ) {
        error = is.object(error) ? error : null;
        level = is.number(level) ? level : 1;
        let Class = this;
        let result = new Class(message, error, level);
        return result;
    }
}

/**
 * exports ErrorBase
 */
module.exports = ErrorBase;
