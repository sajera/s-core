
/**
 * native Node.js modules
 * @ignore
 */
// const querystring = require('querystring');
const http = require('http');
// const url = require('url');

/**
 * implementation ModuleInterface
 * @ignore
 */
const ModuleBase = require('./modulebase');

/**
 * utilities of library
 * @ignore
 */
// const utils = require('../utilities/utilities')
//     , handleAsAsync = utils.handleAsAsync
//     , is = utils.is;

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
 * @see {@link ModuleBase}
 * @public
 * @class
 */
class HttpServer extends ModuleBase {
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
     * @description
        Slice middleware and determine endpoints.
     * @param {Object} request - request
     * @private
     */
    slicingManager ( request ) {
        request;
    }

    /**
     * @description
        Slice middleware and determine endpoints.
     * @param {Object} request - incoming request
     * @param {Object} response - output response
     * @private
     */
    middleware ( request, response ) {
        // console.log('middleware', request, response);
        response.end('dummy');
    }

    /**
     * @description
        Initialization of Http server. Define midlevare manager (Router).
     * @return {Promise}
     * @private
     */
    initialize () {
        return new Promise( resolve => {
            // setup handler for middleware
            const server = http.createServer(this.middleware);
            // setup server configuration
            server.listen({
                host: this.host,
                port: this.port,
                exclusive: this.exclusive
            }, () => {
                resolve.bind(null);
                // store server in instance
                this.server = server;
                // define error listener
                server.on('error', HttpServer.stop.bind(HttpServer));
                // change status
                this.status = HttpServer.STATUS.PROCESS;
            });
        });
    }

    /**
     * @example Core.HttpServer.STATUS
     * @typedef {Object} HttpServer.STATUS
     * @property {String} INITIAL - Not started (dafaults)
     * @property {String} STOPPED - server is stoped manualy
     * @property {String} PROCESS - server working fine, we can continue
     * @property {String} TERMINATED - server is stopped with exception reasons
     */

    /**
     * @description
        HttpServer can be in couple technical states so as
        <br/><br/> <strong> Availabel Core.HttpServer.STATUS </strong>
        <br/> 0. INITIAL - Not started (dafaults)
        <br/> 1. STOPPED - server is stoped manualy
        <br/> 2. PROCESS - server working fine, we can continue
        <br/> 3. TERMINATED - server is stopped with exception reasons
        <br/><br/>
     * @type {HttpServer.STATUS}
     * @private
     */
    static get STATUS () {
        return {
            INITIAL: 'INITIAL',
            STOPPED: 'STOPED',
            PROCESS: 'PROCESS',
            TERMINATED: 'TERMINATED'
        };
    }

    /**
     * @description
        Stop HttpServer. Server can be stoped with reason or not.
        <br/><br/> <strong> Availabel HttpServer.STATUS </strong>
        <br/> STOPPED - server is stoped
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
                    logger.info(`HttpServer was stopped with STATUS "${HttpServer.instance.status}"`, error);
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
