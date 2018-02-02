
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

    it('has static methods', function () {
        expect(ControllerInterface.create,  "create").to.be.a('function').and.to.throw();
    });

    var instance = new ControllerInterface();

    it('"instance" should has props', function () {
        expect(instance.uid,  "uid").to.be.a('string');
        expect(instance._name,  "_name").to.be.a('string').and.to.equal(ControllerInterface.name);
    });

    it('"instance" should has methods', function () {
        expect(instance.init,  "init").to.be.a('function').and.not.to.throw();
    });

});
