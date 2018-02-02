
/**
 * to be tested
 */
var ModelInterface = require('../../lib/interfaces/model');

/**
 * chai
 */
var expect = require('chai').expect;

/**
 * Interface Error
 */
describe('ModelInterface', function () {

    it('class "ModelInterface" should exist', function () {
        expect(ModelInterface).to.be.a('function');
    });

    it('should has @abstract @static methods "create"', function () {
        expect(ModelInterface.create).to.be.a('function').and.to.throw();
    });

    var instance = new ModelInterface();
    it('"instance" should has @abstract methods "initialize"', function () {
        expect(instance.initialize).to.be.a('function').and.not.to.throw();
    });

});
