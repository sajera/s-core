
"use strict";

/**
 * outsource
 */
const uid = require('s-uid');

/**
 * within Core
 */
const Utilities = require('../utilities/utilities.js');

/**
 * @description define interface of Module within the Core
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @interface
 * @public
 */
class ModuleInterface extends Utilities {

    constructor () {
        // this
        super();
        //
        this.uid = uid('XXXXXXX');
    }

    /**
     * @description representation of error data in string format
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
     * @description create Module instance
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
 * Exporting Module
 */
module.exports = ModuleInterface;
