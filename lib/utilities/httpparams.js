
/**
 * native Node.js modules
 * @ignore
 */
const url = require('url');

/**
 * @description
    Params provide ability to prepare request data before delegate to controller.
 * @author Sajera <allsajera@gmail.com>
 * @param {Object} request - node server HttpRequest
 * @param {Object} response - node server HttpResponse
 * @param {Object} urlParams - parameters from url {@link HttpPoint#matchParams}
 * @param {Object} parsedUrl - parameters from url {@link HttpPoint#matchParams}
 * @classdesc Core.utils.HttpParams
 * @alias HttpParams
 * @private
 * @class
 */
class HttpParams {
    /**
     * @param {Object} request - node server HttpRequest
     * @param {Object} response - node server HttpResponse
     * @param {Object} urlParams - parameters from url {@link HttpPoint#matchParams}
     * @constructor
     */
    constructor ( request, response, urlParams ) {

        // TODO provide default preparation
        this.request = request;
        this.params = urlParams;
        this.response = response;
        this.parsedURL = url.parse(request.url);
    }

}

/**
 * exports HttpParams
 */
module.exports = HttpParams;
