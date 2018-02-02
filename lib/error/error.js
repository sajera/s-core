//
// // Using STRICT mode for ES6 features
// "use strict";
//
// /**
//  *  Base system error
//  *
//  *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
//  */
// class BaseError extends Error {
//
//     /**
//      * Error constructor
//      */
//     constructor (message, id) {
//         // We must call super() in child class to have access to 'this' in a constructor
//         super(message, id);
//
//         this._name = 'Error.Base';
//
//         // Set error ID if defined
//         if (this.id == null && id) {
//             this.id = id;
//         }
//     }
//
//     /**
//      * Returns name of error type
//      */
//     get name () {
//         return this._name;
//     }
//
//     /**
//      * Rewrite basic error string representation
//      *
//      * @returns {string}
//      * @override
//      */
//     toString () {
//         var result = 'ERROR[' + this.name + '] ' + this.message;
//
//         return result;
//     }
// }
//
// /**
//  * Exporting Module
//  */
// module.exports = BaseError;
