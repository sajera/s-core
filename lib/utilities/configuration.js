
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

        // initialize configuration
        this.init();
    }

    /**
     * @description using current logger
     * @example
        this.logger.debug('Some', 'message');
        this.logger.log('Some', 'message');
        this.logger.info('Some', 'message');
        this.logger.warn('Some', 'message');
        this.logger.error('Some', 'message');
     * @protected
     * @public
     */
    get logger () {
        return require('./logger').instance;
    }

    init () {
        // Load environment
        this.environment();
        // Initialize config
        var main = path.dirname(process.mainModule.filename);
        var configPath = path.join(main, Configuration.dirName, Configuration.envName);
        if ( fs.existsSync(configPath) ) {
            var configData = require(configFileName);
            Object.assign(this, configData);
        }
    }

    /**
     * @description load Environment and extend process.env variables
     * @public
     */
    environment () {
        var pathToEnv = Configuration.pathENV();
        if (pathToEnv) {
            // read
            var source = fs.readFileSync(pathToEnv, 'utf8', 'r');
            // parse
            var env = Configuration.parseENV(source);
            // extend to process env
            Object.assign(process.env, env);
        }
    }

    /**
     * @description try to find env files
     * @private
     */
    static pathENV () {
        // absolute path to root process dir
        var main = path.dirname(process.mainModule.filename);
        // absolute path to default ".env"
        var dfaultEnv = '.env';
        // // absolute path to default "{NODE_ENV}.env"
        var envPath = Configuration.envName+'.env';
        // // absolute path to config dirrectory "{NODE_ENV}.env"
        var customPath = path.join(Configuration.dirName, envPath);
        // choose by priority
        return fs.existsSync( path.join(main, customPath) ) ? customPath
            : fs.existsSync( path.join(main, envPath) ) ? envPath
            : fs.existsSync( path.join(main, dfaultEnv) ) ? dfaultEnv : null;
    }

    /**
     * @description env parser
     * @example
        var env = fs.readFileSync(filePath, 'utf8', 'r');
        Configuration.parseENV(env);
     * @param { Buffer }
     * @returns { Object }
     * @public
     */
    static parseENV ( source ) {
        var results = {};
        try {
            let field, value, key = 0, lines = String( source ).split('\n');
            for ( ; (key < lines.length)&&lines[ key ]; key ++ ) {
                field = lines[ key ].match(/^\s*([\w\.\-\$\@\#\*\!\~]+)\s*=+/)[1];
                value = lines[ key ].match(/=\s*(.*)\s*$/)[1].trim();
                if ( field ) results[ field ] = value.replace(/(^['"]|['"]$)/g, '').replace(/\s+/,' ');
            }
        } catch ( e ) {}
        return results;
    }

    /**
     * @example Configuration.envName
     * @protected
     * @public
     */
    static get envName () {
        return process.env.APPLICATION_ENV || process.env.NODE_ENV || 'development';
    }

    /**
     * @example dirname with config files
     * @protected
     * @public
     */
    static get dirName () {
        return 'config';
    }


    /**
     * @example Configuration.instance
     * @public
     */
    static get instance () {
        return instance;
    }

    /**
     * @description to provide ability to customize and initialize an origin Configuration
     * @example
        class CustomConfiguration extends Configuration {
            ...
        }
        Configuration.replace( CustomConfiguration );
     * @param { Class } CustomConfiguration - class inherited from a Configuration
     * @private
     */
    static replace ( CustomConfiguration ) {
        var tmp;
        if ( typeof CustomConfiguration == 'function' ) {
            tmp = new CustomConfiguration();
        }
        if ( tmp instanceof Configuration  ) {
            instance = tmp;
        }
    }

    /**
     * @description wrapped replace
     * @protected
     * @public
     */
    static init () {
        Configuration.replace( Configuration );
    }
}

/**
 * @description Initializing application config before init
 * @private
 */
var instance = new Configuration();

/**
 * @description public representation of config module
 * @public
 */
module.exports = Configuration;
