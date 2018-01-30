
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring core Events module
 */
const events = require('events');

/**
 * Requiring application Facade
 */
const applicationFacade = require('../facade.js').ApplicationFacade.instance;
const ApplicationEvent = require('../facade.js').ApplicationEvent;

/**
 *  Mongoose module. Handle Mongoose connection(s) and DB abstractions.
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 */
class MongooseModule extends events.EventEmitter {

    /**
     * MongooseModule constructor
     */
    constructor () {
        // We must call super() in child class to have access to 'this' in a constructor
        super();

        /**
         * Requiring system logger
         *
         * @type {Logger|exports|module.exports}
         * @private
         */
        this._logger = require('../logger.js');
        this._logger.log('## Initializing Mongoose Module');

        /**
         * Mongoose connection
         *
         * @type {*|exports|module.exports|*}
         * @private
         */
        this._connection = null;

        /**
         * Mongoose instance
         *
         * @type {*|exports|module.exports|*}
         * @private
         */
        this._mongoose = require('mongoose');

        // Set usage of Global Promise library to get read of Mongoose Deprecation Warning
        this._mongoose.Promise = global.Promise;;
    }

    /**
     * Returns Mongoose Instance
     *
     * @returns {*|mongoose|module.exports|*}
     */
    get mongoose (){
        return this._mongoose;
    }

    /**
     * Returns Mongoose Connection
     *
     * @returns {*|mongoose|module.exports|*}
     */
    get connection (){
        return this._connection;
    }

    /**
     * Initialize mongoose based on configuration settings
     */
    init () {
        // Initializing mongoose
        let connectionString = null;
        if (applicationFacade.config.items.database != null && applicationFacade.config.items.database.connectionString != null) {
            connectionString = applicationFacade.config.items.database.connectionString;
        } else {
            connectionString = applicationFacade.config.env.MONGODB_URL;
        }

        let connectionOptions = {
            useMongoClient: true,
            autoIndex: false, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0
        };
        if (applicationFacade.config.items.database != null && applicationFacade.config.items.database.options != null) {
            connectionOptions = applicationFacade.config.items.database.options;
        }

        this._logger.log("## Connecting to Mongo: ", connectionString);
        this._connection = this._mongoose.createConnection(connectionString, connectionOptions);

        // Handling connect event
        this._connection.on('connected', () => {
            this._logger.info('#### Successfully connected to MongoDB server');
            applicationFacade.emit(ApplicationEvent.MONGO_CONNECTED);
            applicationFacade.emit(ApplicationEvent.DATABASE_CONNECTED);
        });

        // Handling error event
        this._connection.on('error', () => {
            this._logger.error('#### Failed to connect to MongoDB server');
        });

        // Handling disconnect event
        this._connection.on('disconnected', () => {
            this._logger.warn('#### Warning application disconnected from the MongoDB server');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', () => {
            this._connection.close(() => {
                this._logger.error('#### [SIGINT] Mongoose default connection disconnected through application termination');
                process.exit(0);
            });
        });
    }

}

/**
 * Exporting module
 */
module.exports = MongooseModule;
