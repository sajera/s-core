
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring application Facade
 */
const applicationFacade = require('./../facade.js').ApplicationFacade.instance;

/**
 * Requiring core Events module
 */
const AbstractModel = require('./abstractmodel.js');

/**
 * Requiring Async library
 *
 * @type {async|exports|module.exports}
 */
const async = require('async');

/**
 *  Abstract model. Define main collection interface.
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 *  @abstract
 */
class MongooseModel extends AbstractModel {

    /**
     * MongooseModel constructor
     */
    constructor (collectionName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(collectionName);

        /**
         * Mongoose Instance
         *
         * @type {*|mongoose|module.exports|*}
         * @private
         */
        this._mongooseModule = applicationFacade.mongoose;
        this._mongoose = applicationFacade.mongoose.mongoose;
        this._connection = applicationFacade.mongoose.connection;

        /**
         * Mongoose Schema Object
         *
         * @type {null}
         * @private
         */
        this._schema = null;

        /**
         * Schema definition object
         *
         * @type {object}
         * @private
         */
        this._schemaDefinition = null;
    }

    /**
     * Get Mongoose instance
     *
     * @returns {*|mongoose|module.exports|*}
     */
    get mongoose () {
        return this._mongoose;
    }

    /**
     * Get Mongoose Connection instance
     *
     * @returns {*|mongoose|module.exports|*}
     */
    get connection () {
        return this._connection;
    }

    /**
     * Get Mongoose model for current collection
     *
     * @returns {*|mongoose|module.exports|*}
     * @override
     */
    get model () {
        if (this._model == null) {
            this._model = this._connection.model(this._collectionName);
        }

        return this._model;
    }

    /**
     * Get Mongoose model for current list
     *
     * @returns {*|mongoose|module.exports|*}
     */
    get schema () {
        if (this._schema == null && this.model != null) {
            this._schema = this.model.schema;
        }

        return this._schema;
    }

    /**
     * Simple schema registration
     *
     * @param schemaDefinition Optional parameter
     * @param collectionName Optional parameter
     */
    createSchema (schemaDefinition, collectionName) {
        /**
         * Valid mongoose schema
         */
        if (schemaDefinition) {
            this._schemaDefinition = schemaDefinition;
        }

        /**
         * Mongoose collection name
         */
        if (collectionName) {
            this._collectionName = collectionName;
        }

        if (!this._schemaDefinition) {
            throw new Error("## Schema for collection [" + this.collectionName + "] not found.");
        }

        try {
            /**
             * Creating Schema within mongoose
             *
             * @type {*|{mongo}}
             * @private
             */
            var schemaObject = this.mongoose.Schema(this._schemaDefinition);

            // Define toJSON transformation
            schemaObject.options.toJSON = {
                transform: function(doc, ret, options) {
                    ret.id = ret._id;
                    delete ret._id;
                    delete ret.__v;

                    return ret;
                }
            };

            /**
             * Registering Schema within mongoose
             *
             * @type {*|{mongo}}
             * @private
             */
            this._model = this._connection.model(this._collectionName, schemaObject);

        } catch (exception) {
            if (exception.name = "OverwriteModelError") {
                this._logger.warn("[WARN] Schema already defined for collection [%s]", this._collectionName);
            } else {
                throw exception;
            }

            /*
            if (exception.name = "MissingSchemaError") {
                ;
            }
            */
        }

        // Initializing schema from valid object
        this._schema = this.model.schema;

        return this._schema;
    }

    /**
     * Initialize collection
     *
     * @abstract
     */
    init () {
        throw new Error("[MongooseModel] Collection schema initialization is not redefined!");
    }

    /**
     * Returns all items for list
     *
     * @abstract
     */
    getAll (callback, populate) {
        this.model.find({}).populate(populate || '').exec((error, items) => {
            if (error != null) {
                callback(error);
            } else {
                callback(null, items);
            }
        });
    }

