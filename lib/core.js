
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
     * @see {@link Logger}
     * @description Provide logger
     * @example Core.logger
     * @readonly
     * @public
     */
    static get logger () {
        return Core.utils.logger;
    }

    /**
     * @see {@link Configuration}
     * @description Provide config
     * @example Core.config
     * @readonly
     * @public
     */
    static get config () {
        return Core.utils.config;
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
     * @see {@link ErrorBase}
     * @desc Provide functionality to make your own errors.
     * @example
     *  class MyError extends Core.ErrorBase {
     *      ...
     *  }
     * @protected
     * @readonly
     * @public
     */
    static get ErrorBase () {
        return require('./errors/errorbase');
    }

    /**
     * @see {@link ErrorSpec}
     * @desc Provide functionality to make your own errors.
     * @example
     *  class MyError extends Core.ErrorSpec {
     *      ...
     *  }
     * @protected
     * @readonly
     * @public
     */
    static get ErrorSpec () {
        return require('./errors/errorspec');
    }

    /**
     * @see {@link utils}
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

typeof window != 'undefined' && (window.Core = Core);

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
