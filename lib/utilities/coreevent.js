
"use strict";

/**
 * native Node.js modules
 */
const events = require('events');

/**
 * @description Application Events
 * @name EVENTS
 * @type {{SERVER_STARTED: string, HTTP_SERVER_READY: string, MONGO_CONNECTED: string, DATABASE_CONNECTED: string}}
 */
const EVENTS = {
    LOG: 'LOG',
    ERROR: 'ERROR',
    SERVER_STARTED: 'SERVER_STARTED',
    HTTP_SERVER_READY: 'HTTP_SERVER_READY',
    DATABASE_CONNECTED: 'DATABASE_CONNECTED',
    MONGO_CONNECTED: 'MONGO_CONNECTED'
};

/**
 * @description Application Global CoreEvent
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @private
 * @class
 */
class CoreEvent extends events.EventEmitter {

    constructor () {
        super();

        /**
         * @alias EVENTS
         * @see EventEmitter - https://nodejs.org/docs/latest/api/events.html
         */
        Object.assign(this, EVENTS);
    }

    /**
     * @example CoreEvent.instance
     * @public
     */
    static get instance () {
        return instance;
    }

    /**
     * @description to provide ability to customize origin coreEvent
     * @example
        class CustomCoreEvent extends CoreEvent {
            ...
        }
        CoreEvent.replace( CustomConfiguration );
     * @param { Class } CoreEvent - class inherited from a Logger
     * @public
     */
    static replace ( CustomCoreEvent ) {
        var tmp;
        if ( typeof CustomCoreEvent == 'function' ) {
            tmp = new CustomCoreEvent();
        }
        if ( tmp instanceof CoreEvent  ) {
            instance = tmp;
        }
    }

    /**
     * @description wrapped replace
     * @protected
     * @public
     */
    static init () {
        CoreEvent.replace( Configuration );
    }
}

/**
 * @description global Core EvntBus instance
 * @private
 */
var instance = new CoreEvent();

/**
 * @description public representation of events module
 * @public
 */
module.exports = CoreEvent;
