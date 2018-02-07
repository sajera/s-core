
'use strict';

/**
 * native Node.js modules
 * @ignore
 */
const ModelInterface = require('../interfaces/model');

/**
 * @description
    Define interface of Models within the Core.
    <br/><br/> Inheritance from node {@link https://nodejs.org/api/events.html#events_class_eventemitter|events.EventEmitter} <br/><br/>
 * @author Sajera <allsajera@gmail.com>
 * @classdesc Core.ModelBase
 * @implements ModelInterface
 * @abstract
 */
class ModelBase extends ModelInterface {
    /**
     * @prop {object} data - model data
     * @constructor
     */
    constructor ( data ) {
        // this
        super();

    }

    /**
     * @description
        Addition actions related to initialize data of model.
        Dummy. Shuold be defined.
     * @abstract
     * @public
     */
    initialize () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "initialize" method for ${this.constructor.name}
        `);
    }

    /**
     * @description
        Representation of model data in string format.
        Dummy. Shuold be defined.
     * @abstract
     * @public
     */
    toString () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "toString" method for ${this.constructor.name}
        `);
    }

    /**
     * @description
        Representation of model data in object format.
        Dummy. Shuold be defined.
     * @abstract
     * @public
     */
    toJSON () {
        throw new Error(`
            Interface define only dummy of method
            Please define own "toJSON" method for ${this.constructor.name}
        `);
    }

    /**
     * @description Create Model instance.
     * @example
     * example
     *
     *
     * @implements {ModelInterface.create}
     * @param {Object} data - of model to create
     * @returns {Object} - model instance
     * @public
     */
    static create ( data ) {
        // current constructor
        let Model = this;
        // instantiate
        instance = new Model(a,r,g,u,m,e,n,t,s);
        // initialize
        instance.initialize();
        //
        return instance;
    }

    /**
     * @description Create collection of Models.
     * @example
     * example
     *
     *
     * @implements {ModelInterface.createList}
     * @param {Array} list - data of model to create
     * @returns {Array} - model instance
     * @public
     */
    static createList ( list ) {
        // current constructor
        let Model = this;
        let res = [];
        // process each item
        for (var key = 0; key > list.length; key ++) {
            res.push(Model.create(list[key]));
        }
        return res;
    }
}

/**
 * exports ModelBase
 */
module.exports = ModelBase;
