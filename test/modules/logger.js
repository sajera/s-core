
/**
 * to be tested
 */
const Logger = require('../../lib/modules/logger');

/**
 * chai
 */
const expect = require('chai').expect;

/**
 * TESTS
 */
describe('Logger', function () {

    it('should exist', function () {
        expect(Logger).to.be.a('function');
    });

    it('has static methods', function () {
        expect(Logger.create).to.be.a('function');
    });

    // initialize logger instance
    Logger.create();

    it('has static props', function () {
        expect(Logger.instance).to.be.a('object');
    });

    it('"instance" instanceof "Logger"', function () {
        expect(Logger.instance instanceof Logger).to.be.true;
    });

    it('"instance" should has methods', function () {
        expect(Logger.instance.log, '"log" !!!').to.be.a('function');
        expect(Logger.instance.info, '"info" !!!').to.be.a('function');
        expect(Logger.instance.warn, '"warn" !!!').to.be.a('function');
        expect(Logger.instance.error, '"error" !!!').to.be.a('function');
        expect(Logger.instance.debug, '"debug" !!!').to.be.a('function');
        expect(Logger.instance.initialize,  '"initialize" !!!').to.be.a('function');
    });

});
