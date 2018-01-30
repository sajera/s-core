
"use strict";


/**
 *
 */
var ErrorInterface = require('../../lib/interfaces/error.js');

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
describe('ErrorInterface', function () {

    it('class "ErrorInterface" should exist', function () {
        expect(ErrorInterface).to.be.a('function');
    });

    it('has static methods', function () {
        expect(ErrorInterface.create,  "create").to.be.a('function');
    });

    var level = 0;
    var msg = 'Custom error message';
    var err = new Error('Origin error message');
    var instance = new ErrorInterface(msg, err, level);

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
        expect(instance.uid,  "uid").to.be.a('string');
        expect(instance.date,  "date").to.be.a('date');
        expect(instance.prefix,  "from").to.be.a('string');
        expect(instance.level,  "level").to.be.a('number').and.equal(level);
        expect(instance.message,  "message").to.be.a('string').and.to.include(msg);
    });

    it('"instance" should has methods', function () {
        expect(instance.toJSON,  "toJSON").to.be.a('function');
        expect(instance.toString,  "toString").to.be.a('function');
    });

});
