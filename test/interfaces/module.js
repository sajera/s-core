
"use strict";

/**
 *
 */
var ModuleInterface = require('../../lib/interfaces/module.js');

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
        expect(ModuleInterface.create,  "create").to.be.a('function');
    });

    var instance = new ModuleInterface();

    it('"instance" should has props', function () {

    });

    it('"instance" should has methods', function () {
        expect(instance.init,  "init").to.be.a('function');
    });

});
