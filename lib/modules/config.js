
"use strict";

/**
 * native Node.js modules
 */
const fs = require('fs');
const path = require('path');

 /**
  * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
  * @private
  * @class
  */
class Configuration {

    constructor () {
        // defaults
        this.DEBUG = true;

        // initialize
        this.init();
    }

    /**
     * @description current actual instance of logger injected inside instances
     * @protected
     * @public
     */
    get logger () {
        return require('./logger').instance;
    }

    /**
     * @description mostly for debug method of logger
     * @protected
     * @public
     */
    static get debug () {
        if ( this.DEBUG || process.env.DEBUG ) {
            return true;
        } else return false;
    }

    init () {
        // Load dotenv environment
        var options = {
            path: './config/' + this.envName
        };
        if (this.envName == 'default') {
            options.silent = true;
        }
        require('dotenv').config(options);
        // Initialize config
        var basePath = path.dirname(process.mainModule.filename);
        var configFileName = basePath + '/config/' + Configuration.envName + '.json';
        if (!fs.existsSync(configFileName)) {
            this.logger.warn('#### Environment configuration files are not exists: ', configFileName);
            configFileName = basePath + '/config/' + Configuration.envName + '.js';
        }

        this.logger.log('#### Trying to load configuration: ', configFileName);
        if (fs.existsSync(configFileName)) {
            Configuration._CONFIG = require(configFileName);
        } else {
            this.logger.error('#### Environment configuration files are not exists: ', configFileName);
        }
    }


    /**
     * Get configuration values
     *
     * @returns {*}
     */
    get env () {
        if ( !this.env ) {

        }
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

}

/**
 * @description Initializing application config before init
 * @private
 */
var instance = { DEBUG: true };
// safe Initialize
try { instance = new Config(); } catch ( error ) {}

/**
 * @description public representation of config module
 * @public
 */
module.exports = {
    /**
     * @description
     * @example
        class CustomConfig extends Config {
            ...
        }
     * @public
     */
    Config: Config,

    /**
     * @description
     * @example require('./path/to/config').instance
     * @public
     */
     static get instance () {
         return instance;
     }

     /**
      * @description to provide ability to customize origin loger
      * @param { Class } Config - class inherited from a Config
      * @public
      */
     replace ( CustomConfig ) {
         var tmp;
         if ( typeof CustomConfig == 'function' ) {
             tmp = new CustomConfig();
         }
         if ( tmp instanceof Config  ) {
             instance = tmp;
         }
     }

};
