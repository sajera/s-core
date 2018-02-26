
/**
 * native Node.js modules
 * @ignore
 */
const http = require('http');
const url = require('url');

/**
 * implementation ModuleInterface
 * @ignore
 */
const Singleton = require('./singleton');
/**
 * controller interface
 * TODO connect HttpController
 * @ignore
 */
const HttpController = require('../interfaces/controller');

/**
 * utilities of library
 * @ignore
 */
const utils = require('../utilities/utilities'),
    handleAsPromise = utils.handleAsPromise,
    HttpParams = utils.HttpParams,
    errorLabel = utils.errorLabel,
    successLabel = utils.successLabel,
    highlightLabel = utils.highlightLabel,
    HttpPoint = utils.HttpPoint,
    is = utils.is;

/**
 * @description
    Implement default http server within the Core.
    <br/><br/> <strong> Bootstrap </strong>
    <br/> 1. define middleware slicer
    <br/> 2. Run http server
    <br/> 3. Provide ability to define controller to endpoints
    <br/><br/>
 * @example
 * class MyHttpServer extends Core.HttpServer {
 *  ...
 * }
 * ...
 * class MyBootstrap extends Core.Bootstrap {
 *  constructor () {
 *      super();
 *      this.root = MyHttpServer;
 *  }
 * }
 * @author Sajera <allsajera@gmail.com>
 * @implements {ModuleInterface}
 * @classdesc Core.HttpServer
 * @see {@link Singleton}
 * @public
 * @class
 */
class HttpServer extends Singleton {
    /**
     * @constructor
     */
    constructor () {
        // this
        super();
        /**
         * @description
            Correct access to Core.instance. Must wait until Core will be created.
         * @type {Core}
         * @readonly
         * @private
         */
        this.core = require('../core').instance;

        /**
         * @description
            server status {@link HttpServer.STATUS}
         * @type {String}
         * @readonly
         * @private
         */
        this.status = HttpServer.STATUS.INITIAL;

        /**
         * @description define class to prepare controller parameters
         * @type {Function}
         */
        this.Params = HttpParams;
    }

    /**
     * @description
        List of unique middleware {@link HttpPoint} matchers.
     * @type {Array.<HttpPoint>}
     * @readonly
     * @private
     */
    get points () {
        let def = is.array(HttpServer.points) ? HttpServer.points : [];
        let custom = is.array(this.construtor.points) ? this.construtor.points : [];
        return [].concat(def).concat(custom).sort((a, b) => b.order-a.order);
    }

    /**
     * @description
        Provide ability to define <strong> endpoints </strong>
        <br/><br/>
     * @example
     * Core.HttpServer.defineEndpoint(expression, Controller);
     * @param {HttpPoint} expression - {@link HttpPoint}
     * @param {HttpController} Controller - {@link ControllerInterface}
     * @public
     */
    static defineEndpoint ( expression, Controller ) {
        let test = new Controller('instanceof');
        if (test instanceof HttpController) {
            // create for first
            if (!is.array(this.construtor.points) ) {
                this.construtor.points = [];
            }
            let point = new HttpPoint(expression, Controller);
            // add point
            this.construtor.points.push(point);
        } else {
            throw new Error(`
                Controller "${Controller.name}" should implement Controller Interface.
                Please use inheritance from Core.HttpController.
            `);
        }
    }

    /**
     * @description
        Slice middleware and determine endpoints.
     * @param {Object} request - incoming request
     * @param {Object} response - output response
     * @private
     */
    middleware ( request, response ) {
        try {
            let { Params, points } = this;
            // prepare url to match
            let parsedURL = url.parse(request.url);
            // default endpoints
            // TODO default endpoint
            let endpoint = {Controller: function () {}};
            // find endpoint
            for ( let point of points ) {
                if ( point.compare(parsedURL.pathname) ) {
                    endpoint = point;
                    break;
                }
            }
            // match parameters from url
            let urlParams = endpoint.matchParams(parsedURL.pathname);
            // NOTE prepare params
            let params = new Params(request, response, urlParams);
            // run endpoint controller
            endpoint.Controller.create( params )
                .then(() => {
                    // handle success endpoint life cycle
                })
                .catch(error => {
                    // handle error endpoint life cycle
                });
        } catch ( error ) {
            this.core.logger.error(errorLabel('HttpServer: middleware'), 'Unhandled exception of execution', error);
            // execution unhandled exception
            response.end('');
        }

    }

