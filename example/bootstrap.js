
/**
 * Core library
 */
const Core = require('../lib/core');

class Bootstrap extends Core.Bootstrap {
    constructor () {
        super();
    }

    initializeModules ( done ) {
        Core.logger.log('Bootstrap.initializeModules', Core.config);
        Core.logger.info('Bootstrap.initializeModules', Core.config);
        Core.logger.warn('Bootstrap.initializeModules', Core.config);
        Core.logger.error('Bootstrap.initializeModules', Core.config);
        Core.logger.debug('Bootstrap.initializeModules', Core.config);
        done();
    }

}

/**
 * exports Logger
 */
module.exports = Bootstrap;
