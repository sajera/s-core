
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
 * store for error data by codes
 * @ignore
 */
let specification = {
    '0': {
        level: 10,
        status: 500,
        message: 'Default specification error of ErrorSpec. Please Make sure you use correct "id" of specification.'
    }
};

/**
 * @description
    ErrorSpec has simple usage.
    <br/> Define your errors specification and extend specification of able error list.
    <br/><br/> Implementation of Error Interface. <br/><br/>
 * @author Sajera <allsajera@gmail.com>
 * @example
 *  ErrorSpec.define('error 501', {
 *      level: 10,
 *      status: 501,
 *      message: 'something broke'
 *  });
 *  ErrorSpec.create(id [, error=null]);
 * @param {String} id - ID of error within specification
 * @param {Object} spec - all data defined as data of error from specification
 * @param {Object} error - previous error to build full stack of errors
 * @implements {ErrorInterface}
 * @classdesc Core.ErrorSpec
 * @public
 * @class
 */
class ErrorSpec extends ErrorInterface {
    /**
     * @param {String} id - ID of error within specification
     * @param {Object} spec - all data defined as data of error from specification
     * @param {Object} error - previous error to build full stack of errors
     * @constructor
     */
    constructor ( id, spec={}, error ) {
        // disassemble the specification
        let { message, level } = spec;

        // this
        super(message, error);

        /**
         * @description ID of error within specification
         * @type {String}
         * @readonly
         */
        this.id = id;

        /**
         * @description all data from your specification
         * @type {Object}
         * @readonly
         */
        this.spec = spec;

        /**
         * @description The time when error has occurred.
         * @type {Date}
         * @private
         * @readonly
         */
        this._date = new Date();

        /**
         * @description will be generated from date
         * @example
         * let err = ErrorSpec.create(id);
         * parseInt(err.uid, 36) == err.date.valueOf();
         * @type {String}
         * @readonly
         */
        this.uid = uid.th(this.date);

        /**
         * @description will contain error constructor name
         * @example
         * let err = ErrorSpec.create(id);
         * err.prefix; // => '[Processed ErrorSpec]:'
         * @type {String}
         * @readonly
         */
        this.processed = this.constructor.name;

        /**
         * @description critical level of error
         * @example
         * let err = ErrorSpec.create(id);
         * err.level;
         * @type {Number}
         * @readonly
         */
        this.level = is.number(level) ? level : 0;

    }

    /**
     * @description Representation of error data in string format.
     * @example
     * let err = ErrorSpec.create(id);
     * err.toString();
     * @returns {String}
     * @public
     */
    toString () {
        return `[Processed: "${this.constructor.name}"]: "${this.message}" | ${this.stack.toString()}`;
    }

    /**
     * @description Example result "toJSON" method of ErrorSpec
     * @example ErrorSpec.create(id).toJSON();
     * @typedef {Object} ErrorSpec.toJSON
     * @property {String} uid - unique error identifier
     * @property {String} error - error stack to string
     * @property {String} processed - contain Error constructor name
     * @property {String} id - ID of error within specification
     * @property {Number} level - Critical level of error
     * @property {*} ...spec - all properties from custom specification
     */

    /**
     * @description Representation of error data in object format.
     * @example
     * let err = ErrorSpec.create(id);
     * err.toJSON();
     * @returns {ErrorSpec.toJSON}
     * @public
     */
    toJSON () {
        let { spec, uid, processed, level, id } = this;
        let error = this.stack.toString();
        return {
            id,
            uid,
            level,
            error,
            processed,
            ...spec
        };
    }

    /**
     * @description Create Error instance.
     * @example let err = ErrorSpec.create(id, new Error());
     * @param {String} id - ID of error within specification
     * @param {Object} [error=null] - previous error
     * @returns {ErrorSpec} error instance
     * @public
     */
    static create ( id, error ) {
        error = is.object(error) ? error : null;
        id = is.string(id) ? id : '0';
        let Class = this;
        return new Class(id, specification[id], error);
    }

    /**
     * @description Define specification for Error
     * @example ErrorSpec.define('100500', { ... });
     * @param {String} id - ID of error within specification
     * @param {Object} spec - error specification
     * @public
     */
    static define ( id, spec ) {
        if (!is.string(id)) {
            throw new Error(`Expectation: "id" as a String. Got: ${id}`);
        } if (!is.object(spec)) {
            throw new Error(`Expectation: "specification" as a Object. Got: ${id}`);
        } else {
            // debug log about override
            specification[id]&&utils.logger.debug(`#### ErrorSpec(${id}) already defined !!! Overriding ...`);
            // define specification
            specification[id] = Object.assign({}, spec);
        }
    }
}

/**
 * exports ErrorSpec
 */
module.exports = ErrorSpec;
