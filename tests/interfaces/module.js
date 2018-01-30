
"use strict";


/**
 *
 */
var ModuleInterface = require('../../lib/interfaces/module.js');

var Logger = require('../../lib/utilities/logger');
var CoreEvent = require('../../lib/utilities/coreevent');
var Configuration = require('../../lib/utilities/configuration');
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

    it('"instance" should has logger', function () {
        expect(instance.logger,  "should exist").to.be.a('object');
        expect(instance.logger instanceof Logger, 'instanceof "Logger"').to.be.true;
    });

    it('"instance" should has configuration', function () {
        expect(instance.config,  "should exist").to.be.a('object');
        expect(instance.config instanceof Configuration, 'instanceof "Configuration"').to.be.true;
    });

    it('"instance" should has coreEvent', function () {
        expect(instance.coreEvent,  "should exist").to.be.a('object');
        expect(instance.coreEvent instanceof CoreEvent, 'instanceof "CoreEvent"').to.be.true;
    });

    it('"instance" should has props', function () {

    });

    it('"instance" should has methods', function () {
        expect(instance.init,  "init").to.be.a('function');
    });

});
