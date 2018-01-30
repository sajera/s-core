
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring application Facade
 */
const applicationFacade = require('../facade.js').ApplicationFacade.instance;

/**
 * Requiring Session
 *
 * @type {session|exports|module.exports}
 */
const session = require('express-session');

/**
 *  Multi-Tenant handler
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 */
class HttpSession {

    /**
     * Returns Session name
     *
     * @returns {string}
     * @constructor
     */
    static get SESSION_NAME () {
        if (applicationFacade.config.env.SESSION_NAME) {
            return applicationFacade.config.env.SESSION_NAME;
        }

        return 'application.sid';
    }

    /**
     * Is session secure or not
     *
     * @returns {boolean}
     */
    static get isSecure() {
        return false;
    }

    /**
     * Creates Session based on Config Values
     */
    static createSession () {
        var sessionType = null;
        var storageDetails = {};
        let storageUri =  applicationFacade.config.env.SESSION_STORAGE;
        if (applicationFacade.config.items.session != null && applicationFacade.config.items.session.storage != null) {
            storageUri = applicationFacade.config.items.session.storage;
        }

        // Check is session enabled
        if (applicationFacade.config.items.session != null && applicationFacade.config.items.session.disabled !== null) {
            if (applicationFacade.config.items.session.disabled) {
                // Session is disabled skipping
                return null;
            }
        }

        if (storageUri) {
            storageDetails = require('url').parse(storageUri, true);
            storageDetails.url = storageUri;
            if (storageDetails.protocol != null) {
                sessionType = storageDetails.protocol.toLowerCase().replace(':', '');
            }
        }

        if (sessionType == 'redis') {
            return HttpSession.createRedisSession(storageDetails);
        } else if (sessionType == 'mongodb') {
            return HttpSession.createMongoSession(storageDetails);
        } else {
            return HttpSession.createDefaultSession(storageDetails);
        }
    }

    /**
     * Creates Redis Session
     *
     * @returns {*}
     */
    static createRedisSession (storageDetails) {
        var redis   = require("redis");
        var RedisStore = require('connect-redis')(session);

        var redisClient = redis.createClient(storageDetails.port, storageDetails.hostname);
        redisClient.on('error', function(err) {
            console.log('ERROR. Redis error: ' + err);
        });
        redisClient.on('connect', function(){
            console.log('Connected to Redis: ' + storageDetails.hostname + ":" + storageDetails.port);
        });

        var storeConfig = {
            client: redisClient,
            ttl: (storageDetails.query != null && storageDetails.query.ttl != null ? storageDetails.query.ttl : 14400)
        };
        var sessionStore = new RedisStore(storeConfig);
        var sessionConfig = {
            resave: true,
            saveUninitialized: true,
            store: sessionStore,
            name: HttpSession.SESSION_NAME,
            // maxAge: new Date(Date.now() + 1440000),
            secret: applicationFacade.config.env.SESSION_SECRET
        };

        console.log('#### Initializing Redis session: ', storageDetails.hostname);
        var result = session(sessionConfig);

        return result;
    }

    /**
     * Creates Mongo Session
     *
     * @returns {*}
     */
    static createMongoSession (storageDetails) {
        var redis   = require("redis");
        var MongoStore = require('connect-mongo')(session);

        var storeConfig = {
            url: storageDetails.url,
            ttl: (storageDetails.query != null && storageDetails.query.ttl != null ? storageDetails.query.ttl : 86400)
        };
        var sessionStore = new MongoStore(storeConfig);
        var sessionConfig = {
            resave: true,
            saveUninitialized: true,
            store: sessionStore,
            name: HttpSession.SESSION_NAME,
            // maxAge: new Date(Date.now() + 1440000),
            secret: applicationFacade.config.env.SESSION_SECRET
        };

        console.log('#### Initializing MongoDB session: ', storageDetails.hostname);
        var result = session(sessionConfig);

        return result;
    }

    /**
     * Creates Default Session
     *
     * @returns {*}
     */
    static createDefaultSession (storageDetails) {
        var result = session({
            resave: true,
            saveUninitialized: true,
            // name: HttpSession.SESSION_NAME,
            secret: applicationFacade.config.env.SESSION_SECRET
        });

        return result;
    }

    /**
     * Set Domain Cookie
     *
     * @param url
     * @param request
     * @param response
     */
    static setDomainCookie (url, request, response) {
        var urlDetails = require('url').parse(url);
        var sessionId = request.sessionID;

        response.cookie(HttpSession.SESSION_NAME, sessionId, {domain: urlDetails.hostname, path: '/', secure: HttpSession.isSecure});
    }
}

/**
 * Exporting URL Utils
 *
 * @type {Function}
 */
exports = module.exports = HttpSession;
