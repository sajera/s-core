
// Using STRICT mode for ES6 features


/**
 * Requiring File System modules
 * @type {*}
 */
const fs = require('fs');
const path = require('path');

/**
 * Requiring DotEnv and get configuration for the project
 */
var defaultConfig = {
    silent: true
};
if (global.DEFAULT_CONFIG_PATH != null) {
    defaultConfig['path'] = global.DEFAULT_CONFIG_PATH;
}
require('dotenv').config(defaultConfig);

/**
 *  Base Application configuration
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 */
class Configuration {

    /**
     * Default constructor
     */
    constructor () {
        this.init();

        this.__env = process.env;
    }

    /**
     * Returns configuration object for the environment
     *
     * @returns {*}
     */
    get items() {
        return Configuration._CONFIG;
    }

    /**
     * Get configuration values
     *
     * @returns {*}
     */
    get env () {
        return this.__env;
    }

    /**
     * Check debug flag
     *
     * @returns {Boolean}
     */
    get isDebug () {
        return (this.__env.ENV_TYPE == 'dev') || (this.__env.ENV_TYPE == 'qa');
    }

    /**
     * Check is curren Environment is Dev
     *
     * @returns {Boolean}
     */
    get isDev () {
        return (this.__env.ENV_TYPE == 'dev');
    }

    /**
     * Check is curren Environment is QA
     *
     * @returns {Boolean}
     */
    get isQA () {
        return (this.__env.ENV_TYPE == 'qa');
    }

    /**
     * Returns name of current environment
     *
     * @returns {*|string}
     */
    static get envName () {
        return process.env.APPLICATION_ENV || process.env.NODE_ENV || 'development';
    }

    /**
     * Load environment and init config
     */
    loadEnvironment () {
        // Load dotenv environment
        var options = {
            path: './config/' + this.envName
        };
        if (this.envName == 'default') {
            options.silent = true;
        }
        require('dotenv').config(options);
    }

    /**
     * Init config and save it to local variable
     */
    init () {
        // Unset configuration
        Configuration._CONFIG = {};

        // Load environment
        this.loadEnvironment();

        // Initialize config
        let basePath = path.dirname(process.mainModule.filename);
        let configFileName = basePath + '/config/' + Configuration.envName + '.json';
        if (!fs.existsSync(configFileName)) {
            console.warn('#### Environment configuration files are not exists: ', configFileName);
            configFileName = basePath + '/config/' + Configuration.envName + '.js';
        }

        console.log('#### Trying to load configuration: ', configFileName);
        if (fs.existsSync(configFileName)) {
            Configuration._CONFIG = require(configFileName);
        } else {
            console.error('#### Environment configuration files are not exists: ', configFileName);
        }
    }
}

// Load specified environment
Configuration._CONFIG = {};

module.exports.Configuration = Configuration;
