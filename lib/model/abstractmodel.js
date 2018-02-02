
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring core Events module
 */
const events = require('events');

/**
 * Requiring application Facade
 */
const applicationFacade = require('../facade.js').ApplicationFacade.instance;

/**
 *  Abstract model. Define main collection interface.
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 *  @abstract
 */
class AbstractModel extends events.EventEmitter {

    /**
     * AbstractModel constructor
     */
    constructor (collectionName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super();

        this._collectionName = collectionName;

        /**
         * Requiring system logger
         *
         * @type {Logger|exports|module.exports}
         * @private
         */
        this._logger = applicationFacade.logger;
    }

    /**
     * Collection name
     *
     * @returns {*}
     */
    get collectionName () {
        return this._collectionName;
    }

    /**
     * Initialize collection
     *
     * @abstract
     */
    init () {
        throw new Error("[AbstractModel] Collection initialization is not redefined!");
    }

    /**
     * Get model for collection
     *
     * @abstract
     */
    get model () {
        throw new Error("[AbstractModel] Model initialization is not redefined!");
    }

    /**
     * Returns all items for list
     *
     * @abstract
     */
    getAll (callback, populate) {
        throw new Error("[AbstractModel] getAll() method is not defined!");
    }

    /**
     * Returns one item for specified criteria
     */
    findOne (criteria, callback, populate) {
        throw new Error("[AbstractModel] findOne() method is not defined!");
    }

    /**
     * Returns one document for specified ID
     */
    findById (id, callback, populate) {
        throw new Error("[AbstractModel] findById() method is not defined!");
    }

    /**
     * Returns filtered, sorted and pages list of items
     *
     * @param {*} filters
     * @param {*} populations
     * @param {*} pagination
     * @param {*} sort Array of sortings {field: "field name", order: "asc|desc|1|-1"}
     * @param {*} callback
     */
    getList (filters, populations, pagination, sort, callback) {
        throw new Error("[AbstractModel] getList method is not defined!");
    }

    /**
     * Returns count of items for filters set
     *
     * @param {*} filters
     * @param {*} callback
     */
    getListCount (filters, callback) {
        throw new Error("[AbstractModel] getListCount method is not defined!");
    }

    /**
     * Saves item into the store
     *
     * @param {*} itemDetails
     * @param {*} callback
     */
    save (itemDetails, callback) {
        throw new Error("[AbstractModel] save method is not defined!");
    }

    /**
     * Removes specified document from the storage
     */
    remove (itemDetails, callback) {
        throw new Error("[AbstractModel] remove() method is not defined!");
    }

    /**
     * Removes one document with specified ID
     */
    removeById (id, callback) {
        throw new Error("[AbstractModel] removeById() method is not defined!");
    }

}

/**
 * Exporting model definition
 */
module.exports =  AbstractModel;
