
'use strict';

/**
 * native Node.js modules
 * @ignore
 */
const EventEmitter = require('events').EventEmitter;

/**
 * core utilities
 * @ignore
 */
 const Logger = require('./logger');
 const Configuration = require('./logger');

/**
 * @desc delegate common abilities within library
 * @author Sajera <allsajera@gmail.com>
 * @classdesc Core.utils
 * @alias utils
 * @class
 */
class Utilities extends EventEmitter {
    /**
     * @desc
        Inheritance from native EventEmitter.
        Implement common event bus.
     * @constructor
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
     * @desc
        Method to provide ability replace configuration within the Core.
        <strong> NOTE </strong> Make sure to be before initialize the Core.
     * @example
     *  class MyConfiguration extends Core.utils.Configuration {
     *      ...
     *  }
     *  Core.utils.setupConfiguration(MyConfiguration)
     * @see {@link Configuration}
     * @param {Configuration}
     * @public
     */
    setupConfiguration ( CustomConfiguration ) {
        if (
            this.is.function(CustomConfiguration)
            && (new CustomConfiguration('instanceOf')) instanceof Configuration
        ) {
            // store current Configuration module
            this.CurrentConfiguration = CustomConfiguration;
            // initialize Configuration
            this.CurrentConfiguration.create();
        } else {
            this.logger.error(`
                Unsuccessful attempt to replace the logger was detected.
                Should be:
                class ${CustomConfiguration.name} extends Core.utils.Configuration {
                    ...
                }
            `);
        }
    }

    /**
     * @desc Common Configuration
     * @example
     *  class MyConfiguration extends Core.utils.Configuration {
     *      ...
     *  }
     *  Core.utils.setupConfiguration(MyConfiguration);
     * @see {@link Configuration}
     * @public
     */
    get Configuration () {
        return Configuration;
    }

    /**
     * @desc
        Initiated configuration. <br/>
        <strong> NOTE </strong> Before initialization of the Core it contain only default data
     * @example
     *  Core.utils.config;
     *  Core.config; // alias to Core.utils.config
     * @public
     */
    get config () {
        return this.CurrentLogger.instance;
    }

    /**
     * @desc Method to provide ability replace logger within the Core.
     * @example
     *  class MyLogger extends Core.utils.Logger {
     *      ...
     *  }
     *  Core.utils.setupLogger(MyLogger)
     * @see {@link Logger}
     * @param {Logger}
     * @public
     */
    setupLogger ( CustomLogger ) {
        if (
            this.is.function(CustomLogger)
            && (new CustomLogger('instanceOf')) instanceof Logger
        ) {
            // store current logger module
            this.CurrentLogger = CustomLogger;
            // initialize Logger
            this.CurrentLogger.create();
        } else {
            this.logger.error(`
                Unsuccessful attempt to replace the logger was detected.
                Should be:
                class ${CustomLogger.name} extends Core.utils.Logger {
                    ...
                }
            `);
        }
    }

    /**
     * @desc Logger class to provide ability replace logger within the Core.
     * @example
     *  class MyLogger extends Core.utils.Logger {
     *      ...
     *  }
     *  Core.utils.setupLogger(MyLogger)
     * @see {@link Logger}
     * @public
     */
    get Logger () {
        return Logger;
    }

    /**
     * @desc Common current logger within the Core
     * @example
     *  Core.utils.logger;
     *  Core.logger; // alias to Core.utils.logger
     * @public
     */
    get logger () {
        return this.CurrentLogger.instance;
    }

    /**
     * @desc outsource <strong> "s-is" </strong>
     * @see {@link https://www.npmjs.com/package/s-is|s-is on NPM}
     * @public
     */
    get is () {
        return require('s-is');
    }

    /**
     * @desc outsource <strong> "s-uid" </strong>
     * @see {@link https://www.npmjs.com/package/s-uid|s-uid on NPM}
     * @public
     */
    get uid () {
        return require('s-uid');
    }

}

/**
 * export instance of utils
 */
module.exports = new Utilities();
