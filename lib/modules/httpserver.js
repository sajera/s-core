
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Main HTTP Request/Response Handling logic
 *
 * @type {*|exports|module.exports}
 */
const Express = require('express');

/**
 * Module dependencies.
 */
const passport = require('passport');

/**
 * Requiring core Events module
 */
const events = require('events');

/**
 * File system module
 */
const fs = require('fs');
const path = require('path');

/**
 * Requiring application Facade
 */
const applicationFacade = require('../facade.js').ApplicationFacade.instance;
const ApplicationEvent = require('../facade.js').ApplicationEvent;

/**
 * Controller class definition
 */
const Controller = require('../controller.js').Controller;

/**
 * HTTP Session
 */
const HTTPSession = require('../http/session.js');

/**
 *  HTTP Server Module.
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 */
class HTTPServer extends events.EventEmitter {

    /**
     * HTTP Server constructor
     */
    constructor () {
        // We must call super() in child class to have access to 'this' in a constructor
        super();

        /**
         * Application config
         *
         * @type {Configuration|exports|module.exports}
         * @private
         */
        this._config = applicationFacade.config;

        /**
         * Requiring system logger
         *
         * @type {Logger|exports|module.exports}
         * @private
         */
        this._logger = applicationFacade.logger;

        /**
         * Express application
         *
         * @type {*|exports|module.exports}
         * @private
         */
        this._application = new Express();

        /**
         * Express server instance
         *
         * @type {*|exports|module.exports|*}
         * @private
         */
        this._server = null;

        /**
         * Init base Session handlers
         *
         * @type {Function}
         * @private
         */
        this._session = HTTPSession.createSession();
    }

    /**
     * Returns Express Application instance
     *
     * @returns {*|exports|module.exports|*}
     */
    get application () {
        return this._application;
    }

    /**
     * Returns Express Server instance
     *
     * @returns {*|exports|module.exports|*}
     */
    get server (){
        return this._server;
    }

    /**
     * Returns Application Configuration
     *
     * @returns {*|Configuration|module.exports|*}
     */
    get config (){
        return this._config;
    }

    /**
     * Returns An Access Control List module instance
     *
     * @returns {*|acl|module.exports|*}
     */
    get acl () {
        return this._acl;
    }

    /**
     * Set Session Handler for Express module
     *
     * @param sessionHandler
     */
    setSessionHandler(sessionHandler) {
        this._session = sessionHandler;
    }

    /**
     * Initialize configuration settings of HTTP server
     */
    init () {
        // Emit before init event for the HTTP server
        this.emit(HTTPServer.HTTPServerEvents.BEFORE_INIT, {target: this});

        // Emiting before init middleware event for Application facade
        applicationFacade.emit(HTTPServer.HTTPServerEvents.BEFORE_INIT_HTTP_MIDDLEWARE, {target: this});

        // Emiting before register static middleware event for Application facade
        applicationFacade.emit(HTTPServer.HTTPServerEvents.BEFORE_REGISTER_HTTP_STATIC, {target: this});

        // Set ROOT for static files
        if (HTTPServer.STATIC_RESOURCES_DIR) {
            this._logger.log('## Registering STATIC resources dir: %s', HTTPServer.STATIC_RESOURCES_DIR);
            this.application.use(Express.static(HTTPServer.STATIC_RESOURCES_DIR));
        }

        // Emiting before register http body parser middleware event for Application facade
        applicationFacade.emit(HTTPServer.HTTPServerEvents.BEFORE_REGISTER_HTTP_BODY, {target: this});

        // Set body parsers for Express
        var bodyParser = require('body-parser');
        this.application.use(bodyParser.urlencoded({extended: false})); // We are using extended parsing to get array/object values in a proper way
        this.application.use(bodyParser.json({type: 'application/*+json'}));

        // Emiting before register http cookie parser middleware event for Application facade
        applicationFacade.emit(HTTPServer.HTTPServerEvents.BEFORE_REGISTER_HTTP_COOKIE, {target: this});

        // Cookie Parsing Middleware
        var cookieParser = require('cookie-parser');
        this.application.use(cookieParser());

        // Emiting before register http session storage middleware event for Application facade
        applicationFacade.emit(HTTPServer.HTTPServerEvents.BEFORE_REGISTER_HTTP_SESSION, {target: this});

        // Enable sessions
        if (this._session != null) {
            this.application.use(this._session);
        }

        // Emiting before register http passport middleware event for Application facade
        applicationFacade.emit(HTTPServer.HTTPServerEvents.BEFORE_REGISTER_PASSPORT, {target: this});

        // Passport authentication middleware
        this.application.use(passport.initialize());
        this.application.use(passport.session());

        // Emiting after register http passport middleware event for Application facade
        applicationFacade.emit(HTTPServer.HTTPServerEvents.AFTER_INIT_BASIC_MIDDLEWARE, {target: this});
    }

