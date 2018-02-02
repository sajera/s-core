
"use strict";

/**
 * native Node.js modules
 */
const fs = require('fs');
const path = require('path');

/**
 * implementation ModuleInterface
 */
const ModuleInterface = require('../interfaces/module');

/**
 * instance of last created Logger
 */
var instance;

/**
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @public
 * @class
 */
class Configuration extends ModuleInterface {
    /**
     * @constructor
     */
    constructor () {
        // this
        super();
        // no defaults
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
     * @description
        As module initialization by defaults.
        Can be overidet by inheritance.
     * @override ModuleInterface
     * @public
     */
    init () {
        // Initialize environment
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
     * @description
       name of *.env file
       Can be overidet by inheritance.
       DEFAULTS: APPLICATION_ENV || NODE_ENV || 'development'
     * @public
     */
    static get envName () {
        return process.env.APPLICATION_ENV || process.env.NODE_ENV || 'development';
    }

    /**
     * @description
        dirname with config files
        Can be overidet by inheritance.
        DEFAULTS: 'config'
     * @public
     */
    static get dirName () {
        return 'config';
    }

    /**
     * @description try to find env file
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
     * @description env file parser
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

    /**
     * @description
        last created instance.
        depend on "create" method.
        NOTE if you override "static create" method of Configuration you must override "static instance" too.
     * @public
     */
    static get instance () {
        return instance;
    }

    /**
     * @description
        Create Configuration instance.
        NOTE if you override "static create" method of Configuration you must override "static instance" too.
     * @override ModuleInterface
     * @private
     */
    static create (a,r,g,u,m,e,n,t,s) {
        // current constructor
        let Class = this;
        // instantiate
        instance = new Class(a,r,g,u,m,e,n,t,s);
        // initialize
        instance.init(a,r,g,u,m,e,n,t,s);
        //
        return instance;
    }
}

/**
 * @exports Configuration
 */
module.exports = Configuration;