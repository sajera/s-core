
"use strict";

/**
 * outsource
 */
const is = require('s-is');
const uid = require('s-uid');

/**
 * @description define interface of Errors within the Core
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @interface
 * @public
 */
class ErrorInterface extends Error {

    constructor ( message, error, level ) {
        // this
        super(message, error);
        // critical level without level definition on it have maximal value
        this.level = is.number( level ) ? level : 1; // from 1 to 100 or more
        // NOTE error trace - when error was thrown
        this.date = new Date();
        // NOTE date string as id => parseInt(err.uid, 36) == err.date.valueOf();
        this.uid = uid.th(this.date);
        // from
        this.prefix = `[Processed from ${this.constructor.name}]:`;
    }

    /**
     * @description representation of error data in string format
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
     * @description representation of error data in object format
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
     * @description create Error instance
     * @abstract
     * @public
     */
    static create () {
        throw new Error(`
            Abstract interface define only dummy of method
            Please define own "static create" method for ${this.name}
        `);
    }

    /**
     * @description using current logger
     * @example
        this.logger.debug('Some', 'message');
        this.logger.log('Some', 'message');
        this.logger.info('Some', 'message');
        this.logger.warn('Some', 'message');
        this.logger.error('Some', 'message');
     * @protected
     * @public
     */
    get logger () {
        return require('../utilities/logger').instance;
    }

    /**
     * @description using istantiated config
     * @example this.config
     * @protected
     * @public
     */
    get config () {
        return require('../utilities/configuration').instance;
    }

    /**
     * @description global core event module
     * @example
        // firing
        this.coreEvent.emit(this.coreEvent.SERVER_STARTED, { ... } );
        // listen
        this.coreEvent.on(this.coreEvent.SERVER_STARTED, function () { ... } );
     * @protected
     * @public
     */
    get coreEvent () {
        return require('../utilities/coreevent').instance;
    }

}

/**
 * Exporting Module
 */
module.exports = ErrorInterface;
