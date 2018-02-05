
/**
 * native Node.js modules
 */

/**
 * instance of Core (Singlton)
 * @ignore
 */
var instance;

/**
 * implementation ModuleInterface using abstract class ModuleBase
 * @ignore
 */
const ModuleBase = require('./modules/modulebase');

/**
 * @description
    Root class of library. Provide all library functionality.
    <br/><br/> Core <br/><br/>
 * @example const Core = require('s-core');
 * @author Sajera <allsajera@gmail.com>
 * @classdesc Core - root output
 * @implements ModuleInterface
 * @see {@link ModuleBase}
 * @public
 * @class
 */
class Core extends ModuleBase {
    /**
     * @description Core constructor
     * @constructor
     */
    constructor () {
        // this
        super();

    }

    /**
     * @description
        prevent abilities create new Core (inherit from Utilities)
        // TODO it can be used
     * @override
     * @public
     */
    static create () {
        return instance;
    }

    /**
     * @description Provide logger
     * @example Core.logger
     * @alias CurrentLogger.instance
     * @public
     */
    static get logger () {
        return instance.CurrentLogger.instance;
    }

    /**
     * @description Provide config
     * @example Core.config
     * @alias CurrentConfiguration.instance
     * @public
     */
    static get config () {
        return instance.CurrentConfiguration.instance;
    }

    /**
     * @see {@link ModuleBase}
     * @desc Provide functionality to make your own modules.
     * @example
     *  class MyModule extends Core.ModuleBase {
     *      ...
     *  }
     * @protected
     * @readonly
     * @public
     */
    static get ModuleBase () {
        return ModuleBase;
    }

    /**
     * @see {@link ModuleBase}
     * @desc Provide utilities of Core.
     * @example Core.utils
     * @protected
     * @readonly
     * @public
     */
    static get utils () {
        return require('./utilities/utilities');
    }

}

/**
 * Initializing application core before export
 * @ignore
 */
instance = new Core();

/**
 * @exports Core
 * @description
    Root class of library. Provide all library functionality.
    <br/><br/> Core <br/><br/>
 * @classdesc Core - root output
 * @implements ModuleInterface
 * @see {@link ModuleBase}
 * @see {@link Core}
 */
module.exports = Core;
