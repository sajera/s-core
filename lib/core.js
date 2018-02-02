
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
 const ModuleInterface = require('./interfaces/module');

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
        // store current logger module
        this.CurrentLogger = Logger;
        // initialize Logger
        this.CurrentLogger.create();
        // store current Configuration module
        this.CurrentConfiguration = Configuration;
        // initialize Configuration
        this.CurrentConfiguration.create();
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
     * @description Provide abilities inherit Core interfaces
     * @example
        class CustomError extends Core.interface.Error {
            ...
        }
     * @protected
     * @public
     */
    static get interface () {
        return {
            Logger: Logger,
            Module: ModuleInterface,
            Configuration: Configuration,
            Error: require('./interfaces/error'),
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
