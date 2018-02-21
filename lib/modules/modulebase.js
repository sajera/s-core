
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
    <br/> Assumed that the module needs to perform asynchronous actions to create and initialize.
 * @example
 * class MyModule extends Core.ModuleBase {
 *      ...
 * }
 * @author Sajera <allsajera@gmail.com>
 * @param {*} ...args - any type and any count of arguments delegated within module creation
 * @implements {ModuleInterface}
 * @classdesc Core.ModuleBase
 * @see {@link Singleton}
 * @alias ModuleBase
 * @abstract
 */
class ModuleBase extends ModuleInterface {
    /**

     * @constructor
     */
    constructor () {
        // this
        super();

    }

    /**
     * @description
        <strong> Creation of Module instance. </strong>
        <br/> Please note the module creation is async action.
        <br/> Able to use for async action "async" or "promise".
     * @see {@link utils.handleAsPromise} or {@link utils.handleAsAsync}
     * @example
     * class MyModule extends Core.ModuleBase {
     *      ...
     * }
     * let promise = MyModule.create(a,r,g,u,m,e,n,t,s);
     * @param {*} ...args - delegation of arguments within module creation
     * @returns {Promise}
     * @public
     */
    static create ( ...args ) {
        let Module = this;
        // ability to handle initialization errors
        return new Promise(function ( resolve, reject ) {
            let instance = new Module(...args);
            utils // do not provide ability to handle exception as the native promise
                .handleAsPromise(instance.initialize.bind(instance), ...args)
                .then(resolve)
                .catch(reject);
        });
    }

}

/**
 * exports ModuleBase
 */
module.exports = ModuleBase;