    /**
     * Returns one item for specified criteria
     */
    findOne (criteria, callback, populate) {
        this.model.findOne(criteria).populate(populate || '').exec((error, item) => {
            if (error != null) {
                callback(error);
            } else {
                callback(null, item);
            }
        });
    }

    /**
     * Returns one item for specified criteria
     */
    find (criteria, callback, populate) {
        this.model.find(criteria).populate(populate || '').exec((error, items) => {
            if (error != null) {
                callback(error);
            } else {
                callback(null, items);
            }
        });
    }

    /**
     * Returns one document for specified ID
     */
    findById (id, callback, populate) {
        this.model.findById(id).populate(populate || '').exec((error, item) => {
            if (error != null) {
                callback(error);
            } else {
                callback(null, item);
            }
        });
    }

    /**
     * Validating filters to meet Mongo requirements
     *
     * @param filters
     * @returns {*}
     */
    validateFilters (filters) {
        return filters;
    }

    /**
     * Validating Sort to meet Mongo requirements
     *
     * @param sort
     * @returns {*}
     */
    validateSort (sort) {
        return sort;
    }

    /**
     * Returns filtered, sorted and pages list of items
     *
     * @param filters
     * @param populations
     * @param pagination <code>pagination = {currentPage: int, pageSize: int}</code>
     * @param sort Array of sortings {field: "field name", order: "asc|desc|1|-1"}
     * @param callback
     * @override
     */
    getList (filters, populations, pagination, sort, callback) {
        var mongoQuery = this.model.find(this.validateFilters(filters));

        // Check sort
        if (sort) {
            mongoQuery = mongoQuery.sort(this.validateSort(sort));
        }

        // Check populations
        if (populations) {
            mongoQuery = mongoQuery.populate(populations);
        }

        // Check pagination
        if (pagination && pagination.pageSize && pagination.currentPage >= 1) {
            mongoQuery = mongoQuery.limit(pagination.pageSize);
            mongoQuery = mongoQuery.skip(pagination.pageSize * (pagination.currentPage - 1));
        }

        mongoQuery.exec(callback);
    }

    /**
     * Returns count of items for filters set
     *
     * @param filters
     * @param callback
     */
    getListCount (filters, callback) {
        this.model.count(filters, (error, itemsCount) => {
            callback(error, itemsCount);
        });
    }

    /**
     * Insert item to the list
     */
    insert (details, callback) {
        var ItemClass = this.model;
        var itemObject = new ItemClass(details);
        itemObject.save(details, function(error) {
            if (error != null) {
                if (callback != null) {
                    callback(error);
                }
            } else {
                if (callback != null) {
                    callback(null, itemObject);
                }
            }
        });
    }

    /**
     * Saves item into the store
     *
     * @param itemDetails
     * @param callback
     */
    save (itemDetails, callback) {
        itemDetails.save((error) => {
            if (error) {
                return asyncCallback(new HTTPError("Failed to save data from data storage", 500));
            }

            callback();
        });
    }

    /**
     * Removes specified document from the storage
     */
    remove (itemDetails, callback) {
        itemDetails.remove((error) => {
            if (error) {
                return asyncCallback(new HTTPError("Failed to delete data from data storage", 500));
            }

            callback();
        });
    }

    /**
     * Removes one document with specified ID
     */
    removeById (id, callback) {
        var locals = {};
        async.series([
            asyncCallback => {
                this.findById(id, (error, item) => {
                    if (error) {
                        return asyncCallback(new HTTPError("Failed to obtain data from storage", 500));
                    }

                    locals.itemDetails = item;
                    asyncCallback();
                });
            },
            asyncCallback => {
                // Define how to delete item from
                if (locals.itemDetails != null) {
                    locals.itemDetails.remove((error) => {
                        if (error) {
                            return asyncCallback(new HTTPError("Failed to delete data from data storage", 500));
                        }

                        asyncCallback();
                    });
                } else {
                    asyncCallback();
                }
            }
        ], (error) => {
            callback(error, locals.itemDetails);
        });
    }
}

/**
 * Exporting model definition
 */
module.exports =  MongooseModel;
