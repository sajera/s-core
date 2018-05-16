
/**
 * implementation ModuleInterface using abstract class ModuleBase
 * @ignore
 */
const Singleton = require('./modules/singleton');

/**
 * utilities of library
 * @ignore
 */
const utils = require('./utilities/utilities'),
    is = utils.is,
    async = utils.async,
    errorLabel = utils.errorLabel,
    successLabel = utils.successLabel,
    highlightLabel = utils.highlightLabel,
    handleAsPromise = utils.handleAsPromise;

/**
 * private data of Core
 *
 * @private
 * @ignore
 */
const modules = {};
let state = 0;

/**
 * @description
 Root class of library. Provide all library functionality.
 <br/><br/> Core <br/><br/>
 * @example const Core = require('s-core');
 * @author Sajera <allsajera@gmail.com>
 * @classdesc Core - root output
 * @implements {ModuleInterface}
 * @see {@link ModuleBase}
 * @public
 * @class
 */
class Core extends Singleton {
    /**
     * @description Core constructor
     * @constructor
     */
    constructor () {
        // this
        super();

    }

    /**
     * @description
     Provide functionality to get {@link Utilities | utilities} of Core.
     * @readonly
     */
    static get utils () {
        return utils;
    }

    /**
     * @see {@link ModuleBase}
     * @description
     Provide functionality to make your own modules.

     * @example
     *  class MyModule extends Core.ModuleBase {
     *      ...
     *  }
     * @readonly
     * @public
     */
    static get ModuleBase () {
        return require('./modules/modulebase');
    }

