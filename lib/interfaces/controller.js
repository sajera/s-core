
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
class ControllerInterface extends ModuleInterface {
    /**
     * @description inheritance from ModuleInterface
     * @constructor
     */
    constructor () {
        // this
        super();

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
 * @exports ControllerInterface
 */
module.exports = ControllerInterface;
