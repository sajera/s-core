
/**
 * @description
    Params provide ability to preapare request data before delegate to controller.
 * @author Sajera <allsajera@gmail.com>
 * @param {Object} request - node server HttpRequest
 * @param {Object} response - node server HttpResponse
 * @param {Object} urlParams - parameters from url {@link HttpPoint#matchParams}
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
        this.response = response;
        this.params = urlParams;

    }

}

/**
 * exports HttpParams
 */
module.exports = HttpParams;