    /**
     * @description
        Initialization of Http server. Define middleware manager (Router).
     * @return {Promise}
     * @private
     */
    initialize () {
        return new Promise( (resolve, reject) => {
            // setup handler for middleware
            const server = http.createServer(this.middleware.bind(this));
            // setup server configuration
            let config = {
                host: this.host,
                port: this.port,
                exclusive: this.exclusive
            };
            handleAsPromise(server.listen.bind(server, config))
                .then(() => {
                    // store server in instance
                    this.server = server;
                    // define error listener
                    server.on('error', HttpServer.stop.bind(HttpServer));
                    // change status
                    this.status = HttpServer.STATUS.PROCESS;
                    //
                    this.core.logger.info(
                        successLabel('HttpServer: initialize'),
                        `HTTP Server was initialized successfully at PORT: ${config.port} | HOST: ${config.host} | EXCLUSIVE: ${config.exclusive}`
                    );
                    // server starting
                    resolve(server);
                })
                // delegate error
                .catch(reject);
        });
    }

    /**
     * @description logic to determine server port
     * @see {@link https://nodejs.org/api/http.html#http_server_listen | Node http}
     * @type {Number}
     * @public
     */
    get port () {
        // eslint-disable-next-line
        let { _port, _PORT } = process.env;
        let { port, PORT } = this.core.config;
        return port || PORT || _port || _PORT || 80;
    }

    /**
     * @description logic to determine server host
     * @see {@link https://nodejs.org/api/http.html#http_server_listen | Node http}
     * @type {String}
     * @public
     */
    get host () {
        // eslint-disable-next-line
        let { _host, _HOST } = process.env;
        let { host, HOST } = this.core.config;
        return host || HOST || _host || _HOST || '::';
    }

    /**
     * @description logic to determine server exclusive
     * @see {@link https://nodejs.org/api/http.html#http_server_listen | Node http}
     * @type {Boolean}
     * @public
     */
    get exclusive () {
        // eslint-disable-next-line
        let { _exclusive, _EXCLUSIVE } = process.env;
        let { exclusive, EXCLUSIVE } = this.core.config;
        return exclusive || EXCLUSIVE || _exclusive || _EXCLUSIVE || false;
    }

    /**
     * @example Core.HttpServer.STATUS
     * @typedef {Object} HttpServer.STATUS
     * @property {String} INITIAL - Not started (defaults)
     * @property {String} STOPPED - server is stopped manually
     * @property {String} PROCESS - server working fine, we can continue
     * @property {String} TERMINATED - server is stopped with exception reasons
     */

    /**
     * @description
        HttpServer can be in couple technical states so as
        <br/><br/> Available <strong> Core.HttpServer.STATUS </strong>
        <br/> 0. INITIAL - Not started (defaults)
        <br/> 1. STOPPED - server is stopped manually
        <br/> 2. PROCESS - server working fine, we can continue
        <br/> 3. TERMINATED - server is stopped with exception reasons
        <br/><br/>
     * @type {HttpServer.STATUS}
     * @private
     */
    static get STATUS () {
        return {
            INITIAL: 'INITIAL',
            STOPPED: 'STOPPED',
            PROCESS: 'PROCESS',
            TERMINATED: 'TERMINATED'
        };
    }

    /**
     * @description
        Stop HttpServer. Server can be stopped with reason or not.
        <br/><br/> <strong> Available HttpServer.STATUS </strong>
        <br/> STOPPED - server is stopped
        <br/> TERMINATED - server is stopped with exception reasons
        <br/><br/>
     * @example
     * // stop
     * Core.HttpServer.stop();
     * // terminate
     * Core.HttpServer.stop({reason});
     * @param {Object} [error=null] - reason why server is stop
     * @return {Promise}
     * @public
     */
    static stop ( error ) {
        // NOTE handle exception
        return new Promise( resolve => {
            let server = HttpServer.instance.server;
            let logger = HttpServer.instance.core.logger;
            HttpServer.instance.status = error ? HttpServer.STATUS.TERMINATED : HttpServer.STATUS.STOPPED;
            if ( server.listening ) {
                server.close(() => {
                    logger.info(
                        highlightLabel('HttpServer: stop'),
                        `HttpServer was stopped with STATUS "${HttpServer.instance.status}"`,
                        error
                    );
                    resolve();
                });
            } else {resolve();}
        });
    }
}

/**
 * exports Logger
 */
module.exports = HttpServer;