    /**
     * Initialize passport from the handlers
     * Apply passwordModel with the method registerPassportHandlers()
     *
     * @param passportModel
     */
    initPassport (passportModel) {
        this._logger.info('## Registering passport model and handlers.');
        passportModel.registerPassportHandlers(passport);
    }

    /**
     * Loading routes for some path
     *
     * @param routesPath
     * @param baseModulePath
     */
    loadRoutesFromFile (routesPath, baseModulePath) {

        let basePath = baseModulePath != null ? baseModulePath : applicationFacade.basePath;
        var routesPath = routesPath;
        if (!fs.existsSync(routesPath)) {
            // this._logger.info('## Routes file is not exists %s. Trying another one. %s', basePath + '/' + routesPath);
            if (fs.existsSync(basePath + '/' + routesPath)) {
                routesPath = basePath + '/' + routesPath;
            }
        }

        let routesList = require(routesPath).apply();

        this._logger.info('Loading routes: ' + routesPath);

        const BaseControllerClass = require('./../controller').Controller;

        /**
         * Loading routes
         */
        for (var routePath in routesList) {
            let controllerHandler = null;


            // console.log(controllerPath);
            var routeDetails = routePath.split('|', 2);
            if (routeDetails.length != 2) {
                this._logger.warn('Invalid route: ' + routePath);
            } else {
                this._logger.info('        Initializing route: ' + routePath);
                var httpMethodsString = routeDetails[0].toLowerCase();
                var routeUrl = routeDetails[1];
                var httpMethods = httpMethodsString.split(',');


                // Set controller instance
                if (typeof(routesList[routePath]) === "function") {
                    this._logger.log('##-##. Controller implemented as the middleware function. Registering handler.');
                    controllerHandler = routesList[routePath];
                } else {
                    let controllerPath = path.join(basePath, 'app', 'controllers', routesList[routePath]);
                    if (!fs.existsSync(controllerPath)) {
                        controllerPath = routesList[routePath];

                        // Revalidate initial controller path according baseModulePath
                        if (baseModulePath != null) {
                            controllerPath = path.join(baseModulePath, controllerPath);
                        }
                    }

                    let fullControllerPath = path.resolve(controllerPath);
                    let controller = require(fullControllerPath);

                    if (controller.controllerHandler != null && typeof(controller.controllerHandler) === "function") {
                        this._logger.log('##-##. Controller implements controllerHandler() method. Registering handler.');
                        controllerHandler = controller.controllerHandler;
                    } else if (controller.isController === true || BaseControllerClass.isPrototypeOf(controller)) {
                        this._logger.log('##-##. Controller is an instance of base Controller. Creating default run() handler.');
                        let controllerHolder = {ControllerClass: controller};
                        controllerHandler = function(request, response) {
                            // Get Controller Class Definition from Prototype
                            let ControllerClassDef = this.ControllerClass;

                            let controllerInstance = new ControllerClassDef(request, response);
                            controllerInstance.run();
                        }.bind(controllerHolder);
                    } else if (controller != null && typeof(controller) === "function") {
                        this._logger.log('##-##. Controller implemented as handler method. Registering handler.');
                        controllerHandler = controller;
                    }
                }

                for (let i = 0; i < httpMethods.length; i++) {
                    if (httpMethods.length > 1) {
                        this._logger.info('            - Adding: %s|%s', httpMethods[i], routeUrl);
                    }

                    /**
                     * Initializing controller handler
                     */
                    let methodName = httpMethods[i];
                    this.application[methodName](routeUrl, controllerHandler);
                }
            }
        }
    }

