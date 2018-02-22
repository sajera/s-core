
/**
 * implementation ModuleInterface
 * @ignore
 */
const ModuleInterface = require('../interfaces/module');

/**
 * utilities of library
 * @ignore
 */
const utils = require('../utilities/utilities');

/**
 * @description
     <strong> Base functionality for Modules within the Core. </strong>
     <br/>
     <br/> Basically all modules within the Core inherit logic of singleton pattern.
     <br/> Except cases, when present the functionality for extend or replace of module instance.
     {@link Bootstrap#logger} or {@link Bootstrap#config}
 <br/> It is also assumed that the module needs to perform asynchronous actions to create and initialize.
 * @example
 * class MyModule extends Core.Singleton {
 *      ...
 * }
 *  ...
 * var test = new MyModule();
 * // in this case you ignore Singleton checks
 * // it may be useful for example on instanceOf checks
 * test instanceof MyModule; // => true
 * // but after module instantiation
 * var promise = MyModule.create(a,r,g,u,m,e,n,t,s);
 * var test = new MyModule(); // it thrown an error
 * @author Sajera <allsajera@gmail.com>
 * @param {*} ...args - any type and any count of arguments delegated within module creation
 * @see {@link ModuleBase}
 * @implements {ModuleInterface}
 * @classdesc Core.Singleton
 * @alias Singleton
 * @abstract
 */
class Singleton extends ModuleInterface {
    /**
     * @description inheritance from node EventEmitter
     * @constructor
     */
    constructor () {
        // this
        super();
        // implement Singleton
        if ( this.constructor.instance ) {
            throw new Error(`
                Module "${this.constructor.name}" which you trying to create - already exist.
                Please see the Singleton concept.
            `);
        }
    }

    /**
     * @description
     <strong> Creation of Module instance. </strong>
     <br/> Please note the module creation is async action.
     <br/> Able to use for async actions "async" or "promise".
     * @see {@link utils.handleAsPromise} or {@link utils.handleAsAsync}
     * @example
     * class MyModule extends Core.ModuleBase {
     *      ...
     * }
     * let promise = MyModule.create(a,r,g,u,m,e,n,t,s);
     * ...
     * MyModule.instance; // only example !!! do not initialize modules instead the application
     * @param {*} ...args - delegation of arguments within module creation
     * @returns {Promise}
     * @public
     */
    static create ( ...args ) {
        let Module = this;
        // ability to handle initialization errors
        return new Promise(function ( resolve, reject ) {
            Module.instance = new Module(...args);
            utils // do not provide ability to handle exception as the native promise
                .handleAsPromise(Module.instance.initialize.bind(Module.instance))
                .then(resolve)
                .catch(reject);
        });
    }
}

/**
 * exports Singleton
 */
module.exports = Singleton;
