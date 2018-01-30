
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring base view
 *
 * @type {exports|module.exports}
 */
const CoreView = require('./view.js');

/**
 * Requiring application Facade
 */
const applicationFacade = require('../facade.js').ApplicationFacade.instance;

/**
 * Requiring SWIG
 *
 * @type {*|exports|module.exports}
 */
const swig  = require('swig');

/**
 * Lodash swig integration
 *
 * @type {*|exports|module.exports}
 */
const swigLodash = require('swig-lodash');

/**
 * Requiring core filesystem functions
 */
const fs = require('fs');

/**
 * Requiring core path functions
 */
const path = require('path');

/**
 *  Module view. Handle different view types. Apply SWIG templates
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 */
class ModuleView extends CoreView.View {

    /**
     * Default view class
     *
     * @param {string} viewType
     * @param {{}} data
     * @param {string} template
     * @param {*} error
     */
    constructor (viewType, data, template, error) {
        super(viewType, data, template, error);

        var swigDefaults = {
            loader: this.getSwigTemplateLoader()
        };
        if (applicationFacade.config.isDev) {
            swigDefaults.cache = false;
        }
        this._swigEngine = new swig.Swig(swigDefaults);

        // Add all lodash functions
        swigLodash.useFilter(this._swigEngine);
    }

    /**
     * Creates HTML View for specified parameters
     *
     * @param template
     * @param data
     * @param error
     * @returns {View}
     */
    static htmlView (template, data, error) {
        var viewInstance = new ModuleView(CoreView.ViewType.HTML, data, template, error);

        return viewInstance;
    }

    /**
     * Creates JSON View for specified data
     *
     * @param data
     * @param error
     * @returns {View}
     */
    static jsonView (data, error) {
        var viewInstance = new ModuleView(CoreView.ViewType.JSON, data, null, error);

        return viewInstance;
    }

    /**
     * Registers ROOT for templates
     *
     * @param rootDirectory
     * @param priority
     */
    static registerTemplatesRoot (rootDirectory, priority) {
        if (ModuleView._rootDirDefinitions == null) {
            ModuleView._rootDirDefinitions = [];
        }

        var pathNormalized = path.normalize(rootDirectory);
        ModuleView._rootDirDefinitions.push({path: pathNormalized, priority: priority});

        /**
         * Sorting based on the priority
         */
        ModuleView._rootDirDefinitions.sort(function(obj1, obj2) {
            if (obj1.priority > obj2.priority) {
                return 1;
            } else if (obj1.priority < obj2.priority) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    /**
     * Returns template loader for SWIG Templates
     */
    getSwigTemplateLoader () {
        if (this._swigTemplateLoader == null) {
            /**
             * Create SWIG Template loader
             *
             * @param basepath
             * @param encoding
             * @returns {{}}
             * @private
             */
            this._swigTemplateLoader = function (basepath, encoding) {
                var templateLoader = {};
                var $this = this;

                encoding = encoding || 'utf8';
                var templatesBasePath = (basepath) ? path.normalize(basepath) : null;

                /**
                 * Resolves <var>to</var> to an absolute path or unique identifier. This is used for building correct, normalized, and absolute paths to a given template.
                 * @alias resolve
                 * @param  {string} to        Non-absolute identifier or pathname to a file.
                 * @param  {string} [from]    If given, should attempt to find the <var>to</var> path in relation to this given, known path.
                 * @return {string}
                 */
                templateLoader.resolve = function (to, from) {
                    if (templatesBasePath) {
                        from = templatesBasePath;
                    } else {
                        from = (from) ? path.dirname(from) : $this.viewPath;
                    }

                    var fullPath = null;
                    if (ModuleView._rootDirDefinitions != null) {
                        for (var i = 0; i < ModuleView._rootDirDefinitions.length; i++) {
                            var dirDefinition = ModuleView._rootDirDefinitions[i];

                            var tmpPath = path.resolve(dirDefinition.path, to);
                            // console.log('Path: %s, %s, %s', tmpPath, dirDefinition.path, to);
                            if (fs.existsSync(tmpPath)) {
                                fullPath = tmpPath;
                                break;
                            }
                        }
                    }

                    // Traditional path resolving logic
                    if (fullPath == null || !fs.existsSync(fullPath)) {
                        fullPath = path.resolve(applicationFacade.basePath, to);
                        if (!fs.existsSync(fullPath)) {
                            fullPath = path.resolve(from, to);

                            /*
                            if (!fs.existsSync(fullPath)) {
                                // Workaroud to define apps path for current file
                                if (from != null) {
                                    var normalFrom = path.normalize(from);
                                    var appIndex = normalFrom.lastIndexOf(path.sep + 'app' + path.sep);
                                    if (appIndex != -1) {
                                        var moduleRootPath = normalFrom.substr(0, appIndex);
                                        fullPath = path.resolve(moduleRootPath, to);
                                    }
                                }
                            }
                            */
                        }
                    }

                    return fullPath;
                };

                /**
                 * Loads a single template. Given a unique <var>identifier</var> found by the <var>resolve</var> method this should return the given template.
                 * @alias load
                 * @param  {string}   identifier  Unique identifier of a template (possibly an absolute path).
                 * @param  {function} [callback]        Asynchronous callback function. If not provided, this method should run synchronously.
                 * @return {string}               Template source string.
                 */
                templateLoader.load = function (identifier, callback) {
                    if (!fs || (callback && !fs.readFile) || !fs.readFileSync) {
                        throw new Error('Unable to find file ' + identifier + ' because there is no filesystem to read from.');
                    }

                    identifier = templateLoader.resolve(identifier);

                    if (callback) {
                        fs.readFile(identifier, encoding, callback);

                        return;
                    } else {
                        // Read file in synchronous mode
                        return fs.readFileSync(identifier, encoding);
                    }
                };

                return templateLoader;
            }.bind(this);
        };

        // Returning Template loader based on SWIG
        return this._swigTemplateLoader();
    }
};

/**
 * Exporting view classes
 */
module.exports.ModuleView = ModuleView;
