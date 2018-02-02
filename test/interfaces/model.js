
"use strict";

/**
 *
 */
var ModelInterface = require('../../lib/interfaces/model');

/**
 *
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ModelInterface', function () {

    it('class "ModelInterface" should exist', function () {
        expect(ModelInterface).to.be.a('function');
    });

    it('has static methods', function () {
        expect(ModelInterface.create,  "create").to.be.a('function').and.to.throw();
    });

    var instance = new ModelInterface();

    it('"instance" should has props', function () {
        expect(instance.uid,  "uid").to.be.a('string');
        expect(instance._name,  "_name").to.be.a('string').and.to.equal(ModelInterface.name);
    });

    it('"instance" should has methods', function () {
        expect(instance.init,  "init").to.be.a('function').and.not.to.throw();
    });

});
