
/**
 * native Node.js modules
 */

/**
 * instance of Core (Singlton)
 */
var instance;

/**
 * @interface ModuleInterface
 */
const ModuleInterface = require('../interfaces/module');

/**
 * own modules
 */
const Logger = require('./modules/logger');
const Configuration = require('./modules/configuration');

/**
 * @description Root output
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @public
 * @class
 */
class Core extends ModuleInterface {
    /**
     * @description Core constructor
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
     * @example Core.interface.*
     * @public
     */
    static get interface () {
        return {
            Error: require('./interfaces/error'),
            Module: require('./interfaces/module'),
            Logger: require('./utilities/logger'),
            Configuration: require('./utilities/configuration'),
        };
    }
}

/**
 * Initializing application core before export
 */
instance = new Core();

/**
 * @exports Core
 */
module.exports = Core;
