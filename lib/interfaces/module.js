
'use strict';

/**
 * native Node.js modules
 */
const EventEmitter = require('events').EventEmitter;

/**
 * outsource
 */
const uid = require('s-uid');

/**
 * @description define interface of modules within the Core
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @interface
 * @public
 */
class ModuleInterface extends EventEmitter {
    /**
     * @description inheritance from native EventEmitter
     * @constructor
     */
    constructor () {
        // this
        super();
        // generate unique identifer
        this.uid = uid('XXXXXXX');
        // final constructor name
        this._name = this.constructor.name;
    }

    /**
     * @description
        Module should be initialized.
        It method must be defined for modules.
     * @abstract
     * @public
     */
    init () {
        throw new Error(`
            Abstract interface define only dummy of method
            Please define own "init" method for ${this.constructor.name}
        `);
    }

    /**
     * @description
        create Module instance.
        It method must be defined for modules
     * @abstract
     * @override from Utilities.create
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
 * @exports ModuleInterface
 */
module.exports = ModuleInterface;
