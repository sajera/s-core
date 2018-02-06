
'use strict';

/**
 * implementation ModuleInterface
 * @ignore
 */
const ModuleInterface = require('../interfaces/module');

/**
 * @see {@link ModuleInterface}
 * @description
    <strong> Base functionality for Modules within the Core. </strong>
    <br/>
    Basically all modules within the Core inherit logic of singleton pattern.
    Except cases, when in module, present the functionality for extend or replace of module instance.
    <br/>
    It is also assumed that the module needs to perform asynchronous actions to create and initialize.
    <br/><br/>
    Abstract class ModuleBase implements this things.
    <br/><br/>
 * @author Sajera <allsajera@gmail.com>
 * @classdesc Core.ModuleBase
 * @implements ModuleInterface
 * @abstract
 */
class ModuleBase extends ModuleInterface {
    /**
     * @description inheritance from node EventEmitter
     * @constructor
     */
    constructor () {
        // this
        super();
        // implement Singlton
        if ( this.constructor.instance ) {
            throw new Error(`
                Module which you trying to create - already exist.
                Please see the Singleton concept for ${this.constructor.name}
            `);
        }
    }

    /**
     * @description Module initialization.
     * @abstract
     * @public
     */
    initialize () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "initialize" method for ${this.constructor.name}
        `);
    }

    /**
     * @description
        <strong> Creation of Module instance. </strong>
        <br/> Pleasse note the module cration is async action.
        <br/> Able to use for async action "async" or "promise".
     * @see {@link utils.handleAsPromise} or {@link utils.handleAsAsync}
     * @override
     * @public
     */
    static create () {
        this.instance
    }
}

/**
 * exports ModuleBase
 */
module.exports = ModuleBase;
