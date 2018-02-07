
/**
 * implementation ModuleInterface
 * @ignore
 */
const ModuleBase = require('./modulebase');

/**
 * default module Logger
 * @ignore
 */
const Logger = require('./logger');

/**
 * default module Configuration
 * @ignore
 */
const Configuration = require('./configuration');

/**
 * utilities of library
 * @ignore
 */
const utils = require('../utilities/utilities')
    ,handle = utils.handleAsPromise
    ,is = utils.is;

/**
 * @description
    Bootstrap application. Provide ability to customize bootstrapping.
    <br/><br/> Bootstraping
    <br/> 1. extend Core modules
    <br/> 2. Setup Core modules
    <br/> 3. Setup other modules
    <br/><br/>
 * @example
 * class MyBootstrap extends Core.Bootstrap {
 *  ...
 * }
 * Core.setupBootstrap(MyBootstrap);
 * Core.initialize();
 * @author Sajera <allsajera@gmail.com>
 * @implements ModuleInterface
 * @classdesc Core.Bootstrap
 * @see {@link ModuleBase}
 * @public
 * @class
 */
class Bootstrap extends ModuleBase {
    /**
     * @constructor
     */
    constructor () {
        // this
        super();
        /**
         * @description To correct access to Core.instance we must wait until Core will bi created
         * @type {Core}
         * @readonly
         * @private
         */
        this.core = require('../core').instance;

    }

    /**
     * @description ablility to replace default logger
     * @example
     * class MyLogger extends Core.Logger {
     *  ...
     * }
     * ...
     * class MyBootstrap extends Core.Bootstrap {
     *  constructor () {
     *      super();
     *      this.logger = MyLogger;
     *  }
     * }
     * @see {@link Logger}
     * @type {Logger}
     * @public
     */
    set logger ( CustomLogger ) {
        if (
            is.function(CustomLogger)
            && (new CustomLogger()) instanceof Logger
        ) {
            // store current logger module
            this.CurrentLogger = CustomLogger;
        } else {
            this.logger.error(`
                Unsuccessful attempt to replace the logger was detected.
                Should be:
                class ${CustomLogger.name} extends Core.Logger {
                    ...
                }
            `);
        }
    }

    /**
     * @description ablility to replace default config
     * @example
     * class MyConfiguration extends Core.Configuration {
     *  ...
     * }
     * ...
     * class MyBootstrap extends Core.Bootstrap {
     *  constructor () {
     *      super();
     *      this.config = MyConfiguration;
     *  }
     * }
     * @see {@link Configuration}
     * @type {Configuration}
     * @public
     */
    set config ( CustomConfiguration ) {
        if (
            is.function(CustomConfiguration)
            && (new CustomConfiguration('instanceOf')) instanceof Configuration
        ) {
            // store current Configuration module
            this.CurrentConfiguration = CustomConfiguration;
        } else {
            this.logger.error(`
                Unsuccessful attempt to replace the logger was detected.
                Should be:
                class ${CustomConfiguration.name} extends Core.Configuration {
                    ...
                }
            `);
        }
    }

    /**
     * @description
        Bootstrap module has async initialization.
        This flow has important things.
        And it can't be overridden.
        <br/><br/> Bootstrap initialization
        <br/> 1. Setup Logger
        <br/> 2. Setup Configuration
        <br/> 3.
        <br/> 4.
        <br/> 5.
        <br/> 6.
        <br/> 7.
        <br/> 8.
        <br/><br/>
     * @private
     */
    initialize () {
        let _Logger = this.CurrentLogger || Logger;
        let _Configuration = this.CurrentConfiguration || Configuration;
        return Promise.all([
            handle(_Logger.create.bind(_Logger)),
            handle(_Configuration.create.bind(_Configuration)),
        ])
    }

}

/**
 * exports
 */
module.exports = Bootstrap;
