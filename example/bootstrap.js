
/**
 * Core library
 */
const Core = require('./core');

/**
 * Custom configuration class
 */
const Config = require('./modules/Config');

/**
 * Custom configuration class
 */
const Logger = require('./modules/Logger');

/**
 * Custom configuration class
 */
const ErrorSpec = Core.ErrorSpec;

/**
 * Customization bootstrap example
 *
 * @public
 */
class Bootstrap extends Core.Bootstrap {
    /**
     * @constructor
     */
    constructor () {
        super();

        // example customization configuration
        this.config = Config;
        // example customization logger
        this.logger = Logger;
    }

    /**
     * @param {Function} done
     */
    // initializeModules ( done ) {
    //     // Core.logger.log('Bootstrap.initializeModules', Core.config);
    //     // Core.logger.info('Bootstrap.initializeModules', Core.config);
    //     // Core.logger.warn('Bootstrap.initializeModules', Core.config);
    //     // Core.logger.debug('Bootstrap.initializeModules', Core.config);
    //
    //     // setTimeout(() => {
    //     //     let err= ErrorSpec.create('test');
    //     //     Core.logger.error('Bootstrap.initializeModules', err.toJSON());
    //     //
    //     // }, 5*1000);
    //
    //
    //     done();
    // }

}

/**
 * exports Logger
 */
module.exports = Bootstrap;
