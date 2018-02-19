
/**
 * Core library
 */
const Core = require('./core');

/**
 * Customization bootstrap
 *
 * @public
 */
class Bootstrap extends Core.Bootstrap {
    constructor () {
        super();

        // example costomization configuration
        this.config = require('./modules/Config');
        // example costomization logger
        this.logger = require('./modules/Logger');
    }

    initializeModules ( done ) {
        Core.logger.log('Bootstrap.initializeModules', Core.config);
        // Core.logger.info('Bootstrap.initializeModules', Core.config);
        // Core.logger.warn('Bootstrap.initializeModules', Core.config);
        // Core.logger.error('Bootstrap.initializeModules', Core.config);
        // Core.logger.debug('Bootstrap.initializeModules', Core.config);
        done();
    }

}

/**
 * exports Logger
 */
module.exports = Bootstrap;
