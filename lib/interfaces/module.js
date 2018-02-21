
/**
 * native Node.js modules
 * @ignore
 */
const EventEmitter = require('events').EventEmitter;

/**
 * @description
    Define interface of Modules within the Core.
    <br/><br/> Inheritance from node {@link https://nodejs.org/api/events.html#events_class_eventemitter|events.EventEmitter} <br/><br/>
 * @author Sajera <allsajera@gmail.com>
 * @classdesc Module Interface
 * @interface
 */
class ModuleInterface extends EventEmitter {
    /**
     * @description inheritance from node EventEmitter
     * @constructor
     */
    constructor () {
        // this
        super();
    }

    /**
     * @description
        Module initialization.
        Dummy. Should be defined.
     * @abstract
     * @public
     */
    initialize () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "initialize" method for "${this.constructor.name}"
        `);
    }

    /**
     * @description
        Creation of Module instance.
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
 * exports ModuleInterface
 */
module.exports = ModuleInterface;
