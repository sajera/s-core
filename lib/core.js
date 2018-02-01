
/**
 * native Node.js modules
 */

/**
 * lib modules
 */
var Utilities = require('./utilities/utilities');

/**
 * @description Root output
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @public
 * @class
 */
class Core extends Utilities {
    /**
     * @description Core constructor
     */
    constructor () {
        // this
        super();
        /**
         * @description log event
         * @example Core.emit(Core.EVENT.LOG, { ... });
         * @event LOG
         * @public
         */
        this.coreEvent.on(
            this.coreEvent.LOG,
            // TODO improve logic
            () => this.logger.log.apply(this.logger, Array.prototype.slice.call(arguments, 0))
        );

        /**
         * @description log event
         * @example Core.emit(Core.EVENT.LOG, { ... });
         * @event ERROR
         * @public
         */
        this.coreEvent.on(
            this.coreEvent.ERROR,
            // TODO improve logic
            () => this.logger.error.apply(this.logger, Array.prototype.slice.call(arguments, 0))
        );

    }

    /**
     * @description
        prevent abilities create new Core (inherit from Utilities)
        // TODO it can be used
     * @override
     * @public
     */
    static create () {
        return this.instance;
    }

    /**
     * @example Core.instance
     * @public
     */
    static get instance () {
        return instance;
    }

    /**
     * @example Core.on(Core.EVENT.LOG, () => { ... })
     * @public
     */
    static get on () {
        return instance.coreEvent.on.bind(instance.coreEvent);
    }

    /**
     * @example Core.emit(Core.EVENT.LOG, { ... })
     * @public
     */
    static get emit () {
        return instance.coreEvent.emit.bind(instance.coreEvent);
    }

    /**
     * @example Core.EVENT
     * @public
     */
    static get EVENT () {
        return instance.coreEvent;
    }

    /**
     * @description alias for Core.Logger.instance
     * @example Core.logger
     * @public
     */
    static get logger () {
        return instance.logger;
    }

    /**
     * @description alias for Core.Configuration.instance
     * @example Core.config
     * @public
     */
    static get config () {
        return instance.config;
    }

    /**
     * @example Core.interface.Error
     * @public
     */
    static get interface () {
        return {
            Error: require('./interfaces/error'),
            Module: require('./interfaces/module'),
            Logger: require('./utilities/logger'),
            Configuration: require('./utilities/configuration'),
        };
    }

}

/**
 * Initializing application facade before export
 */
var instance = new Core();

/**
 * @description public representation Core
 * @public
 */
module.exports = Core;
