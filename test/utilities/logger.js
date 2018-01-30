
"use strict";

/**
 *
 */
var Logger = require('../../lib/utilities/logger');

/**
 *
 */
var expect = require('chai').expect;

/**
 * TESTS
 */
describe('utility LOGGER', function () {

    it('should exist', function () {
        expect(Logger).to.be.a('function');
    });

    it('has static methods', function () {
        expect(Logger.init,  "init").to.be.a('function');
        expect(Logger.replace,  "replace").to.be.a('function');
    });

    it('has static props', function () {
        expect(Logger.instance,  "instance").to.be.a('object');
    });

    it('"instance" instanceof "Logger"', function () {
        expect(Logger.instance instanceof Logger).to.be.true;
    });

    it('method "replace" => test', function () {
        expect(Logger.instance.testsProperties, 'defaults NOT').to.not.be.true;

        class CustomLogger extends Logger {
            constructor () {
                super();
                this.testsProperties = true;
            }
        }
        Logger.replace(CustomLogger);
        expect(Logger.instance.testsProperties, 'custom YES').to.be.true;
        expect(Logger.instance instanceof Logger, 'should stay instanceof "Logger"').to.be.true;
    });

    it('"instance" should has methods', function () {
        expect(Logger.instance.log, '"log" !!!').to.be.a('function');
        expect(Logger.instance.info, '"info" !!!').to.be.a('function');
        expect(Logger.instance.warn, '"warn" !!!').to.be.a('function');
        expect(Logger.instance.error, '"error" !!!').to.be.a('function');
        expect(Logger.instance.debug, '"debug" !!!').to.be.a('function');
    });

});