    /**
     * Loading routes for some path
     *
     * @param routesPath
     * @param baseModulePath
     */
    loadRoutes (routesPath, baseModulePath) {
        // var normalizedPath = require("path").join(__dirname, '..', routesPath);
        var basePath = baseModulePath != null ? baseModulePath : applicationFacade.basePath;
        var normalizedPath = routesPath;
        if (!fs.existsSync(normalizedPath)) {
            this._logger.info('## Routes file is not exists %s. Trying another one.', normalizedPath);
            if (fs.existsSync(basePath + '/' + normalizedPath)) {
                normalizedPath = basePath + '/' + normalizedPath;
            }
        }

        this._logger.info('---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------');

        // Loading models
        require("fs").readdirSync(normalizedPath).forEach(function(file) {
            if (file.indexOf('.js') != -1) {
                this.loadRoutesFromFile(normalizedPath + '/' + file, baseModulePath);
            } else {
                this._logger.debug('    @@@@ File %s is not js file. Ignoring.', file);
            }

        }.bind(this));
    }

    /**
     * Obtain server port from the configuration
     *
     * @returns {*|string}
     */
    get port() {
        let result = this.config.env.SERVER_PORT || this.config.env.PORT || '3000';

        if (this.config.items.server && this.config.items.server.port) {
            result = this.config.items.server.port;
        }

        return result;
    }

    /**
     * Obtain server port from the configuration
     *
     * @returns {*|string}
     */
    get host() {
        let result = this.config.env.SERVER_HOST || this.config.env.HOST || 'localhost';

        if (this.config.items.server && this.config.items.server.host) {
            result = this.config.items.server.host;
        }

        return result;
    }

    /**
     * Run HTTP Server based on configuration settings
     */
    run () {
        var $this = this;
        this._server = this.application.listen(this.port, this.host, () => {
            $this.emit(ApplicationEvent.SERVER_STARTED);
            var host = $this.server.address().address;
            var port = $this.server.address().port;

            $this._logger.log('---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------');
            $this._logger.log('Server is UP and Running. Listening at http://%s:%s', host, port);
            $this._logger.log('\n');
        });
    };
}

/**
 * HTTP Server Events
 *
 * @type {{BEFORE_INIT: string, BEFORE_INIT_HTTP_MIDDLEWARE: string, BEFORE_REGISTER_HTTP_STATIC: string, BEFORE_REGISTER_HTTP_BODY: string, BEFORE_REGISTER_HTTP_COOKIE: string, BEFORE_REGISTER_HTTP_SESSION: string, BEFORE_REGISTER_PASSPORT: string, AFTER_INIT_BASIC_MIDDLEWARE: string }}
 */
HTTPServer.HTTPServerEvents = {
    BEFORE_INIT: 'BEFORE_INIT',
    BEFORE_INIT_HTTP_MIDDLEWARE: 'BEFORE_INIT_HTTP_MIDDLEWARE',
    BEFORE_REGISTER_HTTP_STATIC: 'BEFORE_REGISTER_HTTP_STATIC',
    BEFORE_REGISTER_HTTP_BODY: 'BEFORE_REGISTER_HTTP_BODY',
    BEFORE_REGISTER_HTTP_COOKIE: 'BEFORE_REGISTER_HTTP_COOKIE',
    BEFORE_REGISTER_HTTP_SESSION: 'BEFORE_REGISTER_HTTP_SESSION',
    BEFORE_REGISTER_PASSPORT: 'BEFORE_REGISTER_PASSPORT',
    AFTER_INIT_BASIC_MIDDLEWARE: 'AFTER_INIT_BASIC_MIDDLEWARE'
};

HTTPServer.STATIC_RESOURCES_DIR = "public";

/**
 * Exporting HTTP Server
 */
module.exports = HTTPServer;
