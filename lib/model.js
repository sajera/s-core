
// Using STRICT mode for ES6 features


/**
 * Requiring core Events module
 */
const events = require('events');

/**
 * Path module
 */
const path = require('path');

/**
 * File systems module
 */
const fs = require('fs');

/**
 *  Model manager. Load models and register it in the system.
 *
 *  @author Eugene A. Kalosha <ekalosha@dfusiontech.com>
 */
class Model extends events.EventEmitter {

    /**
     * Model manager constructor
     */
    constructor () {
        // We must call super() in child class to have access to 'this' in a constructor
        super();

        /**
         * Requiring system logger
         *
         * @type {Logger|exports|module.exports}
         * @private
         */
        this._logger = require('./logger.js');
        this._logger.log('## Initializing Model Manager');

        /**
         * Base path for models
         *
         * @type {string}
         */
        this.modelsPath = path.dirname(process.mainModule.filename) + '/app/models/';

        /**
         * Collections Map
         *
         * @type {{}}
         * @private
         */
        this._collections = {};
    }

    /**
     * Loading models for some path
     *
     * @param modelsPath
     */
    loadModels (modelsPath) {
        var applicationFacade = require('./facade.js').ApplicationFacade.instance;

        var normalizedPath = modelsPath;
        if (!fs.existsSync(normalizedPath)) {
            this._logger.info('## Models Dir is not exists [%s]. Trying another one.', normalizedPath);
            if (fs.existsSync(applicationFacade.basePath + '/' + normalizedPath)) {
                normalizedPath = applicationFacade.basePath + '/' + normalizedPath;
            }
        }

        normalizedPath = fs.realpathSync(normalizedPath);
        this._logger.info('## Get realpath of models directory: [%s]', normalizedPath);
        this._logger.debug('---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------');

        // Loading models
        fs.readdirSync(normalizedPath).forEach((file) => {
            var fileInfo = path.parse(file);
            if (fileInfo.ext == '.js') {
                this._logger.info('Loading model: %s', modelsPath + '/' + file);
                this.registerModel(fileInfo.name, normalizedPath + '/' + file);
            } else {
                this._logger.debug('    @@@@ File %s is not js file. Ignoring.', file);
            }
        });
    }

    /**
     * Registering model by its definition and name
     *
     * @param collectionName
     * modelDefinition
     */
    registerModel(collectionName, modelDefinition) {
        if (typeof modelDefinition == "function") {
            var collectionInstance = new modelDefinition(collectionName);
            collectionInstance.init();

            // Set instance of the model
            this._collections[collectionName] = collectionInstance;
        } else {
            this.collection(collectionName, modelDefinition);
        }
    }

    /**
     * Returns collection instance
     *
     * @param collectionName
     */
    collection (collectionName, collectionFile) {
        // Check collection
        if (this._collections[collectionName] == null) {
            var CollectionClass = this.getModelClassDefinition(collectionName, collectionFile);

            /**
             * Initializing model instance
             */
            var collectionInstance = new CollectionClass(collectionName);
            collectionInstance.init();

            // Set instance of the model
            this._collections[collectionName] = collectionInstance;
        }

        return this._collections[collectionName];
    }

    /**
     * Returns definition for specified model
     *
     * @param collectionName
     * @param collectionFile
     */
    getModelClassDefinition (collectionName, collectionFile) {
        // Check collection
        var fileName = collectionFile != null ? collectionFile : collectionName + '.js';

        // Trying to find in parent models dir
        var modelPath = fileName;
        if (!fs.existsSync(modelPath)) {
            modelPath = path.normalize(this.modelsPath + fileName);
        }

        this._logger.log('## Trying to initialize model: %s', modelPath);
        if (!fs.existsSync(modelPath)) {
            // Trying local models dir
            if (!fs.existsSync(modelPath)) {
                modelPath = path.normalize(path.dirname(__dirname) + '/app/models/' + fileName);
                this._logger.log('## Model file not found, trying another one: %s', modelPath);
            }
        }

        var CollectionClass = require(modelPath);

        return CollectionClass;
    }

    /**
     * Returns list of all models from default locations
     */
    getModelsList () {
        var result = [];

        var modelsList = [];
        modelsList = modelsList.concat(this.getModelsForPath(this.modelsPath));

        var resultsMap = {};
        for (var i = 0; i < modelsList.length; i++) {
            if (resultsMap[modelsList[i]] == null) {
                result.push(modelsList[i]);
            }

            resultsMap[modelsList[i]] = true;
        }

        return result;
    }


    /**
     * Loading models for some path
     *
     * @param modelsPath
     */
    getModelsForPath (modelsPath) {
        var result = [];

        var normalizedPath = path.normalize(modelsPath);
        this._logger.info('## Checking models in the dir: %s', normalizedPath);
        if (!fs.existsSync(normalizedPath)) {
            this._logger.info('## Models Dir is not exists %s. Trying another one.', normalizedPath);
            return [];
        }

        normalizedPath = fs.realpathSync(normalizedPath);
        fs.readdirSync(normalizedPath).forEach((file) => {
            var fileInfo = path.parse(file);
            if (fileInfo.ext == '.js') {
                result.push(fileInfo.name);
            }
        });

        return result;
    }

    /**
     * Initialize models manager
     */
    init () {
        // Initializing model mogic
    }

}

/**
 * Initializing model manager
 */
module.exports = Model;
