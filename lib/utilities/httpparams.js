
/**
 * @description
    Params provide ability to preapare request data before delegate to controller.
 * @author Sajera <allsajera@gmail.com>
 * @param {Object} request - node server HttpRequest
 * @param {Object} response - node server HttpResponse
 * @classdesc Core.utils.HttpParams
 * @alias HttpParams
 * @private
 * @class
 */
class HttpParams {
    /**
     * @constructor
     */
    constructor ( request, response ) {

        // TODO provide default preparation
        this.request = request;
        this.response = response;

    }

}

/**
 * exports HttpParams
 */
module.exports = HttpParams;
