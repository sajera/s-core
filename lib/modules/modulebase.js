
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
    {@link utils.setupLogger} or {@link utils.setupConfiguration}
    <br/> It is also assumed that the module needs to perform asynchronous actions to create and initialize.
    <br/><br/> Abstract class ModuleBase implements this things. <br/><br/>
 * @example
 * class MyModule extends Core.ModuleBase {
 *      ...
 * }
 * @author Sajera <allsajera@gmail.com>
 * @see {@link ModuleInterface}
 * @classdesc Core.ModuleBase
 * @implements ModuleInterface
 * @param {*} ...arguments - any type and any count of arguments to deleagete it in Module
 * @alias ModuleBase
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
     * @description
        Module initialization. Shuold be defined.
        <br/> Pleasse note the module initialization is async action.
        <br/> Able to use for async action "async" or "promise".
     * @see {@link utils.handleAsPromise} or {@link utils.handleAsAsync}
     * @param {Function} callback - done callback for async flow
     * @abstract
     * @public
     */
    initialize ( callback ) {
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
     * @example
     * class MyModule extends Core.ModuleBase {
     *      ...
     * }
     * let promise = MyModule.create({});
     * ...
     * MyModule.instance; // only example !!! do not initialize modules instead the application
     * @implements {ModuleInterface.create}
     * @public
     */
    static create ( a, r, g, u, m, e, n, t, s ) {
        let Module = this;
        Module.instance = new Module(a,r,g,u,m,e,n,t,s);
        return utils.handleAsPromise(Module.instance.initialize.bind(Module.instance));
    }
}

/**
 * exports ModuleBase
 */
module.exports = ModuleBase;
