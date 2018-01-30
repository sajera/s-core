'use strict';

/**
 * State Controller
 *
 * @type {*|exports|module.exports}
 */
const BaseController = require('../controller.js').Controller;

/**
 * Base view
 *
 * @type {*|View}
 */
const View = require('../view/view.js').View;

/**
 * Require Async helper actions
 *
 * @type {exports|module.exports}
 */
const async = require("async");

/**
 * Require HTTP error
 *
 * @type {HTTPError}
 */
const HTTPError = require('../error/httperror.js');

/**
 *  API Level2 type Controller
 *
 *  Default routes:
 *
 *      'get|/{instances}': 'path-to-api-class.js', // List route
 *      'get,post|/{instances}/:action': 'path-to-api-class.js', // GET single item (get) and INSERT item (post)
 *      'get,post|/{instances}/:id/:action': 'path-to-api-class.js', // UPDATE/DELETE item
 *
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 */
class APIController extends BaseController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * The default page size
         *
         * @type {number}
         * @private
         */
        this._defaultPageSize = 20;

        /**
         * The maximum page size
         *
         * @type {number}
         * @private
         */
        this._maxPageSize = 500;

        /**
         * Current API model instance
         *
         * @type {AbstractModel}
         * @private
         */
        this._model = null;

        /**
         * Mongoose Population fields
         * url: {@link http://mongoosejs.com/docs/populate.html|Mongoose Doc}
         *
         * @type {string}
         * @private
         */
        this._modelPopulateFields = '';

        /**
         * Map of ignored fields from the request
         *
         * @type {{}}
         * @private
         */
        this._ignoredRequestFieldsMap = {};

        /**
         * Current data items
         *
         * @type {{}}
         */
        this.data = {};
    }

    /**
     * Current model for API calls
     *
     * @returns {AbstractModel}
     */
    get model() {
        return this._model;
    }

    /**
     * Current model populate fields
     *
     * @returns {string}
     */
    get modelPopulateFields() {
        return this._modelPopulateFields;
    }

    /**
     * Current default page size
     *
     * @returns Number
     */
    get defaultPageSize() {
        return this._defaultPageSize;
    }

    /**
     * Current maximum page size
     *
     * @returns Number
     */
    get maxPageSize() {
        return this._maxPageSize;
    }

    /**
     * Start application
     *
     * @override
     */
    start (callback) {
        this.initView()

        callback();
    }

    /**
     * Initialize View for API
     */
    initView() {
        this.setView(View.jsonView());
    }

    /**
     * Calculates current data page
     *
     * @returns Number
     */
    getCurrentPage() {
        if (this.request.query && this.request.query.page) {
            return parseInt(this.request.query.page, 10);
        }

        return 1;
    }

    /**
     * Calculates page size for current request
     *
     * @returns Number
     */
    getPageSize() {
        var result = this.defaultPageSize;

        // Check page sizing parameters in the query
        if (this.request.query && this.request.query.limit) {
            var limit = parseInt(this.request.query.limit, this.defaultPageSize);

            if (limit > this.maxPageSize) {
                limit = this.maxPageSize;
            }

            if (limit === 0) {
                limit = 1;
            }

            result = limit;
        }

        return result;
    }

    /**
     * Returns pagination object
     *
     * @returns {{}}
     */
    getPagination() {
        return {
            currentPage: this.getCurrentPage(),
            pageSize: this.getPageSize()
        };
    }

    /**
     * Returns filters
     *
     * @todo Apply proper filtering
     * @returns {{}}
     */
    getFilters() {
        var result = {
            search: {
                searchFields: [],
                searchValue: null
            }
        };
        if (this.model.responseFields) {
            this.model.responseFields.forEach(function (field) {
                if (this.request.query.filter && typeof this.request.query.filter[field] !== 'undefined') {
                    result.search.searchFields.push(field);
                    result.search.searchValue = this.request.query.filter[field];
                }
            }.bind(this));
        }

        // Return empty filters as of now
        return {};
    }

    /**
     * Returns Sorting
     *
     * @todo Apply proper sorting
     * @returns {{}}
     */
    getSort() {
        var result = {};

        return result;
    }

    /**
     * Getter for Item ID parameter
     *
     * @returns {*}
     */
    get itemId() {
        var result = null;

        if (this.request.params.id) {
            result = this.request.params.id;
        }

        return result;
    }

    /**
     * Get name of current action. Redeclare action for base Controller.
     *
     * @returns {null|string|*}
     */
    get actionName () {
        var result = this.request.params.action;

        if (!result && this.request.params.id) {
            if (this._allowedActions && this._allowedActions[this.request.params.id] != null) {
                result = this.request.params.id;
                this._logger.log('APIController. Reinitialize action to: %s', result);
            }
        }

        return result;
    }

    /**
     * Initialize main actions
     *
     * @param readyCallback
     * @abstract
     */
    load(readyCallback) {
        var requestMethod = (this.request && this.request.method) ? this.request.method.toLowerCase() : null;

        // Apply corresponding items depending on the HTTP METHOD
        switch (requestMethod) {
            case 'get':
                /*
                if (!this.request.params.id) {
                    return readyCallback(new HTTPError("Bad Request. Item ID is not defined for GET.", 400));
                }
                */
                if (this.request.params.id) {
                    // Get corresponding item
                    this.loadItem(readyCallback);
                } else {
                    // Load items list
                    this.loadItems(readyCallback);
                }

                break;

            case 'post':
                // Insert new item
                this.insertItem(readyCallback);
                break;

            case 'put':
                // Update existing item
                this.updateItem(readyCallback);
                break;

            case 'patch':
                // Partially update existing item
                this.patchItem(readyCallback);
                break;

            case 'delete':
                // Delete existing item
                this.deleteItem(readyCallback);
                break;
        }

    }

    /**
     * Load single item and return data
     *
     * @param readyCallback
     */
    loadItem(readyCallback) {
        var itemId = this.request.params.id.substring(0, 24);

        this.model.findById(itemId, (error, item) => {
            if (error) {
                this.logger.error(error);
                this.getView().error = {message: "Failed to load item from data source"};

                return readyCallback(error);
            }

            this.getView().data = item;
            readyCallback();
        }, this.modelPopulateFields);
    }

    /**
     * Load list of items
     *
     * @param readyCallback
     */
    loadItems(readyCallback) {
        var populations = this.modelPopulateFields;
        var pagination = this.getPagination();
        var filters = this.getFilters();
        var sort = this.getSort();

        var responseData = {};
        responseData.currentPage = pagination.currentPage;
        responseData.pageSize = pagination.pageSize;
        responseData.sort = sort;
        responseData.filters = filters;

        async.series([
            asyncCallback => {
                this.model.getListCount(filters, (error, itemsCount) => {
                    if (error) {
                        this.logger.error(error);
                        this.getView().error = {message: "Failed to get items count"};

                        return readyCallback(error);
                    }

                    responseData.totalCount = itemsCount;
                    responseData.totalPages = Math.ceil(itemsCount / pagination.pageSize);
                    asyncCallback();
                });
            },
            asyncCallback => {

                this.model.getList(filters, populations, pagination, sort, (error, items) => {
                    if (error) {
                        this.logger.error(error);
                        this.getView().error = {message: "Failed to get items list"};

                        return readyCallback(error);
                    }

                    responseData.items = items;
                    asyncCallback();
                });
            }
        ], (error) => {
            if (error) {
                // Something went wrong. Action is failed.
            } else {
                // OK
                this.getView().data = responseData;
            }

            readyCallback(error);
        });
    }

    /**
     * Collect Item before Insert
     *
     * @param readyCallback
     */
    collectInsert (readyCallback) {
        var itemDetails = {};

        for (var itemName in this.request.body) {
            // Ignoring some request fields
            if (this._ignoredRequestFieldsMap && this._ignoredRequestFieldsMap[itemName] != null) {
                continue;
            }

            itemDetails[itemName] = this.request.body[itemName];
        }

        readyCallback(null, itemDetails);
    }

    /**
     * Process item after save
     *
     * @param itemDetails
     * @param readyCallback
     */
    afterInsert (itemDetails, readyCallback) {
        readyCallback(null, itemDetails);
    }

    /**
     * Insert single item and return data
     *
     * @param readyCallback
     */
    insertItem(readyCallback) {
        var locals = {};
        async.series([
            asyncCallback => {
                this.collectInsert((error, item) => {
                    if (error != null) {
                        return asyncCallback(error);
                    }

                    locals.item = item;
                    asyncCallback();
                });
            },
            asyncCallback => {
                this.model.insert(locals.item, (error, itemDetails) => {
                    if (error) {
                        this.logger.error(error);

                        return readyCallback(new HTTPError("Failed to insert new record to the storage", 500));
                    }

                    locals.itemDetails = itemDetails;
                    asyncCallback();
                });
            },
            asyncCallback => {
                this.afterInsert(locals.itemDetails, asyncCallback);
            }
        ], (error) => {
            if (error) {
                // Something went wrong. Action is failed.
            } else {
                // OK
                this.getView().data = locals.itemDetails;
            }

            readyCallback(error);
        });
    }

    /**
     * Collect Item before Update
     *
     * @param sourceItem
     * @param readyCallback
     */
    collectUpdate (sourceItem, readyCallback) {

        for (var itemName in this.request.body) {
            // Ignoring some request fields
            if (this._ignoredRequestFieldsMap && this._ignoredRequestFieldsMap[itemName] != null) {
                continue;
            }

            if (this.request.body[itemName]) {
                sourceItem[itemName] = this.request.body[itemName];
            } else {
                sourceItem[itemName] = null;
            }
        }

        readyCallback(null, sourceItem);
    }

    /**
     * Process item after update
     *
     * @param itemDetails
     * @param readyCallback
     */
    afterUpdate (itemDetails, readyCallback) {
        readyCallback(null, itemDetails);
    }

    /**
     * Update single item and return data
     *
     * @param readyCallback
     */
    updateItem(readyCallback) {
        var locals = {};
        async.series([
            asyncCallback => {
                this.model.findById(this.itemId, (error, item) => {
                    if (error != null) {
                        return asyncCallback(error);
                    }

                    if (item == null) {
                        return readyCallback(new HTTPError("Item is not found in the storage", 500));
                    }

                    locals.itemDetails = item;
                    asyncCallback();
                });
            },
            asyncCallback => {
                this.collectUpdate(locals.itemDetails, (error, item) => {
                    if (error != null) {
                        return asyncCallback(error);
                    }

                    locals.item = item;
                    asyncCallback();
                });
            },
            asyncCallback => {
                this.model.save(locals.item, (error, itemDetails) => {
                    if (error) {
                        this.logger.error(error);

                        return readyCallback(new HTTPError("Failed to update record in the storage", 500));
                    }

                    asyncCallback();
                });
            },
            asyncCallback => {
                this.afterUpdate(locals.item, asyncCallback);
            }
        ], (error) => {
            if (error) {
                // Something went wrong. Action is failed.
            } else {
                // OK
                this.getView().data = locals.item;
            }

            readyCallback(error);
        });
    }

    /**
     * Patch parts of single item and return data
     *
     * @param readyCallback
     */
    patchItem(readyCallback) {
        readyCallback(new Error("Patch method is not implemented"));
    }

    /**
     * Delete single item and return data
     *
     * @param readyCallback
     */
    deleteItem(readyCallback) {

        var itemId = this.request.params.id.substring(0, 24);
        this.model.removeById(itemId, (error, itemDetails) => {
            if (error) {
                // Something went wrong. Action is failed.
            } else {
                // OK
                if (itemDetails != null) this.getView().data = itemDetails;
            }

            readyCallback(error);
        });
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = APIController;
