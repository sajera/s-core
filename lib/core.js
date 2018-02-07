
/**
 * initialization of application using bootstrap module
 * @ignore
 */
 const Bootstrap = require('./modules/bootstrap');

/**
 * implementation ModuleInterface using abstract class ModuleBase
 * @ignore
 */
const ModuleBase = require('./modules/modulebase');

/**
 * utilities of library
 * @ignore
 */
const utils = require('./utilities/utilities')
    , is = utils.is
    , handle = utils.handleAsPromise;

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
        /**
         * default Bootstrap module
         * @ignore
         */
        this.CurrentBootstrap = Bootstrap;
        /**
         * initialize default logger before Core initialize
         * @ignore
         */
        this.logger = new Core.Logger();
        /**
         * initialize default config before Core initialize
         * @ignore
         */
        this.config = new Core.Configuration();
    }

    /**
     * define interface method
     * @ignore
     */
    initialize ( done ) {
        done();
    }

    /**
     * @description
        Core.initialize description
     * @example
     * Core.initialize(); //
     * @public
     */
    static initialize ( a, r, g, u, m, e, n, t, s ) {
        // implement ability to replace Bootstrap module
        let Bootstrap = Core.instance.CurrentBootstrap;
        // handle initialization done
        handle( Bootstrap.create.bind(Bootstrap, a, r, g, u, m, e, n, t, s ) )
            .then(success => Core.logger.info('[Core.initialize]: application was initialized') )
            .catch(error => Core.logger.error('[Core.initialize]: application was not initialized', error) );
    }

    /**
     * @see {@link Logger}
     * @description
        Provide common logger within the Core.

     * @example Core.logger
     * @readonly
     * @public
     */
    static get logger () {
        return Core.instance.logger;
    }

    /**
     * @see {@link Configuration}
     * @description
        Provide common configuration within the Core.

     * @example Core.config
     * @readonly
     * @public
     */
    static get config () {
        return Core.instance.config;
    }

    /**
     * @see {@link ModuleBase}
     * @description
        Provide functionality to make your own modules.

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
     * @see {@link Bootstrap}
     * @description
        Provide functionality to make your own bootstraping logic.

     * @example
     *  class MyBootstrap extends Core.Bootstrap {
     *      ...
     *  }
     * @protected
     * @readonly
     * @public
     */
    static get Bootstrap () {
        return Bootstrap;
    }

    /**
     * @description
        Method to provide ability extend bootstraping within the Core.

     * @example
     * class MyBootstrap extends Core.Bootstrap {
     *      ...
     * }
     * Core.setupBootstrap(MyBootstrap);
     * Core.initialize();
     * @param {Bootstrap}
     * @public
     */
    static setupBootstrap ( CustomBootstrap ) {
        if (
            is.function(CustomBootstrap)
            && (new CustomBootstrap('instanceOf')) instanceof Bootstrap
        ) {
            // store current Bootstrap module
            this.CurrentBootstrap = CustomBootstrap;
        } else {
            Core.logger.error(`
                Unsuccessful attempt to replace the logger was detected.
                Should be:
                class ${CustomBootstrap.name} extends Core.utils.Configuration {
                    ...
                }
            `);
        }
    }

    /**
     * @description
        To provide ability extend Logger module within the Core.

     * @example
     *  class MyLogger extends Core.Logger {
     *      ...
     *  }
     * @see {@link Logger}
     * @public
     */
    static get Logger () {
        return require('./modules/logger');
    }
    /**
     * @description
        To provide ability extend Configuration module within the Core.

     * @example
     *  class MyConfiguration extends Core.Configuration {
     *      ...
     *  }
     * @see {@link Configuration}
     * @public
     */
    static get Configuration () {
        return require('./modules/configuration');
    }

    /**
     * @see {@link ErrorBase}
     * @description
        To provide functionality to make your own errors.

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
     * @description
        To provide functionality to make your own errors.

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
     * @description
        Provide utilities of Core.

     * @example Core.utils
     * @protected
     * @readonly
     * @public
     */
    static get utils () {
        return utils;
    }

}
/**
 * Initializing application core before export
 * Available access to the core instance
 * @ignore
 */
Core.create();

// TODO remove !!!
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
