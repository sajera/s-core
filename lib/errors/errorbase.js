
/**
 * base implementation ErrorInterface
 * @ignore
 */
const ErrorInterface = require('../interfaces/error');

/**
 * core utilities
 * @ignore
 */
const utils = require('../utilities/utilities'),
    is = utils.is,
    uid = utils.uid;

/**
 * @desc
    ErrorBase has minimal implementation logic.
    <br/> Use to make your custom errors within your applications
    <br/><br/> Implementation of Error Interface. <br/><br/>
 * @author Sajera <allsajera@gmail.com>
 * @example ErrorBase.create(message, [error=null], [level=1]);
 * @param {String} message - error message
 * @param {Object} error - previous error to build full stack of errors
 * @param {Object} level - critical level of error
 * @implements {ErrorInterface}
 * @classdesc Core.ErrorBase
 * @public
 * @class
 */
class ErrorBase extends ErrorInterface {
    /**
     *
     * @param {String} message - error message
     * @param {Object} error - previous error to build full stack of errors
     * @param {Object} level - critical level of error
     * @constructor
     */
    constructor ( message, error, level ) {
        // this
        super(message, error);

        /**
         * @desc The time when error has occurred.
         * @type {Date}
         * @readonly
         * @private
         */
        this._date = new Date();

        /**
         * @desc will be generated from date
         * @example
         * let err = ErrorBase.create(message);
         * parseInt(err.uid, 36) == err.date.valueOf();
         * @type {String}
         * @readonly
         */
        this.uid = uid.th(this.date);

        /**
         * @desc will contain error constructor name
         * @example
         * let err = ErrorBase.create(message);
         * err.prefix; // => 'ErrorBase'
         * @type {String}
         * @readonly
         */
        this.processed = this.constructor.name;

        /**
         * @desc critical level of error
         * @example
         * let err = ErrorBase.create(message, null, 8);
         * err.level; // => 8
         * @type {Number}
         * @readonly
         */
        this.level = level;

    }

    /**
     * @desc Representation of error data in string format.
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
     * @desc Example result "toJSON" method of ErrorBase
     * @example ErrorBase.create(message, error, level).toJSON();
     * @typedef {Object} ErrorBase.toJSON
     * @property {String} error - error stack to string
     * @property {String} message - error message
     * @property {String} uid - unique error identifier
     * @property {String} processed - contain Error constructor name
     * @property {Number} level - Critical level of error
     */

    /**
     * @desc Representation of error data in object format.
     * @example
     * let err = ErrorBase.create(message);
     * err.toJSON();
     * @returns {ErrorBase.toJSON}
     * @public
     */
    toJSON () {
        return {
            error: this.stack.toString(),
            processed: this.processed,
            message: this.message,
            level: this.level,
            uid: this.uid
        };
    }

    /**
     * @desc Create Error instance.
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
        return new Class(message, error, level);
    }
}

/**
 * exports ErrorBase
 */
module.exports = ErrorBase;
