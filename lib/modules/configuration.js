
/**
 * native Node.js modules
 * @ignore
 */
const fs = require('fs');
const path = require('path');

/**
 * implementation ModuleInterface
 * @ignore
 */
const ModuleBase = require('./modulebase');

/**
 * @desc Implement default configuration within the Core.
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @implements ModuleInterface
 * @see {@link ModuleBase}
 * @classdesc Core.config
 * @public
 * @class
 */
class Configuration extends ModuleBase {
    /**
     * @constructor
     */
    constructor () {
        // this
        super();
        // no defaults
    }

    /**
     * @desc load Environment and extend process.env variables
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
     * @desc
        As module initialization by defaults.
        Can be overridden by inheritance.
     * @param {function} callback
     * @public
     */
    initialize ( callback ) {
        // Initialize environment
        this.environment();
        // Initialize config
        var main = path.dirname(process.mainModule.filename);
        var configPath = path.join(main, Configuration.dirName, Configuration.envName);
        if ( fs.existsSync(configPath) ) {
            var configData = require(configFileName);
            Object.assign(this, configData);
        }
        // all done
        callback();
    }

    /**
     * @desc
        name of *.env file. Can be overridden by inheritance.
        <br/><br/> DEFAULTS: APPLICATION_ENV || NODE_ENV || 'development'
     * @public
     */
    static get envName () {
        return process.env.APPLICATION_ENV || process.env.NODE_ENV || 'development';
    }

    /**
     * @desc
        dirname with config files. Can be overridden by inheritance.
        <br/><br/> DEFAULTS: 'config'
     * @public
     */
    static get dirName () {
        return 'config';
    }

    /**
     * @desc try to find env file
     * @returns {Object} path to file *.env
     * @public
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
     * @desc env file parser
     * @param {Buffer}
     * @returns {Object}
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

}

/**
 * exports Configuration
 */
module.exports = Configuration;
