
"use strict";

/**
 * @interface ModuleInterface
 */
const ModuleInterface = require('./module');

/**
 * @description define interface of models within the Core
 * @author Sajera Serhii P. Perekhrest <allsajera@gmail.com>
 * @interface
 * @public
 */
class ModelInterface extends ModuleInterface {
    /**
     * @description inheritance from ModuleInterface
     * @constructor
     */
    constructor () {
        // this
        super();
        /**
         * @description Default table schema
         * @type {{fields: {}, table: null}}
         */
        this.schema = {
            fields: {},
            table: null,
        };
    }

    /**
     * @description
        As module no initialization by defaults.
        Dummy. Can be overidet by inheritance.
     * @override ModuleInterface
     * @public
     */
    init () {
        // ...
    }

}

/**
 * @exports ModelInterface
 */
module.exports = ModelInterface;
