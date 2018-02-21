
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
const Singleton = require('./singleton');

/**
 * @desc Implement default configuration within the Core.
 * @author Sajera <allsajera@gmail.com>
 * @implements {ModuleInterface}
 * @see {@link Singleton}
 * @classdesc Core.config
 * @alias Configuration
 * @public
 * @class
 */
class Configuration extends Singleton {
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
        let pathToEnv = Configuration.pathENV();
        if (pathToEnv) {
            // read
            let source = fs.readFileSync(pathToEnv, 'utf8', 'r');
            // parse
            let env = Configuration.parseENV(source);
            // extend to process env
            // eslint-disable-next-line
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
        let main = path.dirname(process.mainModule.filename);
        let configPath = path.join(main, Configuration.dirName, Configuration.envName);
        if (fs.existsSync(configPath+'.json')||fs.existsSync(configPath+'.js')) {
            let configData = require(configPath);
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
        // eslint-disable-next-line
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
        let main = path.dirname(process.mainModule.filename);
        // absolute path to default ".env"
        let env = path.join(main, '.env');
        // absolute path to config directory ".env"
        let dirEnv = path.join(main, Configuration.dirName, '.env');
        // absolute path to default "{NODE_ENV||'development'}.env"
        let namedEnv = path.join(main, Configuration.envName+'.env');
        // absolute path to config directory "{NODE_ENV||'development'}.env"
        let dirNamedEnv = path.join(main, Configuration.dirName, Configuration.envName+'.env');
        // choose by priority
        return fs.existsSync( dirNamedEnv ) ? dirNamedEnv
            : fs.existsSync( namedEnv ) ? namedEnv
                : fs.existsSync( dirEnv ) ? dirEnv
                    : fs.existsSync( env ) ? env : null;
    }

    /**
     * @desc env file parser
     * @param {Buffer} source - file source within node js
     * @returns {Object}
     * @public
     */
    static parseENV ( source ) {
        let results = {};
        try {
            let field, value, key = 0, lines = String( source ).split('\n');
            for ( ; (key < lines.length)&&lines[ key ]; key ++ ) {
                field = lines[ key ].match(/^\s*([\w\.\-\$\@\#\*\!\~]+)\s*=+/)[1];
                value = lines[ key ].match(/=\s*(.*)\s*$/)[1].trim();
                if ( field ) {results[ field ] = value.replace(/(^['"]|['"]$)/g, '').replace(/\s+/, ' ');}
            }
        } catch ( e ) { results = {}; }
        return results;
    }

}

/**
 * exports Configuration
 */
module.exports = Configuration;
