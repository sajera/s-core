
'use strict';

/**
 * @see {@link https://nodejs.org/api/events.html#events_class_eventemitter|EventEmitter}
 */
const EventEmitter = require('events').EventEmitter;

/**
 * @description
    Define interface of Modules within the Core.

    <br/><br/>
    Inheritance from node {@link https://nodejs.org/api/events.html#events_class_eventemitter|events.EventEmitter}
    <br/>
 * @author Sajera <allsajera@gmail.com>
 * @alias Module
 * @interface
 * @private
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
     * @description Module initialization.
     * @abstract
     * @public
     */
    initialize () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "init" method for ${this.constructor.name}
        `);
    }

    /**
     * @description Creation of Module instance.
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
 * @exports ModuleInterface
 */
module.exports = ModuleInterface;
