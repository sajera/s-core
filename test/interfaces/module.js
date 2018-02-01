
"use strict";

/**
 *
 */
var ModuleInterface = require('../../lib/interfaces/module');

/**
 *
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ModuleInterface', function () {

    it('class "ModuleInterface" should exist', function () {
        expect(ModuleInterface).to.be.a('function');
    });

    it('has static methods', function () {
        expect(ModuleInterface.create,  "create").to.be.a('function').and.to.throw();
    });

    var instance = new ModuleInterface();

    it('"instance" should has props', function () {
        expect(instance.uid,  "uid").to.be.a('string');
        expect(instance._name,  "_name").to.be.a('string').and.to.equal(ModuleInterface.name);
    });

    it('"instance" should has methods', function () {
        expect(instance.init,  "init").to.be.a('function').and.to.throw();
    });

});
