
/**
 * to be tested
 */
var ControllerInterface = require('../../lib/interfaces/controller');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ControllerInterface', function () {

    it('class "ControllerInterface" should exist', function () {
        expect(ControllerInterface).to.be.a('function');
    });

    it('should has @abstract @static methods "create"', function () {
        expect(ControllerInterface.create).to.be.a('function').and.to.throw();
    });

    var instance = new ControllerInterface();
    it('"instance" should has @abstract methods "initialize"', function () {
        expect(instance.initialize).to.be.a('function').and.not.to.throw();
    });

});