    /**
     * @see {@link ModuleBase}
     * @description
     Provide functionality to make your own Singleton modules.

     * @example
     *  class MyModule extends Core.Singleton {
     *      ...
     *  }
     * @readonly
     * @public
     */
    static get Singleton () {
        return require('./modules/singleton');
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
     * @readonly
     * @public
     */
    static get ErrorSpec () {
        return require('./errors/errorspec');
    }

    /**
     * @see {@link Core.module}
     * @see {@link Core.setupModule}
     * @description
     <strong> Initialization of Core. </strong>
     <br/>
     <br/> Initialization of Core suppose preparing initialization and run connected modules.
     <br/> Each module goes through 3 stages of initialization.
     <br/>
     <br/> <strong> 1. Declaration (SYNC) </strong>
     <br/> Declaration stage suppose creation of alias to the module using methods
     <br/> {@link Core.setupModule|setupModule} to declare module within the core
     <br/> {@link Core.module|module} to get module instance
     <br/>
     <br/> <strong> 2. Initialization (ASYNC) </strong>
     <br/> Initialization stage suppose each module should has its own async creation flow
     <br/> On Initialization modules can has relations with other modules so as "{@link Logger}" or "{@link Configuration}"
     <br/>
     <br/> <strong> 3. Running (ASYNC) </strong>
     <br/> Running stage suppose each module can addition action after initialization
     <br/> but before application has start.
     <br/>
     <br/>
     * @example
     * Core.initialize();
     * @public
     */
    static initialize () {

        async.series([
            done => { // validate
                if ( Core.isInitialized ) {
                    return done('Unsuccessful attempt to initialize the Core was detected. Core already initialized.');
                }
                done();
            },
            done => { // instantiate modules
                for ( let name in modules ) {
                    let Module = modules[name];
                    Module.create();
                }
                done();
            },
            done => { // initializing
                state = 1;
                Core.instance.initialize()
                    .then(() => done() )
                    .catch(done);
            },
            done => { // running
                state = 2;
                Core.instance.run()
                    .then(() => done() )
                    .catch(done);
            },
            done => { // after all
                // do nothing at the moment
                done();
            }
        ], error => {
            let logger = Core.module('logger');
            if ( error ) { // Core initialization fail
                state = 10;
                logger.error(errorLabel('CORE'),  error);
            } else { // Core initialization success
                state = 3;
                logger.info(successLabel('CORE'), 'Core application was initialized successfully.');
            }
        });

    }

    /**
     * Initialization of all modules related to the queue of setup
     *
     *
     * @returns {Promise}
     * @private
     */
    initialize () {
        return new Promise( (resolve, reject) => {
            async.eachLimit(modules, 1, ( module, next ) => {
                module.instance.initialize( next );
            }, error => {
                if ( error ) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    /**
     * Running of all modules related to the queue of setup
     *
     *
     * @returns {Promise}
     * @private
     */
    run () {
        return new Promise( (resolve, reject) => {
            async.eachLimit(modules, 1, ( module, next ) => {
                module.instance.run(next);
            }, error => {
                if ( error ) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    /**
     * @description
     <strong> states of Core. </strong>
     <br/>
     <br/> Each state of initialization of Core has state name
     <br/> 1. 'CREATING'        Before you run "{@link Core.initialize}"
     <br/> 2. 'INITIALIZING'    After you run "{@link Core.initialize}" but before the all modules will initialized
     <br/> 3. 'RUNNING'         After all modules will initialized but before the application has start
     <br/> 4. 'READY'           Application run all modules, make all preparations and started.
     <br/>
     <br/> -. 'ERROR'           Run application has fail...
     <br/>
     * @example
     * Core.state === 'INITIALIZING'
     * @readonly
     * @private
     */
    static get state () {
        switch ( state ) {
            default: return 'ERROR';
            case 0: return 'CREATING';
            case 1: return 'INITIALIZING';
            case 2: return 'RUNNING';
            case 3: return 'READY';
        }
    }

    /**
     * @description
     Provide functionality to detect state of Core.
     * @readonly
     */
    static get isInitialized () {
        return state >= 1;
    }

    /**
     * @description
     Provide functionality to detect state of Core.
     * @readonly
     */
    static get isRunned () {
        return state >= 2;
    }

    /**
     * @description
     Provide functionality to detect state of Core.
     * @readonly
     */
    static get isReady () {
        return state >= 3;
    }


    /**
     * @see {@link Singleton}
     * @description
         <strong> You may define your own modules within Core. </strong>
         <br/>
         <br/> Please make sure you use inheritance from base module class Singleton
     * @example
     *  class MyModule extends Core.Singleton {
     *      ...
     *  }
     * @param {String} ID - identifier of module
     * @param {Singleton} Module - Class of module
     * @public
     */
    static setupModule ( ID, Module ) {

        if ( Core.isInitialized ) {
            throw new Error(`
                Unsuccessful attempt to setup the Module(${ID}) of Core was detected.
                You can not add modules after initialization.
            `);
        }

        if ( !is.function(Module) || !((new Module()) instanceof Singleton) ) {
            throw new Error(`
                Unsuccessful attempt to setup the Module(${ID}) of Core was detected.
                Module should implement "Core.Singleton".
            `);
        }

        if ( modules[ID] ) {
            console.warn(highlightLabel('CORE'), `Override warning! The Module(${ID}) was overridden.`);
        }
        // declare Module
        modules[ID] = Module;
    }

    /**
     * @see {@link Singleton}
     * @description
         <strong> You may define your own modules within Core. </strong>
         <br/>
         <br/> Please make sure you use inheritance from base module class Singleton
     * @example
     *  class MyModule extends Core.Singleton {
     *      ...
     *  }
     * @param {String} ID - identifier of module
     * @return {Singleton.instance}
     * @public
     */
    static module ( ID ) {
        // NOTE instance of module
        return modules[ID].instance;
    }

}

/**
 * @description
    Initializing application core before export
    Available access to the core instance
 * @ignore
 */
Core.create();
// NOTE setup default modules
Core.setupModule('logger', Core.Logger);
Core.setupModule('config', Core.Configuration);

// TODO remove !!!
typeof window !== 'undefined' && (window.Core = Core);

/**
 * @exports Core
 * @description
    Root class of library. Provide all library functionality.
    <br/><br/> Core <br/><br/>
 * @classdesc Core - root output
 * @see {@link ModuleInterface}
 * @see {@link Singleton}
 * @see {@link Core}
 */
module.exports = Core;
