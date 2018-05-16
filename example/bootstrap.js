
/**
 * Core library
 */
const Core = require('./core-alias');

/**
 * Custom configuration class
 */
const ErrorSpec = Core.ErrorSpec;

/**
 * Customization bootstrap example
 *
 * @public
 */
class Bootstrap extends Core.Singleton {
    /**
     * @constructor
     */
    constructor () {
        // this
        super();

    }

    initialize ( done ) {
        done();
    }

    run ( done ) {
        done();
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
