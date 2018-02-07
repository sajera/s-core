
/**
 * native Node.js modules
 * @ignore
 */
const EventEmitter = require('events').EventEmitter;

/**
 * @description
    Define interface of Views within the Core.

    <br/><br/>
    Inheritance from node {@link https://nodejs.org/api/events.html#events_class_eventemitter|events.EventEmitter}
    <br/>
 * @author Sajera <allsajera@gmail.com>
 * @alias View
 * @interface
 * @private
 */
class ViewInterface extends EventEmitter {
    /**
     * @description inheritance from EventEmitter
     * @constructor
     */
    constructor () {
        // this
        super();

    }

    /**
     * @description
        As module no initialization by defaults.
        Dummy. Shuold be defined.
     * @abstract
     * @public
     */
    initialize () {
        // ...
    }


    /**
     * @description
        Create View instance.
        Dummy. Shuold be defined.
     * @abstract
     * @public
     */
    static create () {
        throw new Error(`
            Interface define only dummy of method.
            Please define own "static create" method for "${this.name}"
        `);
    }
}

/**
 * @exports ViewInterface
 */
module.exports = ViewInterface;
