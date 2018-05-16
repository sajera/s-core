
/**
 * native Node.js modules
 * @ignore
 */
const path = require('path');

/**
 * Core library
 */
const Core = require('../core-alias');

/**
 * Customization Configuration example
 *
 * @public
 */
class Config extends Core.Configuration {
    /**
     * @constructor
     */
    constructor () {
        // this
        super();
    }

    /**
     * @param {Function} done
     */
    // initialize ( done ) {
    //     // Initialize environment
    //     // this.environment();
    //     console.log('Config.initialize');
    //     // Initialize config
    //     let main = '../config';
    //     let filename = process.env.APPLICATION_ENV || process.env.NODE_ENV || 'development';
    //     let configData = require(path.join(main, filename));
    //     Object.assign(this, configData);
    //     // all done
    //     done();
    // }
}


/**
 * exports Config
 */
module.exports = Config;
