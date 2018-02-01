
'use strict';

/**
 * outsource
 */
const uid = require('s-uid');

/**
 * @description define interface of errors within the Core
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @interface
 * @public
 */
class ErrorInterface extends Error {
    /**
     * @description inheritance from native error
     * @prop {string} message - error mesaage
     * @prop {object} error - previous error to build full stack of errors
     * @constructor
     */
    constructor ( message, error ) {
        // this
        super(message, error);
        // NOTE error trace - when error was thrown
        this.date = new Date();
        // NOTE date string as id => parseInt(err.uid, 36) == err.date.valueOf();
        this.uid = uid.th(this.date);
        // from
        this.prefix = `[Processed ${this.constructor.name}]:`;
    }

    /**
     * @description
        Representation of error data in string format
        It method must be defined for errors
     * @abstract
     * @public
     */
    toString () {
        throw new Error(`
            Abstract interface define only dummy of method
            Please define own "toString" method for ${this.constructor.name}
        `);
    }

    /**
     * @description
        Representation of error data in object format
        It method must be defined for errors
     * @abstract
     * @public
     */
    toJSON () {
        throw new Error(`
            Abstract interface define only dummy of method
            Please define own "toJSON" method for ${this.constructor.name}
        `);
    }

    /**
     * @description
        create Error instance.
        It method must be defined for errors
     * @abstract
     * @public
     */
    static create () {
        throw new Error(`
            Abstract interface define only dummy of method
            Please define own "static create" method for ${this.name}
        `);
    }
}

/**
 * @exports ErrorInterface
 */
module.exports = ErrorInterface;
