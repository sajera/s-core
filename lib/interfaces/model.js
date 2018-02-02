
"use strict";

/**
 * @see {@link https://nodejs.org/api/events.html#events_class_eventemitter|EventEmitter}
 */
const EventEmitter = require('events').EventEmitter;

/**
 * @description
    Define interface of Models within the Core.

    <br/><br/>
    Inheritance from node {@link https://nodejs.org/api/events.html#events_class_eventemitter|events.EventEmitter}
    <br/>
 * @author Sajera <allsajera@gmail.com>
 * @alias Model
 * @interface
 * @private
 */
class ModelInterface extends EventEmitter {
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
        Dummy. Can be defined.
     * @abstract
     * @public
     */
    initialize () {
        // ...
    }


    /**
     * @description
        Create Model instance.
        Dummy. Shuold be defined.
     * @abstract
     * @public
     */
    static create () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "static create" method for ${this.name}
        `);
    }
}

/**
 * @exports ModelInterface
 */
module.exports = ModelInterface;
