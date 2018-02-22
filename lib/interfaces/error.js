
/**
 * @description
    Define interface of Errors within the Core.
    <br/><br/> Inheritance from native Error. <br/><br/>
 * @author Sajera <allsajera@gmail.com>
 * @classdesc Error Interface
 * @interface
 */
class ErrorInterface extends Error {
    /**
     * @description inheritance from native Error
     * @param {String} message - error message
     * @param {Object} error - previous error to build full stack of errors
     * @constructor
     */
    constructor ( message, error ) {
        // this
        super(message, error);

    }

    /**
     * @description
        Representation of error data in string format.
        Dummy. Should be defined.
     * @abstract
     * @public
     */
    toString () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "toString" method for "${this.constructor.name}"
        `);
    }

    /**
     * @description
        Representation of error data in object format.
        Dummy. Should be defined.
     * @abstract
     * @public
     */
    toJSON () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "toJSON" method for "${this.constructor.name}"
        `);
    }

    /**
     * @description
        Create Error instance.
        Dummy. Should be defined.
     * @abstract
     * @public
     */
    static create () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "static create" method for "${this.name}"
        `);
    }
}

/**
 * exports ErrorInterface
 */
module.exports = ErrorInterface;
