
/**
 * @description
    Point - provide functionality to determine endpoint of http request by url
    {:path} - required - /(static name)/(dinamic data)/
    {?:path} - not required - /(static name - required even if its value is not obligatory)/(dinamic data)/
    {-:path} - convert to one part of query - /(expecting dinamic data)/
    {-?:path} - convert to one part of query - not required - /(expecting dinamic data)/
 * @author Sajera <allsajera@gmail.com>
 * @param {String} expression - human understandable expression to determine url endpoint
 * @param {ControllerInterface} Controller
 * @classdesc Core.utils.HttpPoint
 * @alias HttpPoint
 * @private
 * @class
 */
class HttpPoint {
    /**
     * @constructor
     */
    constructor ( expression, Controller ) {
        // endpoint Controller
        this.Controller = Controller;
        // store origin expresion
        this.expression = expression;
        // prepare storage for parameters matcher
        this.params = {};
        // order is a position in array of result
        var paramOrder = 1;
        // make an matcher for a comparison with the query string
        this.matcher = new RegExp('^'+expression.replace(/\{[^}]*}\/?/gi, humanised => {
            // get a properties name
            let name = humanised.replace(/[\W]/gi,'');
            // flags for this parameter
            let flags = humanised.replace(/[\w\:\/\{\}]/gi,'');
            // get a requirement of parameter
            let required = !/\?/.test(flags);
            // order of parameter
            this.params[name] = paramOrder++;
            /*-------------------------------------------------
                make expression for part of query string
            ---------------------------------------------------*/
            let pattern = /\-/.test(flags) ? (required ? '' : '?') : name+'/'+(required ? '' : '?');
            return pattern+'([^\\W]+)'+(required ? '' : '?')+'/';
        })+'?$', 'i');
    }

    /**
     * @description
        Endpoints should be <strong> sorted </strong>.
        <br/> To test longest match first then shorten.
        <br/> To prevent short queries which overhead the longest query with the same part
     * @returns {Number}
     * @protected
     * @readonly
     * @public
     */
    get order () {
        return this.expression.length;
    }

    /**
     * compare query with this endpoint (fast)
     *
     * @param {String} query - parsed url - pathname
     * @returns {Boolean}
     */
    compare ( query ) {
        return this.matcher.test( query );
    }

    /**
     * get a query params from url
     *
     * @param {String} query - parsed url - pathname
     * @returns {Object}
     */
    matchParams ( query ) {
        let result = {};
        let intermediate = query.match( this.matcher );
        if ( intermediate ) {
            for ( let name in this.params ) {
                result[name] = intermediate[this.params[name]];
            }
        }
        return result;
    }

}

/**
 * exports HttpPoint
 */
module.exports = HttpPoint;
