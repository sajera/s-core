
// Using STRICT mode for ES6 features
"use strict";

// Require base Error implementation
const BaseError = require('./error.js');

/**
 *  Loader error
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 */
class LoaderError extends BaseError {

    /**
     * Error constructor
     */
    constructor (message, id) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(message, id);

        this._name = 'Error.Loader';
    }
}

/**
 * Exporting Module
 */
module.exports = LoaderError;
